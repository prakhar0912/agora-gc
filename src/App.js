import { useState, useRef, useEffect } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { GlobalProvider, useClient, useStart, useUsers, useSpeaking } from './GlobalContext';

const App = () => {
  return (
    <GlobalProvider>
      <Content />
    </GlobalProvider>
  );
}

const Content = () => {
  const setUsers = useUsers()[1]
  const [start, setStart] = useStart()
  const rtc = useClient()
  const options = {
    // Pass your app ID here.
    appId: "",
    // Set the channel name.
    channel: "default_channel_name",
    // Pass a token if your project enables the App Certificate.
    token: null,
  };

  let init = async (name, appId) => {
    rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    initClientEvents()
    const uid = await rtc.current.client.join(appId, name, options.token, null);
    // Create an audio track from the audio sampled by a microphone.
    let option = false
    if (option === true) {
      const media = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      let audioTrack = media.getAudioTracks()[0]
      rtc.current.localAudioTrack = await AgoraRTC.createCustomAudioTrack({ mediaStreamTrack: audioTrack });
      //You can manipulate the audioTrack here
    }
    else {
      //Agora provided audio manipulation
      rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        // encoderConfig: {
        //   sampleRate: 48000,
        //   stereo: true,
        //   bitrate: 128,
        // },
      })
      // rtc.current.localAudioTrack.setVolume(10)
    }
    // Create a video track from the video captured by a camera.
    rtc.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    //Adding a User to the Users State
    setUsers((prevUsers) => {
      return [...prevUsers, { uid: uid, audio: true, video: true, client: true, videoTrack: rtc.current.localVideoTrack, audioTrack: rtc.current.localAudioTrack }]
    })
    //Publishing your Streams
    await rtc.current.client.publish([rtc.current.localAudioTrack, rtc.current.localVideoTrack]);
    setStart(true)
  }

  const initClientEvents = () => {
    rtc.current.client.on("user-joined", async (user) => {
      // New User Enters
      await setUsers((prevUsers) => {
        return [...prevUsers, { uid: user.uid, audio: user.hasAudio, video: user.hasVideo, client: false, }]
      })
    });


    rtc.current.client.on("user-published", async (user, mediaType) => {
      
      await rtc.current.client.subscribe(user, mediaType);

      if (mediaType === "video") {
        console.log("video")
        const remoteVideoTrack = user.videoTrack;
        await setUsers((prevUsers) => {
          console.log(prevUsers)
          return (prevUsers.map((User) => {
            if (User.uid === user.uid) {

              return { ...User, video: user.hasAudio, videoTrack: remoteVideoTrack }
            }
            return User
          }))

        })
      }

      if (mediaType === "audio") {
        console.log('audio')
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
        await setUsers((prevUsers) => {
          console.log(prevUsers)
          return (prevUsers.map((User) => {
            if (User.uid === user.uid) {
              return { ...User, audio: user.hasAudio, audioTrack: remoteAudioTrack }
            }
            return User
          }))

        })
      }
    });

    rtc.current.client.on("user-unpublished", (user, type) => {
      if (type === 'audio') {
        setUsers(prevUsers => {
          return (prevUsers.map((User) => {
            if (User.uid === user.uid) {
              return { ...User, audio: !User.audio }
            }
            return User
          }))
        })
      }
      if (type === 'video') {
        setUsers(prevUsers => {
          return (prevUsers.map((User) => {
            if (User.uid === user.uid) {
              return { ...User, video: !User.video }
            }
            return User
          }))
        })
      }
    });

    rtc.current.client.on("user-left", (user) => {
      //User Leaves
      setUsers((prevUsers) => {
        return prevUsers.filter(User => User.uid !== user.uid)
      })
    });
  }

  return (
    <div className="App">
      {start && <Videos />}
      {!start && <ChannelForm initFunc={init} />}
    </div>
  )
}


const Videos = () => {

  const users = useUsers()[0]

  return (
    <div id='videos'>
      {users.length && users.map((user) => <Video key={user.uid} user={user} />)}
    </div>
  )

}

export const Video = ({ user }) => {

  const vidDiv = useRef(null)

  const playVideo = () => {
    if(user.videoTrack){
      user.videoTrack.play(vidDiv.current)
    }
  }

  const stopVideo = () => {
    if(user.videoTrack){
      user.videoTrack.stop()
    }
  }

  useEffect(() => {
    playVideo()
    return () => {
      stopVideo()
    }
    // eslint-disable-next-line
  }, [user.videoTrack])

  return (
    <div className='vid' ref={vidDiv} >
      <Controls user={user} />
    </div>
  )
}


export const Controls = ({ user }) => {

  const setStart = useStart()[1]
  const setUsers = useUsers()[1]
  const rtc = useClient()
  const [speaking, setSpeaking] = useSpeaking()

  const leaveChannel = async () => {
    // Destroy the local audio and video tracks.
    await rtc.current.localAudioTrack.close();
    await rtc.current.localVideoTrack.close();
    await rtc.current.client.leave();
    setUsers([])
    clearInterval(rtc.current.checkAudio)
    setStart(false)
  }

  useEffect(() => {
    const startAudioCheck = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      const audioContext = new AudioContext();
      const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(mediaStream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamAudioSourceNode.connect(analyserNode);
      const pcmData = new Float32Array(analyserNode.fftSize);

      const checkAudio = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude * amplitude; }
        let vol = Math.sqrt(sumSquares / pcmData.length)
        if (vol > 0.05 && !speaking) {
          setSpeaking(true)
          setTimeout(() => { setSpeaking(false) }, 2000)
        }
      };

      if (user.audio === false) {
        rtc.current.checkSpeakingInterval = setInterval(checkAudio, 100)
      }
      else {
        clearInterval(rtc.current.checkSpeakingInterval)
      }
    }
    if (user.client) {
      startAudioCheck()
    }
    return () => {
      // eslint-disable-next-line
      clearInterval(rtc.current.checkSpeakingInterval)
    }
    // eslint-disable-next-line
  }, [user.audio])

  const mute = (type, id) => {
    if (type === 'audio') {
      setUsers(prevUsers => {
        return (prevUsers.map((user) => {
          if (user.uid === id) {
            user.client && rtc.current.localAudioTrack.setMuted(user.audio)
            return { ...user, audio: !user.audio }
          }
          return user
        }))
      })
    }
    else if (type === 'video') {
      setUsers(prevUsers => {
        return prevUsers.map((user) => {
          if (user.uid === id) {
            user.client && rtc.current.localVideoTrack.setEnabled(!user.video)
            return { ...user, video: !user.video }
          }
          return user
        })
      })
    }
  }

  return (
    <div className='controls'>
      {<p className={user.audio ? 'on' : ''} onClick={() => user.client && mute('audio', user.uid)}>{user.client && speaking && !user.audio ? 'Mic(Unmute if Speaking)' : 'Mic'}</p>}
      {<p className={user.video ? 'on' : ''} onClick={() => user.client && mute('video', user.uid)}>Video</p>}
      {<input type="number" placeholder="Volume" onChange={(e) => { let vol = parseInt(e.target.value); vol !== NaN && vol >= 0 && vol <= 1000 && (user.audioTrack.setVolume(parseInt(e.target.value))) }} />}
      {user.client && <p onClick={() => leaveChannel()}>Quit</p>}
    </div>
  )
}


const ChannelForm = ({ initFunc }) => {

  const [channelName, setChannelName] = useState('')
  const [appId, setappId] = useState('')
  return (
    <form className='join'>
      <input type="text" placeholder="Enter App Id" onChange={(e) => { setappId(e.target.value) }} />
      <input type="text" placeholder='Enter Channel Name' onChange={(e) => setChannelName(e.target.value)} />
      <button onClick={(e) => { e.preventDefault(); initFunc(channelName, appId); }}>Join Call</button>
    </form>
  );

}

export default App;



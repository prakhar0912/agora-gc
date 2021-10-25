# Agora Token Service

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/akshatvg/Agora-Token-Service?logo=github&style=social)](https://github.com/akshatvg/) [![GitHub last commit](https://img.shields.io/github/last-commit/akshatvg/Agora-Token-Service?style=social&logo=git)](https://github.com/akshatvg/) [![GitHub stars](https://img.shields.io/github/stars/akshatvg/Agora-Token-Service?style=social)](https://github.com/akshatvg/Agora-Token-Service/stargazers) [![GitHub forks](https://img.shields.io/github/forks/akshatvg/Agora-Token-Service?style=social&logo=git)](https://github.com/akshatvg/Agora-Token-Service/network)

Using Agora's token service to authenticate users.

![Generic badge](https://img.shields.io/badge/Token-Server-orange) 

## Useful Links

- [Deployed Website (React)](https://agora-tokens.akshatvg.com)
- [Deployed Website (Vanilla JS)](https://agora-tokens-vanilla.akshatvg.com)
- [Agora.io Website](https://www.agora.io/)
- [SDK NG Documentation](https://agoraio-community.github.io/AgoraWebSDK-NG/api/en/index.html)
- [Guided Blog](https://akshatvg.medium.com/connecting-to-agora-with-tokens-in-the-web-react-eee875518aed)

## Prerequisites

- Node.js LTS

## Quick Start

This section shows you how to prepare, build, and run the sample application.

### Obtain an App ID

To build and run the sample application, get an App ID:
1. Create a developer account at [agora.io](https://dashboard.agora.io/signin/). Once you finish the signup process, you will be redirected to the Dashboard.
2. Navigate in the Dashboard tree on the left to **Projects** > **Project List**.
3. Save the **App ID** from the Dashboard for later use.
4. Generate a temp **Access Token** (valid for 24 hours) from dashboard page with given channel name, save for later use.

5. Create a **.env** file. In this file, replace `<#YOUR Agora.io APP ID#>` with the App ID, and obtain the access token generated from dashboard then replace `<#YOUR Agora.io APP ID#>` with it.

    ```bash
    REACT_APP_AGORA_APP_ID=<APP_ID>
    REACT_APP_BACKEND_URL=<URL>
    ```

### Install dependencies and integrate the Agora Video SDK


1. Using the Terminal app, enter the `install` command in your project directory. This command installs libraries that are required to run the sample application.
    ``` bash
    # install dependencies
    npm install
    ```
2. Start the application by entering the `npm start` command.
    The `start` command is for development purposes.
    ``` bash
    # serve with hot reload at localhost:8080
    npm start
    ```
    The `run build` command is for production purposes and minifies code.
    ``` bash
    # build for production with minification
    npm run build
    ```
3. Your default browser should open and display the sample application.
    **Note:** In some cases, you may need to open a browser and enter `http://localhost:3000` as the URL.


## Resources

- For potential issues, take a look at our [FAQ](https://docs.agora.io/cn/faq) first
- Dive into [Agora SDK Samples](https://github.com/AgoraIO) to see more tutorials
- Take a look at [Agora Use Case](https://github.com/AgoraIO-usecase) for more complicated real use case
- Repositories managed by developer communities can be found at [Agora Community](https://github.com/AgoraIO-Community)
- You can find full API documentation at [Document Center](https://docs.agora.io/en/)
- If you encounter problems during integration, you can ask question in [Stack Overflow](https://stackoverflow.com/questions/tagged/agora.io)


## Need help?


Feel free to contact me via [Facebook](https://www.facebook.com/akshatvg).

Invite me to connect on [LinkedIn](https://www.linkedin.com/in/akshatvg/).

[![Facebook](https://img.shields.io/badge/Facebook-add-blue.svg?logo=facebook&logoColor=white)](https://www.facebook.com/akshatvg) [![Quora](https://img.shields.io/badge/Quora-ask-red.svg?logo=quora)](https://www.quora.com/profile/Akshat-Gupta-279) [![Instagram](https://img.shields.io/badge/Instagram-follow-purple.svg?logo=instagram&logoColor=white)](https://www.instagram.com/akshatvg/) [![Snapchat](https://img.shields.io/badge/Snapchat-add-yellow.svg?logo=snapchat&logoColor=white)](https://www.snapchat.com/add/akshatvg) [![Medium](https://img.shields.io/badge/Medium-follow-black.svg?logo=medium&logoColor=white)](https://medium.com/@akshatvg)


```bash
 _____ _                 _     __   __            
|_   _| |               | |    \ \ / /            
  | | | |__   __ _ _ __ | | __  \ V /___  _   _   
  | | | '_ \ / _` | '_ \| |/ /   \ // _ \| | | |  
  | | | | | | (_| | | | |   <    | | (_) | |_| |  
  \_/ |_| |_|\__,_|_| |_|_|\_\   \_/\___/ \__,_|  
                                                  
                                                  
______                                            
|  ___|                                           
| |_ ___  _ __                                    
|  _/ _ \| '__|                                   
| || (_) | |                                      
\_| \___/|_|                                      
                                                  
                                                  
______      _               _   _               _ 
| ___ \    (_)             | | | |             | |
| |_/ / ___ _ _ __   __ _  | |_| | ___ _ __ ___| |
| ___ \/ _ \ | '_ \ / _` | |  _  |/ _ \ '__/ _ \ |
| |_/ /  __/ | | | | (_| | | | | |  __/ | |  __/_|
\____/ \___|_|_| |_|\__, | \_| |_/\___|_|  \___(_)
                     __/ |                        
                    |___/                         

```

## License

**MIT &copy; [Akshat Gupta](https://github.com/akshatvg/Agora-Token-Service/blob/master/LICENSE)**

[![GitHub license](https://img.shields.io/github/license/akshatvg/Agora-Token-Service?style=social&logo=github)](https://github.com/akshatvg/Agora-Token-Service/blob/master/LICENSE) [![Twitter Follow](https://img.shields.io/twitter/follow/akshatvg?style=social)](https://twitter.com/akshatvg)

---------

```javascript
if (youEnjoyed) {
    starThisRepository();
}
```

-----------

import 'dotenv/config';

module.exports = {
  "expo": {
    "name": "firebase-auth-app",
    "slug": "firebase-auth-app",
    "description": "A react native/expo firebase auth app example",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/rn-expo-fb-plain.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#151419"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#151419"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    // using envs with expo and expo constants
    // Docs: https://docs.expo.dev/guides/environment-variables/
    "extra": {
      // firebase
      firebaseApiKey: process.env.API_KEY,
      firebaseAuthDomain: process.env.AUTH_DOMAIN,
      firebaseProjectId: process.env.PROJECT_ID,
      firebaseStorageBucket: process.env.STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.MESSAGING_SENDER_ID,
      firebaseAppId: process.env.APP_ID,
      // usernames doc ID
      usernamesDocID: process.env.USERNAMES_DOC_ID
    }
  }
}

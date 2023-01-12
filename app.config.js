module.exports = {
  name: "Repair",
  slug: "repair-nodejs",
  version: "2.0.3",
  privacy: "public",
  platforms: ["ios", "android"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "com.tasluf.repairnodejs",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.tasluf.repairnodejs",
    buildNumber: "1.0.0",
  },
  android: {
    icon: "./assets/icon.png",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    permissions: ["NOTIFICATIONS", "CAMERA"],
    package: "com.tasluf.repairnodejs",
    versionCode: 3,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    EXPO_GO_PROXY: process.env.EXPO_GO_PROXY,
    ANDROID_CLIENT_ID: process.env.ANDROID_STANDAL_ONE_APP_CLIENT_ID,
    apiUrl: process.env.BACKEND_URL_PROD,
    eas: {
      projectId: "1ddde3c0-a53f-486d-b7e9-17b01051fc9e",
    },
  },
};

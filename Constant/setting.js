import {} from "@env";

const settings = {
  dev: {
    apiUrl: process.env.BACKEND_URL_DEV,
    EXPO_GO_PROXY: process.env.EXPO_GO_PROXY,
    ANDROID_CLIENT_ID: process.env.ANDROID_STANDAL_ONE_APP_CLIENT_ID,
  },
  prod: {
    apiUrl: process.env.BACKEND_URL_PROD,
    EXPO_GO_PROXY: process.env.EXPO_GO_PROXY,
    ANDROID_CLIENT_ID: process.env.ANDROID_STANDAL_ONE_APP_CLIENT_ID,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.prod;
};

export default getCurrentSettings();

const settings = {
  dev: {
    apiUrl: "http://192.168.0.108:3001",
  },
  prod: {
    apiUrl: "https://backendrepair-production.up.railway.app",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.prod;
};

export default getCurrentSettings();

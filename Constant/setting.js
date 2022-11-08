const settings = {
  dev: {
    apiUrl: "http://192.168.0.108:3001",
  },
  prod: {
    apiUrl: "http://103.157.253.227:3001",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.prod;
};

export default getCurrentSettings();

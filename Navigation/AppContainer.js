import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import TabNavigation from "./AppScreenNavigation/TabNavigation/TabNavigation";
import { AuthStack } from "./AuthScreenNavigation/AuthStack";
import StartupScreen from "../StartupScreen";

const AppContainer = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <TabNavigation />}
      {!isAuth && didTryAutoLogin && <AuthStack />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppContainer;

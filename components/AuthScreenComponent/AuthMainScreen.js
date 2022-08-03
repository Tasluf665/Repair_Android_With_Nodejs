import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../Constant/Colors";
import CustomeFonts from "../../Constant/CustomeFonts";

export default function AuthMainScreen(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/StartupImages/1.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.titelText}>Welcome</Text>
        <Text style={styles.titelText}>to our store</Text>
        <Text style={styles.text}>We are available 24 hours for you</Text>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("AuthScreenStack")}
          >
            <View style={styles.button}>
              <Text style={[styles.titelText, { fontSize: scale(16) }]}>
                Get Started
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titelText: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    fontSize: "28@s",
    color: "white",
  },
  text: {
    marginTop: "25@vs",
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "13@s",
    color: "white",
  },
  buttonContainer: {
    width: "75%",
    height: "60@vs",
    overflow: "hidden",
    borderRadius: "18@s",
    marginBottom: "80@vs",
    marginTop: "45@vs",
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: "18@s",
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

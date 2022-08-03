import React from "react";
import { View, Text, TextInput } from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../Constant/Colors";
import CustomeFonts from "../../../Constant/CustomeFonts";

export default function PasswordTextInput(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  return (
    <View style={{ width: "100%" }}>
      <Text style={[styles.text, { fontFamily: CustomeFonts.RobotoSlabBold }]}>
        {props.title}
      </Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.textInput, { width: "90%" }]}
          onChangeText={props.setPassword}
          secureTextEntry={hidePassword}
        />
        <Ionicons
          name={hidePassword ? "eye-off-outline" : "eye-outline"}
          size={scale(20)}
          color="black"
          onPress={() => setHidePassword((state) => !state)}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  text: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "14@s",
    marginBottom: "8@vs",
    color: Colors.DarkGray,
  },
  passwordInputContainer: {
    flexDirection: "row",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginBottom: "20@vs",
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "13@s",
    paddingVertical: 5,
  },
});

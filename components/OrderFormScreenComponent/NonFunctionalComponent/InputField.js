import React from "react";
import { View, Text, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const InputField = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <TextInput
        style={[styles.textInput, props.styles]}
        multiline={props.multiline}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "18@vs",
  },
  text: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Secondary,
    marginBottom: "10@vs",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.InputBorderColor,
    padding: "8@vs",
    paddingHorizontal: "12@s",
  },
});

export default InputField;

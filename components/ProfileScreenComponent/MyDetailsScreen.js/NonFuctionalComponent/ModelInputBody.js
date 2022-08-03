import { View, TextInput, Button } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function ModelInputBody({ placeholder, onPress }) {
  const [text, setText] = React.useState();
  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          color={Colors.Primary}
          onPress={() => onPress(text)}
        />
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: "4@vs",
    borderBottomColor: Colors.InputBorderColor,
    marginTop: "13@vs",
    fontSize: "13@s",
    fontFamily: CustomeFonts.RobotoSlabRegular,
  },
  buttonContainer: {
    alignSelf: "center",
    width: "40%",
    marginTop: "33@vs",
  },
});

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import CustomeFonts from "../../../../Constant/CustomeFonts";
import Colors from "../../../../Constant/Colors";

export default function GenderModelItem({ title, onPress }) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Text style={[styles.text]}>{title}</Text>
        <View style={styles.line}></View>
      </TouchableOpacity>
    </>
  );
}

const styles = ScaledSheet.create({
  text: {
    fontSize: "13@s",
    fontFamily: CustomeFonts.RobotoSlabRegular,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.InputBorderColor,
    marginVertical: "10@vs",
  },
});

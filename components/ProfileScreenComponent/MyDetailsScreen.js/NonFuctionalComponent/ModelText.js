import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import React from "react";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function ModelText({ title }) {
  return <Text style={styles.text}>{title}</Text>;
}

const styles = ScaledSheet.create({
  text: {
    fontSize: "14@s",
    color: Colors.Primary,
    fontFamily: CustomeFonts.RobotoSlabRegular,
  },
});

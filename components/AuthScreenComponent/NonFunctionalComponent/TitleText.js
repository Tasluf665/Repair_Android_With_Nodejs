import React from "react";
import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import CustomeFonts from "../../../Constant/CustomeFonts";

export default function TitleText(props) {
  return <Text style={styles.titelText}>{props.children}</Text>;
}

const styles = ScaledSheet.create({
  titelText: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    fontSize: "17@s",
    marginVertical: 5,
  },
});

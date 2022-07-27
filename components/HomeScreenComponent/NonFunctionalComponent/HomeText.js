import React from "react";
import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const HomeText = (props) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = ScaledSheet.create({
  text: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "15@s",
    color: Colors.Secondary,
    marginLeft: "3.7%",
  },
});

export default HomeText;

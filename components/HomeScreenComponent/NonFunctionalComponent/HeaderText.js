import React from "react";
import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const HeaderText = (props) => {
  return (
    <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
      {props.children}
    </Text>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Primary_Helper,
    fontSize: "20@s",
    lineHeight: "40@vs",
  },
});

export default HeaderText;

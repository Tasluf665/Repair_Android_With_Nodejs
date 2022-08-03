import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { FontAwesome } from "@expo/vector-icons";
import CustomeFonts from "../../../Constant/CustomeFonts";
import Colors from "../../../Constant/Colors";

export default function SocialButton(props) {
  return (
    <View style={[styles.touchContainer, props.style]}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={[styles.container, { backgroundColor: props.color }]}>
          <FontAwesome name={props.social} size={24} color="white" />
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = ScaledSheet.create({
  touchContainer: {
    borderRadius: "18@s",
    overflow: "hidden",
    width: "auto",
    marginVertical: "8@vs",
    width: "72%",
    height: "55@vs",
    alignSelf: "center",
  },
  container: {
    width: "100%",
    height: "55@vs",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "18@s",
    flexDirection: "row",
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    fontSize: "12@s",
    color: Colors.Primary_Helper,
    paddingLeft: 20,
  },
});

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";
import * as Linking from "expo-linking";
import Colors from "../../../Constant/Colors";

const PhoneCard = () => {
  const handelPhone = () => {
    Linking.openURL("tel:+8801956140407");
  };
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handelPhone}>
      <View style={styles.container}>
        <FontAwesome
          name="phone-square"
          size={scale(34)}
          color={Colors.Primary}
        />
        <Text style={styles.text}>How can we help you?</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#DDE7FF",
    alignSelf: "center",
    borderRadius: 60,
    padding: "20@vs",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "80@vs",
  },
  text: {
    fontFamily: "RobotoSlabRegular",
    alignSelf: "center",
    fontSize: "13@s",
    marginLeft: "15@s",
    color: Colors.Secondary,
  },
});

export default PhoneCard;

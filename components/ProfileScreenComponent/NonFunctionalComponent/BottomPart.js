import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const Card = ({ title, iconName, size = scale(15) }) => {
  return (
    <>
      <Text style={styles.text}>{title}</Text>
      <MaterialIcons
        name={iconName}
        size={scale(16)}
        color={Colors.Secondary}
        style={{ marginRight: size }}
      />
    </>
  );
};

const BottomPart = () => {
  return (
    <View style={styles.container}>
      <Card title="Privacy Policy" iconName="arrow-forward-ios" />
      <Card title="Help" iconName="arrow-forward-ios" size={0} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35@vs",
  },
  text: {
    marginRight: "5@s",
    fontFamily: "RobotoSlabRegular",
    color: Colors.Secondary,
  },
});

export default BottomPart;

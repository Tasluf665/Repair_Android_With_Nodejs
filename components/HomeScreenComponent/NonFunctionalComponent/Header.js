import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../../Constant/Colors";
import SvgComponent from "./SvgComponent";
import HeaderText from "./HeaderText";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.IconTextContainer}>
        <View style={styles.TextContainer}>
          <HeaderText>Engineers In</HeaderText>
          <HeaderText>Your Area</HeaderText>
          <HeaderText>Today</HeaderText>
        </View>
        <View style={styles.IconContainer}>
          <SvgComponent height="100%" width="100%" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "28%",
    backgroundColor: Colors.Primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  IconTextContainer: {
    flexDirection: "row",
  },
  TextContainer: {
    width: "43%",
    paddingLeft: "4%",
  },

  IconContainer: {
    width: "57%",
  },
});

export default Header;

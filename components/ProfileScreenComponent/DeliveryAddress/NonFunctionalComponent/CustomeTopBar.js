import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { ScaledSheet, scale } from "react-native-size-matters";

import CustomeFonts from "../../../../Constant/CustomeFonts";
import Colors from "../../../../Constant/Colors";

export default function CustomeTopBar(props) {
  return (
    <>
      <View style={styles.topBar}>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.pop()}
          >
            <Text style={styles.topBarText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={[{ right: scale(20) }, styles.topBarText]}>
          {props.title}
        </Text>
        <View></View>
      </View>
      <View style={styles.line}></View>
    </>
  );
}

const styles = ScaledSheet.create({
  topBar: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "18@s",
    backgroundColor: "white",
    paddingVertical: "13@vs",
  },
  topBarText: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "13@s",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.LineColor,
  },
});

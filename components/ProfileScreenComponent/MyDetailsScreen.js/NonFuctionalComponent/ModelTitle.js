import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function ModelTitle({ title, setModalVisible }) {
  return (
    <View style={styles.title}>
      <View></View>
      <Text style={styles.text}>{title}</Text>
      <Ionicons
        name="close-circle-outline"
        size={24}
        color="black"
        onPress={() => setModalVisible((state) => !state)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: CustomeFonts.RobotoSlabRegular,
  },
});

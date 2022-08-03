import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

export default function ModelContianer(props) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.container}>{props.children}</View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  itemContainer: {
    width: "100%",
    height: "190@vs",
    backgroundColor: "white",
  },
  container: {
    marginHorizontal: "18@s",
    marginTop: "18@vs",
  },
});

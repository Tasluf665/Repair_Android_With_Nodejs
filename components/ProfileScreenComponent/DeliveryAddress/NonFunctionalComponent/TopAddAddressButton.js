import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function TopAddAddressButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>+ Add Address</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: "10%",
    backgroundColor: Colors.lightGreen,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.Primary,
    borderStyle: "dashed",
  },
  text: {
    justifyContent: "center",
    color: Colors.Primary,
    fontFamily: CustomeFonts.LatoBold,
  },
});

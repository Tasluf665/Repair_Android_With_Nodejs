import React from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const TopPart = (props) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          console.log("Touched");
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/Images/Rhyme.jpg")}
        />
      </TouchableNativeFeedback>

      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginTop: "50@vs",
  },
  image: {
    width: "100@vs",
    height: "100@vs",
    borderRadius: "50@vs",
    marginBottom: "10@vs",
  },
  text: {
    fontFamily: "RobotoSlabRegular",
    marginTop: "10@vs",
    color: Colors.Secondary,
    fontSize: "14@s",
  },
});

export default TopPart;

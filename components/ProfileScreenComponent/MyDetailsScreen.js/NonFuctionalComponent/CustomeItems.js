import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Entypo } from "@expo/vector-icons";
import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function CustomeItems(props) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Text style={styles.nameText} numberOfLines={1}>
            {props.details}
          </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "16@s",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: "18@vs",
    marginBottom: 1,
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    fontSize: "13@s",
  },
  nameText: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "12@s",
    color: Colors.Secondary,
    marginRight: "8@s",
  },
});

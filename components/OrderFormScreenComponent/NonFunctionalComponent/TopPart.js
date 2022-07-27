import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet, verticalScale } from "react-native-size-matters";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../Constant/Colors";

export default function TopPart(props) {
  return (
    <View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={props.iconName}
          size={verticalScale(80)}
          color={Colors.Secondary}
        />
      </View>
      <View>
        <Text style={styles.title}>Service Booking</Text>
        <Text numberOfLines={2} style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur sds adip iscing elit.
          Imperdiet habitant{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  iconContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "18@vs",
    color: Colors.Primary,
    marginVertical: "10@s",
  },
  description: {
    fontFamily: "RobotoSlabRegular",
    color: Colors.Secondary,
  },
});

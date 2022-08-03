import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";

const CardView = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.cardContainer}
        onPress={props.onPress}
      >
        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={props.iconName}
                size={scale(22)}
                color={Colors.Secondary}
              />
            </View>
            <Text style={styles.text}>{props.title}</Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={scale(18)}
            color={Colors.Secondary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "30@vs",
  },
  cardContainer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  text: {
    marginLeft: "16@s",
    fontSize: "14@s",
    fontFamily: "RobotoSlabRegular",
    color: Colors.Secondary,
  },
  iconContainer: {
    width: "28@s",
  },
});

export default CardView;

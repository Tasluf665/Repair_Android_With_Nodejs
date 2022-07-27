import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../Constant/Colors";

export default function NotificationCard(props) {
  const navigation = useNavigation();
  const time =
    new Date(props.time).toDateString() +
    ", " +
    new Date(props.time).getHours() +
    ":" +
    new Date(props.time).getMinutes();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderTrackScreen", {
          orderId: props.orderId,
        })
      }
      activeOpacity={0.5}
    >
      <View style={styles.container}>
        <Text style={styles.state}>{props.state}</Text>
        <Text style={styles.details}>{props.details}</Text>
        <Text style={styles.details}>{time}</Text>
      </View>
      <View style={styles.line}></View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: "20@s",
    marginVertical: "10@s",
  },
  line: {
    height: 1,
    backgroundColor: Colors.BorderGray,
  },
  state: {
    color: Colors.Secondary,
    fontFamily: "RobotoSlabBold",
    marginBottom: "5@vs",
    marginRight: "5@s",
  },
  details: {
    color: Colors.Secondary,
    fontFamily: "RobotoSlabRegular",
    marginBottom: "5@vs",
    marginRight: "5@s",
  },
});

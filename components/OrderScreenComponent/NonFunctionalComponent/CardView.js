import React from "react";
import { View, Text, Image } from "react-native";
import { ScaledSheet, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constant/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CardView = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <View style={styles.image}>
          <MaterialCommunityIcons
            name={props.image}
            size={verticalScale(70)}
            color={Colors.Secondary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{props.title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {props.description}
          </Text>
          <Text style={styles.header}>{props.orderNo}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {props.history ? null : <Text style={styles.buttonText}>Remove</Text>}

        <Text
          style={styles.buttonText}
          onPress={() =>
            navigation.navigate("OrderTrackScreen", {
              orderId: props.orderId,
              history: props.history ? true : false,
            })
          }
        >
          Track Order
        </Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "12@vs",
    paddingVertical: "12@vs",
    backgroundColor: "white",
  },
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "35%",
    height: "75@vs",
    alignItems: "center",
  },
  textContainer: {
    width: "60%",
    marginLeft: "5@s",
    marginRight: "20@s",
  },
  header: {
    fontFamily: "RobotoSlabSemiBold",
    marginVertical: "4@vs",
  },
  description: {
    fontFamily: "RobotoSlabRegular",
  },
  buttonContainer: {
    width: "50%",
    flexDirection: "row",
    marginLeft: "30@s",
    marginTop: "16@vs",
    justifyContent: "space-between",
  },
  buttonText: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Primary,
  },
});

export default CardView;

import React from "react";
import { View, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../Constant/Colors";

const TopDealsCard = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.imageName} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "250@s",
    height: "120@vs",
    borderRadius: 30,
    overflow: "hidden",
    marginRight: "30@s",
    elevation: 3,
    marginVertical: "20@vs",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: Colors.BackGroundGray,
  },
});

export default TopDealsCard;

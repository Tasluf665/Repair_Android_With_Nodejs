import React from "react";
import { View, TouchableWithoutFeedback, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";

function OffersCard({ onPress, imageName, titleText, mainText, uptoText }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.services}>
        <Image style={styles.imgStyle} source={imageName} />
        <View
          style={{
            alignSelf: "center",
            marginLeft: 10,
          }}
        >
          <Text style={styles.titleTextStyle}>{titleText}</Text>
          <Text style={styles.mainTextStyle}>{mainText}</Text>
          <Text style={styles.titleTextStyle}>{uptoText}</Text>
        </View>
        <View style={styles.button}>
          <Entypo name="plus" size={scale(20)} color="#fff" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  services: {
    elevation: 2,
    height: "120@vs",
    width: "85%",
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: "10@vs",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  imgStyle: {
    width: "40%",
    height: "60%",
    marginLeft: 30,
    alignSelf: "center",
  },
  button: {
    width: "20%",
    height: "23%",
    backgroundColor: "#284778",
    alignSelf: "flex-end",
    marginLeft: "auto",
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextStyle: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "11@s",
  },

  mainTextStyle: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "15@s",
    color: "#284778",
  },
});

export default OffersCard;

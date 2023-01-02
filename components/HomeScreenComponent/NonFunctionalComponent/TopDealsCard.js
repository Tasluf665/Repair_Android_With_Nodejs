import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../Constant/Colors";
import { useNavigation } from "@react-navigation/native";
import setting from "../../../Constant/setting";

const TopDealsCard = (props) => {
  const navigation = useNavigation();
  const url = `${setting.apiUrl}/WebView/offer.html`;
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Offer", {
            url: url,
          });
        }}
      >
        <Image style={styles.image} source={props.imageName} />
      </TouchableWithoutFeedback>
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

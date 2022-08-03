import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ServiceCard({ iconName, onPress, iconColor, backgroundColor, text }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
        navigation.navigate("OrderFormStackScreen", { iconName, text });
      }}
    >
      <View style={[styles.services, { backgroundColor }]}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={iconName}
            size={scale(35)}
            color={iconColor}
          />
        </View>
        <Text style={[styles.iconText, { color: iconColor }]}>{text}</Text>
        <View style={styles.arrow}>
          <AntDesign name="rightcircle" size={scale(20)} color={iconColor} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  services: {
    elevation: 4,
    height: "150@vs",
    width: "100@s",
    borderRadius: 25,
    alignItems: "center",
    marginRight: 25,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  icon: {
    marginTop: "20%",
    marginBottom: "12%",
  },
  iconText: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "14@s",
    color: "#fff",
  },
  arrow: {
    marginBottom: "15%",
    marginTop: "20%",
  },
});

export default ServiceCard;

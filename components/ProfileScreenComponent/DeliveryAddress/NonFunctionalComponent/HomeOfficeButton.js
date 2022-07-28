import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function HomeOfficeButton(props) {
  const ButtonItem = ({ value, iconName, title, borderColor }) => {
    return (
      <TouchableOpacity
        onPress={() => props.setOffice(value)}
        activeOpacity={0.6}
      >
        <View
          style={[
            styles.officeContainer,
            {
              borderColor: borderColor,
            },
          ]}
        >
          <Foundation name={iconName} size={24} color={Colors.DarkGray} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.homeOfficeContainer}>
      <Text style={styles.title}>Select a label for effective delivery</Text>
      <View style={styles.rowContainer}>
        <ButtonItem
          value={true}
          iconName="shopping-bag"
          title="Office"
          borderColor={props.office ? Colors.DarkGray : Colors.BorderGray}
        />
        <ButtonItem
          value={false}
          iconName="home"
          title="Home"
          borderColor={!props.office ? Colors.DarkGray : Colors.BorderGray}
        />
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  homeOfficeContainer: {
    backgroundColor: "white",
    width: "100%",
    marginTop: "17@vs",
    paddingHorizontal: "18@s",
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: "13@vs",
  },
  officeContainer: {
    paddingHorizontal: "20@s",
    paddingVertical: "17@vs",
    backgroundColor: Colors.Gray,
    borderWidth: 1,
    borderColor: Colors.BorderGray,
    borderRadius: "12@s",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20@s",
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    marginLeft: "8@s",
    color: Colors.Secondary,
  },
  title: {
    fontFamily: CustomeFonts.RobotoSlabSemiBold,
    fontSize: "12.5@s",
    marginTop: "13@vs",
  },
});

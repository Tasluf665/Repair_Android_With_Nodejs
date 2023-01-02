import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constant/Colors";
import setting from "../../../Constant/setting";

const Card = ({ title, iconName, url, navigationName, size = scale(15) }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationName, {
          url: url,
        });
      }}
      style={styles.touchContainer}
    >
      <>
        <Text style={styles.text}>{title}</Text>
        <MaterialIcons
          name={iconName}
          size={scale(16)}
          color={Colors.Secondary}
          style={{ marginRight: size }}
        />
      </>
    </TouchableOpacity>
  );
};

const BottomPart = () => {
  const privacyUrl =
    "https://www.privacypolicies.com/live/b32f0942-1512-4a97-b45d-a2392b9b56b5";
  const helpUrl = `${setting.apiUrl}/WebView/help.html`;

  return (
    <View style={styles.container}>
      <Card
        title="Privacy Policy"
        iconName="arrow-forward-ios"
        url={privacyUrl}
        navigationName="Privacy"
      />
      <Card
        title="Help"
        iconName="arrow-forward-ios"
        url={helpUrl}
        navigationName="Help"
        size={0}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35@vs",
  },
  text: {
    marginRight: "5@s",
    fontFamily: "RobotoSlabRegular",
    color: Colors.Secondary,
  },
  touchContainer: {
    flexDirection: "row",
  },
});

export default BottomPart;

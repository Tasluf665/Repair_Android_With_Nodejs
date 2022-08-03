import { View, Text, Image } from "react-native";
import React from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ScaledSheet } from "react-native-size-matters";

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        source={require("../../assets/Images/logo.jpg")}
        style={styles.imageStyle}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = ScaledSheet.create({
  imageStyle: {
    height: "200@vs",
    width: "200@vs",
    alignSelf: "center",
  },
});

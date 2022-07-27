import { View, Text, Switch } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";

export default function DefaultToggleButton(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Make this address default</Text>
      <Switch
        trackColor={{
          false: Colors.SwitchTrackColor,
          true: Colors.FacebookColor,
        }}
        thumbColor={props.isEnable ? Colors.Primary : Colors.SwitchThumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.setIsEnable}
        value={props.isEnable}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: "20@s",
    paddingVertical: "8@vs",
    backgroundColor: "white",
    marginTop: "17@vs",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabSemiBold,
    fontSize: "12.5@s",
  },
});

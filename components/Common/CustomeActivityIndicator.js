import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../Constant/Colors";

const CustomeActivityIndicator = () => {
  return (
    <View style={styles.ActivityIndicatorStyle}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  );
};

const styles = ScaledSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default CustomeActivityIndicator;

import React from "react";
import { View, StyleSheet, Text } from "react-native";

import OrderMainScreen from "../../components/OrderScreenComponent/OrderMainScreen";

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <OrderMainScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderScreen;

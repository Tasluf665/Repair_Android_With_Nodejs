import { View, Text } from "react-native";
import React from "react";

import PaymentMainScreen from "../../components/PaymentScreenComponent/PaymentMainScreen";

export default function PaymentScreen({ route }) {
  const orderId = route.params.orderId;
  return (
    <View>
      <PaymentMainScreen orderId={orderId} />
    </View>
  );
}

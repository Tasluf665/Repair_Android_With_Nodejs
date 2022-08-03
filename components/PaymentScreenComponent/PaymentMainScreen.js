import { View, Text } from "react-native";
import React from "react";

import CardView from "./NonFunctionalComponent/CardView";

export default function PaymentMainScreen(props) {
  return (
    <View>
      <CardView orderId={props.orderId} />
    </View>
  );
}

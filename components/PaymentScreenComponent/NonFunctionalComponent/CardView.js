import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import CustomeSelectItem from "./CustomeSelectItem";

export default function CardView(props) {
  const navigation = useNavigation();
  return (
    <View>
      <CustomeSelectItem
        details="Bkash"
        onPress={() =>
          navigation.navigate("PaymentWebView", {
            orderId: props.orderId,
          })
        }
      />
      <CustomeSelectItem
        details="Cash On Delivary"
        onPress={() => navigation.navigate("OrderStackScreen")}
      />
    </View>
  );
}

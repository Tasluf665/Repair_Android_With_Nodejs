import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import CustomeSelectItem from "./CustomeSelectItem";

export default function CardView(props) {
  const navigation = useNavigation();
  return (
    <View>
      <CustomeSelectItem
        details="Payment"
        onPress={() =>
          navigation.navigate("SSLCOMMERZ_Web_View", {
            orderId: props.orderId,
          })
        }
      />
    </View>
  );
}

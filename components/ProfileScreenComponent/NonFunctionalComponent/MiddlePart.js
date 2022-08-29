import React from "react";
import { useNavigation } from "@react-navigation/native";

import CardView from "./CardView";

const MiddlePart = () => {
  const navigation = useNavigation();
  return (
    <>
      <CardView
        iconName="history"
        title="History"
        onPress={() => navigation.navigate("HistoryStack")}
      />
      <CardView
        iconName="user-circle-o"
        title="Profile"
        onPress={() => navigation.navigate("MyDetailsStack")}
      />
      <CardView
        iconName="star"
        title="Save Address"
        onPress={() => navigation.navigate("DeliveryAddressStack")}
      />
    </>
  );
};

export default MiddlePart;

import React from "react";
import { View } from "react-native";

import OrderFormMainScreen from "../../components/OrderFormScreenComponent/OrderFormMainScreen";

const OrderFormScreen = (props) => {
  const { item } = props.route.params;

  return <OrderFormMainScreen item={item} />;
};

export default OrderFormScreen;

import React from "react";
import { View } from "react-native";

import OrderFormMainScreen from "../../components/OrderFormScreenComponent/OrderFormMainScreen";

const OrderFormScreen = (props) => {
  const { iconName, text } = props.route.params;

  return <OrderFormMainScreen iconName={iconName} text={text} />;
};

export default OrderFormScreen;

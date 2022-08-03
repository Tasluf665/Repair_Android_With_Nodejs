import React from "react";

import OrderTrackMainScreen from "../../components/OrderTrackScreenComponent/OrderTrackMainScreen";

const OrderTrackScreen = (props) => {
  const orderId = props.route.params.orderId;
  const history = props.route.params.history;
  return <OrderTrackMainScreen orderId={orderId} history={history} />;
};

export default OrderTrackScreen;

import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

import CardView from "./NonFunctionalComponent/CardView";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/actions/order";
import { authRefreshToken } from "../../store/actions/auth";

const OrderMainScreen = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  const orderError = useSelector((state) => state.order.orderError);

  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    if (orderError) {
      console.log(orderError);
      dispatch(authRefreshToken(refresh_token));
      dispatch(fetchOrder());
    }
    console.log(order);
  }, [orderError]);

  useEffect(() => {
    console.log("Here");
    dispatch(fetchOrder());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Gray }}>
      {orderLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          data={order.filter(
            (item) =>
              item.status[item.status.length - 1].statusState !==
              "Payment Complete"
          )}
          renderItem={({ item }) => (
            <CardView
              image={item.categoryType}
              title={item.category}
              description={item.problem}
              orderId={item._id}
            />
          )}
        />
      )}
    </View>
  );
};

export default OrderMainScreen;

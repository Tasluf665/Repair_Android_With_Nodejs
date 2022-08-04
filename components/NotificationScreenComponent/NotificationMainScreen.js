import { View, FlatList } from "react-native";
import React, { useEffect } from "react";

import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";
import NotificationCard from "./NonFunctionalComponent/NotificationCard";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotification,
  resetNotificationCount,
} from "../../store/actions/notification";
import { authRefreshToken } from "../../store/actions/auth";

export default function NotificationMainScreen() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const notificationLoading = useSelector(
    (state) => state.notification.notificationLoading
  );
  const notificationError = useSelector(
    (state) => state.notification.notificationError
  );

  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    if (notificationError) {
      console.log(notificationError);
      dispatch(authRefreshToken(refresh_token));
      dispatch(fetchNotification());
      dispatch(resetNotificationCount());
    }
  }, [notificationError]);

  useEffect(() => {
    dispatch(fetchNotification());
    dispatch(resetNotificationCount());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {notificationLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.time}
          data={notifications}
          renderItem={({ item }) => (
            <NotificationCard
              details={item.statusDetails}
              state={item.statusState}
              time={new Date(item.time).toLocaleString()}
              orderId={item.orderId}
            />
          )}
        />
      )}
    </View>
  );
}

import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { authRefreshToken } from "../../store/actions/auth";
import { fetchUser } from "../../store/actions/user";

import FullPage from "./FunctionalComponent/FullPage";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";

export default function OrderFormMainScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.user.userLoading);
  const userError = useSelector((state) => state.user.userError);
  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Order",
      headerStyle: { backgroundColor: "white" },
    });
  }, [navigation]);

  useEffect(() => {
    if (userError) {
      console.log(userError);
      dispatch(authRefreshToken(refresh_token));
      dispatch(fetchUser());
    }
  }, [userError]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {userLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <FullPage iconName={props.iconName} text={props.text} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

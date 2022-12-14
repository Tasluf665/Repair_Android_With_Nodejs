import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { authRefreshToken } from "../../store/actions/auth";
import { fetchUser } from "../../store/actions/user";

import FullPage from "./FunctionalComponent/FullPage";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";
import setting from "../../Constant/setting";

export default function OrderFormMainScreen({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.user.userLoading);
  const userError = useSelector((state) => state.user.userError);
  const token = useSelector((state) => state.auth.token);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const [brands, setBrands] = React.useState([]);

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
    const getData = async () => {
      try {
        const response = await fetch(
          `${setting.apiUrl}/api/products/brands/${item._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const result = await response.json();
        if (!result.error) {
          setBrands(result.data);
        } else {
          dispatch(authRefreshToken(refresh_token));
        }
      } catch (ex) {
        console.log(
          "🚀 ~ file: OrderFormMainScreen.js ~ line 57 ~ getData ~ ex",
          ex
        );
      }
    };

    getData();
    dispatch(fetchUser());
  }, [dispatch, token]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {userLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <FullPage item={item} brands={brands} productId={item._id} />
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

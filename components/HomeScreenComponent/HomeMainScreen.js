import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Header from "./NonFunctionalComponent/Header";
import TopDeals from "./FunctionalComponent/TopDeals";
import Services from "./FunctionalComponent/Service";
import Offers from "./FunctionalComponent/Offers";
import Colors from "../../Constant/Colors";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";
import { authRefreshToken } from "../../store/actions/auth";

import { useSelector, useDispatch } from "react-redux";

export default function HomeMainScreen() {
  const [serviceItem, setServiceItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = useSelector((state) => state.auth.token);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/products`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const result = await response.json();

        if (!result.error) {
          setServiceItem(result.data);
          setLoading(false);
        } else {
          dispatch(authRefreshToken(refresh_token));
        }
      } catch (ex) {
        console.log(
          "🚀 ~ file: HomeMainScreen.js ~ line 36 ~ getData ~ ex",
          ex
        );
      }
    };

    getData();
  }, [token]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            <TopDeals />
            <Services serviceItem={serviceItem} />
            <Offers />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackGroundGray,
  },
});

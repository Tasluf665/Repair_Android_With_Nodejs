import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Header from "./NonFunctionalComponent/Header";
import TopDeals from "./FunctionalComponent/TopDeals";
import Services from "./FunctionalComponent/Service";
import Offers from "./FunctionalComponent/Offers";
import Colors from "../../Constant/Colors";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";

import { useSelector } from "react-redux";

export default function HomeMainScreen() {
  const [serviceItem, setServiceItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    const getData = async () => {
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
      setServiceItem(result.products);
      setLoading(false);
    };

    getData();
  }, []);
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

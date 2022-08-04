import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../Constant/Colors";
import OrderTrackIndecator from "./NonFunctionalComponent/OrderTrackIndecator";
import ContactCard from "./NonFunctionalComponent/ContactCard";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";

export default function OrderTrackMainScreen(props) {
  const token = useSelector((state) => state.auth.token);

  const [allOrderDetails, setAllOrderDetails] = React.useState(null);
  const [technician, setTechnician] = React.useState(null);
  const [trackData, setTrackData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/users/orders/${props.orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();

        if (data.order.technicianId) {
          const res = await fetch(
            `${process.env.BACKEND_BASE_URL}/api/technicians/${data.order.technicianId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            }
          );

          const result = await res.json();

          if (result.success) setTechnician(result.technician);
        }

        setAllOrderDetails(data.order);
        setTrackData(data.order.status);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {loading || trackData == null ? (
        <CustomeActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.headerTitle}>My Order</Text>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.order}>Order Date: </Text>
                <Text style={styles.order}>Order ID: </Text>
              </View>
              <View>
                <Text style={styles.order}>
                  {new Date(allOrderDetails.bookingTime)
                    .toUTCString()
                    .replace(" GMT", "")}
                </Text>
                <Text style={styles.order}>{props.orderId}</Text>
              </View>
            </View>
            <OrderTrackIndecator trackData={trackData} />

            {allOrderDetails.technicianId ? (
              <View style={styles.ContactCardContainer}>
                <ContactCard technician={technician} />
              </View>
            ) : null}

            {props.history ? null : trackData.find(
                (item) => item.statusState === "Product Repaired"
              ) ? (
              <View style={styles.buttonContainer}>
                <Button
                  title={
                    allOrderDetails.amount
                      ? `Pay now (${allOrderDetails.amount})`
                      : "Pay now"
                  }
                  color={Colors.Secondary}
                  onPress={() =>
                    navigation.navigate("PaymentScreen", {
                      orderId: props.orderId,
                    })
                  }
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    padding: "20@vs",
    paddingLeft: "30@s",
    backgroundColor: "white",
    flex: 1,
  },
  headerTitle: {
    color: Colors.Secondary,
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "16@vs",
    marginBottom: "12@vs",
  },
  order: {
    color: Colors.Secondary,
    fontFamily: "RobotoSlabRegular",
    marginBottom: "5@vs",
    marginRight: "5@s",
  },
  ContactCardContainer: {
    flexDirection: "row-reverse",
  },

  buttonContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: "15@vs",
    marginTop: "15@vs",
  },
});

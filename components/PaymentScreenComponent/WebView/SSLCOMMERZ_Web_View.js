import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../../store/actions/order";

export default function SSLCOMMERZ_Web_View({ route }) {
  const orderId = route.params.orderId;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [gatewayPageUrl, setGateWayPageUrl] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/payments/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const result = await response.json();
      setGateWayPageUrl(result.GatewayPageURL);
    };
    fetchData();
  }, []);

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes("/api/payments")) {
      if (url.includes("/api/payments/paymentSuccess")) {
        dispatch(fetchOrder());
      }
      setTimeout(() => {
        navigation.navigate("OrderStackScreen");
      }, 5000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={styles.container}
        source={{
          uri: gatewayPageUrl,
        }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "90%",
  },
});

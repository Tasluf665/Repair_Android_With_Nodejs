import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../../store/actions/order";
import setting from "../../../Constant/setting";

export default function SSLCOMMERZ_Web_View({ route }) {
  const orderId = route.params.orderId;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [gatewayPageUrl, setGateWayPageUrl] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${setting.apiUrl}/api/payments/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const result = await response.json();
        setGateWayPageUrl(result.data);
      } catch (ex) {
        console.log(
          "🚀 ~ file: SSLCOMMERZ_Web_View.js ~ line 36 ~ fetchData ~ ex",
          ex
        );
      }
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

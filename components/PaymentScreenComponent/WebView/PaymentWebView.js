import { View, Alert } from "react-native";
import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function PaymentWebView({ route }) {
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const webViewRef = useRef();

  const orderId = route.params.orderId;

  const navigation = useNavigation();

  const handleOrderData = (mainData) => {
    const obj = JSON.parse(mainData);
    console.log(JSON.stringify(obj));
    const Invoice_Number = obj.Invoice_Number.replace(
      "Invoice Number: ",
      ""
    ).trim();
    const Transaction_ID = obj.Transaction_ID.replace(
      "Transaction ID: ",
      ""
    ).trim();
    const Mobile = obj.Mobile.replace("Mobile: ", "").trim();

    const Total_Amount = obj.Total_Amount;

    const allData = {
      orderId,
      Invoice_Number,
      Transaction_ID,
      Mobile,
      Total_Amount,
      Time: new Date().getTime(),
    };

    return allData;
  };

  const handleOrder = async (event) => {
    if (event.nativeEvent.data === "Failed!") {
      navigation.navigate("OrderStackScreen");
    } else {
      const paymentInfo = handleOrderData(event.nativeEvent.data);

      fetch(
        `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}/Orders/${paymentInfo.orderId}/Payment.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentInfo }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.error) {
            throw data.error;
          } else {
            Alert.alert("Success", "We have received your payment", [
              {
                text: "Ok",
                onPress: () => {
                  navigation.navigate("OrderStackScreen");
                },
              },
            ]);
          }
        })
        .catch((error) => {
          console.log("Payment is Unsuccessfull");
          Alert.alert("Opps", "Payment is Unsuccessfull. Please Try again", [
            {
              text: "Ok",
              onPress: () => {},
            },
            {
              text: "Cancel",
              onPress: () => {
                navigation.navigate("OrderStackScreen");
              },
            },
          ]);
        });
    }
  };

  const JS =
    'setInterval(function() {\
        try{\
        let Invoice_Number = document.getElementsByClassName("invoice-text")[0].innerText;\
        let Transaction_ID = document.getElementsByClassName("trx-text")[0].innerText;\
        let Mobile = document.getElementsByClassName("customer-info")[0].getElementsByTagName("li")[2].innerText;\
        let Total_Amount = document.getElementsByClassName("horizontal-table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerText;\
        let allData = {"Invoice_Number": Invoice_Number, "Transaction_ID": Transaction_ID, "Mobile": Mobile, "Total_Amount": Total_Amount};\
        window.ReactNativeWebView.postMessage(JSON.stringify(allData));\
    }catch(e){}\
    }, 5000);';

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{
          uri: "https://shop.bkash.com/food-bank-mirkadim01739670059/paymentlink/default-payment",
        }}
        originWhitelist={["shop.bkash.com"]}
        injectJavaScript
        onMessage={async (event) => {
          await handleOrder(event);
        }}
        onLoadEnd={() => webViewRef.current.injectJavaScript(JS)}
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

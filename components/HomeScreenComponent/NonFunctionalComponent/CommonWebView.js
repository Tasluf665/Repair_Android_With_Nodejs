import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";

export default function CommonWebView({ route }) {
  const url = route.params.url;
  return (
    <View style={{ flex: 1 }}>
      <WebView style={styles.container} source={{ uri: url }} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "90%",
  },
});

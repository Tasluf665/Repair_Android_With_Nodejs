import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Header from "./NonFunctionalComponent/Header";
import TopDeals from "./FunctionalComponent/TopDeals";
import Services from "./FunctionalComponent/Service";
import Offers from "./FunctionalComponent/Offers";
import Colors from "../../Constant/Colors";

export default function HomeMainScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopDeals />
        <Services />
        <Offers />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackGroundGray,
  },
});

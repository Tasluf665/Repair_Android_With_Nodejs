import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import TopDealsCard from "../NonFunctionalComponent/TopDealsCard";
import HomeText from "../NonFunctionalComponent/HomeText";
import TopDealsItem from "../../../Constant/TopDealsItem";

const TopDeals = () => {
  return (
    <View style={styles.constainer}>
      <HomeText>Top Deals</HomeText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {TopDealsItem.map((item) => (
            <TopDealsCard imageName={item.name} key={item.key} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    marginTop: "3.7%",
  },
  cardContainer: {
    flexDirection: "row",
    marginLeft: 20,
  },
});

export default TopDeals;

import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import ServiceCard from "../NonFunctionalComponent/ServiceCard";
import HomeText from "../NonFunctionalComponent/HomeText";

import Colors from "../../../Constant/Colors";

function Services({ serviceItem }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    let backgroundColor;
    let color;
    if (selectedId == null) {
      if (index === 0) {
        backgroundColor = Colors.Primary;
        color = Colors.Primary_Helper;
      } else {
        backgroundColor = Colors.Primary_Helper;
        color = Colors.Secondary;
      }
    } else {
      backgroundColor =
        item._id === selectedId ? Colors.Primary : Colors.Primary_Helper;
      color =
        item._id === selectedId ? Colors.Primary_Helper : Colors.Secondary;
    }

    return (
      <ServiceCard
        iconColor={color}
        onPress={() => setSelectedId(item._id)}
        backgroundColor={backgroundColor}
        item={item}
        iconName={item.iconName}
      />
    );
  };

  return (
    <View>
      <HomeText>Categories</HomeText>
      <View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={serviceItem}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  flatList: {
    paddingVertical: "15@vs",
    paddingLeft: 15,
  },
});

export default Services;

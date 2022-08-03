import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import ServiceCard from "../NonFunctionalComponent/ServiceCard";
import ServiceItems from "../../../Constant/ServiceItems";
import HomeText from "../NonFunctionalComponent/HomeText";

import Colors from "../../../Constant/Colors";

function Services(props) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    let backgroundColor;
    let color;
    if (selectedId == null) {
      if (item.id == 1) {
        backgroundColor = Colors.Primary;
        color = Colors.Primary_Helper;
      } else {
        backgroundColor = Colors.Primary_Helper;
        color = Colors.Secondary;
      }
    } else {
      backgroundColor =
        item.id === selectedId ? Colors.Primary : Colors.Primary_Helper;
      color = item.id === selectedId ? Colors.Primary_Helper : Colors.Secondary;
    }

    return (
      <ServiceCard
        iconColor={color}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        icon={item.icon}
        text={item.text}
        iconName={item.iconName}
      />
    );
  };

  return (
    <View>
      <HomeText>Categories</HomeText>
      <View>
        <FlatList
          data={ServiceItems}
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

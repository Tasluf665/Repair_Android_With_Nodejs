import React from "react";
import { ScrollView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import OffersCard from "../NonFunctionalComponent/OffersCard";
import OfferItems from "../../../Constant/OfferItems";
import HomeText from "../NonFunctionalComponent/HomeText";

const Offers = (props) => {
  return (
    <View>
      <HomeText>Offers</HomeText>
      <View style={styles.flatListContainer}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {OfferItems.map((item) => (
              <OffersCard
                onPress={() => console.log("dvdfds")}
                imageName={item.imageName}
                titleText={item.titleText}
                mainText={item.mainText}
                uptoText={item.uptoText}
                key={item.key}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  flatListContainer: {
    paddingVertical: "10@vs",
  },
});

export default Offers;

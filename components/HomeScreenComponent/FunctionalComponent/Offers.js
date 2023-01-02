import React from "react";
import { ScrollView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import OffersCard from "../NonFunctionalComponent/OffersCard";
import OfferItems from "../../../Constant/OfferItems";
import HomeText from "../NonFunctionalComponent/HomeText";
import setting from "../../../Constant/setting";

import { useNavigation } from "@react-navigation/native";

const Offers = (props) => {
  const navigation = useNavigation();
  const url = `${setting.apiUrl}/WebView/promo.html`;
  return (
    <View>
      <HomeText>Offers</HomeText>
      <View style={styles.flatListContainer}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {OfferItems.map((item) => (
              <OffersCard
                onPress={() =>
                  navigation.navigate("Offer", {
                    url: url,
                  })
                }
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

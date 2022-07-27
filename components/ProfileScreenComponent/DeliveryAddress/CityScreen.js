import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import CommonAddressScreen from "./NonFunctionalComponent/CommonAddressScreen";
import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";

export default function CityScreen(props) {
  const region = props.route.params.region;
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.name} key={item.displayName}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AreaScreen", {
            region: region,
            city: item,
          });
        }}
        activeOpacity={0.5}
      >
        <Text>{item.displayName}</Text>
      </TouchableOpacity>
    </View>
  );
  const getdata = async () => {
    const req = await fetch(
      `https://member.daraz.com.bd/locationtree/api/getSubAddressList?addressId=${region.id}`
    );
    const res = await req.json();
    setData(res.module);
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    getdata();
  }, []);
  return (
    <>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <CommonAddressScreen
          navigation={props.navigation}
          name="City"
          getData={data}
          renderItem={renderItem}
        />
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  name: {
    padding: "13@s",
    backgroundColor: "white",
    paddingLeft: "22@s",
    marginBottom: 1.5,
  },
});

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { useSelector } from "react-redux";

import CommonAddressScreen from "./NonFunctionalComponent/CommonAddressScreen";
import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";

export default function RegionScreen(props) {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);

  const renderItem = ({ item }) => (
    <View style={styles.name} key={item.displayName}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CityScreen", {
            region: item,
          });
        }}
        activeOpacity={0.5}
      >
        <Text>{item.displayName}</Text>
      </TouchableOpacity>
    </View>
  );

  React.useEffect(() => {
    setLoading(true);
    const getdata = async () => {
      try {
        const req = await fetch(`${process.env.BACKEND_BASE_URL}/api/address`, {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });
        const res = await req.json();
        setData(res);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    };
    getdata();
  }, []);
  return (
    <>
      {loading ? (
        <CustomeActivityIndicator />
      ) : (
        <CommonAddressScreen
          navigation={props.navigation}
          name="Region"
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

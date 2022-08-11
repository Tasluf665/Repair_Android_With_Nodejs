import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { useSelector, useDispatch } from "react-redux";
import { authRefreshToken } from "../../../store/actions/auth";

import CommonAddressScreen from "./NonFunctionalComponent/CommonAddressScreen";
import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";

export default function RegionScreen(props) {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const dispatch = useDispatch();

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
        const result = await req.json();

        if (!result.error) {
          setData(result.data);
          setLoading(false);
        } else {
          dispatch(authRefreshToken(refresh_token));
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    getdata();
  }, [token]);
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

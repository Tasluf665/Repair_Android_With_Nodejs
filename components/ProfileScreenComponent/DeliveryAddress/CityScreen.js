import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import { useSelector, useDispatch } from "react-redux";
import { authRefreshToken } from "../../../store/actions/auth";
import setting from "../../../Constant/setting";

import CommonAddressScreen from "./NonFunctionalComponent/CommonAddressScreen";
import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";

export default function CityScreen(props) {
  const region = props.route.params.region;
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const token = useSelector((state) => state.auth.token);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    setLoading(true);
    const getdata = async () => {
      try {
        const req = await fetch(
          `${setting.apiUrl}/api/address?id=${region.id}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          }
        );
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

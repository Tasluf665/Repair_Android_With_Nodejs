import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import React, { useEffect } from "react";

import CustomeTopBar from "./NonFunctionalComponent/CustomeTopBar";
import TopAddAddressButton from "./NonFunctionalComponent/TopAddAddressButton";
import Colors from "../../../Constant/Colors";

import { fetchUser } from "../../../store/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { authRefreshToken } from "../../../store/actions/auth";

import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";
import AddressCutomeItem from "../../Common/AddressCutomeItem";

export default function DeliveryAddressMainScreen(props) {
  let address = useSelector((state) => state.user.address);
  let defaultAddress = useSelector((state) => state.user.defaultAddress);

  const dispatch = useDispatch();

  let userLoading = useSelector((state) => state.user.userLoading);
  let userError = useSelector((state) => state.user.userError);
  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    if (userError) {
      dispatch(authRefreshToken(refresh_token));
      dispatch(fetchUser());
    }
  }, [userError]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <AddressCutomeItem
      item={item}
      navigation={props.navigation}
      defaultAddress={defaultAddress}
    />
  );

  return (
    <View style={styles.container}>
      {userLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <>
          <StatusBar backgroundColor={Colors.White} />
          <CustomeTopBar navigation={props.navigation} title="Address" />
          <View style={styles.buttonContainer}>
            <TopAddAddressButton
              onPress={() => props.navigation.navigate("AddNewAddressScreen")}
            />
            <FlatList
              keyExtractor={(item) => item._id}
              data={address}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
  },
});

import { Button, ScrollView, View } from "react-native";
import React, { useEffect } from "react";

import TopPart from "./NonFunctionalComponent/TopPart";
import MiddlePart from "./NonFunctionalComponent/MiddlePart";
import PhoneCard from "./NonFunctionalComponent/PhoneCard";
import BottomPart from "./NonFunctionalComponent/BottomPart";
import Colors from "../../Constant/Colors";
import CustomeActivityIndicator from "../Common/CustomeActivityIndicator";

import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "../../Constant/firebaseConfig";
import { logout, authRefreshToken } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUserDetails } from "../../store/actions/user";
import { ScaledSheet } from "react-native-size-matters";

export default function ProfileMainScreen() {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const userLoading = useSelector((state) => state.user.userLoading);
  const userError = useSelector((state) => state.user.userError);
  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    if (userError) {
      console.log(userError);
      dispatch(authRefreshToken(refresh_token));
      dispatch(fetchUser());
    }
  }, [userError]);

  useEffect(() => {
    dispatch(fetchUser());

    if (user) {
      if (user.providerData[0].phoneNumber) {
        dispatch(
          updateUserDetails({
            name: "mobile",
            value: user.providerData[0].phoneNumber,
          })
        );
      }
      if (user.providerData[0].email) {
        dispatch(
          updateUserDetails({
            name: "email",
            value: user.providerData[0].email,
          })
        );
      }
    }
  }, [dispatch]);

  const handelLogout = async () => {
    try {
      await signOut(auth)
        .then()
        .catch((error) => {
          console.log(error.message);
        });
      await dispatch(logout());
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {userLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <ScrollView style={{ backgroundColor: Colors.Primary_Helper, flex: 1 }}>
          <TopPart name={name} />
          <MiddlePart />
          <PhoneCard />
          <BottomPart />
          <View style={styles.container}>
            <Button
              title="Logout"
              onPress={handelLogout}
              color={Colors.Primary}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "40%",
    alignSelf: "center",
    marginTop: "35@vs",
  },
});

import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";
import CustomeFonts from "../../../Constant/CustomeFonts";

import CustomeInput from "./NonFunctionalComponent/CustomeInput";
import CustomeTopBar from "./NonFunctionalComponent/CustomeTopBar";
import ButtomSaveButton from "./NonFunctionalComponent/ButtomSaveButton";
import HomeOfficeButton from "./NonFunctionalComponent/HomeOfficeButton";
import DefaultToggleButton from "./NonFunctionalComponent/DefaultToggleButton";

import {
  updateUserAddress,
  deleteUserAddress,
} from "../../../store/actions/user";
import { useDispatch } from "react-redux";

export default function AddNewAddressScreen(props) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [region, setRegion] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState();
  const [key, setKey] = useState();
  const [isEnable, setIsEnable] = useState(false);

  const [showError, setShowError] = useState(false);

  const [officePress, setOfficePress] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params) {
      setRegion(props.route.params.regionName);
      setCity(props.route.params.cityName);
      setArea(props.route.params.areaName);
    }
    if (props.route.params) {
      if (props.route.params.EditItem) {
        const item = props.route.params.EditItem;
        setName(item.name);
        setPhone(item.phone);
        setRegion(item.region);
        setCity(item.city);
        setArea(item.area);
        setAddress(item.address);
        setKey(item.key);
      }
    }
  }, [props.route.params]);

  const customeItem = () => {
    return (
      <View style={styles.inputContainer}>
        <CustomeInput
          defaultValue={name ? name : null}
          setText={setName}
          placeholder="Full Name"
          showError={showError}
        />
        <CustomeInput
          defaultValue={phone ? phone : null}
          setText={setPhone}
          placeholder="Phone"
          showError={showError}
        />
        <CustomeInput
          defaultValue={region ? region : null}
          placeholder="Region"
          setText={setRegion}
          cutomeInput={true}
          onPress={() => props.navigation.navigate("RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={city ? city : null}
          placeholder="City"
          setText={setCity}
          cutomeInput={true}
          onPress={() => props.navigation.navigate("RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={area ? area : null}
          placeholder="Area"
          setText={setArea}
          cutomeInput={true}
          onPress={() => props.navigation.navigate("RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={address ? address : null}
          setText={setAddress}
          placeholder="Address"
          showError={showError}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor={Colors.Primary_Helper} />
        <CustomeTopBar navigation={props.navigation} title="Add New Address" />
        {customeItem()}
        <HomeOfficeButton
          officePress={officePress}
          setOfficePress={setOfficePress}
        />
        <DefaultToggleButton
          isEnable={isEnable}
          setIsEnable={() => setIsEnable((state) => !state)}
        />
      </ScrollView>
      {key ? (
        <>
          <View style={styles.line}></View>
          <View style={styles.deleteContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                dispatch(deleteUserAddress(key));
                props.navigation.navigate("DeliveryAddressMainScreen");
              }}
            >
              <Text style={styles.deleteText}>Delete this address</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      <View style={styles.buttonContainer}>
        <ButtomSaveButton
          onPress={() => {
            if (name && phone && region && city && area && address) {
              const AddressObj = {
                name,
                phone,
                region,
                city,
                area,
                address,
                key,
                isEnable,
                officePress: officePress ? "Office" : "Home",
              };
              dispatch(updateUserAddress(AddressObj));
              props.navigation.navigate("DeliveryAddressMainScreen");
            } else {
              setShowError(true);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray,
  },
  inputContainer: {
    backgroundColor: "white",
    marginTop: "16@vs",
    paddingHorizontal: "17@s",
    paddingVertical: "8@vs",
  },
  deleteContainer: {
    paddingVertical: "15@vs",
    backgroundColor: "white",
    alignItems: "center",
  },
  deleteText: {
    color: Colors.Primary,
    fontFamily: CustomeFonts.RobotoSlabSemiBold,
    fontSize: "12.5@s",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.LineColor,
  },
});

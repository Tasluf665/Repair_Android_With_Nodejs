import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { ScaledSheet } from "react-native-size-matters";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constant/Colors";
import CustomeFonts from "../../../Constant/CustomeFonts";
import InputField from "../NonFunctionalComponent/InputField";
import TopPart from "../NonFunctionalComponent/TopPart";
import DateTimeField from "../NonFunctionalComponent/DateTimeField";
import PickerField from "../NonFunctionalComponent/PickerField";
import CustomeActivityIndicator from "../../Common/CustomeActivityIndicator";

import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../../store/actions/order";
import { authRefreshToken } from "../../../store/actions/auth";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("* Required"),
  arrivalDate: Yup.string().required("* Required"),
  arrivalTime: Yup.string().required("* Required"),
  address: Yup.string().required("* Required"),
  product: Yup.string().required("* Required"),
  type: Yup.string().required("* Required"),
  problem: Yup.string().required("* Required"),
  note: Yup.string().required("* Required"),
  phone: Yup.string().required("* Required"),
});

const FullPage = (props) => {
  const address = useSelector((state) => state.user.address);
  const defaultAddress = useSelector((state) => state.user.defaultAddress);
  const defAddress = address.find((item) => item._id === defaultAddress);

  const orderLoading = useSelector((state) => state.order.orderLoading);
  const orderError = useSelector((state) => state.order.orderError);
  const refresh_token = useSelector((state) => state.auth.refresh_token);

  useEffect(() => {
    if (orderError) {
      console.log(orderError);
      dispatch(authRefreshToken(refresh_token));
    }
  }, [orderError]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initValue = {
    name: defAddress ? defAddress.name : "",
    address: defAddress
      ? `${defAddress.address}, ${defAddress.area}, ${defAddress.city}, ${defAddress.region}`
      : "",
    product: "",
    type: "",
    problem: "",
    note: "",
    phone: defAddress ? defAddress.phone : "",
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
      {orderLoading ? (
        <CustomeActivityIndicator />
      ) : (
        <View style={styles.container}>
          <TopPart iconName={props.iconName} />
          <Formik
            initialValues={initValue}
            validationSchema={FormSchema}
            onSubmit={(values, actions) => {
              values.category = "Repairing";
              values.categoryType = props.iconName;
              values.statusDetails = "Your order is pending";
              values.statusState = "Pending";

              dispatch(addOrder(values));
              actions.resetForm({ values: initValue });
              navigation.replace("HomeStackScreen");
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputField
                  name="Name"
                  onChangeText={handleChange("name")}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}

                <DateTimeField
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
                <InputField
                  name="Address"
                  onChangeText={handleChange("address")}
                  value={values.address}
                />
                {errors.address && touched.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : null}

                <PickerField
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

                <InputField
                  name="Problem Detatils"
                  styles={{
                    height: verticalScale(100),
                    textAlignVertical: "top",
                  }}
                  multiline={true}
                  onChangeText={handleChange("problem")}
                />
                {errors.problem && touched.problem ? (
                  <Text style={styles.errorText}>{errors.problem}</Text>
                ) : null}
                <View style={styles.rowContainer}>
                  <View style={styles.date}>
                    <InputField
                      name="Spacial Note"
                      onChangeText={handleChange("note")}
                    />
                    {errors.note && touched.note ? (
                      <Text style={styles.errorText}>{errors.note}</Text>
                    ) : null}
                  </View>
                  <View style={styles.date}>
                    <InputField
                      name="Contact Number"
                      onChangeText={handleChange("phone")}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    title="Book Now"
                    color={Colors.Primary}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginVertical: "10@s",
    marginHorizontal: "20@s",
  },
  title: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "18@vs",
    color: Colors.Primary,
    marginVertical: "10@s",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    width: "45%",
  },
  text: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Secondary,
    marginBottom: "10@vs",
  },
  buttonContainer: {
    width: "40%",
    alignSelf: "center",
    marginTop: "30@vs",
    marginBottom: "10@vs",
  },
  errorText: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    color: Colors.Red,
    marginTop: 2,
    marginLeft: 5,
  },
});

export default FullPage;

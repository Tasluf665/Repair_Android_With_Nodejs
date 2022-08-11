import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import LottieView from "lottie-react-native";

import SocialButton from "./NonFunctionalComponent/SocialButton";
import TitleText from "./NonFunctionalComponent/TitleText";
import PasswordTextInput from "./NonFunctionalComponent/PasswordTextInput";
import CustomeFonts from "../../Constant/CustomeFonts";
import Colors from "../../Constant/Colors";

import { useDispatch } from "react-redux";
import { authenticate } from "../../store/actions/auth";

import * as AuthHelper from "./FunctionalComponent/AuthHelper";

export default function SignInWithEmail(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();

  const emailInput = React.useRef(null);

  React.useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, [emailInput]);

  const handleGoogleLoginBtn = async () => {
    try {
      const authResult = await AuthHelper.GoogleSignIn(
        process.env.ANDROID_CLIENT_ID
      );
      if (authResult.error) {
        Alert.alert(authResult.error);
      } else {
        dispatch(
          authenticate(
            authResult.data._id,
            authResult.data.token,
            authResult.data.refreshToken
          )
        );
      }
    } catch (err) {
      console.log(`In SignInWithPhone at : Google`, err.message);
    }
  };

  const handleEmailSubmittion = async () => {
    const authResult = await AuthHelper.EmailSignIn(email, password);

    if (authResult.error) {
      Alert.alert(authResult.error);
    } else {
      dispatch(
        authenticate(
          authResult.data._id,
          authResult.data.token,
          authResult.data.refreshToken
        )
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <LottieView
            source={require("../../assets/StartupImages/maintance.json")}
            style={styles.image}
            autoPlay
            loop
          />
        </View>

        <View style={styles.otherItemContainer}>
          <TitleText>Get your Maintenance</TitleText>
          <TitleText>with Aloron</TitleText>

          <Text
            style={[styles.text, { fontFamily: CustomeFonts.RobotoSlabBold }]}
          >
            Email
          </Text>
          <TextInput
            ref={emailInput}
            style={styles.textInput}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <PasswordTextInput title="Password" setPassword={setPassword} />

          <View style={styles.forgotContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                props.navigation.navigate("SignUpWithEmail");
              }}
            >
              <Text style={styles.text}>New User ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={async () => {
                if (!email) {
                  Alert.alert("Enter email address to Reset Password");
                } else {
                  const result = await AuthHelper.ForgotPassword(email);
                  Alert.alert(result.success ? result.success : result.error);
                }
              }}
            >
              <Text style={styles.text}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableNativeFeedback onPress={handleEmailSubmittion}>
              <View style={styles.button}>
                <Text style={[styles.titelText]}>Log in</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <SocialButton
            social="google"
            onPress={() => handleGoogleLoginBtn()}
            color={Colors.GoogleColor}
            text="Continue with Google"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary_Helper,
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20@vs",
  },
  image: {
    width: "300@s",
    height: "200@s",
  },
  otherItemContainer: {
    marginHorizontal: "18@s",
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "13@s",
    marginBottom: "8@vs",
    color: Colors.DarkGray,
    marginTop: "5@vs",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderGray,
    marginBottom: "20@vs",
    fontFamily: CustomeFonts.RobotoSlabRegular,
    fontSize: "14@s",
    paddingVertical: 5,
  },
  forgotContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "70%",
    height: "52@vs",
    overflow: "hidden",
    borderRadius: "16@s",
    marginTop: "25@vs",
    alignSelf: "center",
    marginBottom: "10@vs",
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: "16@s",
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  titelText: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    fontSize: "16@s",
    color: "white",
  },
});

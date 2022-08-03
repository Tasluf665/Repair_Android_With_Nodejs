import React from "react";
import { View, StatusBar, Button, Alert } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { firebaseApp } from "../../../Constant/firebaseConfig";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import PasswordTextInput from "../../AuthScreenComponent/NonFunctionalComponent/PasswordTextInput";
import Colors from "../../../Constant/Colors";

export default function SetPassword(props) {
  const auth = getAuth(firebaseApp);

  const [passwordNotSet, setPasswordNotSet] = React.useState(true);
  const [oldPassword, setOldPassword] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPass, setConfirmPass] = React.useState();

  React.useEffect(() => {
    const user = auth.currentUser;
    const passwordProviderId = user.providerData.find(
      (item) => item.providerId === "password"
    );

    if (passwordProviderId) {
      setPasswordNotSet(false);
    }
  }, []);

  const handleUpdatePassword = async () => {
    const user = auth.currentUser;
    if (password === confirmPass) {
      try {
        await updatePassword(user, password);
        props.navigation.pop();
      } catch (err) {
        if (err.code === "auth/requires-recent-login") {
          Alert.alert("You have to log in into your account again");
        } else {
          console.log(err.message);
        }
      }
    } else {
      Alert.alert("Password does not match");
    }
  };

  const handleReauthentication = async () => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        await handleUpdatePassword();
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          Alert.alert("You enter wrong password");
        } else {
          console.log(err.message);
        }
      });
  };

  const handleSubmittion = async () => {
    if (passwordNotSet) {
      await handleUpdatePassword();
    } else {
      await handleReauthentication();
    }
  };
  return (
    <View style={styles.container}>
      {!passwordNotSet ? (
        <PasswordTextInput
          title="Enter Old Password"
          setPassword={setOldPassword}
        />
      ) : null}

      <PasswordTextInput title="Enter New Password" setPassword={setPassword} />
      <PasswordTextInput
        title="Confirm Password"
        setPassword={setConfirmPass}
      />
      <View style={styles.buttonContianer}>
        <Button
          title="Confirm"
          onPress={handleSubmittion}
          color={Colors.Primary}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 40,
    paddingHorizontal: "17@s",
    backgroundColor: Colors.Primary_Helper,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContianer: {
    width: "50%",
    alignSelf: "center",
    marginTop: "30@vs",
  },
});

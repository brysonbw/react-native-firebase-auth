import { Platform, StyleSheet, Text, View, TouchableOpacity  } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { toastErrorMessage, toastMessage } from "../../utils/toastMessage";

const VerifyEmailScreen = ({ navigation }: any) => {
  const sendVerifyEmail = async () => {
    await sendEmailVerification(auth.currentUser!)
      .then(() => {
        toastMessage("Email Verification sent.");
      })
      .catch((error: any) => {
        toastErrorMessage(error);
      });
  };

  return (
    <View style={styles.screen}>
      {/** Header View */}
      <View style={styles.headerView}>
        {/** Icon Background View */}
        <View style={styles.iconBackgroundView}>
          {/** Email Icon */}
          <MaterialIcons name="mark-email-read" size={24} color="white" />
        </View>
        {/** Header Text */}
        <Text style={styles.headerText}>
          Email verification sent successfully!
        </Text>
        <Text style={styles.emailSubText}>
          Check your inbox or junk/spam folder to verify your email.
        </Text>
      </View>

      <TouchableOpacity
        style={{ top: 5, ...styles.buttonView }}
        onPress={sendVerifyEmail}
      >
        <Text style={styles.buttonText}>Re-Send Email Verification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.secondaryBlack,
  },
  iconBackgroundView: {
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    backgroundColor: colors.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
  },

  headerView: {
    marginTop: Platform.OS === "ios" ? 100 : 50,
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    marginTop: 15,
    fontWeight: "500",
  },
  emailSubText: {
    color: colors.white,
    top: 15,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    width: 300,
  },
  buttonView: {
    backgroundColor: colors.primaryBlue,
    elevation: -5,
    borderRadius: 10,
    marginTop: 32,
    width: "75%",
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "400",
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import React from "react";
import SignUpForm from "../../components/forms/SignupForm";
import { SignupScreenRouteProp } from "../../types/navigator";
import { colors } from "../../constants/theme";


const SignUpScreen = ({ navigation }: SignupScreenRouteProp) => {

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        {/** Header View */}
        <View style={styles.headerView}>
          {/** Header Text */}
          {/** Image */}
          <Image
            style={styles.logo}
            source={require("../../assets/images/rn-expo-fb-plain.png")}
          />
          <Text style={styles.headerText}>Sign up to get started</Text>
        </View>

        {/** Sign Up  */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          {/** Sign Up Form Component */}
          <SignUpForm />
          
        </TouchableWithoutFeedback>

        {/** Or go to login Screen / 'Already have account' */}
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <Text style={{ color: colors.grey }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.secondaryBlue }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.secondaryBlack,
  },
  headerView: {
    marginTop: Platform.OS === "ios" ? 100 : 50,
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: colors.secondaryBlue,
    top: 15,
    marginTop: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  logo: {
    width: 50, 
    height: 50, 
    borderRadius: 400 / 2,
    top: Platform.OS === "ios" ? 7 : 4,
  },
});

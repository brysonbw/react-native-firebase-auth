import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import { colors } from "../../constants/theme";
import { LoginScreenRouteProp } from "../../types/navigator";

const LoginScreen = ({ navigation }: LoginScreenRouteProp) => {
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
          <Text style={styles.headerText}>React Native/Expo Firebase Auth</Text>
          <Text style={styles.subText}>Login into your account</Text>
        </View>
        {/** Login */}

        {/** Login Form Component */}
        <LoginForm />

        {/** Forgot password */}
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={{ color: colors.secondaryBlue, marginTop: 35 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/** Or go to Signup Screen / 'Don't have an account?' */}
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <Text style={{ color: colors.grey }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: colors.secondaryBlue }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.secondaryBlack
  },
  logo: {
    width: 50, 
    height: 50, 
    borderRadius: 400 / 2,
  },
  headerView: {
    marginTop: Platform.OS === "ios" ? 100 : 60,
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: colors.white,
    fontSize: 15,
    marginTop: 15,
    fontWeight: "500",
  },
  subText: {
    color: colors.white,
    top: 15,
    fontSize: 15,
    fontWeight: "500",
  },
});

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackNavigatorParamList } from "../types/navigator";
import ResetPasswordScreen from "../screens/resetpassword/ResetPasswordScreen";
import { Platform } from "react-native";
import { colors } from "../constants/theme";
import VerifyEmailScreen from "../screens/verifyemail/VerifyEmailScreen";
import LoginScreen from "../screens/login/LoginScreen";
import SignupScreen from "../screens/signup/SignupScreen";
import { useAuth } from "../context/AuthContext";

const AuthNavigator = () => {
  const { currentUser } = useAuth();
  const AuthStack = createStackNavigator<AuthStackNavigatorParamList>();

/**
 * Auth Navigator Stack has two groups
 *  one for if user email is not verified and one if no user is present in context
 * Docs: https://reactnavigation.org/docs/group/
 */


  return (
    <AuthStack.Navigator initialRouteName={currentUser?.user?.emailVerified === false ? 'VerifyEmail' : "Login"}>
      {currentUser?.user?.emailVerified === false ? (
        <AuthStack.Group>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name={"VerifyEmail"}
            component={VerifyEmailScreen}
          />
           <AuthStack.Screen
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.secondaryBlack,
                height: Platform.OS === "ios" ? 115 : 100,
              },
              headerTintColor: colors.black,
              
            }}
            name={"ResetPassword"}
            component={ResetPasswordScreen}
          />
           <AuthStack.Screen
            options={{ headerShown: false }}
            name={"Login"}
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name={"Signup"}
            component={SignupScreen}
          />
        </AuthStack.Group>
      ) : (
        <AuthStack.Group>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name={"Login"}
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name={"Signup"}
            component={SignupScreen}
          />
          <AuthStack.Screen
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.secondaryBlack,
                height: Platform.OS === "ios" ? 115 : 100,
              },
              headerTintColor: colors.white,
              
            }}
            name={"ResetPassword"}
            component={ResetPasswordScreen}
          />
        </AuthStack.Group>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
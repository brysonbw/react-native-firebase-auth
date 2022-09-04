import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import BottomTabNavigator from "./BottomTabNavigator";

// App Navigator
const AppNavContainer = () => {
  const { currentUser, loading } = useAuth();

  /**
   * get context and check if currentUser
   *
   * FLOW
   * currentUser?.user = true && currentUser.user?.emailVerified !== false THEN show app
   * currentUser?.user = false || currentUser.user?.emailVerified == false show auth screens
   * 
   *
   * In-between loading condition above show loading spinner
   *
   */

   const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.secondaryBlack,
    },
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }


  return (
    <>
    <NavigationContainer
      theme={navTheme}
      >
         {currentUser?.user && currentUser.user?.emailVerified !== false ? <BottomTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.secondaryBlack,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default AppNavContainer;
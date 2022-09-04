import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigatorParamList } from "../types/navigator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { Platform } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import CurrentUserProfileScreen from "../screens/currentuserprofile/CurrentUserProfileScreen";


/**
 * Bottom Tab Indicators
 * > Home
 * > profile
 */

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
  return (
    <Tab.Navigator
   
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
          elevation: 0,
          backgroundColor: colors.secondaryBlack,
          borderTopWidth: 0,
        },
        tabBarIconStyle: {
          top: Platform.OS === "ios" ? 1 : 5,
        },
      })}
    >
      {/** Home Tab */}
      <Tab.Screen
        options={{
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            top: -15
          },
          headerStyle: {
            backgroundColor: colors.secondaryBlack,
            height: Platform.OS === 'ios' ? 130:100
          },
          tabBarLabelStyle: {
           top:-8
          },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? colors.white : "grey"}
              size={24}
            />
          ),
        }}
        name={"Home"}
        component={HomeScreen}
      />

      
      {/** Current User Profile Tab */}
      <Tab.Screen
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            top: -15
          },
          headerStyle: {
            backgroundColor: colors.secondaryBlack,
            height: Platform.OS === 'ios' ? 130:100
          },
          tabBarLabelStyle: {
           top:-8
          },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle"
              color={focused ? colors.white : "grey"}
              size={28}
            />
          ),
        }}
        name={"Profile"}
        component={CurrentUserProfileScreen}
      />

    
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

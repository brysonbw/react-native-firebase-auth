import React from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";


export const LoadingSpinner = () => (
  <View style={[styles.container, styles.horizontal]}>
   
    <ActivityIndicator style={{bottom: Platform.OS === 'ios' ? -4.2: 2}} size={'large'} color={colors.white}/>
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

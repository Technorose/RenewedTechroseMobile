import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../src/screens/Home";
import { StyleSheet, Text, View } from "react-native";
import { HomeIcon, PhotoIcon } from "react-native-heroicons/solid";
import ProfileScreen from "../src/screens/Profile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
     screenOptions={{
    tabBarShowLabel: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 70,
      borderTopWidth: 0,
      elevation: 5,
      backgroundColor: "white",
      borderRadius: 15,
      ...styles.shadow,
    },
  }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false, // Fix the assignment here
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false, // Fix the assignment here
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <PhotoIcon />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
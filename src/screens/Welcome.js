import { View, Text, TouchableOpacity, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../core/colors";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
      <View style={{ flex: 1 }}>
        <View className="items-center mt-16">
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{
              height: hp(30),
            }}
          />
        </View>
        <View className="px-2 mt-16">
          <Text style={{ fontSize: hp(4.5), fontWeight: "bold", color: COLORS.white }}>
            Let's Get
          </Text>
          <Text style={{ fontSize: hp(4.5), fontWeight: "bold", color: COLORS.white }}>
            Started
          </Text>
          <View className="my-4">
            <Text
              style={{
                fontSize: hp(2),
                color: COLORS.white,
                marginBottom: height * 0.01,
                fontWeight: "400",
              }}
            >
              Welcome to Techrose Diabetes Application!
            </Text>
            <Text style={{ fontSize: hp(2), color: COLORS.white, fontWeight: "400" }}>
              Let's get started and step into living a healthy life together!
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: themeColors.bg,
              borderRadius: 8,
              alignItems: "center",
              padding: width * 0.03,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: width * 0.05, fontWeight: "bold", color: COLORS.primary }}>
              Sign In
            </Text>
          </Pressable>
          <View className="flex-row justify-center gap-x-2 mt-7">
            <Text style={{ fontSize: hp(1.8) }} className="text-white font-semibold">
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontSize: hp(1.8) }} className="text-yellow-500 font-semibold">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../core/colors";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";

const { width, height } = Dimensions.get("window");

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginTop: height * 0.1 }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{
              height: width * 0.5,
              width: width * 0.5,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: width * 0.05, marginTop: height * 0.1 }}>
          <Text style={{ fontSize: width * 0.1, fontWeight: "bold", color: COLORS.white }}>
            Let's Get
          </Text>
          <Text style={{ fontSize: width * 0.092, fontWeight: "bold", color: COLORS.white }}>
            Started
          </Text>
          <View style={{ marginVertical: height * 0.02 }}>
            <Text
              style={{
                fontSize: width * 0.04,
                color: COLORS.white,
                marginBottom: height * 0.01,
                fontWeight: "400",
              }}
            >
              Welcome to Techrose Diabetes Application!
            </Text>
            <Text style={{ fontSize: width * 0.04, color: COLORS.white, fontWeight: "400" }}>
              Let's get started and step into living a healthy life together!
            </Text>
          </View>
          <TouchableOpacity
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
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: height * 0.03 }}
          >
            <Text style={{ fontSize: width * 0.04, color: COLORS.white, fontWeight: "500" }}>
              Don't have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

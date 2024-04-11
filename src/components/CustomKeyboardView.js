import { Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import COLORS from "../core/colors";

export default function CustomKeyboardView({ children, backgroundColor = COLORS.white }) {
  const isIos = Platform.OS === "ios";

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : "height"} style={{ flex: 1, backgroundColor }}>
      <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

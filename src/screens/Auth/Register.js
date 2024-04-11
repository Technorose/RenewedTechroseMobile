import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import React, { useState } from "react";
import { themeColors } from "../../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import ApiService from "../../service/ApiService";
import Toast from "react-native-toast-message";
import COLORS from "../../core/colors";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function RegisterForm() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleCredentialsChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Register = () => {
    if (
      formData.first_name === "" ||
      formData.first_name === null ||
      formData.first_name === undefined
    ) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "First Name is required",
      });
      return;
    }

    if (
      formData.last_name === "" ||
      formData.last_name === null ||
      formData.last_name === undefined
    ) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Last Name is required",
      });
      return;
    }

    if (formData.email === "" || formData.email === null || formData.email === undefined) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Email is required",
      });
      return;
    }

    if (formData.password === "" || formData.password === null || formData.password === undefined) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Password is required",
      });
      return;
    }

    ApiService.register(formData)
      .then((response) => {
        if (response.result.success === true) {
          Toast.show({
            type: "success",
            text1: "Welcome to Techrose Diabetes Application!",
          });
          navigation.navigate("Login");
        } else {
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: response.result.error_description,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <CustomKeyboardView>
      <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              style={{ height: hp(12) }}
            />
          </View>
        </SafeAreaView>
        {/* Form */}
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <View>
              <Text className="text-gray-700 ml-4">First Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={formData.first_name}
                placeholder="Enter First Name"
                onChangeText={(value) => handleCredentialsChange("first_name", value)}
                inputMode="email"
              />
            </View>
            <View>
              <Text className="text-gray-700 ml-4">Last Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={formData.last_name}
                placeholder="Enter Last Name"
                onChangeText={(value) => handleCredentialsChange("last_name", value)}
              />
              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={formData.email}
                placeholder="Enter Email"
                onChangeText={(value) => handleCredentialsChange("email", value)}
              />
            </View>
            <View>
              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={formData.password}
                placeholder="Enter Password"
                onChangeText={(value) => handleCredentialsChange("password", value)}
              />
            </View>
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={Register}>
              <Text className="font-xl font-bold text-center text-gray-700">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

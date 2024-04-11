import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { securityTokenKey } from "../../core/statics";

import ApiService from "../../service/ApiService";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import COLORS from "../../core/colors";
import { useDispatch } from "react-redux";
import { addUser } from "../../../slices/userSlice";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function LoginForm() {
  const navigation = useNavigation();

  const [resultModal, setResultModal] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    security_token_key: securityTokenKey,
  });

  const handleCredentialsChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Login = () => {
    if (
      formData.user_name === "" ||
      formData.user_name === null ||
      formData.user_name === undefined
    ) {
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

    ApiService.login(formData)
      .then((response) => {
        console.log(response);
        if (response.result.success === true) {
          setResultModal(true);
          // Toast.show({
          //   type: 'success',
          //   text1: response.user.first_name + ' ' + response.user.last_name + 'Welcome to Techrose Diabetes Application!',
          // })
          AsyncStorage.setItem("user", JSON.stringify(response.user));
          AsyncStorage.setItem("token", response.token);
          dispatch(addUser(response.user));

          setTimeout(() => {
            setResultModal(false);
            navigation.navigate("Main");
          }, 1500);
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
            <Pressable
              onPress={() => navigation.goBack()}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </Pressable>
          </View>
          <View className="items-center">
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              style={{ height: hp(25) }}
            />
          </View>
        </SafeAreaView>
        
        <View
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.white}}
          className="flex-1 px-8 pt-8"
        >
          <View className="form space-y-2">
            <View>
              <Text style={{ fontSize: hp(1.8) }} className="text-gray-700 ml-4">
                Email Address
              </Text>
              <TextInput
                className="p-4 mt-2 bg-gray-100 text-gray-700 rounded-2xl"
                placeholder="Enter your email"
                name="user_name"
                value={formData.email}
                onChangeText={(value) => handleCredentialsChange("user_name", value)}
                inputMode="email"
              />
            </View>
            <View>
              <Text style={{ fontSize: hp(1.8) }} className="text-gray-700 ml-4">
                Password
              </Text>
              <TextInput
                className="p-4 mt-2 bg-gray-100 text-gray-700 rounded-2xl"
                secureTextEntry
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleCredentialsChange("password", value)}
              />
            </View>
            <Pressable className="flex items-end">
              <Text style={{ fontSize: hp(1.8) }} className="text-gray-700 mb-5">
                Forgot Password?
              </Text>
            </Pressable>
            <Pressable onPress={Login} className="py-3 bg-yellow-400 rounded-xl">
              <Text style={{ fontSize: hp(2.7) }} className="font-bold text-center text-gray-700">
                Login
              </Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: hp(1.8) }} className="text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <Pressable className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/google.png")}
                className="w-10 h-10"
              />
            </Pressable>
            <Pressable className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/apple.png")}
                className="w-10 h-10"
              />
            </Pressable>
            <Pressable className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../../../assets/auth-icons/facebook.png")}
                style={{ height: hp(5), width: wp(10) }}
              />
            </Pressable>
          </View>
          <View className="flex-row justify-center gap-x-2 mt-7">
            <Text style={{ fontSize: hp(1.8) }} className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-yellow-500">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
        <Modal animationType={"slide"} transparent={false} visible={resultModal}>
          <View style={styles.modal}>
            <Image
              source={require("../../../assets/logo.png")}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontSize: hp(2) }} className="font-bold text-center text-white">
              Welcome to Techrose Diabetes Application!
            </Text>
          </View>
        </Modal>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 100,
    justifyContent: "center",
  },
});

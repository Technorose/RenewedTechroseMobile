import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
import COLORS from "../../core/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { googleImageUrl } from "../../core/statics";
import ApiService from "../../service/ApiService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FoodInfoBox from "../../components/foods-components/FoodInfoBox";

export default function MealInfoModal({ route }) {
  const navigation = useNavigation();

  const { food } = route.params;

  useEffect(() => {
    console.log(food);
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 mt-5"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="flex-row justify-center mt-3 mb-4">
          <Image
            source={{ uri: food.image }}
            style={{ width: 360, height: 200 }}
            className="rounded-[50px]"
          />
        </View>

        <View className="flex-row justify-between mt-2">
          <Text className="text-lg font-bold text-gray-black">{food.name}</Text>
          <Text className="text-black font-bold text-lg">{food.serving_size}g</Text>
        </View>
        {/* food calories */}
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-700 text-sm font-semibold">Calories</Text>
          <Text className="text-gray-700 text-sm font-semibold">{food.calorie} Kcal</Text>
        </View>

        <View className="pt-6">
          <FoodInfoBox title="Calories" value={food.calorie} color="#5fba67" icon="bakery-dining" />
          <FoodInfoBox title="Carbonhydrate" value={food.carbo_hydrate} color="#f6c139" icon="local-pizza" />
          <FoodInfoBox title="Sugar" value={food.sugar} color="#a59cde" icon="icecream" />
        </View>
        <TouchableOpacity
          className="py-3 mt-3 bg-yellow-400 rounded-xl"
          onPress={() => handleClose()}
        >
          <Text className="font-xl font-bold text-center text-gray-700">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

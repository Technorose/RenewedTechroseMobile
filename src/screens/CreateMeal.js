import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../slices/selectedNutritionsSlice";
import { useNavigation } from "@react-navigation/native";
import { MinusIcon } from "react-native-heroicons/solid";
import COLORS from "../core/colors";
import ApiService from "../service/ApiService";
import { themeColors } from "../../theme";

export default function CreateMeal() {
  const [groupedItems, setGroupedItems] = useState([]);
  const basketItems = useSelector(state => state.selectedNutritions.items);
  const basketTotal = useSelector(selectBasketTotal);

  const totalCalorie = basketItems.reduce((total, item) => total += item.calorie, 0);
  const totalSugar = basketItems.reduce((total, item) => total += item.sugar, 0);
  const totalCarbohydrate = basketItems.reduce((total, item) => total += item.carbo_hydrate, 0);

  const [selectedId, setSelectedId] = useState(0); 

  const [meals, setMeals] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    ApiService.getMealNamesCodes()
      .then((data) => {
        if (data.result.success === true) {
          setMeals(data.meal_names_codes);
        }
      })
  }, [])

  const handleMeal = (item) => () => {
    setSelectedId(item.id);
  }

  const handleDelete = (item) => {
    dispatch(removeFromBasket(item));
  }

  useMemo(() => {
    setGroupedItems(basketItems)
  }, [basketItems])

  return (
    <View className=" bg-white flex-1">
      <View className="flex-row py-10 justify-between px-7 items-center">
        <Text className="font-regular">Choosed nutritions</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text className="font-bold">Add more...</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1}}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          className="bg-white pt-5"
          style={{
            paddingHorizontal: 10,
          }}
        >
          {groupedItems.length > 0 ? (
            <View>
              {groupedItems?.map((item) => {
                return (
                  <View
                    key={item.key}
                    className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                  >
                    <TouchableOpacity className="p-2" onPress={() => handleDelete(item)}>
                        <MinusIcon
                          strokeWidth={2}
                          height={20}
                          width={20}
                          stroke="black"
                        />
                    </TouchableOpacity>
                    <Image className="h-14 w-14 rounded-full" src={item.image} />
                    <Text className="flex-1 font-bold text-gray-700">
                      {item.name}
                    </Text>
                    <Text className="font-semibold text-base">
                      {item.calorie}
                    </Text>
                    <TouchableOpacity
                      className="p-1 rounded-full"
                      onPress={() => dispatch(removeFromBasket({ id: item.id }))}
                    >
                      <MinusIcon
                        strokeWidth={2}
                        height={20}
                        width={20}
                        stroke="white"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text className="text-center">No items...</Text>
          )}
        </ScrollView>
      </View>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: COLORS.primary}} 
        className="flex-1 px-6">
        <View className="p-6 px-5 rounded-3xl space-y-8" >
          <View className="flex-row justify-between">
            <Text className="text-white font-bold">Total Calorie</Text>
            <Text className="text-gray-300">{totalCalorie}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white font-bold">Total Sugar</Text>
            <Text className="text-gray-300">{totalSugar}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white font-bold">Total Carbohydrate</Text>
            <Text className="text-gray-300">{totalCarbohydrate}</Text>
          </View>
          </View>
          <View className="flex-column">
            <Text className="text-white font-extrabold">Choose Meal</Text>
              <View className="mt-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="overflow-visible"
                  contentContainerStyle={{ paddingHorizontal: 25 }}
                >
                  {meals?.map((item) => {
                    return <TouchableOpacity
                        key={item.id}
                        className="p-3 rounded-full mr-3"
                        style={{backgroundColor: selectedId !== item.id ? COLORS.secondary : themeColors.bg}}
                        onPress={handleMeal(item)}
                      >
                      <Text className="text-white text-center font-regular">
                        {item.meal_name}
                      </Text>
                    </TouchableOpacity>
                  })}
                </ScrollView>
              </View>
          </View>
          <View className="mt-6 rounded-full" style={{ backgroundColor: themeColors.bg }}>
            <TouchableOpacity
              className="p-3 rounded-full"
            >
              <Text className="text-white text-center font-bold text-lg">
                Create
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

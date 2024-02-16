import { Image, View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from "react-native";
import COLORS from "../../core/colors";
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../../slices/selectedNutritionsSlice";

export default function FoodCard() {
    const [nutritionsList, setNutritionsList] = useState([])

    const dispatch = useDispatch();

    const handleDispatch = item => {
      dispatch(addToBasket(item))
    }

    useEffect(() => {
      ApiService.getNutritionsList()
          .then((data) => {
              if(data.result.success === true) {
                  setNutritionsList(data.nutritions)
              } else {
                  Toast.show({
                      type: 'error',
                      text1: 'Error!',
                      text2: 'Something went wrong!',
                  })
              }
          })
    }, [])

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible"
          contentContainerStyle={{paddingHorizontal: 15}}
        >
          {nutritionsList.length > 0 ? (
            nutritionsList.map((item) => {
              return (
                <View style={{shadowColor: COLORS.grey, shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg">
                  <Image className="h-36 w-84 rounded-t-2xl" src={item.image} />
            
                <View className="px-3.5 pb-6 space-y-3">
                  <View className="flex-row justify-between pt-3">
                    <Text className="text-lg font-bold">{item.name}</Text>
                    <View className="mt-1 bg-blue-100 text-blue-800 text-xs font-medium ml-1.5 px-2.5 py-0.5 rounded-full">
                    <Text className="text-gray-700 font-semibold">{item.nutrition_type.nutrition_type_name}</Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <View className="flex-column items-left">
                        <Text className="text-gray-700 font-bold">Calorie </Text>
                        <Text className="text-gray-700 text-xs">{item.calorie}</Text>
                    </View>
                    <View className="flex-column items-left">
                        <Text className="text-gray-700 font-bold">Carbohydrate </Text>
                        <Text className="text-gray-700 text-xs">{item.carbo_hydrate}</Text>
                    </View>
                    <View className="flex-column items-left">
                        <Text className="text-gray-700 font-bold">Sugar </Text>
                        <Text className="text-gray-700 text-xs">{item.sugar}</Text>
                    </View>
                  </View>
                  <View className='flex-row justify-between'>
                    <Text className="text-xs">
                        <Text className="text-gray-700 ml-4">Serving Size: </Text>
                        <Text className="text-green-700">{item.serving_size}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => handleDispatch(item)}>
                        <Text className="font-semibold text-yellow-500">+ Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              )
            })
          ) : (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}
        </ScrollView>
      </View>
    )
}
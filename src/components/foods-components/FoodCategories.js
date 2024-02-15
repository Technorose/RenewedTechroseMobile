import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import Toast from 'react-native-toast-message'
import COLORS from '../../core/colors'

export default function FoodCategories() {
  const [nutritionTypeList, setNutritionTypeList] = useState([])

  useEffect(() => {
    ApiService.getNutritionTypeList()
      .then((data) => {
        if(data.result.success === true) {
          setNutritionTypeList(data.nutrition_types)
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
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{paddingHorizontal: 18}}
      >
        {nutritionTypeList.length > 0 ? (
          nutritionTypeList.map((item) => {
            return (
              <View key={item.id} className="mr-7">
                <TouchableOpacity className="flex-column justify-center items-center ">
                  <Image className="p-2 rounded-full shadow" style={{width: 45, height: 45}} src={item.image} />
                  <Text className="text-sm font-bold">{item.nutrition_type_name}</Text>
                </TouchableOpacity>
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
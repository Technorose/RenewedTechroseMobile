import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FoodInfoBox({ title, value, color, icon }) {
  return (
    <View className="h-20 flex-row rounded-xl mt-2">
      <View className="flex-col justify-center mx-2">
        <MaterialIcons name={icon} size={28} color={color} />
      </View>
      <View className="flex-col justify-center py-5 gap-y-2">
        <View className="flex-row justify-between w-72">
          <Text className="text-black font-semibold text-sm">{title}</Text>
          <Text className="text-gray-500 text-sm">{value}</Text>
        </View>
        <View className="flex-row justify-start w-72 h-2 bg-gray-100 rounded-full">
            <View
                className="h-2 rounded-full"
                style={{ width: '50%', backgroundColor: color}}
            ></View>
        </View>
      </View>
    </View>
  );
}

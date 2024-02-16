import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FoodCard from "../components/foods-components/FoodCard";
import FoodCategories from "../components/foods-components/FoodCategories";
import FoodTop from "../components/foods-components/FoodTop";
import LessCaloriesFood from "../components/foods-components/LessCaloriesFood";
import { useState } from "react";

export default function Home() {
    const [choosedCategory, setChoosedCategory] = useState(0)

    return (
        <View className="mt-14">
            <ScrollView>
                <FoodTop />
                <View className="flex-column">
                    <Text className="text-gray-500 p-2 ml-3">Categories</Text>
                    <FoodCategories choosedCategory={choosedCategory} setChoosedCategory={setChoosedCategory} />
                </View>
                <View className="flex-row justify-between p-2 mb-4 mt-3 items-center">
                    <View className="flex-column ml-3">
                        <Text className="text-2xl font-bold">Nutritions</Text>
                        <Text className="text-gray-500">Choose your nutrition</Text>
                    </View>
                    <TouchableOpacity>
                    <Text className="font-bold text-yellow-500">See All</Text>
                    </TouchableOpacity>
                </View>
                <FoodCard choosedCategory={choosedCategory} />
                <View className="flex-row justify-between p-2 mb-4 mt-3 items-center">
                    <View className="flex-column ml-3">
                        <Text className="text-2xl font-bold">Less Calories Nutritions</Text>
                        <Text className="text-gray-500">Choose your nutrition</Text>
                    </View>
                    <TouchableOpacity>
                    <Text className="font-bold text-yellow-500">See All</Text>
                    </TouchableOpacity>
                </View>
                <LessCaloriesFood />
            </ScrollView>
        </View>
    )
}
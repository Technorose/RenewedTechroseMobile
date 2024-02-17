import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import COLORS from "../core/colors";
import { useState } from "react";

export default function DetailsScreen() {
    const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]);

    const handleSelectDate = (date) => {
        setSelected(date);
    }
    
    return (
        <View className="p-4 mt-10">
            <View className="flex-row justify-between items-center mb-2 p-3">
                <Text className="text-gray-500">
                    <Text className="font-bold">
                        {selected === new Date().toISOString().split('T')[0] ? "Today" : "Filter to"}: {""}
                    </Text>
                    {selected}
                </Text>
                <TouchableOpacity>
                    <Text className="font-semibold text-yellow-500">Filter by date</Text>
                </TouchableOpacity>
            </View>
            <Calendar
                onDayPress={day => {
                    handleSelectDate(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, selectedColor: COLORS.primary, disableTouchEvent: true}
                }}
            />
        </View>
    );
}
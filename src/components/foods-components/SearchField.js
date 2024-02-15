import { Text, TextInput, View } from "react-native";
import { MagnifyingGlassCircleIcon, MapIcon } from "react-native-heroicons/solid";
import COLORS from "../../core/colors";

export default function SearchField() {
    return (
        <View className="flex-row items-center space-x-2 px-4 pb-2 ">
            <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                <MagnifyingGlassCircleIcon height="35" width="35" stroke="gray" />
                <TextInput placeholder='Search food...' className="ml-2 flex-1" keyboardType='default' />
            </View>
        </View>
    )
}
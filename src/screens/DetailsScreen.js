import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import COLORS from "../core/colors";
import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import BottomSheet from "../components/common/BottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { googleImageUrl } from "../core/statics";

export default function DetailsScreen() {
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      await AsyncStorage.getItem("user").then((userData) => {
        setUser(JSON.parse(userData));
      });
    };
    getUser();
  }, []);

  const refRBSheet = useRef();

  const chart1 = {
    labels: ["Calories", "Carbohydrate", "Sugar"],
    data: [0.4, 0.6, 0.8],
  };

  const chartConfig1 = {
    backgroundColor: COLORS.primary,
    backgroundGradientFrom: COLORS.primary,
    backgroundGradientTo: COLORS.primary,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity - 0.1})`,
    style: {
      borderRadius: 25,
    },
    propsForLabels: {
      fontWeight: "bold",
      fill: "white",
      x: 100,
    },
  };

  const chartConfig2 = {
    backgroundColor: COLORS.primary,
    backgroundGradientFrom: COLORS.primary,
    backgroundGradientTo: COLORS.primary,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity - 0.1})`,
    style: {
      borderRadius: 25,
    },
  };

  const chart2 = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      ],
    },
  };

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const handleSelectDate = (date) => {
    setSelected(date);
  };

  return (
    <View className="p-2" style={{ marginTop: screenHeight - 850 }}>
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-gray-500">
          <Text className="font-bold">
            {selected === new Date().toISOString().split("T")[0]
              ? "Today"
              : "Filter to"}
            : {""}
          </Text>
          {selected}
        </Text>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Text className="font-semibold text-yellow-500">Filter by date</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ shadowColor: COLORS.grey, shadowRadius: 7 }}
        className="flex-row bg-white rounded-3xl shadow-lg p-3"
      >
        <Image className="rounded-full w-24 h-24 items-center justify-center" src={googleImageUrl+user.image} />

        <View className="px-3.5 pb-6 space-y-3 p-3">
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold">{user.first_name + " " + user.last_name}</Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-column items-left mr-4">
              <Text className="text-gray-700 font-bold">Total dose </Text>
              <Text className="text-gray-700 text-xs">{user.total_dose_value.toFixed(4)}</Text>
            </View>
            <View className="flex-column items-left mr-4">
              <Text className="text-gray-700 font-bold">Blood sugar </Text>
              <Text className="text-gray-700 text-xs">
                {user.blood_sugar_value}
              </Text>
            </View>
            <View className="flex-column items-left">
              <Text className="text-gray-700 font-bold">Weight </Text>
              <Text className="text-gray-700 text-xs">
                {user.weight}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        <View className="flex-row justify-between items-center p-2 mt-3">
          <Text className="text-2xl font-bold">Your stats</Text>
          <Text className="text-yellow-500">See all {">>>"}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible mt-1"
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          <View className="mr-3">
            <ProgressChart
              data={chart1}
              width={screenWidth - 32}
              height={220}
              radius={24}
              absolute={true}
              chartConfig={chartConfig1}
              hideLegend={false}
              style={{ top: 10, borderRadius: 25 }}
            />
          </View>
          <View className="">
            <ProgressChart
              data={chart1}
              width={screenWidth}
              height={220}
              radius={24}
              absolute={true}
              chartConfig={chartConfig1}
              hideLegend={false}
              style={{  top: 10, borderRadius: 25 }}
            />
          </View>
        </ScrollView>
        <View className="">
          <LineChart
            data={chart2.data}
            width={screenWidth - 24}
            height={236}
            chartConfig={chartConfig2}
            bezier
            absolute={true}
            className="mt-8"
            style={{ borderRadius: 25 }}
          />
        </View>
      </ScrollView>
      <BottomSheet bottomSheetRef={refRBSheet}>
        <Calendar
          className="p-3 rounded-3xl shadow-lg bg-white mt-3"
          onDayPress={(day) => {
            handleSelectDate(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: COLORS.primary,
              disableTouchEvent: true,
            },
          }}
        />
      </BottomSheet>
    </View>
  );
}

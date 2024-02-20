import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import COLORS from "../core/colors";
import { useEffect, useRef, useState  } from "react";
import {
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
import BottomSheet from "../components/common/BottomSheet";
import { googleImageUrl } from "../core/statics";
import {  useSelector } from "react-redux";
import ApiService from "../service/ApiService";

export default function DetailsScreen() {
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [data, setData] = useState({
    Calories: 0,
    Carbohydrate: 0,
    Sugar: 0,
  });

  const user = useSelector(state => state.user.user)

  const refRBSheet = useRef();


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
    },
  };

  const chartConfig2 = {
    backgroundColor: COLORS.primary,
    backgroundGradientFrom: COLORS.primary,
    backgroundGradientTo: COLORS.primary,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity - 0.1})`,
  };

  const chart2 = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
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
      legend: ["Blood Sugar Values"]
    },
  };

  useEffect(() => {
    ApiService.getUserMealsDetails(selected)
      .then((response) => {
        if (response.result.success === true) {
          setData({
            Calories: response.total_calories,
            Carbohydrate: response.total_carbohydrate,
            Sugar: response.total_sugar,
          });
        }
      })
  }, [selected])

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const handleSelectDate = (date) => {
    setSelected(date);
    chart2.data.datasets[0].data = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
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
              <Text className="text-gray-700 text-xs">{user.total_dose_value?.toFixed(4)}</Text>
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
        <View className="flex-row justify-between items-center p-2 mt-2">
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
            <View className="flex-row justify-between ml-4 mr-4">
              {Object.entries(data).map((values, index) => {
                return (
                  <View key={index} className="flex-row justify-center items-center">
                    <Text className="text-gray-500 text-center font-bold">{values[1] / 10}%{" "}</Text>
                    <Text className="text-gray-500 text-center">{values[0]}</Text>
                  </View>
                );
              })}
            </View>
            <ProgressChart
              data={[data.Calories / 10000, data.Carbohydrate / 1000, (data.Sugar/1000)]}
              width={screenWidth - 32}
              height={220}
              radius={24}
              absolute={true}
              chartConfig={chartConfig1}
              hideLegend={false}
              style={{ top: 10, borderRadius: 25 }}
            />
          </View>
          <View className="ml-3">
            <View className="flex-row justify-between ml-4 mr-4">
            {Object.entries(data).map((values, index) => {
                return (
                  <View key={index} className="flex-row justify-center items-center">
                    <Text className="text-gray-500 text-center font-bold">{values[1] / 10}%{" "}</Text>
                    <Text className="text-gray-500 text-center">{values[0]}</Text>
                  </View>
                );
              })}
            </View>
            <ProgressChart
              data={[data.Calories / 1000, data.Carbohydrate/100, (data.Sugar/1000)]}
              width={screenWidth - 32}
              height={220}
              radius={24}
              absolute={true}
              chartConfig={chartConfig1}
              hideLegend={false}
              style={{  top: 10, borderRadius: 25 }}
            />
          </View>
        </ScrollView>
        <View className="mt-5 ml-1">
          <LineChart
            data={chart2.data}
            width={screenWidth - 32}
            height={232}
            chartConfig={chartConfig2}
            bezier
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

import {
  Modal,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import {
  LockClosedIcon,
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useState } from "react";
import ApiService from "../../service/ApiService";
import Toast from "react-native-toast-message";
import COLORS from "../../core/colors";

export default function SearchArea() {
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSearchedDatas = () => {
    if (search === "") return;

    ApiService.getNutritionBySearch(search).then((response) => {
      if (response.result.success === true) {
        setDatas(response.nutritions);
        setModal(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: response.result.error_description,
        });
      }
    });
  };

  const closeModal = () => {
    setModal(false);
    setDatas([]);
    setSearch('')
  };

  const handleSearch = (text) => {
    setSearch(text);
    getSearchedDatas()
  };

  return (
    <View className="flex-row items-center justify-between space-x-2 px-4 pb-2">
      <Image
        source={require("../../../assets/logo.png")}
        style={{ width: 60, height: 60 }}
      />
      <Text className="text-3xl font-bold">Nutritions</Text>
      <MagnifyingGlassCircleIcon
        onPress={() => setModal(true)}
        height="55"
        width="55"
      />
      <Modal
        animationType="fade"
        transparent={false}
        visible={modal}
        onRequestClose={closeModal}
      >
        <Text className="text-gray-500 mt-14 font-bold text-center">Search nutrition</Text>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: "flex-end",
          }}
          className="mt-6"
        >
          <View className="flex-row">
            <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
              <MagnifyingGlassCircleIcon
                onPress={() => setModal(true)}
                height="35"
                width="35"
              />
              <TextInput
                value={search}
                onChangeText={(text) => handleSearch(text)}
                placeholder="Search food..."
                className="ml-2 flex-1"
                keyboardType="default"
              />
            </View>
            <XMarkIcon onPress={closeModal} height="65" width="65" />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            className=""
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {datas.length > 0 ? (
              datas.map((item) => {
                return (
                  <View className="flex-row justify-left mt-14 w-full">
                    <View
                      style={{ shadowColor: COLORS.grey, shadowRadius: 7 }}
                      className="mr-6 bg-white rounded-3xl shadow-lg w-full"
                    >
                      <View className="">
                        <View className="px-3.5 pb-6 space-y-3">
                          <View className="flex-row justify-between pt-3">
                            <Text className="text-lg font-bold">
                              {item.name}
                            </Text>
                            <View className="mt-1 bg-blue-100 text-blue-800 text-xs font-medium ml-1.5 px-2.5 py-0.5 rounded-full">
                              <Text className="text-gray-700 font-semibold">
                                {item.nutrition_type.nutrition_type_name}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row justify-between">
                            <View className="flex-column items-left">
                              <Text className="text-gray-700 font-bold">
                                Calorie{" "}
                              </Text>
                              <Text className="text-gray-700 text-xs">
                                {item.calorie}
                              </Text>
                            </View>
                            <View className="flex-column items-left">
                              <Text className="text-gray-700 font-bold">
                                Carbohydrate{" "}
                              </Text>
                              <Text className="text-gray-700 text-xs">
                                {item.carbo_hydrate}
                              </Text>
                            </View>
                            <View className="flex-column items-left">
                              <Text className="text-gray-700 font-bold">
                                Sugar{" "}
                              </Text>
                              <Text className="text-gray-700 text-xs">
                                {item.sugar}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="text-xs">
                              <Text className="text-gray-700 ml-4">
                                Serving Size:{" "}
                              </Text>
                              <Text className="text-green-700">
                                {item.serving_size}
                              </Text>
                            </Text>
                            <TouchableOpacity>
                              <Text className="font-semibold text-yellow-500">
                                + Add
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              loading === true ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text className="text-gray-500 font-bold text-center mt-4">Please search nutrition/nutritions!</Text>
              )
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

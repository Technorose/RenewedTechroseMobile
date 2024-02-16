import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback } from "react-native"
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import COLORS from "../../core/colors"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { googleImageUrl } from "../../core/statics"

export default function ProfileUpdate() {
    const navigation = useNavigation()

    const [user, setUser] = useState({});
    const [year, setYear] = useState(0);
    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        weight: '',
        blood_sugar_value: '',
        birth_date: '',
    })

    useEffect(() => {
        const getUserDatas = async () => {
            await AsyncStorage.getItem("user").then((user) => {
                setUser(JSON.parse(user));
                setYear(new Date().getFullYear() - new Date(JSON.parse(user).birth_date).getFullYear())
                setProfileImage(googleImageUrl+JSON.parse(user).image)
            })
            .finally(()=> {
                setFormData({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone_number: user.phone_number,
                    weight: user.weight,
                    blood_sugar_value: user.blood_sugar_value,
                    birth_date: user.birth_date,
                })
            });
        }
        getUserDatas();
    }, [])

    

    const handleCredentialsChange = (name, value) => {
        setFormData({...formData, [name]: value})
    }

    return (
        <View className="flex-1 bg-white" style={{backgroundColor: COLORS.primary}}>
              <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity 
                        onPress={()=> navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-3">
                    <Image src={profileImage} 
                        style={{width: 165, height: 110}} />
                </View>
              </SafeAreaView>
              <View className="flex-1 bg-white px-8 pt-8"
                style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
              >
                <View className="form space-y-2">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView>
                            <Text className="text-gray-700">First Name</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={formData.first_name}
                                placeholder='Update First Name'
                                onChangeText={(value) => handleCredentialsChange('first_name', value)}
                            />
                            <Text className="text-gray-700">Last Name</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={formData.last_name}
                                placeholder='Update Last Name'
                                onChangeText={(value) => handleCredentialsChange('last_name', value)}
                            />
                            <Text className="text-gray-700">Email Address</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={formData.email}
                                placeholder='Update Email'
                                onChangeText={(value) => handleCredentialsChange('email', value)}
                            />
                            <Text className="text-gray-700">Phone number</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={formData.phone_number}
                                placeholder='Update phone number'
                                onChangeText={(value) => handleCredentialsChange('phone_number', value)}
                            />
                            <Text className="text-gray-700">Weight</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                                secureTextEntry
                                value={formData.weight}
                                placeholder='Update weight'
                                onChangeText={(value) => handleCredentialsChange('weight', value)}
                            />
                            <TouchableOpacity
                                className="py-3 bg-yellow-400 rounded-xl"
                                
                            >
                                <Text className="font-xl font-bold text-center text-gray-700">
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}
import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback, Modal } from "react-native"
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid"
import COLORS from "../../core/colors"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {  googleImageUrl } from "../../core/statics"
import * as ImagePicker from 'expo-image-picker';
import ApiService from "../../service/ApiService"

export default function ProfileUpdate() {
    const navigation = useNavigation()

    const [user, setUser] = useState({});
    const [year, setYear] = useState(0);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const getUserDatas = async () => {
            await AsyncStorage.getItem("user").then((user) => {
                setUser(JSON.parse(user));
                setYear(new Date().getFullYear() - new Date(JSON.parse(user).birth_date).getFullYear())
                setProfileImage(googleImageUrl+JSON.parse(user).image)
            })
        }
        getUserDatas();
    }, [])

    const handleCredentialsChange = (name, value) => {
        setUser({...user, [name]: value})
    }

    const handleUpdateCredentials = () => {
        ApiService.postUserUpdate(user)
        .then(async (response) => {
            if(response.result.success === true) {
                await AsyncStorage.setItem("user", JSON.stringify(response.user))
                setUser(JSON.stringify(response.user))
            }
        })
    }

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: 'image/png',
            name: 'profile.png'
        })

        ApiService.postProfileImage(formData)
        .then((response) => {
            if(response.result.success === true) {
                console.log(response)
            }
        })
    };

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })

        if(!result.canceled) {
            await uploadImage(result.assets[0].uri)
        }
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
                <TouchableOpacity onPress={() => selectImage()} className="flex-row justify-center mt-3">
                    <Image src={profileImage} 
                        className="rounded-full"
                        style={{width: 128, height: 128}} />
                    <CameraIcon size="20" color="black" />
                </TouchableOpacity>
              </SafeAreaView>
              <View className="flex-1 bg-white px-8 pt-8 mt-3"
                style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
              >
                <View className="form space-y-2">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView>
                            <Text className="text-gray-700">First Name</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={user.first_name}
                                placeholder='Update First Name'
                                onChangeText={(value) => handleCredentialsChange('first_name', value)}
                            />
                            <Text className="text-gray-700">Last Name</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={user.last_name}
                                placeholder='Update Last Name'
                                onChangeText={(value) => handleCredentialsChange('last_name', value)}
                            />
                            <Text className="text-gray-700">Email Address</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={user.email}
                                placeholder='Update Email'
                                onChangeText={(value) => handleCredentialsChange('email', value)}
                            />
                            <Text className="text-gray-700">Phone number</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={user.phone_number}
                                placeholder='Update phone number'
                                onChangeText={(value) => handleCredentialsChange('phone_number', value)}
                            />
                            <TouchableOpacity
                                className="py-3 bg-yellow-400 rounded-xl"
                                onPress={() => handleUpdateCredentials()}
                            >
                                <Text className="font-xl font-bold text-center text-gray-700">
                                    Update
                                </Text>
                            </TouchableOpacity>
                            
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
                <Text className="text-xl text-gray-700 font-bold text-center py-5">OR</Text>
                <TouchableOpacity
                        className="py-3 mt-2 bg-yellow-400 rounded-xl"
                        onPress={() => navigation.navigate("ChangePassword")}
                    >
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Change Password
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
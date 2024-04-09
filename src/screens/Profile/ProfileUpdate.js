import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback, Modal, Platform } from "react-native"
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid"
import COLORS from "../../core/colors"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {  googleImageUrl } from "../../core/statics"
import * as ImagePicker from 'expo-image-picker';
import ApiService from "../../service/ApiService"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../../slices/userSlice"
import Toast from 'react-native-toast-message'

export default function ProfileUpdate() {
    const navigation = useNavigation()

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [updateData, setUpdateData] = useState({
        ...user
    });

    const handleCredentialsChange = (name, value) => {
        setUpdateData({...updateData, [name]: value})
    }

    const handleUpdateCredentials = () => {
        ApiService.postUserUpdate(updateData)
        .then(async (response) => {
            if(response.result.success === true) {
                await AsyncStorage.setItem("user", JSON.stringify(response.user))
                await AsyncStorage.setItem("token", response.token)
                dispatch(updateUser(response.user))
                navigation.goBack();
                Toast.show({
                    type: 'success',
                    text1: 'User Information Updated!',
                    text2: 'Your information has been updated successfully!',
                })
            } else {
                navigation.goBack();
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: response.result.error_description,
                })
            }
        })
    }

    const uploadImage = (result) => {
        let formData = new FormData();
        formData.append('file', {
            uri: Platform.OS === "android" ? result.uri : result.uri.replace("file://", ""),
            type: result.type,
            name: result.fileName
        })

        ApiService.postProfileImage(formData)
            .then(async (response) => {
                if(response.result.success === true) {
                    await AsyncStorage.setItem("user", JSON.stringify({...user, image: response.image}))
                    dispatch(updateUser(JSON.stringify({...user, image: response.image})))
                    navigation.goBack();
                    Toast.show({
                        type: 'success',
                        text1: 'Image Uploaded!',
                        text2: 'Your image has been uploaded successfully!',
                    })
                } else {
                    navigation.goBack();
                    Toast.show({
                        type: 'error',
                        text1: 'Error!',
                        text2: response.result.error_description,
                    })
                }
            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'An error occurred while uploading the image!',
                })
            })
    };

    const selectImage = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).then((result) => {
            if(!result.canceled) {
                uploadImage(result.assets[0])
            }
        })
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
                    <Image src={googleImageUrl+user.image} 
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
                                value={updateData.first_name}
                                placeholder='Update First Name'
                                onChangeText={(value) => handleCredentialsChange('first_name', value)}
                            />
                            <Text className="text-gray-700">Last Name</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={updateData.last_name}
                                placeholder='Update Last Name'
                                onChangeText={(value) => handleCredentialsChange('last_name', value)}
                            />
                            <Text className="text-gray-700">Email Address</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={updateData.email}
                                placeholder='Update Email'
                                onChangeText={(value) => handleCredentialsChange('email', value)}
                            />
                            <Text className="text-gray-700">Phone number</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                value={updateData.phone_number}
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
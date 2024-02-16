import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import ApiService from "../../service/ApiService";
import Toast from "react-native-toast-message";

export default function ChangePassword() {

    const navigation = useNavigation();

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [changePassword, setChangePassword] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })

    const handleCredentialsChange = (name, value) => {
        setChangePassword({...changePassword, [name]: value})
    }

    const handleChangePassword = () => {
        let ok = true

        if (changePassword.old_password === '') {
            setOldPasswordError('Old password is required!')
            ok = false
        } else {
            setOldPasswordError('')
        }
        if (changePassword.new_password === '') {
            setNewPasswordError('New password is required!')
            ok = false
        }else{
            setNewPasswordError('')
        }
        if (changePassword.confirm_password === '') {
            setConfirmPasswordError('Confirm password is required!')
            ok = false
        }else{
            setConfirmPasswordError('')
        }

        if (changePassword.new_password !== changePassword.confirm_password) {
            setNewPasswordError('Passwords do not match!')
            setConfirmPasswordError('Passwords do not match!')
            ok = false
        }else{
            setNewPasswordError('')
            setConfirmPasswordError('')
        }

        if(ok) {
            ApiService.postUpdateUserPassword(changePassword)
            .then((response) => {
                if(response.result.success === true) {
                    Toast.show({
                        type: 'success',
                        text1: 'Success!',
                        text2: 'Password updated successfully!',
                    })
                    navigation.goBack()
                }
            }).finally(() => {
                setChangePassword({
                    old_password: '',
                    new_password: '',
                    confirm_password: ''
                })
            })
        }
    }

    const close = () => {
        setChangePassword({
            old_password: '',
            new_password: '',
            confirm_password: ''
        })
        navigation.goBack()
    }

    return (
        <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            <View className="flex-row justify-center p-2 mb-4 mt-3 items-center">
                <Text className="text-2xl font-bold">Change Password</Text>
            </View>
            <Text className="text-gray-700 mb-2">Old password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={changePassword.old_password}
                placeholder='Enter your password'
                secureTextEntry
                onChangeText={(value) => handleCredentialsChange('old_password', value)}
            />
            {oldPasswordError !== '' && <Text className="text-red-500 mb-2">{oldPasswordError}</Text>}
            <Text className="text-gray-700 mb-2">New password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={changePassword.new_password}
                placeholder='Enter your new password'
                secureTextEntry
                onChangeText={(value) => handleCredentialsChange('new_password', value)}
            />
            {newPasswordError !== '' && <Text className="text-red-500 mb-2">{newPasswordError}</Text>}
            <Text className="text-gray-700 mb-2">Confirm password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={changePassword.confirm_password}
                placeholder='Confirm your new password'
                secureTextEntry
                onChangeText={(value) => handleCredentialsChange('confirm_password', value)}
            />
            {confirmPasswordError !== '' && <Text className="text-red-500 mb-2">{confirmPasswordError}</Text>}
            <TouchableOpacity
                className="py-3 mt-2 bg-yellow-400 rounded-xl"
                onPress={() => handleChangePassword()}
            >
                <Text className="font-xl font-bold text-center text-gray-700">
                    Change Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="py-3 mt-2 bg-gray-100 rounded-xl"
                onPress={() => close()}
            >
                <Text className="font-xl font-bold text-center text-gray-700">
                    Close
                </Text>
            </TouchableOpacity>
        </View>
    )
}
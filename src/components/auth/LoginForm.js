import { 
  View, 
  Text,
  TouchableOpacity, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Modal, 
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard} from 'react-native'


import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

import { securityTokenKey } from '../../core/statics'

import ApiService from '../../service/ApiService'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import COLORS from '../../core/colors'

export default function LoginForm() {
  const navigation = useNavigation();

  const [resultModal, setResultModal] = useState(false)

  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    security_token_key: securityTokenKey
  })

  const handleCredentialsChange = (name, value) => {
    setFormData({...formData, [name]: value})
  }

  const Login = () => {
    if(formData.user_name === ''
      || formData.user_name === null
      || formData.user_name === undefined
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Email is required',
      })
      return
    }

    if(formData.password === ''
      || formData.password === null
      || formData.password === undefined
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Password is required',
      })
      return
    }

    ApiService.login(formData)
      .then(response => {
        if(response.result.success === true) {
          setResultModal(true)
          // Toast.show({
          //   type: 'success',
          //   text1: response.user.first_name + ' ' + response.user.last_name + 'Welcome to Techrose Diabetes Application!',
          // })
          AsyncStorage.setItem('user', JSON.stringify(response.user))
          AsyncStorage.setItem('token', response.token)
          setTimeout(() => {
            setResultModal(false)
            navigation.navigate("Main")
          }, 1500)
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: response.result.error_description,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: COLORS.primary}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../../../assets/logo.png')} 
          style={{width: 200, height: 200}} />
        </View>
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView>
                <Text className="text-gray-700 ml-4">Email Address</Text>
                <TextInput 
                  className="p-4 mt-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="Enter your email"
                  name="user_name"
                  value={formData.email}
                  onChangeText={(value) => handleCredentialsChange('user_name', value)}
                />
                <Text className="text-gray-700 ml-4">Password</Text>
                <TextInput 
                  className="p-4 mt-2 bg-gray-100 text-gray-700 rounded-2xl"
                  secureTextEntry
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChangeText={(value) => handleCredentialsChange('password', value)}
                />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Login}
              className="py-3 bg-yellow-400 rounded-xl">
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../../assets/auth-icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../../assets/auth-icons/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../../assets/auth-icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
      </View>
      <Modal animationType={'slide'} transparent={false} visible={resultModal}>
          <View style={styles.modal}>
            <Image source={require('../../../assets/logo.png')} 
              style={{width: 200, height: 200}} />
                <Text className="text-xl font-bold text-center text-white">
                        Welcome to Techrose Diabetes Application!
                </Text>
          </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 100,
    justifyContent: 'center'
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});

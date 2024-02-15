import { View, Text, Pressable, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../core/colors';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

    const navigation = useNavigation();

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={{
                            height: 400,
                            width: 400,
                            borderRadius: 20,
                            top: 40
                        }}
                    />
                </View>
                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 450,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Started</Text>
                    <View style={{ marginVertical: 22 }}>
                        <Text className="font-bold" style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Welcome to Techrose Diabetes Application!</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Let's get started and step into living a healthy life together!</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{backgroundColor: themeColors.bg, borderRadius: '8px'}} className="flex-row justify-center mt-7 p-5">
                        <Text className="font-bold text-white"> Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')} className="mt-4" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text className="text-white font-semibold">
                            Don't have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}
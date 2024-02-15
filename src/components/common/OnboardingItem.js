import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { themeColors } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../core/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingItem({ item }) {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={[styles.container, { width }]}>
                <Image source={item.img} style={[styles.image, { width, resizeMode: 'contain' }]} />
                <View style={{ flex: 0.3 }}>
                    <Text style={styles.title}>{ item.title }</Text>
                    <Text style={styles.description}>{ item.description }</Text>
                </View>
                {!item.last_slide ? (
                    <View style={{ flex: 0.1 }}>
                        <Text style={styles.description}>Swipe left to continue</Text>
                    </View>
                ) : (
                    <View style={{width: '100%', paddingHorizontal: 22}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Welcome')} style={{backgroundColor: themeColors.bg, borderRadius: '8px'}} className="flex-row justify-center mb-10 p-5">
                            <Text className="font-bold text-white">Get Started!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 0.7,
        justifyContent: 'center',
    },

    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: COLORS.white,
        textAlign: 'center'
    },

    description: {
        fontWeight: '300',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 64
    },
})
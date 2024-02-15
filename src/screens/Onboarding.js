import { FlatList, View, Animated, StyleSheet } from "react-native";
import slides from "../core/slides";
import OnboardingItem from "../components/common/OnboardingItem";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../core/colors";

export default function Onboarding() {
    const navigation = useNavigation()

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item} />} 
                    horizontal 
                    showsHorizontalScrollIndicator 
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    }
})
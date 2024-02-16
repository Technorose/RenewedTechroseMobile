import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import Welcome from "../src/screens/Welcome";
import Onboarding from "../src/screens/Onboarding";
import Tabs from "./Tabs";
import CreateMeal from "../src/screens/CreateMeal";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Onboarding" options={{headerShown: false}} component={Onboarding}></Stack.Screen>
                <Stack.Screen name="Welcome" options={{headerShown: false}} component={Welcome}></Stack.Screen>
                <Stack.Screen name="Login" options={{headerShown: false}} component={Login}></Stack.Screen>
                <Stack.Screen name="Register" options={{headerShown: false}} component={Register}></Stack.Screen>
                <Stack.Screen name="Main" options={{headerShown: false}} component={Tabs}></Stack.Screen>
                <Stack.Screen name="CreateMeal" options={{headerShown: false, presentation: 'modal'}} component={CreateMeal}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
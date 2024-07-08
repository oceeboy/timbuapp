import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "./components/TabIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListingScreen from "./screens/ProductListingScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProductProvider } from "./context/ProductContext";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const screenOptions = {
    tabBarShowLabel: false,

    tabBarActiveTintColor: "#303D39",
    tabBarInactiveTintColor: "#617078",

    tabBarStyle: {
      backgroundColor: "#F5F5F5",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      zindex: 1,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Products"
        component={ProductListingScreen}
        options={{
          title: "Products",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Products" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ProductProvider>
  );
}

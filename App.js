// App.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, SafeAreaView } from "react-native";
import QueryClientProviderWrapper from "./src/contexts/QueryClientProviderWrapper";
import ExploreScreen from "./src/screens/ExploreScreen";
import CreateScreen from "./src/screens/CreateScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ReLifeFeed from "./src/screens/ReLifeFeed";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <QueryClientProviderWrapper>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "Explore") {
                  iconName = "search";
                } else if (route.name === "Create") {
                  iconName = "plus-square";
                } else if (route.name === "Notifications") {
                  iconName = "heart";
                } else if (route.name === "Profile") {
                  iconName = "user";
                }
                return (
                  <FontAwesome name={iconName} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "black",
                paddingBottom: 0,
                height: 60,
                borderTopWidth: 0,
              },
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarLabel: () => null,
            })}
          >
            <Tab.Screen
              name="Home"
              component={ReLifeFeed}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Explore"
              component={ExploreScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Create"
              component={CreateScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProviderWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
});

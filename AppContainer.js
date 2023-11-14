import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PostDetailScreen from "./screens/PostDetailScreen";

export default function AppContainer() {
  // Create the stack and tab navigator
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // Function to create the home stack with its screens
  function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator();
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="PostDetail" component={PostDetailScreen} />
      </HomeStack.Navigator>
    );
  }

  // Function to create the profile stack with its screens
  function MapStackScreen() {
    const ProfileStack = createNativeStackNavigator();
    return (
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Map" component={MapScreen} />
      </ProfileStack.Navigator>
    );
  }

  // Function to create the settings stack with its screens
  function SettingsStackScreen() {
    const SettingsStack = createNativeStackNavigator();
    return (
      <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      </SettingsStack.Navigator>
    );
  }

  function MainTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeTab"
      >
        <Tab.Screen name="HomeTab" component={HomeStackScreen} />
        <Tab.Screen name="MapTab" component={MapStackScreen} />
        <Tab.Screen name="SettingsTab" component={SettingsStackScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
  },
  subHeading: {
    fontSize: 16,
    paddingBottom: 10,
  },
});

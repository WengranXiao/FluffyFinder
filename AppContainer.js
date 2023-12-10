import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";

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
        <HomeStack.Screen name="CreatePost" component={CreatePostScreen} />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
      </HomeStack.Navigator>
    );
  }

  // Function to create the profile stack with its screens
  function MapStackScreen() {
    const MapStack = createNativeStackNavigator();
    return (
      <MapStack.Navigator screenOptions={{ headerShown: false }}>
        <MapStack.Screen name="Map" component={MapScreen} />
        <MapStack.Screen name="PostDetail" component={PostDetailScreen} />
        <MapStack.Screen name="Profile" component={ProfileScreen} />
      </MapStack.Navigator>
    );
  }

  // Function to create the settings stack with its screens
  function ProfileStackScreen() {
    const ProfileStack = createNativeStackNavigator();
    return (
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <ProfileStack.Screen name="PostDetail" component={PostDetailScreen} />
        <ProfileStack.Screen name="CreatePost" component={CreatePostScreen} />
      </ProfileStack.Navigator>
    );
  }

  function MainTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const map = {
              HomeTab: {
                name: "home",
                type: "material-community",
                color: focused ? "#3D7D6C" : "#A0C7B5",
              },
              MapTab: {
                name: "map-marker-multiple",
                type: "material-community",
                color: focused ? "#3D7D6C" : "#A0C7B5",
              },
              ProfileTab: {
                name: "account",
                type: "material-community",
                color: focused ? "#3D7D6C" : "#A0C7B5",
              },
            };

            return (
              <Icon
                name={map[route.name].name}
                type={map[route.name].type}
                color={map[route.name].color}
                size={30}
              />
            );
          },
          tabBarShowLabel: false,
        })}
        initialRouteName="HomeTab"
      >
        <Tab.Screen name="HomeTab" component={HomeStackScreen} />
        <Tab.Screen name="MapTab" component={MapStackScreen} />
        <Tab.Screen name="ProfileTab" component={ProfileStackScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={AuthScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
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

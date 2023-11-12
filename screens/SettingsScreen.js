import { StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { signOut } from "../AuthManager";

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Button
        onPress={async () => {
          try {
            await signOut();
          } catch (error) {
            Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
          }
        }}
      >
        Now sign out!
      </Button>
    </SafeAreaView>
  );
};

export default SettingsScreen;

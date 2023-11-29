import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { signOut } from "../AuthManager";
import { useSelector } from "react-redux";

const SettingsScreen = () => {
  const userInfo = useSelector((state) => state.user);
  console.log;

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Image
        source={{ uri: userInfo.profilePicUrl }}
        style={{ width: 120, height: 120, borderRadius: 60 }}
      />
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

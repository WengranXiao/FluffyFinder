import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { subscribeToAuthChanges } from "../AuthManager";
import SigninForm from "../components/auth/SigninForm";
import SignupForm from "../components/auth/SignupForm";

const AuthScreen = ({ route, navigation }) => {
  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    subscribeToAuthChanges(navigation);
  }, []);

  useEffect(() => {
    setLoginMode(route.params?.loginMode);
  }, [route.params?.loginMode]);

  toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loginMode ? (
        <SigninForm toggleLoginMode={toggleLoginMode} />
      ) : (
        <SignupForm toggleLoginMode={toggleLoginMode} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;

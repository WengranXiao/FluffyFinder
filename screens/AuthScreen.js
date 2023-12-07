import { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { subscribeToAuthChanges } from "../AuthManager";
import { useDispatch } from "react-redux";
import SigninForm from "../components/auth/SigninForm";
import SignupForm from "../components/auth/SignupForm";

const AuthScreen = ({ route, navigation }) => {
  const [loginMode, setLoginMode] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    subscribeToAuthChanges(navigation, dispatch);
  }, []);

  useEffect(() => {
    setLoginMode(route.params?.loginMode);
  }, [route.params?.loginMode]);

  toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loginMode ? (
          <SigninForm toggleLoginMode={toggleLoginMode} />
        ) : (
          <SignupForm
            toggleLoginMode={toggleLoginMode}
            navigation={navigation}
          />
        )}
      </View>
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

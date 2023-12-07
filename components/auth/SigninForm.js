import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signIn } from "../../AuthManager";

const SigninForm = ({ toggleLoginMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Sign In Error", "Invalid email", [{ text: "OK" }]);
          break;
        case "auth/invalid-login-credentials":
          Alert.alert("Sign In Error", "Invalid email or password", [
            { text: "OK" },
          ]);
          break;
        default:
          Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A0C7B5"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A0C7B5"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleLoginMode}
        style={{ flexDirection: "row", gap: 5 }}
      >
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Text style={styles.signup}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "3%",
    paddingHorizontal: "10%",
    width: "100%",
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#4D4D4D",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    height: 40,
    marginBottom: 25,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3D7D6C",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 24,
    fontSize: 16,
    color: "#000",
  },
  signup: {
    marginTop: 24,
    fontSize: 16,
    color: "#3D7D6C",
    fontWeight: "bold",
  },
});

export default SigninForm;

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
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleLoginMode}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPW}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    paddingHorizontal: "10%",
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    height: 40,
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 40,
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
    color: "#007bff",
  },
  forgotPW: {
    marginTop: 24,
    fontSize: 16,
    color: "#007bff",
  },
});

export default SigninForm;

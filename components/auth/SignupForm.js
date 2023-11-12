import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signUp } from "../../AuthManager";
import { addUser } from "../../data/Actions";
import { useDispatch } from "react-redux";

const SignupForm = ({ toggleLoginMode }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Empty Field", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Not Match",
        "Please make sure your passwords match"
      );
      return;
    }

    try {
      const newUser = await signUp(displayName, email, password);
      dispatch(addUser(newUser));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Sign Up Error", "Invalid email", [{ text: "OK" }]);
          break;
        case "auth/weak-password":
          Alert.alert(
            "Sign Up Error",
            "Password should be at least 6 characters",
            [{ text: "OK" }]
          );
          break;
        default:
          Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your name"
        autoCapitalize="none"
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleLoginMode}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
  loginText: {
    marginTop: 24,
    fontSize: 16,
    color: "#007bff",
  },
});

export default SignupForm;

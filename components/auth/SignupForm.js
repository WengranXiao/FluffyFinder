import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { updateProfile } from "firebase/auth";
import { Icon } from "@rneui/themed";
import { signUp, getAuthUser } from "../../AuthManager";
import { addUser, updateUser, saveProfilePic } from "../../data/Actions";
import { useDispatch } from "react-redux";
import PhotoUpload from "../ui/PhotoUpload";

const SignupForm = ({ toggleLoginMode, navigation }) => {
  const [step, setStep] = useState(0); // 0: email & password, 1: profile pic, display name & contact info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleCreateAuth = async () => {
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
      const newUser = await signUp(email, password, dispatch);
      dispatch(addUser(newUser));
      setPassword("");
      setConfirmPassword("");
      setStep(1);
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

  const handleUpdateProfile = async () => {
    if (!displayName || (!email && !phone)) {
      Alert.alert("Empty Field", "Please fill in all fields");
      return;
    }

    try {
      const currentUser = await getAuthUser();
      let uploadedPicUrl = null;
      if (profilePicUrl) {
        uploadedPicUrl = await saveProfilePic({ uri: profilePicUrl });
      }
      await updateProfile(currentUser, { displayName });

      dispatch(
        updateUser(currentUser, {
          displayName: displayName,
          contactEmail: email || null,
          contactPhone: phone || null,
          profilePicUrl: uploadedPicUrl || null,
        })
      );
      setDisplayName("");
      setEmail("");
      setPhone("");
      setProfilePicUrl(null);
      setStep(0);
      toggleLoginMode();
      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Update Profile Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {step === 0 && (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#A0C7B5"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#A0C7B5"
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#A0C7B5"
          />

          <TouchableOpacity onPress={handleCreateAuth} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleLoginMode}
            style={{ flexDirection: "row", gap: 5 }}
          >
            <Text style={styles.signinText}>Already have an account?</Text>
            <Text style={styles.signin}>Sign In</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 1 && (
        <>
          <Text style={styles.label}>Profile Pic (Optional)</Text>
          <PhotoUpload
            picUrl={profilePicUrl}
            setPicUrl={setProfilePicUrl}
            borderStyle={{ width: 120, height: 120, borderRadius: 60 }}
          />
          <View style={styles.break} />
          <Text style={styles.label}>* Your Name</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your nick name"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#A0C7B5"
          />

          <Text style={styles.label}>* Contact (At least one)</Text>
          <View
            style={{ ...styles.input, flexDirection: "row", marginBottom: 0 }}
          >
            <Icon name="email" type="zocial" size={16} color="#3D7D6C" />
            <TextInput
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#A0C7B5"
              style={styles.inputText}
            />
          </View>
          <TextInput />

          <View style={{ ...styles.input, flexDirection: "row" }}>
            <Icon
              name="phone-alt"
              type="font-awesome-5"
              size={16}
              color="#3D7D6C"
            />
            <TextInput
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              value={phone}
              onChangeText={setPhone}
              returnKeyType="done"
              placeholder="Enter your phone number"
              placeholderTextColor="#A0C7B5"
              style={styles.inputText}
            />
          </View>

          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
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
  break: {
    width: "100%",
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 20,
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
  signinText: {
    marginTop: 24,
    fontSize: 16,
    color: "#000",
  },
  signin: {
    marginTop: 24,
    fontSize: 16,
    color: "#3D7D6C",
    fontWeight: "bold",
  },
  uploadPic: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: "#4D4D4D",
    borderRadius: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 18,
    marginLeft: 10,
    width: "100%",
  },
});

export default SignupForm;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { updateProfile } from "firebase/auth";
import { Icon } from "@rneui/themed";
import { signUp, getAuthUser } from "../../AuthManager";
import { addUser, updateUser, saveProfilePic } from "../../data/Actions";
import { useDispatch, useSelector } from "react-redux";
import PhotoUpload from "../ui/PhotoUpload";

const ProfileForm = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl || "");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.contactEmail || "");
  const [phone, setPhone] = useState(user.contactPhone || "");

  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    if (!displayName || (!email && !phone)) {
      Alert.alert("Empty Field", "Please fill in all fields");
      return;
    }

    try {
      const currentUser = await getAuthUser();
      let uploadedPicUrl = null;
      if (profilePicUrl && profilePicUrl !== user.profilePicUrl) {
        uploadedPicUrl = await saveProfilePic({ uri: profilePicUrl });
      }

      if (currentUser.displayName !== displayName) {
        await updateProfile(currentUser, { displayName });
      }

      dispatch(
        updateUser(currentUser, {
          displayName: displayName,
          contactEmail: email || null,
          contactPhone: phone || null,
          profilePicUrl:
            profilePicUrl !== user.profilePicUrl
              ? uploadedPicUrl
              : user.profilePicUrl,
        })
      );
      setDisplayName("");
      setEmail("");
      setPhone("");
      setProfilePicUrl(null);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Update Profile Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior="height"
      style={{ flex: 1, width: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.label}>Profile Pic</Text>
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
              placeholder="Enter your phone number"
              autoCapitalize="none"
              placeholderTextColor="#A0C7B5"
              style={styles.inputText}
            />
          </View>

          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: "3%",
    paddingHorizontal: "10%",
    width: "100%",
    zIndex: 10,
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
  inputText: {
    fontSize: 18,
    marginLeft: 10,
    width: "100%",
  },
});

export default ProfileForm;

import React, { useState } from "react";
import { View, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useDispatch } from "react-redux";

function PhotoUpload({ profilePicUrl, setProfilePicUrl }) {
  const dispatch = useDispatch();

  const takePicture = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take photos"
      );
      return;
    }

    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.1,
    })
      .then((result) => {
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setProfilePicUrl(uri);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const selectImageFromGallery = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.1,
    })
      .then((result) => {
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setProfilePicUrl(uri);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const showOptions = () => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        { text: "Take Picture", onPress: takePicture },
        { text: "Select from Gallery", onPress: selectImageFromGallery },
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.uploadPic} onPress={showOptions}>
      {profilePicUrl ? (
        <Image
          source={{ uri: profilePicUrl }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
      ) : (
        <Icon name="upload" type="feather" size={30} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});

export default PhotoUpload;

import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { addPost, updatePost, saveProfilePic } from "../data/Actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PhotoUpload from "../components/ui/PhotoUpload";
import { GOOGLE_API_KEY } from "../Secrets";


function CreatePostScreen({
  navigation,
  route: {
    params: { key },
  },
}) {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const item = posts.find((post) => post.key === key);

  const [breed, setBreed] = useState(item ? item.breed : "");
  const [species, setSpecies] = useState(item ? item.species : "");
  const [time, setTime] = useState(
    item ? item.postTime : new Date().getTime() / 1000
  );
  const [location, setLocation] = useState(item ? item.location : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [typeValue, setTypeValue] = useState(item ? item.type : "");

  const [picList, setPicList] = useState(item ? item.pictures : []);

  const dispatch = useDispatch();

  handleUpdatePost = () => {
    hanldeUploadPics().then((uploadedPicList) => {
      dispatch(
        updatePost(
          item.key,
          breed,
          typeValue,
          location,
          time,
          species,
          description,
          uploadedPicList
        )
      );

      item
        ? navigation.goBack()
        : navigation.navigate("PostDetail", { key: item.key });
    });
  };

  handleCreatePost = () => {
    hanldeUploadPics().then((uploadedPicList) => {
      addPost(
        breed,
        typeValue,
        location,
        time,
        species,
        description,
        uploadedPicList,
        user.key
      );
      navigation.navigate("Home");
    });
  };

  hanldeUploadPics = async () => {
    const uploadedPicList = await Promise.all(
      picList.map((pic) => saveProfilePic({ uri: pic }))
    );

    return uploadedPicList;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            left: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{`${
          item ? "Edit" : "Create"
        } Post`}</Text>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <View style={[styles.inputSection, { zIndex: 1 }]}>
              <Text style={styles.titleText}>Post Type</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <TouchableOpacity
                  onPress={() => setTypeValue("lost")}
                  style={
                    typeValue === "lost" ? styles.activeTypeBtn : styles.typeBtn
                  }
                >
                  <Text
                    style={
                      typeValue === "lost"
                        ? styles.activeTypeText
                        : styles.typeText
                    }
                  >
                    Lost Post
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTypeValue("found")}
                  style={
                    typeValue === "found"
                      ? styles.activeTypeBtn
                      : styles.typeBtn
                  }
                >
                  <Text
                    style={
                      typeValue === "found"
                        ? styles.activeTypeText
                        : styles.typeText
                    }
                  >
                    Found Post
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Location</Text>
              <GooglePlacesAutocomplete
                placeholder={location ? location : "Search Location"}
                onPress={(data, details = null) => {
                  console.log(data);
                  setLocation(data.description);
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                }}
                fetchDetails={true}
                scrollEnabled={false}
                styles={{
                  textInputContainer: {
                    backgroundColor: "#fff",
                    width: "100%",
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingRight: 1,
                  },
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    fontSize: 20,
                    height: "100%",
                    width: "100%",
                  },
                }}
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Species</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setSpecies(text)}
                value={species}
                placeholder="Species"
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Breed</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setBreed(text)}
                value={breed}
                placeholder="Breed"
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Lost/Found Time</Text>
              <View
                style={{
                  padding: 0,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginLeft: -12,
                }}
              >
                <DateTimePicker
                  value={new Date(time * 1000)}
                  mode="datetime"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || time;
                    setTime(new Date(currentDate).getTime() / 1000);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Description</Text>
              <TextInput
                style={[styles.input, { height: 100, paddingTop: 10 }]}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                value={description}
                placeholder="Description"
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.titleText}>Photo</Text>
              <View style={styles.picList}>
                {picList.map((picUrl, index) => (
                  <View key={index}>
                    <PhotoUpload
                      picUrl={picUrl}
                      setPicUrl={(uri) => setPicList((prev) => [...prev, uri])}
                      removePic={(uri) =>
                        setPicList((prev) => prev.filter((pic) => pic !== uri))
                      }
                      borderStyle={{ width: 90, height: 90, borderRadius: 5 }}
                    />
                  </View>
                ))}
                <PhotoUpload
                  setPicUrl={(uri) => setPicList((prev) => [...prev, uri])}
                  borderStyle={{ width: 90, height: 90, borderRadius: 5 }}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.postButton}
                onPress={() => (item ? handleUpdatePost() : handleCreatePost())}
              >
                <Text style={styles.buttonText}>
                  {item ? "Update" : "Post"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputSection: {
    flex: 1,
    width: "100%",
    marginBottom: 26,
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 20,
  },
  dropDown: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "7%",
    paddingVertical: 10,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  postButton: {
    width: "100%",
    height: 50,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#3D7D6C",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  picList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  typeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  activeTypeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  typeText: {
    fontSize: 18,
    color: "#aaa",
  },
  activeTypeText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default CreatePostScreen;

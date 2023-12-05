import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { Input, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { addPost } from "../data/Actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DropDownPicker from "react-native-dropdown-picker";

function CreatePostScreen(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  // const [geopoint, setGeopoint] = useState(null);

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [types, setTypes] = useState([
    { label: "I lost my pet", value: "lost" },
    { label: "I found an unknown pet", value: "found" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
          <View style={styles.formContainer}>
          <Text style={styles.titleText}>Location</Text>
          <GooglePlacesAutocomplete
            placeholder="Search Location"
            onPress={(data, details = null) => {
              // console.log(data.description);
              // console.log(details.geometry.location);
              setLocation(data.description);
              // setGeopoint(details.geometry.location);
            }}
            query={{
              key: "AIzaSyAsBiGHdUmGB41gkhkVGiBH185EplwLX1c",
              language: "en",
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: "white",
                width: "80%",
                margin: 12,
                borderWidth: 1,
                borderRadius: 5,
              },
              textInput: {
                height: 40,
                color: "black",
                fontSize: 16,
              },
              listView: {
                height: "10%",
              },
            }}
          />
            <Text style={styles.titleText}>Post Type</Text>
            <DropDownPicker
              style={styles.dropDown}
              open={typeDropdownOpen}
              value={typeValue}
              items={types}
              setOpen={setTypeDropdownOpen}
              setValue={setTypeValue}
              setItems={setTypes}
              placeholder={"Choose your post type"}
            />
            <Text style={styles.titleText}>Breed</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setBreed(text)}
              value={breed}
              placeholder="Breed"
            />
            <Text style={styles.titleText}>Species</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSpecies(text)}
              value={species}
              placeholder="Species"
            />
            <Text style={styles.titleText}>Lost/Found Time</Text>
            <DateTimePicker
              value={time}
              mode="datetime"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || time;
                setTime(currentDate);
              }}
            />

            <Text style={styles.titleText}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDescription(text)}
              value={description}
              placeholder="Description"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => {
                dispatch(
                  addPost(
                    breed,
                    typeValue,
                    location,
                    time,
                    species,
                    description
                  )
                );
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 45,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
  dropDown: {
    width: "100%",
    height: 40,
    margin: 10,
    borderRadius: 5,
  },
  formContainer: {
    flex: 1,
    width: "85%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "5%",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    width: 250,
    height: 50,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#3D7D6C",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default CreatePostScreen;

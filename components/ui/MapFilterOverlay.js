import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../Secrets";

const MapFilterOverlay = ({
  mapRegion,
  setMapRegion,
  filterVisible,
  setFilterVisible,
  setSortedPosts,
}) => {
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
  const posts = useSelector((state) => state.posts);
  const [tempMapRegion, setTempMapRegion] = useState(mapRegion);
  const [startTime, setStartTime] = useState(oneMonthAgo.getTime() / 1000);
  const [endTime, setEndTime] = useState(now.getTime() / 1000);
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [speciesDropdownOpen, setSpeciesDropdownOpen] = useState(false);
  const [species, setSpecies] = useState([
    { label: "All", value: "All" },
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Bird", value: "Bird" },
    { label: "Hamster", value: "Hamster" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Reptile", value: "Reptile" },
  ]);

  useEffect(() => {
    setTempMapRegion(mapRegion);
  }, []);

  const handleApplyChanges = () => {
    const newSortedPosts = posts.filter((post) => {
      return (
        post.postTime >= startTime &&
        post.postTime <= endTime &&
        (selectedSpecies === "All" ||
          post.species.toLowerCase() === selectedSpecies.toLowerCase())
      );
    });

    setSortedPosts(newSortedPosts);
    setMapRegion(tempMapRegion);
    setFilterVisible(false);
    setTempMapRegion(mapRegion);
    setStartTime(oneMonthAgo.getTime() / 1000);
    setEndTime(now.getTime() / 1000);
    setSelectedSpecies("All");
    setSpeciesDropdownOpen(false);
  };

  return (
    <Overlay
      overlayStyle={styles.filterWindow}
      visible={filterVisible}
      onBackdropPress={() => setFilterVisible(!filterVisible)}
    >
      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() => {
          setTempMapRegion(mapRegion);
          setStartTime(oneMonthAgo.getTime() / 1000);
          setEndTime(now.getTime() / 1000);
          setSelectedSpecies("All");
          setSpeciesDropdownOpen(false);
          setSortedPosts(posts);
          setMapRegion(mapRegion);
          setFilterVisible(false);
        }}
      >
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
      <View style={styles.inputSection}>
        <Text style={styles.titleText}>Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          onPress={(data, details) => {
            const lat = details.geometry.location.lat;
            const lng = details.geometry.location.lng;
            setTempMapRegion({
              ...mapRegion,
              location: data.description,
              latitude: lat,
              longitude: lng,
            });
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          fetchDetails={true}
          //   scrollEnabled={false}
          textInputProps={{
            placeholderTextColor: "#aaa",
            leftIcon: {
              type: "font-awesome",
              name: "chevron-left",
              color: "#000",
            },
          }}
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

      <View style={[styles.inputSection, { zIndex: 10 }]}>
        <Text style={styles.titleText}>Species</Text>
        <DropDownPicker
          open={speciesDropdownOpen}
          value={selectedSpecies}
          items={species}
          setOpen={setSpeciesDropdownOpen}
          setValue={setSelectedSpecies}
          setItems={setSpecies}
          placeholder="Choose pet species"
          textStyle={{ fontSize: 18 }}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.titleText}>Post Time</Text>
        <View style={styles.timeSpan}>
          <Text style={styles.timeTitle}>From</Text>
          <DateTimePicker
            style={{ flex: 3 }}
            value={new Date(startTime * 1000)}
            mode="datetime"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || startTime;
              setStartTime(new Date(currentDate).getTime() / 1000);
            }}
          />
        </View>

        <View style={styles.timeSpan}>
          <Text style={styles.timeTitle}>To</Text>
          <DateTimePicker
            style={{ flex: 3 }}
            value={new Date(endTime * 1000)}
            mode="datetime"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || endTime;
              setEndTime(new Date(currentDate).getTime() / 1000);
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleApplyChanges()}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  filterWindow: {
    width: "80%",
    borderRadius: 10,
    padding: "5%",
    gap: 24,
  },
  resetBtn: {
    width: "100%",
    alignItems: "flex-end",
  },
  resetText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D7D6C",
  },
  inputSection: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 18,
    marginBottom: 5,
  },
  timeSpan: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeTitle: {
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: {
    position: "absolute",
    right: 25,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
  },
  applyButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default MapFilterOverlay;

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Icon, SearchBar, Overlay } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const FilterOverlay = ({ search, setSearch, setSortedPosts }) => {
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
  const [filterOn, setFilterOn] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortByTime, setSortByTime] = useState("Newest");
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
    handleApplyChanges();
  }, [posts]);

  handleApplyChanges = () => {
    const newSortedPosts = posts.filter((post) => {
      return (
        post.postTime >= startTime &&
        post.postTime <= endTime &&
        (selectedSpecies === "All" ||
          post.species.toLowerCase() === selectedSpecies.toLowerCase())
      );
    });
    if (sortByTime === "Newest") {
      newSortedPosts.sort((a, b) => b.postTime - a.postTime);
    } else {
      newSortedPosts.sort((a, b) => a.postTime - b.postTime);
    }
    setSortedPosts(newSortedPosts);
    setFilterVisible(false);
  };

  handleReset = () => {
    setSortedPosts(posts.sort((a, b) => b.postTime - a.postTime));
    setStartTime(oneMonthAgo.getTime() / 1000);
    setEndTime(new Date().getTime() / 1000);
    setSelectedSpecies("All");
    setSortByTime("Newest");
    setFilterVisible(false);
    setFilterOn(false);
  };

  return (
    <View style={styles.filterContainer}>
      <SearchBar
        placeholder="Search for keywords or contents"
        onChangeText={(text) => setSearch(text)}
        value={search}
        lightTheme={true}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
        <Icon
          name={filterOn ? "filter-check" : "filter-off-outline"}
          type="material-community"
          color="#3D7D6C"
          size={30}
        />
      </TouchableOpacity>

      <Overlay
        overlayStyle={styles.filterWindow}
        visible={filterVisible}
        onBackdropPress={() => setFilterVisible(!filterVisible)}
      >
        <TouchableOpacity style={styles.resetBtn} onPress={() => handleReset()}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={styles.titleText}>Sort by</Text>
          <View style={styles.sortByContainer}>
            <TouchableOpacity
              style={
                sortByTime === "Newest"
                  ? styles.activeSortByButton
                  : styles.sortByButton
              }
              onPress={() => setSortByTime("Newest")}
            >
              <Text
                style={
                  sortByTime === "Newest"
                    ? styles.activeSortByText
                    : styles.sortByText
                }
              >
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sortByTime === "Oldest"
                  ? styles.activeSortByButton
                  : styles.sortByButton
              }
              onPress={() => setSortByTime("Oldest")}
            >
              <Text
                style={
                  sortByTime === "Oldest"
                    ? styles.activeSortByText
                    : styles.sortByText
                }
              >
                Oldest
              </Text>
            </TouchableOpacity>
          </View>
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
          onPress={() => {
            handleApplyChanges();
            setFilterOn(true);
          }}
        >
          <Text style={styles.activeSortByText}>Apply</Text>
        </TouchableOpacity>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  sortByContainer: {
    flexDirection: "row",
    gap: 20,
  },
  activeTypeBtn: {
    borderBottomWidth: 4,
    borderBottomColor: "#3D7D6C",
    margin: "5%",
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
  searchBarContainer: {
    width: "90%",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  searchBarInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  filterContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  inputSection: {
    width: "100%",
    gap: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sortByButton: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  activeSortByButton: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sortByText: {
    fontSize: 18,
    color: "#aaa",
  },
  activeSortByText: {
    fontSize: 18,
    color: "#fff",
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
  filterWindow: {
    width: "80%",
    borderRadius: 10,
    padding: "5%",
    gap: 24,
  },
  timeSpan: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-around",
  },
  timeTitle: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
  },
});

export default FilterOverlay;

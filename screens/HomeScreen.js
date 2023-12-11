import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { Icon, SearchBar, Overlay } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPosts } from "../data/Actions";
import PostPreview from "../components/ui/PostPreview";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [typeValue, setTypeValue] = useState("lost");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortByTime, setSortByTime] = useState("Newest");
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [startTime, setStartTime] = useState(1449836880);
  const [endTime, setEndTime] = useState(new Date().getTime() / 1000);
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
    { label: "Others", value: "Others" },
  ]);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            onPress={() => setTypeValue("lost")}
            style={typeValue === "lost" ? styles.activeTypeBtn : styles.typeBtn}
          >
            <Text style={typeValue === "lost"? styles.activeTypeText: styles.typeText}>Pet Lost</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeValue("found")}
            style={typeValue === "found" ? styles.activeTypeBtn : styles.typeBtn}
          >
            <Text style={typeValue === "found"? styles.activeTypeText: styles.typeText}>Pet Found</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}> 
          <SearchBar
            placeholder="Search Posts"
            onChangeText={(text) => setSearch(text)}
            value={search}
            lightTheme={true}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
          />
          <TouchableOpacity
            onPress={() => setFilterVisible(!filterVisible)}
          >
            <Icon name="filter-variant" type="material-community" color="#3D7D6C" size={30}/>
          </TouchableOpacity>

          <Overlay 
            style={styles.filterWindow}
            visible={filterVisible}
            onBackdropPress={()=>setFilterVisible(!filterVisible)}
          >
            <Text style={styles.titleText}>Sort by</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity 
                style={{...styles.sortByButton, backgroundColor: sortByTime === "Newest"? "#3D7D6C": "#fff"}}
                onPress={() => setSortByTime("Newest")}
              >
                <Text style={{...styles.sortByText, color: sortByTime === "Newest"? "white": "black"}}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{...styles.sortByButton, backgroundColor: sortByTime === "Oldest"? "#3D7D6C": "#fff"}}
                onPress={() => setSortByTime("Oldest")}
              >
                <Text style={{...styles.sortByText, color: sortByTime === "Oldest"? "white": "black"}}>Oldest</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.titleText}>Species</Text>
              <DropDownPicker
                open={speciesDropdownOpen}
                value={selectedSpecies}
                items={species}
                setOpen={setSpeciesDropdownOpen}
                setValue={setSelectedSpecies}
                setItems={setSpecies}
                placeholder="Choose pet species"
                containerStyle={{width: "80%",margin:"3%"}}
              />

            <Text style={styles.titleText}>Post Time</Text>
              <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <Text>From</Text>
                <DateTimePicker
                  value={new Date(startTime * 1000)}
                  mode="datetime"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || startTime;
                    setStartTime(new Date(currentDate).getTime() / 1000);
                  }}
                />
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <Text>To</Text>
                <DateTimePicker
                  value={new Date(endTime * 1000)}
                  mode="datetime"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || endTime;
                    setEndTime(new Date(currentDate).getTime() / 1000);
                  }}
                />
              </View>

            <TouchableOpacity 
                style={styles.applyButton}
                onPress={()=>{
                  const newSortedPosts = posts.filter((post) => {
                    return (
                      post.postTime >= startTime && post.postTime <= endTime);
                  });
                  if(sortByTime === 'Newest') {
                    newSortedPosts.sort((a, b) => b.postTime - a.postTime );
                  } else {
                    newSortedPosts.sort((a, b) => a.postTime - b.postTime );
                  } 
                  setSortedPosts(newSortedPosts);
                  setFilterVisible(!filterVisible);
                }}
            >
              <Text style={styles.sortByText}>Apply</Text>
            </TouchableOpacity>
          </Overlay>
        </View>
        <PostPreview
          navigation={navigation}
          posts={sortedPosts.filter((post) => {
            const lowerCaseSearch = search.toLowerCase();
            return !post.resolved && post.type === typeValue && 
                  ((post.breed?.toLowerCase().includes(lowerCaseSearch)) ||
                   (post.species?.toLowerCase().includes(lowerCaseSearch)) ||
                   (post.description?.toLowerCase().includes(lowerCaseSearch)) ||
                   (post.location.address?.toLowerCase().includes(lowerCaseSearch)));
          })}
        />
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePost", { key: -1 })}
          // onPress={() => console.log(sortedPosts.map((post) => post.postTime))}
          // onPress={()=>{console.log(startTime, endTime)}}
        >
          <Icon name="plus" type="font-awesome" color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  createPostButton: {
    position: "absolute",
    right: 25,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    shadowColor: "#3D7D6C",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20, // only affects Android
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "left",
    width: "100%",
  },
  activeTypeBtn: {
    borderBottomWidth: 4,
    borderBottomColor: "#3D7D6C",
    margin: "5%"
  },
  typeBtn: {
    borderBottomWidth: 0,
    margin: "5%"
  },
  activeTypeText: { 
    fontWeight: "bold",
    fontSize: 20,
  },
  typeText: {
    fontWeight: "normal",
    fontSize: 20,
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
    borderRadius: 5
  },
  filterContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: "5%"
  },
  sortByButton: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
    marginHorizontal: "3%"
  },
  sortByText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff"
  },
  applyButton: {
    height: 50,
    width: 300,
    marginHorizontal:"3%",
    marginVertical:"10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
  },

});

export default HomeScreen;

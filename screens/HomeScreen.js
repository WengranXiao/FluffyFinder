import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPosts } from "../data/Actions";
import PostPreview from "../components/ui/PostPreview";
import FilterOverlay from "../components/ui/FilterOverlay";

const HomeScreen = (props) => {
  const { navigation } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [typeValue, setTypeValue] = useState("lost");
  const [sortedPosts, setSortedPosts] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            onPress={() => setTypeValue("lost")}
            style={typeValue === "lost" ? styles.activeTypeBtn : styles.typeBtn}
          >
            <Text
              style={
                typeValue === "lost" ? styles.activeTypeText : styles.typeText
              }
            >
              Pet Lost
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTypeValue("found")}
            style={
              typeValue === "found" ? styles.activeTypeBtn : styles.typeBtn
            }
          >
            <Text
              style={
                typeValue === "found" ? styles.activeTypeText : styles.typeText
              }
            >
              Pet Found
            </Text>
          </TouchableOpacity>
        </View>

        <FilterOverlay
          search={search}
          setSearch={setSearch}
          setSortedPosts={setSortedPosts}
        />

        <PostPreview
          navigation={navigation}
          posts={(sortedPosts === null ? posts : sortedPosts).filter((post) => {
            const lowerCaseSearch = search.toLowerCase();
            const isRelevantPost = !post.resolved && post.type === typeValue;

            const matchesSearch =
              lowerCaseSearch &&
              (post.breed?.toLowerCase().includes(lowerCaseSearch) ||
                post.species?.toLowerCase().includes(lowerCaseSearch) ||
                post.description?.toLowerCase().includes(lowerCaseSearch) ||
                post.location.address?.toLowerCase().includes(lowerCaseSearch));

            return isRelevantPost && (matchesSearch || !lowerCaseSearch);
          })}
        />

        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePost", { key: -1 })}
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
    margin: "5%",
  },
  typeBtn: {
    borderBottomWidth: 0,
    margin: "5%",
  },
  activeTypeText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  typeText: {
    fontWeight: "normal",
    fontSize: 20,
  },
});

export default HomeScreen;

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "@rneui/themed";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPosts, loadUserInfo } from "../data/Actions";
import PostPreview from "../components/ui/PostPreview";

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PostPreview navigation={navigation} posts={posts} />
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePost",{key:-1})}
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
});

export default HomeScreen;

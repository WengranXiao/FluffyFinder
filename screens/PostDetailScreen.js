import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPosts } from "../data/Actions";
import { Button, Icon } from "@rneui/themed";
import ImageSwiper from "../components/ui/ImageSwiper";

function PostDetailScreen(props) {
  const { navigation, route } = props;
  const { key } = route.params;
  const posts = useSelector((state) => state.posts);
  const selectedPost = posts.find((item) => item.key === key);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  console.log("route", route);
  console.log("navigation", navigation);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.navigationBar}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.titleText}>{selectedPost.author}</Text>
          <Icon
            name="dots-horizontal"
            size={35}
            type="material-community"
            onPress={() => {}}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <ImageSwiper
              images={[
                "https://headsupfortails.com/cdn/shop/articles/cat_sleeping_with_toy_large.jpg?v=1645094444",
                "https://static01.nyt.com/images/2021/11/23/business/00cutecats-disinfo-promo/00cutecats-disinfo-promo-mediumSquareAt3X.png",
              ]}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>Breed</Text>
            <View style={styles.infoRow}>
              <Icon name="paw" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>{selectedPost.breed}</Text>
            </View>
            <Text style={styles.titleText}>Species</Text>
            <View style={styles.infoRow}>
              <Icon
                name="progress-question"
                type="material-community"
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>{selectedPost.species}</Text>
            </View>
            <Text style={styles.titleText}>Lost Time</Text>
            <View style={{ ...styles.infoRow }}>
              <Icon name="clock" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>
              {new Date(selectedPost.postTime*1000).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.titleText}>Lost Location</Text>
            <View style={styles.infoRow}>
              <Icon
                name="map-marker"
                type="material-community"
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>{selectedPost.location}</Text>
            </View>
            <Text style={styles.titleText}>Description</Text>
            <View style={styles.infoRow}>
              <Icon
                name="comment-quote"
                type="material-community"
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>{selectedPost.description}</Text>
            </View>
            <Text style={styles.titleText}>Contact</Text>
            <View style={styles.infoRow}>
              <Icon name="phone" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>123456789</Text>
              <Icon
                name="content-copy"
                type="material-community"
                color="#3D7D6C"
              />
            </View>
            <View style={styles.infoRow}>
              <Icon name="email" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>fakeemail@gmail.com</Text>
              <Icon
                name="content-copy"
                type="material-community"
                color="#3D7D6C"
              />
            </View>
            <View style={styles.line} />

            <Text style={styles.titleText}>Comments</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePost")}
          style={styles.commentButton}
        >
          <Icon name="comment" type="material-community" color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "white",
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginHorizontal: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "top",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    marginHorizontal: "5%",
  },
  imageContainer: {
    height: 300,
  },
  commentButton: {
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
  line: {
    height: 1,
    width: "90%",
    backgroundColor: "#000000",
    marginHorizontal: "5%",
    marginVertical: "10%",
  },
});

export default PostDetailScreen;

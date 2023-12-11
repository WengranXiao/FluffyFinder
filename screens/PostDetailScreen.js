import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getPostAuthorInfo,
  unsubscribeFromPostComments,
} from "../data/Actions";
import { Icon } from "@rneui/themed";
import ImageSwiper from "../components/ui/ImageSwiper";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

function PostDetailScreen(props) {
  const {
    navigation,
    route: {
      params: { key },
    },
  } = props;

  const [userInfo, setUserInfo] = useState({});
  const posts = useSelector((state) => state.posts);
  const selectedPost = posts.find((item) => item.key === key);
  const postComments = useSelector((state) => state.postComments);

  useEffect(() => {
    getPostAuthorInfo(selectedPost.author).then((userInfo) => {
      setUserInfo(userInfo);
    });
  }, [key]);

  useEffect(() => {
    return () => {
      unsubscribeFromPostComments();
    };
  }, []);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Toast.show("Copied to Clipboard!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      backgroundColor: "#3D7D6C",
      shadowColor: "#3D7D6C",
      opacity: 0.9,
    });
  };

  const speciesMap = {
    dog: "dog",
    cat: "cat",
    horse: "horse",
    cow: "cow",
    fish: "fish",
    bird: "dove",
    frog: "frog",
    otter: "otter",
    hippo: "hippo",
    spider: "spider",
    insect: "locust",
    dragon: "dragon",
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <View style={styles.navigationBar}>
              <TouchableOpacity
                style={styles.btnArea}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" type="font-awesome" color="#fff" />
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.btnArea} onPress={() => {}}>
                <Icon
                  name="dots-horizontal"
                  size={35}
                  type="material-community"
                  color="#fff"
                />
              </TouchableOpacity> */}
            </View>
            <ImageSwiper images={selectedPost.pictures} />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>Species</Text>
            <View style={styles.infoRow}>
              <Icon
                name={speciesMap[selectedPost.species.toLowerCase() || "dna"]}
                type="font-awesome-5"
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>{selectedPost.species}</Text>
            </View>

            <Text style={styles.titleText}>Breed</Text>
            <View style={styles.infoRow}>
              <Icon name="paw" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>{selectedPost.breed}</Text>
            </View>

            <Text style={styles.titleText}>Lost Time</Text>
            <View style={{ ...styles.infoRow }}>
              <Icon name="clock" type="material-community" color="#3D7D6C" />
              <Text style={styles.infoText}>
                {new Date(selectedPost.postTime * 1000).toLocaleString()}
              </Text>
            </View>

            <Text style={styles.titleText}>Lost Location</Text>
            <View style={styles.infoRow}>
              <Icon
                name="map-marker"
                type="material-community"
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>
                {selectedPost.location.address}
              </Text>
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

            <View style={styles.line} />

            <Text style={styles.titleText}>Contact</Text>

            <View style={styles.infoRow}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginBottom: 4,
                  width: "100%",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Profile", { otherUser: userInfo })
                }
              >
                <Image
                  source={{
                    uri: userInfo.profilePicUrl,
                  }}
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 37,
                    marginRight: 20,
                    borderWidth: 1,
                    borderColor: "#3D7D6C",
                  }}
                />
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {userInfo.displayName}
                </Text>
              </TouchableOpacity>
            </View>

            {userInfo.contactEmail && (
              <View style={styles.infoRow}>
                <Icon name="email" type="material-community" color="#3D7D6C" />
                <Text style={styles.infoText}>{userInfo.contactEmail}</Text>
                <TouchableOpacity
                  style={styles.copyBtn}
                  onPress={() => copyToClipboard(userInfo.contactEmail)}
                >
                  <Icon
                    name="content-copy"
                    type="material-community"
                    color="#3D7D6C"
                  />
                </TouchableOpacity>
              </View>
            )}

            {userInfo.contactPhone && (
              <View style={styles.infoRow}>
                <Icon name="phone" type="material-community" color="#3D7D6C" />
                <Text style={styles.infoText}>{userInfo.contactPhone}</Text>
                <TouchableOpacity
                  style={styles.copyBtn}
                  onPress={() => copyToClipboard(userInfo.contactPhone)}
                >
                  <Icon
                    name="content-copy"
                    type="material-community"
                    color="#3D7D6C"
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.line} />
          </View>

          <View style={styles.commentContainer}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.titleText}>Comments</Text>
              <Text style={{ fontSize: 16 }}>
                {postComments.length > 0 ? postComments.length : ""}
              </Text>
            </View>
            {postComments.length ? (
              postComments.map((comment, index) => (
                <View key={index} style={styles.commentSection}>
                  <View>
                    <Image
                      source={{ uri: comment.authorPic }}
                      style={styles.commentAuthorPic}
                    />
                  </View>
                  <View style={{ flex: 1, gap: 6 }}>
                    <View style={styles.commentHeader}>
                      <Text style={{ fontSize: 16 }}>{comment.authorName}</Text>
                      <Text style={{ fontSize: 16, color: "#7B7B7B" }}>
                        {new Date(comment.timestamp * 1000).toLocaleString()}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 18 }}>
                      {comment.commentContent}
                    </Text>
                    <ScrollView horizontal={true}>
                      {comment.commentPics.map((pic, index) => (
                        <Image
                          key={index}
                          source={{ uri: pic }}
                          style={{ width: 120, height: 120, borderRadius: 4 }}
                        />
                      ))}
                    </ScrollView>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.commentSection}>
                <Text style={{ fontSize: 16 }}> No Comment</Text>
              </View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateComment", { key })}
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
    width: "100%",
    height: "100%",
    position: "relative",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    width: "100%",
    zIndex: 1,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    paddingTop: 1,
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "top",
    justifyContent: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: "5%",
    boxSizing: "border-box",
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
    flex: 1,
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
    marginVertical: "5%",
  },
  copyBtn: {
    width: 40,
    height: 30,
    alignItems: "flex-end",
  },
  btnArea: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  commentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: "5%",
    boxSizing: "border-box",
  },
  commentSection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    boxSizing: "border-box",
    gap: 12,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C8C8C8",
    paddingBottom: 24,
  },
  commentAuthorPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3D7D6C",
  },
  commentHeader: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default PostDetailScreen;

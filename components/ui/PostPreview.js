import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import ImageSwiper from "./ImageSwiper";
import React, { useState } from "react";
import { deletePost, resolvePost } from "../../data/Actions";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

const PostPreview = ({ posts, navigation, isProfile, showOverlay }) => {
  const [currentEditPost, setCurrentEditPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <FlatList
      width="100%"
      contentContainerStyle={{
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 6,
      }}
      showsVerticalScrollIndicator={false}
      data={posts}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View
            style={{
              height: 300,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
            }}
          >
            <ImageSwiper images={item.pictures} />
            {isProfile && (
              <View style={styles.buttonAndModalContainer}>
                <TouchableOpacity
                  style={{
                    width: 42,
                    height: 42,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setCurrentEditPost(item);
                  }}
                >
                  <Icon
                    name="file-edit"
                    type="material-community"
                    color="#3D7D6C"
                    size={30}
                  />
                </TouchableOpacity>
                <Modal
                  isVisible={modalVisible}
                  topDistance={52}
                  onClose={() => setModalVisible(false)}
                  buttons={[
                    {
                      text: "Edit Post",
                      onPress: () => {
                        navigation.navigate("CreatePost", {
                          key: currentEditPost.key,
                        });
                        setModalVisible(false);
                      },
                      color: "#3D7D6C",
                    },
                    {
                      text: "Successfully Reunited!",
                      onPress: () => {
                        dispatch(resolvePost(currentEditPost));
                        setModalVisible(false);
                        showOverlay();
                      },
                      color: "#3D7D6C",
                    },
                    {
                      text: "Delete Post",
                      onPress: async () => {
                        dispatch(deletePost(currentEditPost));
                        setModalVisible(false);
                      },
                      color: "#FF3131",
                    },
                  ]}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetail", { key: item.key })}
            style={styles.cardInfo}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>{item.species}</Text>
              <Text style={styles.titleSuffix}> • {item.breed}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon
                name="map-marker"
                type="material-community"
                width={20}
                style={{ marginLeft: -2 }}
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>{item.location.address}</Text>
            </View>
            <View style={{ ...styles.infoRow, marginTop: 20 }}>
              <Icon
                name="clock"
                type="material-community"
                size={20}
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>
                {new Date(item.postTime * 1000).toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon
                name="comment-quote"
                type="material-community"
                size={20}
                color="#3D7D6C"
              />
              <Text
                numberOfLines={3} // Limit text to one line
                ellipsizeMode="tail"
                style={styles.quoteText}
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 20, // only affects Android
  },
  cardInfo: {
    flex: 1,
    padding: 16,
    paddingBottom: 26,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  titleSuffix: {
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 26,
    width: "100%",
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingTop: 2,
  },
  quoteText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontStyle: "italic",
  },
  buttonAndModalContainer: {
    flex: 1,
    height: 32,
    position: "relative",
    alignItems: "flex-end",
    zIndex: 10,
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default PostPreview;

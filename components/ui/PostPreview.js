import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Overlay  } from "@rneui/themed";
import ImageSwiper from "./ImageSwiper";
import React, { useState } from 'react';
// import { } from 'react-native-elements';
import { deletePost } from '../../data/Actions';
import { useDispatch } from 'react-redux';

const PostPreview = ({ posts, navigation,isProfile }) => {
  const [visible, setVisible] = useState(false);
  const toggleEditOverlay = () => {
    setVisible(!visible);
  };
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
            <ImageSwiper
              images={[
                "https://headsupfortails.com/cdn/shop/articles/cat_sleeping_with_toy_large.jpg?v=1645094444",
                "https://static01.nyt.com/images/2021/11/23/business/00cutecats-disinfo-promo/00cutecats-disinfo-promo-mediumSquareAt3X.png",
              ]}
            />
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
              <Text style={styles.infoText}>{item.location}</Text>
            </View>
            <View style={{ ...styles.infoRow, marginTop: 20 }}>
              <Icon
                name="clock"
                type="material-community"
                size={20}
                color="#3D7D6C"
              />
              <Text style={styles.infoText}>
                {new Date(item.postTime*1000).toLocaleString()}
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
            {isProfile ? (
              <View>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() =>toggleEditOverlay() }
              >
                <Icon
                  name="file-edit-outline"
                  type="material-community"
                  color="#3D7D6C"
                  size={30}
                />
              </TouchableOpacity>
              <Overlay isVisible={visible} onBackdropPress={toggleEditOverlay}>
                <Button 
                  title="Edit Post"
                  color={"#3D7D6C"}
                  style={{marginBottom: 10}}
                  onPress={() => navigation.navigate("EditPost", { key: item.key })}
                />
                <Button
                  title="Delete Post"
                  color={"#3D7D6C"}
                  onPress={() =>{dispatch(deletePost(item))} }
                />
              </Overlay>
             </View>
            ) : null}

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
    marginLeft: 8,
    fontSize: 16,
    paddingTop: 2,
  },
  quoteText: {
    marginLeft: 8,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default PostPreview;
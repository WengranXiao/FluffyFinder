import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import ImageSwiper from "./ImageSwiper";

const PostPreview = ({ navigation }) => {
  const posts = useSelector((state) => state.posts);

  return (
    <FlatList
      width="100%"
      style={{ width: "100%" }}
      contentContainerStyle={{
        alignItems: "center",
        width: "100%",
      }}
      showsVerticalScrollIndicator={false}
      data={posts}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PostDetail", { key: item.key })}
        >
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
                "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
                "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
              ]}
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>Breed</Text>
              <Text style={styles.titleSuffix}> • Male</Text>
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
                {new Date(item.postTime.seconds * 1000).toLocaleString()}
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
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
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
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
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

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import { signOut } from "../AuthManager";
import { useSelector } from "react-redux";
import PostPreview from "../components/ui/PostPreview";

const ProfileScreen = ({ navigation, route }) => {
  const [tab, setTab] = useState(0);
  const userInfo = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const tabs = route?.params?.otherUser
    ? ["Pet Lost", "Pet Found"]
    : ["Pet Lost", "Pet Found", "Archived"];

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginBottom: 20,
            alignSelf: "flex-start",
            display: route?.params?.otherUser ? "flex" : "none",
          }}
        >
          <Icon name="arrow-left" type="font-awesome" />
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              source={{ uri: userInfo.profilePicUrl }}
              style={{
                width: 74,
                height: 74,
                borderRadius: 37,
                marginRight: 20,
              }}
            />
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {userInfo.displayName}
            </Text>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#3D7D6C",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                position: "absolute",
                right: 0,
              }}
            >
              <Icon name="settings-sharp" type="ionicon" color="#fff" />
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.contactLine}>
              <Icon name="email" type="zocial" size={22} color="#3D7D6C" />
              <Text style={{ fontSize: 16 }}>{userInfo.contactEmail}</Text>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  position: "absolute",
                  right: 0,
                  display: route?.params?.otherUser ? "flex" : "none",
                }}
              >
                <Icon
                  name="content-copy"
                  type="material"
                  color="#3D7D6C"
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contactLine}>
              <Icon
                name="phone-alt"
                type="font-awesome-5"
                size={22}
                color="#3D7D6C"
              />
              <Text style={{ fontSize: 16 }}>{userInfo.contactPhone}</Text>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  position: "absolute",
                  right: 0,
                  display: route?.params?.otherUser ? "flex" : "none",
                }}
              >
                <Icon
                  name="content-copy"
                  type="material"
                  color="#3D7D6C"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.break} />

        <View style={styles.postSection}>
          <View style={styles.tabs}>
            {tabs.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 90,
                  textAlign: "center",
                  marginHorizontal: 10,
                  paddingBottom: 2,
                  borderBottomWidth: 4,
                  borderBottomColor: index === tab ? "#3D7D6C" : "transparent",
                }}
                onPress={() => setTab(index)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",

                    fontWeight: index === tab ? "bold" : "normal",
                    color: index === tab ? "#3D7D6C" : "#808080",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <PostPreview navigation={navigation} posts={posts} />
        </View>

        <Button
          onPress={async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
            }
          }}
        >
          Now sign out!
        </Button>
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
  break: {
    width: "100%",
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 20,
  },
  profileSection: {
    width: "100%",
    gap: 30,
  },
  contactLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },
  postSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  tabs: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default ProfileScreen;

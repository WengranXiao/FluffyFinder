import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Overlay, Icon } from "@rneui/themed";
import { signOut } from "../AuthManager";
import { useSelector } from "react-redux";
import PostPreview from "../components/ui/PostPreview";
import Modal from "../components/ui/Modal";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

const ProfileScreen = ({ navigation, route }) => {
  const isOtherUser = route?.params?.otherUser;
  const [tab, setTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const userInfo = isOtherUser
    ? isOtherUser
    : useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const tabs = isOtherUser
    ? ["Pet Lost", "Pet Found"]
    : ["Pet Lost", "Pet Found", "Archived"];

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

  const tabMap = ["lost", "found"];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isOtherUser && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: 20,
              alignSelf: "flex-start",
            }}
          >
            <Icon name="arrow-left" type="font-awesome" />
          </TouchableOpacity>
        )}

        <View style={styles.profileSection}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              zIndex: 1,
            }}
          >
            <Image
              source={{ uri: userInfo.profilePicUrl }}
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

            {!isOtherUser && (
              <View style={styles.buttonAndModalContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#3D7D6C",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <Icon name="settings-sharp" type="ionicon" color="#fff" />
                </TouchableOpacity>
                <Modal
                  isVisible={modalVisible}
                  topDistance={40}
                  onClose={() => setModalVisible(false)}
                  buttons={[
                    {
                      text: "Edit Profile",
                      onPress: () => {
                        navigation.navigate("ProfileEdit");
                        setModalVisible(false);
                      },
                      color: "#3D7D6C",
                    },
                    {
                      text: "Sign Out",
                      onPress: async () => {
                        try {
                          setModalVisible(false);
                          await signOut();
                        } catch (error) {
                          Alert.alert("Sign Out Error", error.message, [
                            { text: "OK" },
                          ]);
                        }
                      },
                      color: "#FF3131",
                    },
                  ]}
                />
              </View>
            )}
          </View>

          <View>
            {userInfo.contactEmail && (
              <View style={styles.contactLine}>
                <Icon name="email" type="zocial" size={22} color="#3D7D6C" />
                <Text style={{ fontSize: 16 }}>{userInfo.contactEmail}</Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(userInfo.contactEmail)}
                  style={{
                    position: "absolute",
                    right: 0,
                    display: isOtherUser ? "flex" : "none",
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
            )}

            {userInfo.contactPhone && (
              <View style={styles.contactLine}>
                <Icon
                  name="phone-alt"
                  type="font-awesome-5"
                  size={22}
                  color="#3D7D6C"
                />
                <Text style={{ fontSize: 16 }}>{userInfo.contactPhone}</Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(userInfo.contactPhone)}
                  style={{
                    position: "absolute",
                    right: 0,
                    display: isOtherUser ? "flex" : "none",
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
            )}
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

          <PostPreview
            navigation={navigation}
            posts={posts.filter((post) =>
              tab === 2
                ? post.resolved && post.author === userInfo.key
                : !post.resolved &&
                  post.type === tabMap[tab] &&
                  post.author === userInfo.key
            )}
            isProfile={!route?.params?.otherUser && tab !== 2}
            showOverlay={() => setOverlayVisible(true)}
          />
          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
            overlayStyle={{
              width: "80%",
              padding: 30,
              gap: 30,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Congratulations!
            </Text>
            <View>
              <Text style={{ fontSize: 16 }}>
                Reunited at last! Let's keep our beloved pets safe and secure -
                they're family. Treasure and protect them always.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setOverlayVisible(false)}
              style={{
                backgroundColor: "#3D7D6C",
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 80,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                Done
              </Text>
            </TouchableOpacity>
          </Overlay>
        </View>
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
    zIndex: 1,
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonAndModalContainer: {
    flex: 1,
    height: 32,
    position: "relative",
    alignItems: "flex-end",
    zIndex: 10,
  },
});

export default ProfileScreen;

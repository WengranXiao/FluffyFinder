import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { saveProfilePic, addComment } from "../data/Actions";
import PhotoUpload from "../components/ui/PhotoUpload";

function CreateCommentScreen({
  navigation,
  route: {
    params: { key },
  },
}) {
  const user = useSelector((state) => state.user);

  const [commentContent, setCommentContet] = useState("");
  const [picList, setPicList] = useState([]);

  handleCreateComment = () => {
    hanldeUploadPics().then((uploadedPicList) => {
      addComment(key, {
        author: user.key,
        authorName: user.displayName,
        authorPic: user.profilePicUrl,
        commentContent,
        commentPics: uploadedPicList,
        timestamp: new Date(),
      });
      navigation.goBack();
    });
  };

  hanldeUploadPics = async () => {
    const uploadedPicList = await Promise.all(
      picList.map((pic) => saveProfilePic({ uri: pic }))
    );

    return uploadedPicList;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            left: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Comment</Text>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.titleText}>Comment</Text>
            <TextInput
              style={[styles.input, { height: 100, paddingTop: 10 }]}
              multiline={true}
              onChangeText={(text) => setCommentContet(text)}
              value={commentContent}
              placeholder="Enter Comment"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.titleText}>Photo</Text>
            <View style={styles.picList}>
              {picList.map((picUrl, index) => (
                <View key={index}>
                  <PhotoUpload
                    picUrl={picUrl}
                    setPicUrl={(uri) => setPicList((prev) => [...prev, uri])}
                    removePic={(uri) =>
                      setPicList((prev) => prev.filter((pic) => pic !== uri))
                    }
                    borderStyle={{ width: 90, height: 90, borderRadius: 5 }}
                  />
                </View>
              ))}
              <PhotoUpload
                setPicUrl={(uri) => setPicList((prev) => [...prev, uri])}
                borderStyle={{ width: 90, height: 90, borderRadius: 5 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => handleCreateComment()}
          >
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "7%",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputSection: {
    width: "100%",
    marginBottom: 26,
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 20,
  },

  formContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  postButton: {
    width: "100%",
    height: 50,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#3D7D6C",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  picList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  typeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  activeTypeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  typeText: {
    fontSize: 18,
    color: "#aaa",
  },
  activeTypeText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default CreateCommentScreen;

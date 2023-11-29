import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPosts, loadUserInfo } from "../data/Actions";

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadPosts());
  }, []);

  return (
    <SafeAreaView>

      <FlatList 
        data={posts}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Image
              style={{ width: "40%", height: "80%" }}
              source={require("../sampleCatImage.jpg")}
            />
            <View style={styles.postTextContainer}>
              <Text>{item.breed}</Text> 
              <Text>{new Date(item.postTime.seconds * 1000).toLocaleString()}</Text>
  
              <Text>{item.location}</Text>  
              <Text>{item.description}</Text>
              <Button 
                title="See Detail" 
                onPress={() => {navigation.navigate('PostDetail',{key: item.key})}}  
              />
            </View>           
          </View>
        )}
      />
      <Button
        title= "Create Post"
        onPress={() => navigation.navigate('CreatePost')}

      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    height: 180,
  },
  postTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default HomeScreen;

import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadLostPosts } from "../data/Actions";

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const lostPosts = useSelector((state) => state.lostPosts);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadLostPosts());
  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <FlatList 
        data={lostPosts}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Image
                style={{width: '40%', height: '80%'}}
                source={require('../sampleCatImage.jpg')}
              />
            <View style={styles.postTextContainer}>
              <Text>{item.name}</Text>
              <Text>{item.breed}</Text> 
              <Text>{item.time}</Text>
              <Text>{item.location}</Text>  
              <Button title="See Detail" onPress={() => {navigation.navigate('PostDetail',{key: item.key})}} />
            </View>
          </View>
        )} 
      />
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 180,
  },
  postTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

  },
});


export default HomeScreen;

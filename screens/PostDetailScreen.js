import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadLostPosts } from "../data/Actions";
import { Button, Icon } from '@rneui/themed';


function PostDetailScreen(props) {
  const { navigation, route } = props;
  const { key } = route.params;
  const lostPosts = useSelector((state) => state.lostPosts);
  const selectedPost = lostPosts.find(item=>(item.key===key));
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadLostPosts());
  }, []);

  return (
    <View>
      <View style={styles.navigationBar}>
        <Icon 
          name="arrow-left"
          type="font-awesome"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.titleText}>{selectedPost.author}</Text>
        <Icon 
          name="user"
          type="font-awesome"
          onPress={() => {navigation.navigate('SettingsScreen', {})}} 
          />
      </View>

      <Image
        style={{width: '100%', height: '30%'}}
        source={require('../sampleCatImage.jpg')}
      />

      <View>
        <Text style={styles.titleText}>Breed</Text>
        <Text style={styles.infoText}>{selectedPost.breed}</Text>
        <Text style={styles.titleText}>Color</Text>
        <Text style={styles.infoText}>{selectedPost.color}</Text>
        <Text style={styles.titleText}>Lost Time</Text>
        <Text style={styles.infoText}>{selectedPost.time}</Text>
        <Text style={styles.titleText}>Lost Location</Text>
        <Text style={styles.infoText}>{selectedPost.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.commentButton} title='Comment' onPress={() => {}} />
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
    height: 100,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  infoText: {
    fontSize: 16,
    margin: 10,
  },
  commentButton: {
    width: '30%',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default PostDetailScreen;
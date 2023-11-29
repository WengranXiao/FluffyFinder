import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, TextInput } from "react-native";
import { CheckBox } from '@rneui/themed';
import { Input, Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';
import { addPost } from '../data/Actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';

function CreatePostScreen (props) {
  const { navigation} = props;
  const dispatch = useDispatch();

  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  // const [geopoint, setGeopoint] = useState(null);

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [types, setTypes] = useState([
      {label: 'I lost my pet', value: 'lost'},
      {label: 'I found an unknown pet', value: 'found'},
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
      Create Post
      </Text>
      <DropDownPicker
        style={styles.input}
        open={typeDropdownOpen}
        value={typeValue}
        items={types}
        setOpen={setTypeDropdownOpen}
        setValue={setTypeValue}
        setItems={setTypes}
        placeholder={'Choose your post type'}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setBreed(text)}
        value={breed}
        placeholder="Breed"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setSpecies(text)}
        value={species}
        placeholder="Species"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>setDescription(text)}
        value={description}
        placeholder="Description"
      />
      <Text>Lost/Found Time</Text>
      <DateTimePicker
        value={time}
        mode="datetime"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || time;
          setTime(currentDate);
        }}
        />
      <GooglePlacesAutocomplete
        placeholder='Search Location'
        onPress={(data, details = null) => {
          console.log(data.description);
          // console.log(details.geometry.location);
          setLocation(data.description);
          // setGeopoint(details.geometry.location);
        }}
        query={{
          key: 'AIzaSyAsBiGHdUmGB41gkhkVGiBH185EplwLX1c',
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: { 
            backgroundColor: 'white',
            width: '80%',
            margin: 12,
          },
          textInput: {
            height: 40,
            color: 'black',
            fontSize: 16,
          },
          listView: {
            height: '10%',
          },
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Home');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{            
            dispatch(addPost(breed, typeValue, location,time, species, description));
            navigation.navigate('Home');      
          }}
        />
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    margin: 20,
  },
  
});

export default CreatePostScreen;

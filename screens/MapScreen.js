import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { GOOGLE_API_KEY } from "../Secrets";

const MapScreen = ({ navigation }) => {
  const initRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const posts = useSelector((state) => state.posts);
  const [location, setLocation] = useState(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [mapRegion, setMapRegion] = useState(initRegion);
  const [places, setPlaces] = useState([]);

  let unsubscribeFromLocation = null;

  const subscribeToLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    setPermissionsGranted(status === "granted");

    if (unsubscribeFromLocation) {
      unsubscribeFromLocation();
    }
    unsubscribeFromLocation = await watchPositionAsync(
      {
        // accuracy: Accuracy.Highest,
        // distanceInterval: 1, // 1 meter
        // timeInterval: 1000, // 1000ms = 1s
      },
      (location) => {
        setLocation(location);

        setMapRegion({
          ...mapRegion,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );
  };

  useEffect(() => {
    subscribeToLocation();
  }, []);

  // const searchLocations = async () => {
  //   let placesURI =
  //     "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  //   placesURI += "location=" + location.coords.latitude;
  //   placesURI += "%2C" + location.coords.longitude;
  //   placesURI += "&type=restaurant";
  //   placesURI += "&radius=5000"; // 5km
  //   placesURI += "&key=" + GOOGLE_API_KEY;

  //   console.log(placesURI);
  //   let response = await fetch(placesURI);
  //   let results = await response.json();

  //   let newPlaces = [];
  //   for (let r of results.results) {
  //     let newPlace = {};
  //     newPlace.latitude = r.geometry.location.lat;
  //     newPlace.longitude = r.geometry.location.lng;
  //     newPlace.name = r.name;
  //     newPlace.id = r.place_id;
  //     newPlaces.push(newPlace);
  //   }
  //   console.log(newPlaces);
  //   setPlaces(newPlaces);
  // };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        showsUserLocation={true}
      >
        {posts.map((post, key) => (
          <Marker
            key={key}
            coordinate={{
              latitude: post.location.lat,
              longitude: post.location.lng,
            }}
            onPress={() => navigation.navigate("PostDetail", { key: post.key })}
          >
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri:
                    post.pictures && post.pictures.length
                      ? post.pictures[0]
                      : "../assets/favicon.png",
                }}
                style={styles.image}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.filterButton}
        // onPress={() => navigation.navigate("CreatePost", { key: -1 })}
      >
        <Icon name="filter" type="material-community" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  paragraph: {
    fontSize: 24,
  },

  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  filterButton: {
    position: "absolute",
    right: 25,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
  },
  shadowContainer: {
    width: 80,
    height: 80,
    alignItem: "center",
    justifyContent: "center",
    shadowColor: "#A0C7B5",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20, // only affects Android
  },
  imgContainer: {
    height: 70,
    width: 70,
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "#fff",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 2,
  },
});

export default MapScreen;

import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import MapFilterOverlay from "../components/ui/MapFilterOverlay";

const MapScreen = ({ navigation }) => {
  const initRegion = {
    location: "",
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const posts = useSelector((state) => state.posts);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [mapRegion, setMapRegion] = useState(initRegion);
  const [filterVisible, setFilterVisible] = useState(false);
  const [distance, setDistance] = useState(1000);
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const [filterOn, setFilterOn] = useState(false);
  const [region, setRegion] = useState(initRegion);

  let unsubscribeFromLocation = null;

  const subscribeToLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    setPermissionsGranted(status === "granted");

    if (unsubscribeFromLocation) {
      unsubscribeFromLocation();
    }
    unsubscribeFromLocation = await watchPositionAsync(
      {
        accuracy: Accuracy.Highest,
        // distanceInterval: 1, // 1 meter
        // timeInterval: 1000, // 1000ms = 1s
      },
      (location) => {
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

  const filterPostsBasedOnRegion = (newPosts, newRegion) => {
    const compareRegion = newRegion || region;
    const visiblePosts = newPosts.filter((post) => {
      return (
        post.location.lat >=
          compareRegion.latitude - compareRegion.latitudeDelta / 2 &&
        post.location.lat <=
          compareRegion.latitude + compareRegion.latitudeDelta / 2 &&
        post.location.lng >=
          compareRegion.longitude - compareRegion.longitudeDelta / 2 &&
        post.location.lng <=
          compareRegion.longitude + compareRegion.longitudeDelta / 2
      );
    });
    setVisiblePosts(visiblePosts);
    newRegion && setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapFilterOverlay
        mapRegion={mapRegion}
        setMapRegion={setMapRegion}
        distance={distance}
        setDistance={setDistance}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        setSortedPosts={setSortedPosts}
        filterPostsBasedOnRegion={filterPostsBasedOnRegion}
        setFilterOn={setFilterOn}
      />
      {permissionsGranted && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            latitudeDelta: mapRegion.latitudeDelta,
            longitudeDelta: mapRegion.longitudeDelta,
          }}
          onRegionChangeComplete={(newRegion) =>
            filterPostsBasedOnRegion(sortedPosts, newRegion)
          }
          showsUserLocation={true}
        >
          {visiblePosts.map((post) => (
            <Marker
              key={post.key}
              coordinate={{
                latitude: post.location.lat,
                longitude: post.location.lng,
              }}
              onPress={() =>
                navigation.navigate("PostDetail", { key: post.key })
              }
            >
              <View style={styles.imgContainer}>
                <ImageBackground
                  source={require("../assets/lost_pets.png")}
                  resizeMode="cover"
                >
                  <Image
                    source={
                      post.pictures && post.pictures.length && post.pictures[0]
                    }
                    style={styles.image}
                  />
                </ImageBackground>
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      <TouchableOpacity
        style={filterOn ? styles.filterButtonOn : styles.filterButtonOff}
        onPress={() => setFilterVisible(true)}
      >
        <Icon
          name={filterOn ? "filter-outline" : "filter-off-outline"}
          type="material-community"
          color={filterOn ? "#fff" : "#3D7D6C"}
        />
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
  filterWindow: {
    width: "80%",
    borderRadius: 10,
    padding: "5%",
    gap: 24,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  filterButtonOn: {
    position: "absolute",
    right: 25,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
  },
  filterButtonOff: {
    position: "absolute",
    right: 25,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#3D7D6C",
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
  applyButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#3D7D6C",
    borderWidth: 1,
    borderColor: "#3D7D6C",
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default MapScreen;

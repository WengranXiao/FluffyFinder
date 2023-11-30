import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const ImageSwiper = ({ images }) => {
  return (
    <Swiper
      autoplay={false}
      loop={false}
      activeDotColor="#3D7D6C"
      dotColor="#eee"
    >
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSwiper;

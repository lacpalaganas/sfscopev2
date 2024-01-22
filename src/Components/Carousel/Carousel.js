import React from "react";
import { StatusBar, StyleSheet, View, Linking } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { useState, useEffect } from "react";
import axios from "axios";

import { COLORS } from "../../../constants";
const Carousel = () => {
  const [images, setImages] = useState([]);

  const handleAds = async () => {
    setImages([]);

    try {
      const options = {
        method: "GET",
        url: `https://myneighborhoodscope.com/zipAdsJson.php`,
      };

      const response = await axios.request(options);
      //response = response.data.map(item => item.image);
      setImages(
        response.data
          .filter((item) => item.frontpage === 1 && item.active === 1)
          .map((item) => item.image)
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    handleAds();
  }, []);
  return (
    <View>
      <SliderBox
        images={images}
        sliderBoxHeight={140}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "90%",
          marginTop: 5,
          marginRight: 33,
        }}
        dotColor={COLORS.tertiary}
        inactiveDotColor="#90A4AE"
        onCurrentImagePressed={(index) => Linking.openURL(`${images[index]}`)}
        paginationBoxVerticalPadding={10}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

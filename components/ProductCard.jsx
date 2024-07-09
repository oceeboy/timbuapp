import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Animated,
} from "react-native";
import { getImageUrl } from "../services/apiService";

const ProductCard = ({ onPress, item }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onPress();
    }, 100);
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPressIn={handlePressIn}>
      <Animated.View
        style={[styles.cardContent, { transform: [{ scale: scaleValue }] }]}
      >
        <View style={styles.imageContainer}>
          {item.photos.length > 0 && (
            <Image
              source={{
                uri: getImageUrl(item.photos[0].url),
              }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>
            NGN {item.current_price[0].NGN[0]}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.moreInfoContainer}
          onPressOut={handlePressOut}
        >
          <Text style={styles.moreInfoText}>See more</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    gap: 10,
    width: 180,
    height: 300,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  cardContent: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    height: "100%",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  productDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  productName: {
    color: "#303D39",
    fontSize: 12,
    fontStyle: "normal",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  productPrice: {
    color: "#303D39",
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  moreInfoContainer: {
    backgroundColor: "#303D39",
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 70,
  },
  moreInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProductCard;

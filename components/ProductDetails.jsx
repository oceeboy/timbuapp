import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ProductContext } from "../context/ProductContext";
import { getImageUrl } from "../services/apiService";

const ProductDetails = () => {
  const { selectedProduct } = useContext(ProductContext);

  if (!selectedProduct) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: getImageUrl(selectedProduct.photos[0].url),
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.title}>{selectedProduct.name}</Text>
          <Text style={styles.price}>
            NGN {selectedProduct.current_price[0].NGN[0]}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {selectedProduct.description}
            </Text>
          </View>
          <Text style={styles.productUniqueID}>
            Product ID: {selectedProduct.unique_id}
          </Text>
          <View style={styles.stausContainer}>
            <Text style={styles.stausText}>Product Status:</Text>
            <Text
              style={
                selectedProduct.is_available
                  ? styles.availableStatus
                  : styles.UnavailableStatus
              }
            >
              {selectedProduct.is_available ? "Available" : "Not Available"}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Quantity Available:</Text>
            <Text style={styles.availableQuantityText}>
              {selectedProduct.available_quantity}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: { flex: 1 },
  container: { flex: 1, margin: 10 },
  imageContainer: {
    width: "100%",
    height: 400,

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",

    marginBottom: 10,
  },
  image: { width: "100%", height: "100%" },
  productDetails: { flexDirection: "column", gap: 10 },
  title: { fontSize: 25, fontWeight: "bold", textTransform: "capitalize" },
  price: { fontSize: 20, fontWeight: "500" },
  description: {
    color: "black",
    fontSize: 18,
    flexWrap: "wrap",
    textTransform: "capitalize",
  },
  descriptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  stausContainer: { flexDirection: "row", gap: 5 },
  quantityContainer: { flexDirection: "row", gap: 5 },
  stausText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  availableStatus: {
    fontSize: 15,
    color: "green",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  UnavailableStatus: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  quantityText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  availableQuantityText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  productUniqueID: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ProductDetails;

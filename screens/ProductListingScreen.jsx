import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";
import { getProducts } from "../services/apiService";
import { ProductContext } from "../context/ProductContext";

const ProductListingScreen = () => {
  const { setSelectedProduct } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["50%", "75%", "90%"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
      setRefreshing(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handlePresentModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
    bottomSheetModalRef.current?.present();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  return (
    <SafeAreaView
      style={isOpen ? styles.modalActiveContainer : styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Products</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.grid}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color="green" size="large" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : products.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No products found.</Text>
            </View>
          ) : (
            <View style={isOpen ? styles.focusGrid : styles.grid}>
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onPress={() => handlePresentModal(item)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <BottomSheetModalProvider>
        <Button title="Open" onPress={() => handlePresentModal()} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetStyle}
          handleIndicatorStyle={styles.handleIndicatorStyle}
          onDismiss={() => setIsOpen(false)}
        >
          <ProductDetails />
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303D39",
  },
  modalActiveContainer: {
    flex: 1,
    backgroundColor: "#303D39",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollViewContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  focusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    opacity: 0.5,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  emptyStateText: {
    color: "#fff",
    fontSize: 18,
  },
  bottomSheetStyle: {
    backgroundColor: "#E8F5E9",
  },
  handleIndicatorStyle: {
    backgroundColor: "black",
    width: 100,
    height: 10,
  },
});

export default ProductListingScreen;

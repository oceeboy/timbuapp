import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";

const TabIcon = ({ color, name, focused }) => {
  return (
    <View style={styles.tabIconBox}>
      <Image
        source={icons.product}
        resizeMode="contain"
        tintColor={color}
        style={styles.tabiconImageDefault}
      />
      <Text
        style={
          focused === true
            ? styles.tabIconTextActive
            : styles.tabIconTextInActive
        }
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  tabIconBox: {
    gap: 5,
    paddingHorizontal: 5,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconTextInActive: {
    color: "#303D39",
    fontSize: 10,
    textAlign: "center",
  },
  tabiconImageDefault: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconTextActive: {
    color: "#303D39",
    fontSize: 15,
    fontWeight: "bold",
  },
});

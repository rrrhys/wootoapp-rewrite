import { StyleSheet, TextStyle } from "react-native";

const colors = {
  heading: "#333333",
  price: "#00ff00",
  regularPrice: "#000000",
  oldPrice: "#ff0000",
  headerIcon: "#ffffff",
  textLink: "#0000ff"
};
const styles = StyleSheet.create({
  productHeading: {
    textAlign: "center",
    color: colors.heading
  },
  textLink: {
    color: colors.textLink
  },
  productTileSalePrice: {
    color: colors.price
  },
  productTileOldPrice: {
    color: colors.oldPrice,
    textDecorationLine: "line-through"
  },
  productTileRegularPrice: {
    color: colors.regularPrice
  }
});

const rules = {
  padding: 7
};

export { styles, colors, rules };

import { StyleSheet, TextStyle } from "react-native";

const colors = {
  heading: "#333333",
  price: "#00ff00",
  regularPrice: "#000000",
  oldPrice: "#ff0000"
};
const styles = StyleSheet.create({
  productHeading: {
    textAlign: "center",
    color: colors.heading
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

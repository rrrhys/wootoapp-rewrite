import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

import Debug from "./Debug";
import FavoriteIcon from "./FavoriteIcon";
import { IStore } from "../types/store";
import { Image } from "react-native-elements";
import Loading from "./Loading";
import Price from "./Price";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";

export interface Props {
  id: number;
  product: Product;
  style?: ViewStyle;
}

class ProductTile extends React.Component<
  Partial<NavigationInjectedProps> & Partial<Props>
> {
  navigateToProduct = () => {
    const { product } = this.props;
    this.props.navigation.navigate("Product", { product });
  };

  render() {
    const { product, style } = this.props;

    let image;

    try {
      image =
        product.images && product.images.length > 0 ? product.images[0] : null;
    } catch (e) {
      debugger;
    }

    return (
      <View style={style}>
        {product ? (
          <TouchableOpacity onPress={this.navigateToProduct}>
            <Image
              source={{ uri: image && image.src }}
              style={{ height: 180 }}
              resizeMode="contain"
            />

            <FavoriteIcon id={product.id} size={24} />
            <Debug>{product.type}</Debug>

            <Text style={{ marginBottom: 10 }}>{product.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Price product={product} />
            </View>
          </TouchableOpacity>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const select = (store: IStore, ownProps: Props) => {
  return {
    product: store.products.products[ownProps.id]
  };
};

const actions = dispatch => {
  return {};
};

export default withNavigation(
  connect(
    select,
    actions
  )(ProductTile)
);

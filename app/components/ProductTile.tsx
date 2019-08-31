import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { Card } from "react-native-elements";
import { IStore } from "../types/store";
import Loading from "./Loading";
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
            <Card
              title={`${product.name}`}
              image={{ uri: image && image.src }}
            />
          </TouchableOpacity>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const select = (store: IStore, ownProps: Props) => {
  return { product: store.products.products[ownProps.id] };
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

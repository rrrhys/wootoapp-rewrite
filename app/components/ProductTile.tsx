import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { TouchableOpacity, View, ViewStyle } from "react-native";

import Text from "./../primitives/Text";
import Debug from "./Debug";
import FavoriteIcon from "./FavoriteIcon";
import { IStore } from "../types/store";
import { Image, withTheme } from "react-native-elements";
import Loading from "./Loading";
import Price from "./Price";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import Card from "../primitives/Card";
import { CART_CARD_HORIZONTAL_PADDING } from "./CartLineItem";

export interface IProps {
  id: number;
  product: Product;
  style?: ViewStyle;
}

class ProductTile extends React.Component<
  Partial<NavigationInjectedProps> & Partial<IProps>
> {
  navigateToProduct = () => {
    const { product } = this.props;
    this.props.navigation.navigate("Product", {
      product,
      product_id: product.id
    });
  };

  render() {
    const { product, style, theme } = this.props;

    let image;

    if (product) {
      try {
        image =
          product.images && product.images.length > 0
            ? product.images[0]
            : null;
      } catch (e) {
        debugger;
      }
    }

    return (
      <View style={style}>
        {product ? (
          <TouchableOpacity onPress={this.navigateToProduct}>
            <Card
              containerStyle={{
                backgroundColor: theme.colors.backgroundColor,
                minWidth: this.props.minWidth,
                borderRadius: 6,
                overflow: "hidden",
                margin: CART_CARD_HORIZONTAL_PADDING
              }}
              image={{ uri: image && image.src }}
            >
              <Text style={{ marginBottom: 10 }}>{product.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Price product={product} />
              </View>
            </Card>

            <FavoriteIcon id={product.id} size={24} />
          </TouchableOpacity>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const mapStateToProps = (store: IStore, ownProps: IProps) => {
  return {
    product: store.products.products[ownProps.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withNavigation(
  withTheme(connect(mapStateToProps, mapDispatchToProps)(ProductTile))
);

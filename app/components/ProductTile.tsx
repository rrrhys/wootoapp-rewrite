import { Text, View } from "react-native";

import { IStore } from "../types/store";
import { NavigationInjectedProps } from "react-navigation";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";

export interface Props {
  id: number;
  product: Product;
}

class ProductTile extends React.Component<
  Partial<NavigationInjectedProps> & Partial<Props>
> {
  render() {
    const { product } = this.props;
    console.log("PT props", this.props);

    return (
      <View>
        <Text>{JSON.stringify(product)}</Text>
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

export default connect(
  select,
  actions
)(ProductTile);

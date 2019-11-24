import React from "react";
import { View, Text, ScrollView } from "react-native";

import { connect } from "react-redux";

import Actions from "../actions";
import { IStore } from "../types/store";
import { withTheme } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { TProductFilter } from "../actions/products";
import { ScrollerHeader } from "../screens/HomeScreen";
import ProductTile from "./ProductTile";
import _ from "lodash";

interface IProps {
  filter: TProductFilter;
}
class ProductScroller extends React.Component {
  constructor(props: IProps) {
    super(props);

    const { filter } = props;
    props.loadProductsWithFilter(filter);
  }
  render() {
    const { filter, productsByFilter } = this.props;

    let headerText;

    switch (filter) {
      case "featured":
        headerText = "Featured";
        break;
      case "on_sale":
        headerText = "On Sale";
        break;
      case "new":
        headerText = "New";
        break;
    }
    return (
      <View>
        <ScrollerHeader heading={headerText} />
        <ScrollView horizontal>
          {productsByFilter.map((p, i) => {
            return (
              <View key={i}>
                <ProductTile minWidth={200} id={p} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const select = (store: IStore, ownProps: IProps) => {
  const { filter } = ownProps;
  return {
    productsByFilter: _.get(store, `products.byFilter.${filter}`, []) //store.products.byFilter[filter]
  };
};

const actions = dispatch => {
  const { loadProductsWithFilter } = Actions;
  return {
    loadProductsWithFilter: (filter: TProductFilter) =>
      dispatch(loadProductsWithFilter(filter))
  };
};

export default connect(
  select,
  actions
)(withNavigation(withTheme(ProductScroller)));

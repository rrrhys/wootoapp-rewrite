import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Actions from "../actions";
import { Category } from "../types/woocommerce";
import ProductTile from "../components/ProductTile";
import React from "react";
import { connect } from "react-redux";

export interface ICategoryScreenProps {
  navigation: {
    state: {
      params: {
        category: Category;
      };
    };
  };
  loadProductsInCategory: (category: number, page: number) => void;
  productsByCategory: Array<number>;
}

class CategoryScreen extends React.Component<ICategoryScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.state.params.category.name,
      backButton: SVGComponentTransferFunctionElement
    };
  };

  constructor(props: ICategoryScreenProps) {
    super(props);

    props.loadProductsInCategory(props.navigation.state.params.category.id, 1);
  }

  render() {
    const { productsByCategory } = this.props;
    return (
      <View>
        <Text>{JSON.stringify(productsByCategory)}</Text>

        {productsByCategory.map(p => (
          <ProductTile key={p} id={p} />
        ))}
      </View>
    );
  }
}

const select = (store, ownProps: ICategoryScreenProps) => {
  const { category } = ownProps.navigation.state.params;

  return {
    cart: store.cart,
    ui: store.ui,
    categories: store.categories,
    //TODO: Replace the IDs with products here.
    productsByCategory: store.products.byCategoryId[category.id]
  };
};

const actions = dispatch => {
  const { loadProductsInCategory } = Actions;
  return {
    loadProductsInCategory: (category: number, page: number) =>
      dispatch(loadProductsInCategory(category, page))
  };
};

export default connect(
  select,
  actions
)(CategoryScreen);

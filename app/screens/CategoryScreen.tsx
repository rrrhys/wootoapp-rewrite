import { Card, Image } from "react-native-elements";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Actions from "../actions";
import { Category } from "../types/woocommerce";
import Header from "../components/Header";
import React from "react";
import config from "../../env";
import { connect } from "react-redux";

export interface ICategoryProps {}

class CategoryScreen extends React.Component<ICategoryProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.state.params.category.name,
      backButton: SVGComponentTransferFunctionElement
    };
  };

  constructor(props: ICategoryProps) {
    super(props);

    // we need an app definition.
  }

  render() {
    return (
      <View>
        <Text>sup</Text>
      </View>
    );
  }
}

const select = store => {
  return {
    cart: store.cart,
    ui: store.ui,
    categories: store.categories
  };
};

const actions = dispatch => {
  const { loadShop } = Actions;
  return {
    loadShop: (shop_id: number, publishable_key: string, access_jwt: string) =>
      dispatch(loadShop(shop_id, publishable_key, access_jwt))
  };
};

export default connect(
  select,
  actions
)(CategoryScreen);

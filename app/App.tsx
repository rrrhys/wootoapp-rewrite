import { Card, Image } from "react-native-elements";
import { Text, View } from "react-native";

import Actions from "./actions";
import { Category } from "./types/woocommerce";
import React from "react";
import config from "./../env";
import { connect } from "react-redux";

export interface IAppProps {
  categories: {
    categories: Array<Category>;
  };
  loadShop: () => void;
}
class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);

    // we need an app definition.
    const { store_id, publishable_key, access_jwt } = config;

    props.loadShop();
  }

  render() {
    const { categories } = this.props;
    return (
      <View>
        <Text>sup</Text>
        <Text>{JSON.stringify(categories)}</Text>
        {categories.categories.map((c: Category) => (
          <Card title={`${c.name} (${c.count})`} />
        ))}
      </View>
    );
  }
}

const select = store => {
  return {
    cart: store.cart,
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
)(App);

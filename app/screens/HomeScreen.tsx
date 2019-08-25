import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Actions from "../actions";
import CategoryTile from "../components/CategoryTile";
import { ICategories } from "../reducers/categories";
import { Iui } from "../reducers/ui";
import React from "react";
import config from "../../env";
import { connect } from "react-redux";

export interface IAppProps {
  categories: ICategories;
  loadShop: () => void;
  ui: Iui;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class HomeScreen extends React.Component<IAppProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props: IAppProps) {
    super(props);

    // we need an app definition.
    const { store_id, publishable_key, access_jwt } = config;

    props.navigation.setParams({ title: props.ui.name });
    props.loadShop();
  }

  render() {
    const { categories } = this.props;
    return (
      <View>
        <Text>sup</Text>
        <ScrollView>
          <Text>{JSON.stringify(categories)}</Text>
          {categories.data.map(category => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const select = store => {
  console.log("Store", store);
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
)(HomeScreen);

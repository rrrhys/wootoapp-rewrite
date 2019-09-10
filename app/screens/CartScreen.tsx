import { Attribute, Product, Variation } from "../types/woocommerce";
import { Button, Icon, Image, Text } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import KeyValuePicker, { pickableValue } from "../components/KeyValuePicker";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { rules, styles } from "../styles";

import Actions from "../actions";
import AddToCartButton from "../components/AddtoCartButton";
import BackButtonOverlay from "../components/BackButtonOverlay";
import CartButton from "../components/CartButton";
import ImageCarousel from "../components/ImageCarousel";
import Loading from "../components/Loading";
import ProductDescription from "../components/ProductDescription";
import React from "react";
import { connect } from "react-redux";

export interface ICartScreenProps {
  navigation: {
    state: {
      params: {
        product: Product;
      };
    };
    goBack: () => void;
  };
}

export interface ICartScreenState {}

class CartScreen extends React.Component<ICartScreenProps, ICartScreenState> {
  state = {};

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: "View Cart",
      backButton: true
    };
  };

  constructor(props: ICartScreenProps) {
    super(props);
  }

  render() {
    return (
      <View accessibilityLabel={"cartScreenBaseView"}>
        <ScrollView>
          <Text>test {JSON.stringify(this.props.cart)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const select = (store, ownProps: ICartScreenProps) => {
  return {
    cart: store.cart
  };
};

const actions = dispatch => {
  const {} = Actions;
  return {};
};

export default connect(
  select,
  actions
)(CartScreen);

import { Attribute, Product, Variation } from "../types/woocommerce";
import { Button, Icon, Image, Text } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { ICart, ICartLineItem } from "../reducers/cart";

import Actions from "../actions";
import CartLineItem from "../components/CartLineItem";
import React from "react";
import { connect } from "react-redux";

export interface ICartScreenProps {
  navigation: {
    state: {
      params: {
        product: Product;
      };
    };
  };

  cart: ICart;
  goBack: () => void;
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
    const { height } = Dimensions.get("window");
    const { cart } = this.props;
    return (
      <View
        accessibilityLabel={"cartScreenBaseView"}
        style={{
          flex: 1,
          height
        }}
      >
        <ScrollView>
          {cart.lineItems.map((li: ICartLineItem) => {
            return <CartLineItem lineItem={li} />;
          })}
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

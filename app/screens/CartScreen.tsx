import { Attribute, Product, Variation } from "../types/woocommerce";
import { Icon, Image, withTheme } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { ICart, ICartLineItem } from "../reducers/cart";

import ListItem from "../primitives/ListItem";
import Text from "../primitives/Text";
import Actions from "../actions";
import CartLineItem, {
  CART_CARD_HORIZONTAL_PADDING
} from "../components/CartLineItem";
import Button from "../components/Button";
import React from "react";
import { connect } from "react-redux";
import FooterNavigationArea from "../components/FooterNavigationArea";
import { rules, DIVIDER_HEIGHT } from "../styles";
import Price from "../components/Price";
import Card from "../primitives/Card";
import ShippingMethodsModal from "../components/ShippingMethodsModal";
import { setAddressBarToDerivedPath } from "../setup";

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

const SubtotalLineItem = connect(
  (store, ownProps) => {
    return { cart: store.cart };
  },
  dispatch => {
    return {};
  }
)(
  withTheme((props: { cart: ICart }) => {
    let total = 0;
    const { theme, cart } = props;

    cart.lineItems.map((li: ICartLineItem) => {
      total += li.totalLine;
    });

    if (cart.shippingMethod) {
      total += parseFloat(cart.shippingMethod.amount);
    }
    return (
      <ListItem
        separator
        bottomDivider
        title={
          <View style={{ paddingHorizontal: CART_CARD_HORIZONTAL_PADDING }}>
            <Text h4>Subtotal</Text>
          </View>
        }
        rightTitle={
          <Text style={{ paddingHorizontal: CART_CARD_HORIZONTAL_PADDING }}>
            <Price price={total} />
          </Text>
        }
      />
    );
  })
);

class CartScreen extends React.Component<ICartScreenProps, ICartScreenState> {
  state = {};

  static navigationOptions = ({ navigation, navigationOptions }) => {
    setAddressBarToDerivedPath(
      navigation.state.routeName,
      navigation.state.params
    );
    return {
      title: "View Cart",
      backButton: true
    };
  };

  constructor(props: ICartScreenProps) {
    super(props);
  }

  navigateToCheckout = () => {
    this.props.navigation.navigate("Checkout");
  };

  render() {
    const { height } = Dimensions.get("window");
    const { cart, theme } = this.props;

    const effectiveHeight = height - rules.headerHeight;

    const titleStyle = {
      textAlign: "left"
    };

    return (
      <View
        accessibilityLabel={"cartScreenBaseView"}
        style={{
          flex: 1,
          height: effectiveHeight,
          flexDirection: "column",
          backgroundColor: theme.colors.backgroundColor
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              marginTop: DIVIDER_HEIGHT
            }}
          >
            {cart.lineItems.map((li: ICartLineItem) => {
              return <CartLineItem key={li.id} lineItem={li} />;
            })}
          </View>

          <Card
            title="Delivery Method"
            titleStyle={titleStyle}
            onPress={() => {
              this.setState({
                shippingMethodsVisible: true
              });
            }}
          >
            {!cart.shippingMethod && <Text>Select Shipping Method</Text>}
            {cart.shippingMethod && (
              <ListItem
                containerStyle={{ margin: 0, padding: 0 }}
                title={cart.shippingMethod.label}
                rightTitle={<Price price={cart.shippingMethod.amount} />}
              />
            )}
          </Card>

          <ShippingMethodsModal
            visible={this.state.shippingMethodsVisible}
            modalClosed={() => this.setState({ shippingMethodsVisible: false })}
          />
          <SubtotalLineItem />
        </ScrollView>
        <View>
          <FooterNavigationArea>
            <Button
              title="Proceed to Checkout"
              onPress={this.navigateToCheckout}
              style={{ flex: 1 }}
            />
          </FooterNavigationArea>
        </View>
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

export default connect(select, actions)(withTheme(CartScreen));

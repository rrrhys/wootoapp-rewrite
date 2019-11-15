import * as React from "react";
import Modal from "react-native-modalbox";
import { withTheme, Icon, Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Actions from "../actions";

/* 
when this component initialises, we will send off a request for a shipping quote.
The shipping quotes will be stored against the cart.
If any products are changed in the cart, we will throw out the shipping quotes (and the selected method)

It might turn out that visiting the checkout page makes more sense to request shipping quotes.
*/
class ShippingMethodsModal extends React.Component {
  state = {};

  componentDidMount() {
    const { getShippingQuotes } = this.props;

    try {
      getShippingQuotes();
    } catch (e) {
      debugger;
    }
  }
  setShippingMethodAndClose = method => {
    const { setShippingMethod, modalClosed } = this.props;
    setShippingMethod(method);
    setTimeout(modalClosed, 50);
  };
  render() {
    const { cart, shop, setShippingMethod } = this.props;

    const { shippingQuotes } = cart;
    return (
      <Modal
        isOpen={this.props.visible}
        coverScreen={true}
        position={"bottom"}
        style={[styles.modal, { flexDirection: "column", paddingBottom: 30 }]}
        onClosed={this.onClose}
        useNativeDriver={false}
      >
        {this.props.visible && (
          <Card title="Select Shipping Method" containerStyle={{ flex: 1 }}>
            <ScrollView>
              {shippingQuotes.map((p: ShippingQuote, i) => {
                {
                  return (
                    <ListItem
                      key={p.identifier}
                      title={p.label}
                      checkmark={
                        cart.shippingMethod &&
                        cart.shippingMethod.identifier === p.identifier
                      }
                      onPress={() => {
                        cart.shippingMethod === p
                          ? this.setShippingMethodAndClose(null)
                          : this.setShippingMethodAndClose(p);
                      }}
                    ></ListItem>
                  );
                }
              })}
            </ScrollView>
          </Card>
        )}
      </Modal>
    );
  }

  onClose = () => {
    this.props.modalClosed();
  };
}

const select = store => {
  return {
    cart: store.cart,
    shop: store.shop
  };
};

const actions = dispatch => {
  const { setShippingMethod, getShippingQuotes } = Actions;
  return {
    getShippingQuotes: () => dispatch(getShippingQuotes()),
    setShippingMethod: method => dispatch(setShippingMethod(method))
  };
};

export default connect(select, actions)(withTheme(ShippingMethodsModal));

const styles = StyleSheet.create({
  modal: {
    maxHeight: 240,
    minHeight: 120
  }
});

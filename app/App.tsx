import { Text, View } from "react-native";

import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Text>sup</Text>
      </View>
    );
  }
}

const select = store => {
  return {
    cart: store.cart
  };
};

const actions = dispatch => {
  return {};
};

export default connect(
  select,
  actions
)(App);

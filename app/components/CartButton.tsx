import { NavigationInjectedProps, withNavigation } from "react-navigation";

import Actions from "../actions";
import { Button } from "react-native-elements";
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface IProps {}

class CartButton extends React.Component<IProps> {
  navigateToCart = () => {
    this.props.navigation.navigate("Cart");
  };

  render() {
    return (
      <View style={[{ padding: rules.padding }, this.props.style]}>
        <Button title="View Cart" onPress={this.navigateToCart} />
      </View>
    );
  }
}

const mapStateToProps = (state: IStore, ownProps: IProps) => {};

const mapDispatchToProps = dispatch => {
  const {} = Actions;

  return {};
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartButton)
);

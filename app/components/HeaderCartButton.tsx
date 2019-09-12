import { Button, Icon, withBadge } from "react-native-elements";

import { ICart } from "../reducers/cart";
import { IStore } from "../types/store";
import React from "react";
import { colors } from "../styles";
import { connect } from "react-redux";

const HeaderCartButton = (props: {
  onPress: () => void;
  size: number;
  cart: ICart;
}) => {
  const badgeCount = props.cart.lineItems.length;
  const BadgedIcon = withBadge(badgeCount, {
    hidden: !badgeCount,
    status: "primary",
    left: 4,
    top: -6
  })(Icon);

  const icon = (
    <BadgedIcon
      name="shopping-cart"
      type="font-awesome"
      size={props.size}
      color={colors.headerIcon}
    />
  );

  return <Button onPress={props.onPress} icon={icon} />;
};

const mapStateToProps = (store: IStore, ownProps) => {
  return {
    cart: store.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderCartButton);

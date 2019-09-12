import {
  Button,
  Card,
  Header as HeaderComponent,
  Icon,
  Image
} from "react-native-elements";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

import Actions from "../actions";
import HeaderCartButton from "./HeaderCartButton";
import React from "react";
import { View } from "react-native";
import { colors } from "../styles";
import { connect } from "react-redux";

export interface IProps {
  backButton?: boolean;
  title: string;
  openDrawer: () => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Header extends React.PureComponent<IProps> {
  navigateToCart = () => {
    this.props.navigation.navigate("Cart");
  };
  navigateBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    const { backButton } = this.props;

    const ICON_SIZE = 24;
    const menuButtonElement = (
      <Button
        onPress={this.props.openDrawer}
        icon={<Icon name="menu" size={ICON_SIZE} color={colors.headerIcon} />}
      />
    );
    const backButtonElement = (
      <Button
        onPress={this.navigateBack}
        icon={
          <Icon
            name="chevron-left"
            size={ICON_SIZE}
            color={colors.headerIcon}
          />
        }
      />
    );
    const leftComponent = backButton ? backButtonElement : menuButtonElement;

    const cartElement = (
      <HeaderCartButton size={ICON_SIZE} onPress={this.navigateToCart} />
    );
    return (
      <View>
        <HeaderComponent
          statusBarProps={{
            barStyle: "light-content",
            translucent: true,
            backgroundColor: "transparent"
          }}
          leftComponent={leftComponent}
          centerComponent={{
            text: this.props.title,
            style: { color: "#fff" }
          }}
          rightComponent={cartElement}
        />
      </View>
    );
  }
}

const select = store => {
  return {
    ui: store.ui
  };
};

const actions = dispatch => {
  const { openDrawer } = Actions;
  return {
    openDrawer: () => dispatch(openDrawer())
  };
};

export default connect(
  select,
  actions
)(Header);

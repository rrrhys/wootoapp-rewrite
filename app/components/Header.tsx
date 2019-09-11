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
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

export interface IProps {
  backButton?: boolean;
  title: string;
  openDrawer: () => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Header extends React.PureComponent<IProps> {
  render() {
    const { backButton } = this.props;

    const menuButtonElement = (
      <Button
        onPress={this.props.openDrawer}
        icon={<Icon name="menu" size={24} color="white" />}
      />
    );
    const backButtonElement = (
      <Button
        onPress={() => this.props.navigation.goBack()}
        icon={<Icon name="chevron-left" size={24} color="white" />}
      />
    );
    const leftComponent = backButton ? backButtonElement : menuButtonElement;

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
          rightComponent={{ icon: "home", color: "#fff" }}
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

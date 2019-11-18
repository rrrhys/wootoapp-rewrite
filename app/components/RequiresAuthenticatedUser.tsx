import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import Actions from "../actions";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import { withTheme, Icon } from "react-native-elements";
import { SocialProvider } from "../actions/customer";

import SocialSignin from "./SocialSignin";
import { withNavigation } from "react-navigation";

class RequiresAuthenticatedUser extends React.Component {
  componentDidMount() {
    if (!this.props.customer.customer) {
      this.refs.modal1.open();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customer.customer && !this.props.customer.customer) {
      this.refs.modal1.close();
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          backdropPressToClose={false}
          swipeToClose={false}
          coverScreen={true}
          backButtonClose={false}
          style={[styles.modal]}
          ref={"modal1"}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          useNativeDriver={true}
          position={"center"}
        >
          <View
            style={{
              margin: 10,
              padding: 4,
              borderRadius: 10,
              backgroundColor: "#ffffff"
            }}
          >
            <SocialSignin
              goBack={() => {
                this.refs.modal1.close();
                this.props.navigation.goBack();
              }}
            />
          </View>
        </Modal>

        {this.props.children}
      </View>
    );
  }
}

const select = (store, ownProps: ICartScreenProps) => {
  return {
    customer: store.customer
  };
};

const actions = dispatch => {
  const { authenticateSocialUser, signoutCustomer } = Actions;
  return {
    authenticateSocialUser: (provider: SocialProvider, additionalInfo = null) =>
      dispatch(authenticateSocialUser(provider, additionalInfo))
  };
};

export default connect(
  select,
  actions
)(withNavigation(withTheme(RequiresAuthenticatedUser)));

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,0)",
    height: "auto"
  }
});

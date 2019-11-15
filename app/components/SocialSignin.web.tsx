import { SocialIcon, withTheme, Divider, Icon } from "react-native-elements";

import Actions from "../actions";
import React from "react";
import { View, Text } from "react-native";
import { SocialProvider } from "../actions/customer";

import config from "../../env";
import { connect } from "react-redux";
import Button from "./Button";
class SocialSignin extends React.Component {
  constructor(props) {
    super(props);
  }

  signinWithFacebook = () => {};
  signinWithGoogle = async () => {};

  render() {
    console.log("can skip", this.props.canSkip);
    return (
      <View>
        <Text>Social sign-in via web not supported.</Text>

        {this.props.canSkip && (
          <Button
            buttonStyle={{ ...socialButtonStyle }}
            titleStyle={socialTitleStyle}
            raised={true}
            type="clear"
            title={`Skip for now`}
            onPress={this.props.skipSignin}
          />
        )}
      </View>
    );
  }
}

const EMAIL_GREY = "#666666";
const GOOGLE_RED = "#dd4b39";
const FACEBOOK_BLUE = "#3b5998";
const socialButtonStyle = { borderRadius: 50, padding: 12 };
const socialTitleStyle = { fontWeight: "bold", fontSize: 14 };

const select = store => {
  return {
    customer: store.customer
  };
};

const actions = dispatch => {
  const { authenticateSocialUser, signoutCustomer, skipSignin } = Actions;
  return {
    skipSignin: () => dispatch(skipSignin()),
    authenticateSocialUser: (provider: SocialProvider, additionalInfo = null) =>
      dispatch(authenticateSocialUser(provider, additionalInfo))
  };
};

export default connect(select, actions)(withTheme(SocialSignin));

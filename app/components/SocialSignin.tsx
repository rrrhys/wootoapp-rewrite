import {
  SocialIcon,
  withTheme,
  Divider,
  Icon,
  Input,
  Text
} from "react-native-elements";

import Actions from "../actions";
import React from "react";
import { View } from "react-native";
import { SocialProvider, RegisterArgs } from "../actions/customer";

import config from "../../env";
import { connect } from "react-redux";
import Button from "./Button";
import ExternalSigninProviders from "./ExternalSigninProviders";
import { ICON_SIZE } from "./Header";

const SCREEN_0_SIGNIN_OPTIONS = 0;
const SCREEN_1_EMAIL_SIGNIN = 1;
const SCREEN_2_EMAIL_REGISTER = 2;
const SCREEN_3_FORGOT_PASSWORD = 3;
const SCREEN_4_FORGOT_PASSWORD_EMAIL_SENT = 4;

const inputStyle = { fontSize: 20, paddingVertical: 2, marginVertical: 6 };

const PopupModalHeader = props => {
  return (
    <View style={{ flexDirection: "row", position: "relative" }}>
      <View style={{ flex: 1, paddingTop: 12 }}>
        <Text
          h3
          style={{
            textAlign: "center",
            color: "#555555",
            paddingBottom: 8
          }}
        >
          {props.title}
        </Text>
        <Divider />
      </View>
      {props.onBackPress && (
        <Button
          title="Back"
          type="clear"
          onPress={props.onBackPress}
          style={{ position: "absolute" }}
        />
      )}
    </View>
  );
};
class SocialSignin extends React.Component {
  state = {
    step: SCREEN_0_SIGNIN_OPTIONS,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: ""
  };
  constructor(props) {
    super(props);
  }

  transitionBack = () => {
    this.transitionToScreen(SCREEN_0_SIGNIN_OPTIONS);
  };

  transitionToScreen = screen => {
    this.setState({
      step: screen
    });
  };

  resetPassword = () => {
    const { resetPassword } = this.props;

    const { email } = this.state;

    resetPassword(email);

    this.setState({
      step: SCREEN_4_FORGOT_PASSWORD_EMAIL_SENT
    });
  };
  signinWithEmail = () => {
    const { authenticateSocialUser } = this.props;
    const { email, password } = this.state;
    const access_token = btoa(JSON.stringify({ email, password }));
    authenticateSocialUser("store", { access_token });
  };

  registerWithEmail = () => {
    const { registerUser } = this.props;
    const { email, password, phone, first_name, last_name } = this.state;
    const args: RegisterArgs = {
      email,
      password,
      phone,
      first_name,
      last_name
    };
    registerUser(args);
  };
  signinOptionsComponent = () => {
    return (
      <View>
        <PopupModalHeader title="Sign In" />
        <ExternalSigninProviders
          socialButtonStyle={socialButtonStyle}
          socialTitleStyle={socialTitleStyle}
        />

        <Button
          icon={
            <Icon
              name="envelope"
              type="font-awesome"
              size={24}
              color="white"
              iconStyle={{ paddingRight: 16 }}
            />
          }
          buttonStyle={{ ...socialButtonStyle, backgroundColor: EMAIL_GREY }}
          titleStyle={socialTitleStyle}
          raised={true}
          title={`Sign in with Email`}
          onPress={() => this.transitionToScreen(SCREEN_1_EMAIL_SIGNIN)}
        />
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />

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

        {!this.props.canSkip && (
          <Button
            buttonStyle={{ ...socialButtonStyle }}
            titleStyle={socialTitleStyle}
            raised={true}
            type="clear"
            title={`Go Back`}
            onPress={() => {
              this.props.goBack();
            }}
          />
        )}
      </View>
    );
  };

  forgotPasswordEmailSentComponent = () => {
    return (
      <View>
        <PopupModalHeader
          title="Forgot Password"
          onBackPress={() => this.transitionToScreen(SCREEN_1_EMAIL_SIGNIN)}
        />

        <View style={{ margin: 8 }}>
          <Text>
            Thanks! If an account exists for the address {this.state.email}, you
            will receive an email from us shortly.
          </Text>
        </View>
      </View>
    );
  };
  forgotPasswordComponent = () => {
    return (
      <View>
        <PopupModalHeader
          title="Forgot Password"
          onBackPress={() => this.transitionToScreen(SCREEN_1_EMAIL_SIGNIN)}
        />
        <Input
          placeholder="sam@email.com"
          inputStyle={inputStyle}
          keyboardType={"email-address"}
          onChange={e => this.handleChange("email", e.nativeEvent.text)}
          value={this.state["email"]}
        />

        <Button
          raised={true}
          title={`Reset Password`}
          onPress={this.resetPassword}
          style={{ marginTop: 8, marginBottom: 8 }}
        />
      </View>
    );
  };
  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });

    console.log(field, value);
  };
  emailRegisterComponent = () => {
    return (
      <View>
        <PopupModalHeader
          title="Register"
          onBackPress={() => this.transitionToScreen(SCREEN_1_EMAIL_SIGNIN)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="First Name"
              inputStyle={inputStyle}
              onChange={e =>
                this.handleChange("first_name", e.nativeEvent.text)
              }
              value={this.state["first_name"]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Last Name"
              inputStyle={inputStyle}
              onChange={e => this.handleChange("last_name", e.nativeEvent.text)}
              value={this.state["last_name"]}
            />
          </View>
        </View>

        <Input
          placeholder="Phone Number"
          inputStyle={inputStyle}
          keyboardType={"phone-pad"}
          onChange={e => this.handleChange("phone", e.nativeEvent.text)}
          value={this.state["phone"]}
        />
        <Input
          placeholder="sam@email.com"
          inputStyle={inputStyle}
          keyboardType={"email-address"}
          onChange={e => this.handleChange("email", e.nativeEvent.text)}
          value={this.state["email"]}
        />
        <Input
          placeholder="password"
          secureTextEntry={true}
          inputStyle={inputStyle}
          onChange={e => this.handleChange("password", e.nativeEvent.text)}
          value={this.state["password"]}
        />

        <Button
          raised={true}
          title={`Register`}
          onPress={this.registerWithEmail}
          style={{ marginTop: 8, marginBottom: 8 }}
        />
      </View>
    );
  };
  emailSigninComponent = () => {
    return (
      <View>
        <PopupModalHeader title="Sign In" onBackPress={this.transitionBack} />
        <Input
          placeholder="sam@email.com"
          inputStyle={inputStyle}
          keyboardType={"email-address"}
          onChange={e => this.handleChange("email", e.nativeEvent.text)}
          value={this.state["email"]}
        />
        <Input
          placeholder="password"
          secureTextEntry={true}
          inputStyle={inputStyle}
          onChange={e => this.handleChange("password", e.nativeEvent.text)}
          value={this.state["password"]}
        />

        <Button
          raised={true}
          title={`Sign in`}
          onPress={this.signinWithEmail}
          style={{ marginTop: 8, marginBottom: 8 }}
        />

        <Divider />
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Forgot Password"
            type="clear"
            style={{ flex: 1 }}
            onPress={() => {
              this.transitionToScreen(SCREEN_3_FORGOT_PASSWORD);
            }}
          />
          <Button
            title="Register"
            type="clear"
            style={{ flex: 1 }}
            onPress={() => {
              this.transitionToScreen(SCREEN_2_EMAIL_REGISTER);
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case SCREEN_0_SIGNIN_OPTIONS:
        return this.signinOptionsComponent();
      case SCREEN_1_EMAIL_SIGNIN:
        return this.emailSigninComponent();
      case SCREEN_2_EMAIL_REGISTER:
        return this.emailRegisterComponent();
      case SCREEN_3_FORGOT_PASSWORD:
        return this.forgotPasswordComponent();
      case SCREEN_4_FORGOT_PASSWORD_EMAIL_SENT:
        return this.forgotPasswordEmailSentComponent();
    }
  }
}

const EMAIL_GREY = "#666666";
const GOOGLE_RED = "#dd4b39";
const FACEBOOK_BLUE = "#3b5998";
const socialButtonStyle = { borderRadius: 4, padding: 12 };
const socialTitleStyle = { fontWeight: "bold", fontSize: 14 };

const select = store => {
  return {
    customer: store.customer
  };
};

const actions = dispatch => {
  const {
    authenticateSocialUser,
    signoutCustomer,
    skipSignin,
    resetPassword,
    registerUser
  } = Actions;
  return {
    skipSignin: () => dispatch(skipSignin()),
    resetPassword: email => dispatch(resetPassword(email)),
    registerUser: args => dispatch(registerUser(args)),
    authenticateSocialUser: (provider: SocialProvider, additionalInfo = null) =>
      dispatch(authenticateSocialUser(provider, additionalInfo))
  };
};

export default connect(select, actions)(withTheme(SocialSignin));

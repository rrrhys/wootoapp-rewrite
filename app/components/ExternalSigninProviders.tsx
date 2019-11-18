import React from "react";
import { View } from "react-native";

const GOOGLE_RED = "#dd4b39";
const FACEBOOK_BLUE = "#3b5998";
import Button from "./Button";
import Actions from "../actions";
import {
  SocialIcon,
  withTheme,
  Divider,
  Icon,
  Input,
  Text
} from "react-native-elements";
import config from "../../env";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { LoginManager } from "react-native-fbsdk";
import { connect } from "react-redux";
const ExternalSigninProviders = props => {
  const signinWithGoogle = async () => {
    const { authenticateSocialUser } = props;
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.configure({
        iosClientId: config.google_ios_client_id,
        webClientId: config.google_web_client_id,
        offlineAccess: true
      });
      const userInfo = await GoogleSignin.signIn();
      debugger;
      authenticateSocialUser("google", userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signinWithFacebook = () => {
    const { authenticateSocialUser } = props;
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
        } else {
          authenticateSocialUser("facebook");
        }
      },
      function(error) {
        alert("Login failed with error: " + error);
      }
    );
  };

  const { socialButtonStyle, socialTitleStyle } = props;
  return (
    <View>
      <Button
        icon={
          <Icon
            name="facebook"
            type="font-awesome"
            size={24}
            color="white"
            iconStyle={{ paddingRight: 16 }}
          />
        }
        buttonStyle={{ ...socialButtonStyle, backgroundColor: FACEBOOK_BLUE }}
        titleStyle={socialTitleStyle}
        raised={true}
        title={`Sign in with Facebook`}
        onPress={signinWithFacebook}
      />

      <Button
        icon={
          <Icon
            name="google"
            type="font-awesome"
            size={24}
            color="white"
            iconStyle={{ paddingRight: 16 }}
          />
        }
        buttonStyle={{ ...socialButtonStyle, backgroundColor: GOOGLE_RED }}
        titleStyle={socialTitleStyle}
        raised={true}
        title={`Sign in with Google`}
        onPress={signinWithGoogle}
      />
    </View>
  );
};

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

export default connect(select, actions)(withTheme(ExternalSigninProviders));

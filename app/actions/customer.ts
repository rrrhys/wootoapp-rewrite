import { Customer } from "./../types/woocommerce.d";
const TRUSTED_USER_AUTHENTICATED = "TRUSTED_USER_AUTHENTICATED";
const SIGNOUT_USER = "SIGNOUT_USER";
const SKIP_SIGNIN = "SKIP_SIGNIN";
const PASSWORD_RESET = "PASSWORD_RESET";
import api from "./../../data/api";
import { AccessToken } from "react-native-fbsdk";
export type SocialProvider = "facebook" | "google" | "store";

const trustedUserAuthenticatedSuccess = (
  jwt,
  provider,
  wc_customer: Customer
) => {
  return {
    type: TRUSTED_USER_AUTHENTICATED,
    data: { jwt, provider, wc_customer }
  };
};

const signoutCustomer = () => {
  return {
    type: SIGNOUT_USER,
    data: true
  };
};

const skipSignin = () => {
  return {
    type: SKIP_SIGNIN,
    data: true
  };
};

export interface User {}

export interface GoogleOauthResult {
  idToken: string;
  serverAuthCode: string;
  user: {
    givenName: string;
    email: string;
    id: string;
    familyName: string;
    photo: string;
    name: string;
  };
  scopes: string[];
}
export interface StoreCredentials {
  access_token: string;
}
type ProviderOauthResult = GoogleOauthResult | StoreCredentials;
const authenticateSocialUser = (
  provider: SocialProvider,
  additionalData?: ProviderOauthResult
) => {
  return (dispatch, getState) => {
    switch (provider) {
      case "facebook":
        return AccessToken.getCurrentAccessToken().then(data => {
          api.customers.authenticateSocial(provider, data).then(r => {
            dispatch(
              trustedUserAuthenticatedSuccess(r.jwt, provider, r.wc_customer)
            );
          });
        });

        break;
      case "store":
        return api.customers
          .authenticateSocial(provider, {
            accessToken: (additionalData as StoreCredentials).access_token
          })
          .then(r => {
            debugger;
            dispatch(
              trustedUserAuthenticatedSuccess(r.jwt, provider, r.wc_customer)
            );
          });
        break;
      case "google":
        const { serverAuthCode } = additionalData as GoogleOauthResult;

        return api.customers
          .authenticateSocial(provider, { accessToken: serverAuthCode })
          .then(r => {
            dispatch(
              trustedUserAuthenticatedSuccess(r.jwt, provider, r.wc_customer)
            );
          });
        break;
      default:
        debugger;
        break;
    }

    // TODO: ERROR HANDLE
  };
};

const resetPassword = email => {
  api.customers.resetPassword({ email });

  return {
    type: PASSWORD_RESET,
    data: true
  };
};

export default {
  TRUSTED_USER_AUTHENTICATED,
  authenticateSocialUser,
  signoutCustomer,
  SIGNOUT_USER,
  SKIP_SIGNIN,
  PASSWORD_RESET,
  skipSignin,
  resetPassword
};

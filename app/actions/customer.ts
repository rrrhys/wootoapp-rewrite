const TRUSTED_USER_AUTHENTICATED = "TRUSTED_USER_AUTHENTICATED";
const SIGNOUT_USER = "SIGNOUT_USER";
import api from "./../../data/api";
import { AccessToken } from "react-native-fbsdk";
export type SocialProvider = "facebook";

const trustedUserAuthenticatedSuccess = (jwt, provider) => {
	return {
		type: TRUSTED_USER_AUTHENTICATED,
		data: { jwt, provider },
	};
};

const signoutCustomer = () => {
	return {
		type: SIGNOUT_USER,
		data: true,
	};
};
const authenticateSocialUser = (provider: SocialProvider) => {
	return (dispatch, getState) => {
		switch (provider) {
			case "facebook":
				return AccessToken.getCurrentAccessToken().then(data => {
					api.customers.authenticateSocial(provider, data).then(r => {
						dispatch(trustedUserAuthenticatedSuccess(r.jwt, provider));
					});
				});

				break;
			default:
				debugger;
				break;
		}

		// TODO: ERROR HANDLE
	};
};

export default { TRUSTED_USER_AUTHENTICATED, authenticateSocialUser, signoutCustomer, SIGNOUT_USER };

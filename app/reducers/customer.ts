import { SocialProvider } from "./../actions/customer";
import Actions from "../actions";

var jwtDecode = require("jwt-decode");
const { TRUSTED_USER_AUTHENTICATED, SIGNOUT_USER } = Actions;

export interface JWTTrustedUser {
	sub: number /* user id */;
	iss: "mobile-app-proxy";
	name: string /* customer name */;
	email: string /* customer email */;
	iat: number /* issued at */;
	exp: number /* expires */;
}
export interface ICustomer {
	jwt: string;
	customer: JWTTrustedUser;
	provider: SocialProvider;
	lastUpdated: boolean | Date;
}
const initialState: ICustomer = {
	jwt: null,
	customer: null,
	provider: null,
	lastUpdated: false,
};

const customer = (state = initialState, action) => {
	if (action.type === SIGNOUT_USER) {
		return {
			...state,
			jwt: null,
			customer: null,
			provider: null,
			lastUpdated: new Date(),
		};
	}
	if (action.type === TRUSTED_USER_AUTHENTICATED) {
		let { data } = action;

		const { jwt, provider } = data;

		let customer: JWTTrustedUser = jwtDecode(jwt); //no trust is needed here, server will reject.
		if (data) {
			return {
				...state,
				jwt,
				customer,
				provider,
				lastUpdated: new Date(),
			};
		}
	}

	return state;
};

export default customer;

import { SocialProvider } from "./../actions/customer";
import Actions from "../actions";
import { Customer } from "../types/woocommerce";

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
	wc_customer: Customer;
	provider: SocialProvider;
	lastUpdated: boolean | Date;
}
const initialState: ICustomer = {
	jwt: null,
	customer: null,
	wc_customer: null,
	provider: null,
	lastUpdated: false,
};

const customer = (state = initialState, action) => {
	if (action.type === SIGNOUT_USER) {
		return {
			...state,
			jwt: null,
			customer: null,
			wc_customer: null,
			provider: null,
			lastUpdated: new Date(),
		};
	}
	if (action.type === TRUSTED_USER_AUTHENTICATED) {
		let { data } = action;

		const { jwt, provider, wc_customer } = data;

		let customer: JWTTrustedUser = jwtDecode(jwt); //no trust is needed here, server will reject.
		if (data) {
			return {
				...state,
				jwt,
				customer,
				wc_customer: wc_customer,
				provider,
				lastUpdated: new Date(),
			};
		}
	}

	return state;
};

export default customer;

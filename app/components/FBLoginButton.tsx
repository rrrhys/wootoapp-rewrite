import React, { Component } from "react";
import { View } from "react-native";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import Actions from "../actions";
import { SocialProvider } from "../actions/customer";
import { connect } from "react-redux";
import { withTheme } from "react-native-elements";
export interface IFBLoginButtonProps {
	navigation: {
		state: {
			params: {
				product: Product;
			};
		};
	};

	goBack: () => void;
}

export default class FBLoginButton extends Component<IFBLoginButtonProps> {
	render() {
		const { authenticateSocialUser, signoutCustomer } = this.props;
		return (
			<View>
				<LoginButton
					publishPermissions={["email"]}
					onLoginFinished={(error, result) => {
						if (error) {
							alert("Login failed with error: " + error.message);
						} else if (result.isCancelled) {
							alert("Login was cancelled");
						} else {
							authenticateSocialUser("facebook");
						}
					}}
					onLogoutFinished={() =>
						// user clearly wants to dump this session.
						signoutCustomer()
					}
				/>
			</View>
		);
	}
}

const select = (store, ownProps: ICartScreenProps) => {
	return {
		customer: store.customer,
	};
};

const actions = dispatch => {
	const { authenticateSocialUser, signoutCustomer } = Actions;
	return {
		authenticateSocialUser: (provider: SocialProvider) => dispatch(authenticateSocialUser(provider)),
		signoutCustomer: () => dispatch(signoutCustomer()),
	};
};

export default connect(
	select,
	actions
)(withTheme(FBLoginButton));

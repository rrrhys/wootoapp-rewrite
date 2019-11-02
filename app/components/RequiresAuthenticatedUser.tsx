import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import Actions from "../actions";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import { withTheme, Icon } from "react-native-elements";
import { SocialProvider } from "../actions/customer";

import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import config from "../../env";

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

	signinWithFacebook = () => {
		const { authenticateSocialUser } = this.props;
		LoginManager.logInWithPermissions(["public_profile", "email"]).then(
			function(result) {
				if (result.isCancelled) {
					alert("Login was cancelled");
				} else {
					authenticateSocialUser("facebook");
				}
			},
			function(error) {
				alert("Login failed with error: " + error);
			}
		);
	};
	signinWithGoogle = async () => {
		const { authenticateSocialUser } = this.props;
		try {
			await GoogleSignin.hasPlayServices();
			GoogleSignin.configure({
				iosClientId: config.google_ios_client_id,
				webClientId: config.google_web_client_id,
				offlineAccess: true,
			});
			const userInfo = await GoogleSignin.signIn();
			authenticateSocialUser("google", userInfo);
			this.setState({ userInfo });
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
					position={"bottom"}
				>
					<Button
						icon={
							<Icon
								name="facebook-f"
								type="font-awesome"
								size={15}
								color="white"
								iconStyle={{ paddingRight: 16 }}
							/>
						}
						title={`Sign in with Facebook`}
						onPress={this.signinWithFacebook}
					/>
					<Button
						icon={
							<Icon
								name="google"
								type="font-awesome"
								size={15}
								color="white"
								iconStyle={{ paddingRight: 16 }}
							/>
						}
						title={`Sign in with Google`}
						onPress={this.signinWithGoogle}
					/>
				</Modal>

				{this.props.children}
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
		authenticateSocialUser: (provider: SocialProvider, additionalInfo = null) =>
			dispatch(authenticateSocialUser(provider, additionalInfo)),
	};
};

export default connect(
	select,
	actions
)(withTheme(RequiresAuthenticatedUser));

const styles = StyleSheet.create({
	modal: {
		height: 300,
	},
});

import { SocialIcon, withTheme, Divider, Icon } from "react-native-elements";

import Actions from "../actions";
import React from "react";
import { View } from "react-native";
import { SocialProvider } from "../actions/customer";

import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import config from "../../env";
import { connect } from "react-redux";
import Button from "./Button";
class SocialSignin extends React.Component {
	constructor(props) {
		super(props);
	}

	signinWithFacebook = () => {
		const { authenticateSocialUser } = this.props;
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
					onPress={this.signinWithFacebook}
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
					onPress={this.signinWithGoogle}
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
					onPress={this.signinWithGoogle}
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
	}
}

const EMAIL_GREY = "#666666";
const GOOGLE_RED = "#dd4b39";
const FACEBOOK_BLUE = "#3b5998";
const socialButtonStyle = { borderRadius: 50, padding: 12 };
const socialTitleStyle = { fontWeight: "bold", fontSize: 14 };

const select = store => {
	return {
		customer: store.customer,
	};
};

const actions = dispatch => {
	const { authenticateSocialUser, signoutCustomer, skipSignin } = Actions;
	return {
		skipSignin: () => dispatch(skipSignin()),
		authenticateSocialUser: (provider: SocialProvider, additionalInfo = null) =>
			dispatch(authenticateSocialUser(provider, additionalInfo)),
	};
};

export default connect(
	select,
	actions
)(withTheme(SocialSignin));

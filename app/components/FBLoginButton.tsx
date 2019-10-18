import React, { Component } from "react";
import { View } from "react-native";
import { LoginButton, AccessToken } from "react-native-fbsdk";

export default class FBLoginButton extends Component {
	render() {
		return (
			<View>
				<LoginButton
					publishPermissions={["email"]}
					onLoginFinished={(error, result) => {
						console.log("Finish fired");
						if (error) {
							alert("Login failed with error: " + error.message);
						} else if (result.isCancelled) {
							alert("Login was cancelled");
						} else {
							console.log(result);
							debugger;
							AccessToken.getCurrentAccessToken().then(data => {
								console.log(data.accessToken.toString());
							});
							alert("Login was successful with permissions: " + result.grantedPermissions);
						}
					}}
					onLogoutFinished={() => alert("User logged out")}
				/>
			</View>
		);
	}
}

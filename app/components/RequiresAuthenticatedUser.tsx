import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import Actions from "../actions";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import { withTheme, Icon } from "react-native-elements";
import { SocialProvider } from "../actions/customer";

import { LoginManager } from "react-native-fbsdk";

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
		authenticateSocialUser: (provider: SocialProvider) => dispatch(authenticateSocialUser(provider)),
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

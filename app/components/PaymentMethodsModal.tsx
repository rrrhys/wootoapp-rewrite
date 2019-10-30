import * as React from "react";
import Modal from "react-native-modalbox";
import { withTheme, Icon, Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Actions from "../actions";

class PaymentMethodsModal extends React.Component {
	state = {};

	setPaymentMethodAndClose = method => {
		const { setPaymentMethod, modalClosed } = this.props;
		setPaymentMethod(method);
		setTimeout(modalClosed, 50);
	};
	render() {
		const { cart, shop, setPaymentMethod } = this.props;

		const paymentMethods = [
			{ title: "Paypal", property: "checkout_paypal" },
			{ title: "Stripe", property: "checkout_stripe" },
		];
		return (
			<Modal
				isOpen={this.props.visible}
				ref={"paymentmodal"}
				coverScreen={true}
				position={"bottom"}
				style={[styles.modal, { flexDirection: "column", paddingBottom: 30 }]}
				onClosed={this.onClose}
				useNativeDriver={false}
			>
				{this.props.visible && (
					<Card title="Select Payment Method" containerStyle={{ flex: 1 }}>
						<ScrollView>
							{paymentMethods.map((p, i) => {
								{
									return (
										shop.business[p.property].enabled && (
											<ListItem
												key={i}
												title={p.title}
												checkmark={cart.paymentMethod === p.title}
												onPress={() => {
													cart.paymentMethod === p.title
														? this.setPaymentMethodAndClose(null)
														: this.setPaymentMethodAndClose(p.title);
												}}
											></ListItem>
										)
									);
								}
							})}
						</ScrollView>
					</Card>
				)}
			</Modal>
		);
	}

	onClose = () => {
		this.props.modalClosed();
	};
}

const select = store => {
	return {
		cart: store.cart,
		shop: store.shop,
	};
};

const actions = dispatch => {
	const { setPaymentMethod } = Actions;
	return {
		setPaymentMethod: method => dispatch(setPaymentMethod(method)),
	};
};

export default connect(
	select,
	actions
)(withTheme(PaymentMethodsModal));

const styles = StyleSheet.create({
	modal: {
		maxHeight: 240,
		minHeight: 120,
	},
});

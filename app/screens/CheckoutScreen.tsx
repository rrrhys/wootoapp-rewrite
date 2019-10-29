import { Attribute, Product, Variation } from "../types/woocommerce";
import { Icon, Image, ListItem, withTheme, Theme } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { ICart, ICartLineItem } from "../reducers/cart";

import Text from "../primitives/Text";
import Card from "../primitives/Card";
import Actions from "../actions";
import CartLineItem, { CART_CARD_HORIZONTAL_PADDING } from "../components/CartLineItem";
import Button from "../components/Button";
import React from "react";
import { connect } from "react-redux";
import FooterNavigationArea from "../components/FooterNavigationArea";
import { rules } from "../styles";
import Price from "../components/Price";
import FBLoginButton from "../components/FBLoginButton";

export interface ICheckoutScreenProps {
	navigation: {
		state: {
			params: {
				product: Product;
			};
		};
	};

	cart: ICart;
	theme: Theme;
	goBack: () => void;
}

export interface ICheckoutScreenState {}

class CheckoutScreen extends React.Component<ICheckoutScreenProps, ICheckoutScreenState> {
	state = {};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "Checkout",
			backButton: true,
		};
	};

	constructor(props: ICheckoutScreenProps) {
		super(props);
	}

	render() {
		const { height } = Dimensions.get("window");
		const { cart, theme, customer } = this.props;

		const effectiveHeight = height - rules.headerHeight;

		const titleStyle = {
			textAlign: "left",
		};
		return (
			<View
				accessibilityLabel={"checkoutScreenBaseView"}
				style={{
					flex: 1,
					height: effectiveHeight,
					flexDirection: "column",
					backgroundColor: theme.colors.backgroundColor,
				}}
			>
				<ScrollView style={{ flex: 1 }}>
					<Card title="User" titleStyle={titleStyle}>
						{customer.customer && (
							<Text>
								DEBUG: {customer.customer.email} {customer.customer.name} {customer.provider}
							</Text>
						)}
					</Card>
					<Card title="Delivery Address" titleStyle={titleStyle}>
						<Text>Delivery address</Text>
					</Card>
					<Card title="Billing Address" titleStyle={titleStyle}>
						<Text>Billing Address</Text>
					</Card>
					<Card title="Delivery Method" titleStyle={titleStyle}>
						<Text>Delivery Method</Text>
					</Card>
					<Card title="Payment Method" titleStyle={titleStyle}>
						<Text>Payment Method</Text>
					</Card>
					<Card title="Got a coupon code?" titleStyle={titleStyle}>
						<Text>Got a coupon code?</Text>
					</Card>
					<Card title="Got a coupon code?" titleStyle={titleStyle}>
						<FBLoginButton style={{ flex: 1 }} />
					</Card>
				</ScrollView>
				<View>
					<FooterNavigationArea>
						<Button title="Pay with XYZ" disabled style={{ flex: 1 }} />
					</FooterNavigationArea>
				</View>
			</View>
		);
	}
}

const select = (store, ownProps: ICartScreenProps) => {
	return {
		cart: store.cart,
		customer: store.customer,
	};
};

const actions = dispatch => {
	const {} = Actions;
	return {};
};

export default connect(
	select,
	actions
)(withTheme(CheckoutScreen));

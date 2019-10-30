import { Attribute, Product, Variation, Order } from "../types/woocommerce";
import { Icon, Image, ListItem, withTheme, Theme } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
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

import RequiresAuthenticatedUser from "../components/RequiresAuthenticatedUser";
import PaymentMethodsModal from "../components/PaymentMethodsModal";
import api from "../../data/api";
import ShippingMethodsModal from "../components/ShippingMethodsModal";

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
	state = {
		paymentMethodsVisible: false,
	};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "Checkout",
			backButton: true,
		};
	};

	constructor(props: ICheckoutScreenProps) {
		super(props);
	}

	createOrder = () => {
		const { createOrderFromCart } = this.props;

		createOrderFromCart().then((order: Order) => {
			// user needs to pay.
			this.props.navigation.navigate("PayScreen", { order });
		});
	};
	render() {
		const { height } = Dimensions.get("window");
		const { cart, theme, customer, shop } = this.props;

		const effectiveHeight = height - rules.headerHeight;

		const titleStyle = {
			textAlign: "left",
		};

		return (
			<RequiresAuthenticatedUser>
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
							<Text>{customer.wc_customer.shipping.address_1}</Text>
							{!!customer.wc_customer.shipping.address_2 && (
								<Text>{customer.wc_customer.shipping.address_2}</Text>
							)}
							<Text>
								{customer.wc_customer.shipping.city} {customer.wc_customer.shipping.state}{" "}
								{customer.wc_customer.shipping.postcode}
							</Text>
							<Text>{customer.wc_customer.shipping.country}</Text>
						</Card>
						<Card title="Billing Address" titleStyle={titleStyle}>
							<Text>{customer.wc_customer.billing.address_1}</Text>
							{!!customer.wc_customer.billing.address_2 && (
								<Text>{customer.wc_customer.billing.address_2}</Text>
							)}
							<Text>
								{customer.wc_customer.billing.city} {customer.wc_customer.billing.state}{" "}
								{customer.wc_customer.billing.postcode}
							</Text>
							<Text>{customer.wc_customer.billing.country}</Text>
						</Card>
						<Card
							title="Delivery Method"
							titleStyle={titleStyle}
							onPress={() => {
								this.setState({
									shippingMethodsVisible: true,
								});
							}}
						>
							{!cart.shippingMethod && <Text>Select Shipping Method</Text>}
							{cart.shippingMethod && (
								<ListItem
									containerStyle={{ margin: 0, padding: 0 }}
									title={cart.shippingMethod.label}
									rightTitle={<Price price={cart.shippingMethod.amount} />}
								/>
							)}
						</Card>
						<Card
							title="Payment Method"
							titleStyle={titleStyle}
							onPress={() => {
								this.setState({
									paymentMethodsVisible: true,
								});
							}}
						>
							{!cart.paymentMethod && <Text>Select Payment Method</Text>}
							{cart.paymentMethod && <Text>{cart.paymentMethod}</Text>}
						</Card>
						<Card title="Got a coupon code?" titleStyle={titleStyle}>
							<Text>Got a coupon code?</Text>
						</Card>
					</ScrollView>
					<View>
						<FooterNavigationArea>
							<Button
								title={cart.paymentMethod ? `Pay with ${cart.paymentMethod}` : "Pay"}
								disabled={!cart.paymentMethod}
								style={{ flex: 1 }}
								onPress={this.createOrder}
							/>
						</FooterNavigationArea>
					</View>
					<ShippingMethodsModal
						visible={this.state.shippingMethodsVisible}
						modalClosed={() => this.setState({ shippingMethodsVisible: false })}
					/>
					<PaymentMethodsModal
						visible={this.state.paymentMethodsVisible}
						modalClosed={() => this.setState({ paymentMethodsVisible: false })}
					/>
				</View>
			</RequiresAuthenticatedUser>
		);
	}
}

const select = (store, ownProps: ICartScreenProps) => {
	return {
		cart: store.cart,
		customer: store.customer,
		shop: store.shop,
	};
};

const actions = dispatch => {
	const { createOrderFromCart } = Actions;
	return { createOrderFromCart: () => dispatch(createOrderFromCart()) };
};

export default connect(
	select,
	actions
)(withTheme(CheckoutScreen));

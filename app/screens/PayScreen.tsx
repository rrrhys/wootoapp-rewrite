import { Attribute, Product, Variation, Order } from "../types/woocommerce";
import { Button, Icon, Image, withTheme } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import KeyValuePicker, { pickableValue } from "../components/KeyValuePicker";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import { rules, styles } from "../styles";

import Text from "../primitives/Text";
import Actions from "../actions";
import AddToCartButton from "../components/AddtoCartButton";
import FooterNavigationArea from "../components/FooterNavigationArea";
import BackButtonOverlay from "../components/BackButtonOverlay";
import CartButton from "../components/CartButton";
import ImageCarousel from "../components/ImageCarousel";
import Loading from "../components/Loading";
import ProductDescription from "../components/ProductDescription";
import React from "react";
import { connect } from "react-redux";
import ThemedScrollableTabView from "../primitives/ThemedScrollableTabView";
import { PaymentMethod } from "../reducers/cart";
import api from "../../data/api";
import shop from "../actions/shop";

export const INTERNAL_QUANTITY = "INTERNAL_QUANTITY";
export const ATTRIBUTE_MATCHING_PROPERTY = "name";
export interface IOrderScreenProps {
	navigation: {
		state: {
			params: {
				order: Order;
			};
		};
		goBack: () => void;
	};
}

export interface IOrderScreenState {}

const DEFAULT_WIDTH = 375;
class PayScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {
	state = {
		activeSlide: 0,
		quantity: 1,
		attributesSelected: {},
		variation: null,
		viewWidth: DEFAULT_WIDTH,
	};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "<Put pay view stuff here>",
			backButton: true,
		};
	};

	constructor(props: IOrderScreenProps) {
		super(props);
	}

	componentWillMount() {
		const { order } = this.props.navigation.state.params;

		const { customer } = this.props;
		const payment_method: PaymentMethod = order.payment_method;
		switch (payment_method) {
			case "Paypal":
				const { id, order_key, total } = order;
				//ding the server for a redirect URI, and then put that in a webview.
				api.payments.paypal
					.initiate({ id, order_key, total, customer })
					.then((response: { id: string; redirect: string }) => {
						debugger;
					});
				break;
		}
	}

	render() {
		const { theme } = this.props;
		return (
			<View
				accessibilityLabel={"orderScreenBaseView"}
				style={{
					flex: 1,
					flexDirection: "column",
					backgroundColor: theme.colors.backgroundColor,
				}}
			>
				<Text>I'm the pay screen. #{this.props.navigation.state.params.order.id}</Text>
				<Text>Send off initiate. All the order details, get back a link. Give it an IPN endpoint.</Text>
				<Text>Store the pending payment in a pending payments table.</Text>
				<Text>Open the paypal window (user makes payment) (paypal hits IPN)</Text>
				<Text>When the IPN is received, tell the WC store it's paid</Text>
			</View>
		);
	}
}

const select = (store, ownProps: IOrderScreenProps) => {
	const { order } = ownProps.navigation.state.params;

	return {
		shop: store.shop,
		customer: store.customer,
	};
};

const actions = dispatch => {
	return {};
};

export default connect(
	select,
	actions
)(withTheme(PayScreen));

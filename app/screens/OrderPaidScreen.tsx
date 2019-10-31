import { Attribute, Product, Variation, Order } from "../types/woocommerce";
import { Button, Icon, Image, withTheme } from "react-native-elements";
import { View } from "react-native";

import InAppBrowser from "react-native-inappbrowser-reborn";

import Text from "../primitives/Text";
import React from "react";
import { connect } from "react-redux";
import { PaymentMethod } from "../reducers/cart";
import api from "../../data/api";

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
class OrderPaidScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {
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
		const { order_id } = this.props.navigation.state.params;

		// go find the order.
	}
	componentDidMount() {
		InAppBrowser.close();
	}

	render() {
		const { theme } = this.props;
		return (
			<View
				accessibilityLabel={"orderPaidScreenBaseView"}
				style={{
					flex: 1,
					flexDirection: "column",
					backgroundColor: theme.colors.backgroundColor,
				}}
			>
				<Text>I'm the order paid screen. {this.props.navigation.state.params.order_id}</Text>
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
)(withTheme(OrderPaidScreen));

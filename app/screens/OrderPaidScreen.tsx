import { Attribute, Product, Variation, Order } from "../types/woocommerce";
import { Button, Icon, Image, withTheme, Overlay, Divider } from "react-native-elements";
import { View } from "react-native";

import Actions from "../actions";
import InAppBrowser from "react-native-inappbrowser-reborn";

import Text from "../primitives/Text";
import React from "react";
import { connect } from "react-redux";
import { PaymentMethod } from "../reducers/cart";
import api from "../../data/api";
import Card from "../primitives/Card";
import shop from "../actions/shop";
import { rules } from "../styles";

export const INTERNAL_QUANTITY = "INTERNAL_QUANTITY";
export const ATTRIBUTE_MATCHING_PROPERTY = "name";

const DEFAULT_WIDTH = 375;
class OrderPaidScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {
	constructor(props: IOrderScreenProps) {
		super(props);

		const { order_id } = props.navigation.state.params;

		props.navigation.navigate("OrderDetails", {
			order_id,
			show_thanks: true,
		});
	}

	componentWillMount() {
		// go find the order.
	}
	componentDidMount() {
		InAppBrowser.close();
	}

	render() {
		return null;
	}
}

export default withTheme(OrderPaidScreen);

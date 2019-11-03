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
class OrderDetailsScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {
	state = {
		activeSlide: 0,
		quantity: 1,
		attributesSelected: {},
		variation: null,
		viewWidth: DEFAULT_WIDTH,
		overlayVisible: null,
	};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: `View order #${navigation.state.params.order_id}`,
			showCartButton: false,
			backButton: !!!navigation.state.params.show_thanks,
		};
	};

	constructor(props: IOrderScreenProps) {
		super(props);

		const { order_id } = props.navigation.state.params;
		props.loadOrderById(order_id);
	}

	componentDidMount() {
		InAppBrowser.close();
	}

	static getDerivedStateFromProps(props, state) {
		const { order_id, show_thanks } = props.navigation.state.params;

		return {
			overlayVisible: show_thanks && state.overlayVisible == null,
		};
	}

	render() {
		const { theme, shop } = this.props;

		console.log(theme, shop);
		return (
			<View
				accessibilityLabel={"OrderDetailsScreenBaseView"}
				style={{
					flex: 1,
					flexDirection: "column",
					backgroundColor: theme.colors.backgroundColor,
				}}
			>
				<Text>I'm the order details screen. {this.props.navigation.state.params.order_id}</Text>
				{this.state.overlayVisible && (
					<Overlay
						overlayStyle={{
							margin: 0,
							padding: 0,
							height: "auto",
							flexDirection: "column",
						}}
						onBackdropPress={() => this.setState({ overlayVisible: false })}
						windowBackgroundColor={theme.colors.overlayBackground}
						overlayBackgroundColor={theme.colors.backgroundColor}
					>
						<Text
							h4
							style={{ fontWeight: "bold", color: theme.colors.grey1, paddingVertical: 10 }}
							h4Style={{ textAlign: "center" }}
						>
							Order #{this.props.navigation.state.params.order_id} placed successfully!
						</Text>
						<Card>
							<Text>
								<Text style={{ fontWeight: "bold" }}>
									Thanks for placing an order with {shop.business.name}!
								</Text>{" "}
								{"\n"}
								{"\n"}
								We'll be in touch soon via email to advise you of shipping details and when to expect
								your order.
								{"\n"}
								{"\n"}
								In the meantime, if you've got any questions or concerns, please reach out to us!
							</Text>
						</Card>
						<View style={{ padding: rules.divPadding }}>
							<Button title={"Email " + shop.business.support.email} type="outline" />
						</View>
						<View style={{ padding: rules.divPadding, paddingTop: 0 }}>
							<Button
								title={`View order ${this.props.navigation.state.params.order_id}`}
								onPress={() => this.setState({ overlayVisible: false })}
							/>
						</View>

						<Divider />
					</Overlay>
				)}
			</View>
		);
	}
}

const select = (store, ownProps: IOrderScreenProps) => {
	const { order_id } = ownProps.navigation.state.params;

	return {
		shop: store.shop,
		customer: store.customer,
		order: store.orders.orders[order_id],
	};
};

const actions = dispatch => {
	const { loadOrderById } = Actions;
	return {
		loadOrderById: (id: number) => dispatch(loadOrderById(id)),
	};
};

export default connect(
	select,
	actions
)(withTheme(OrderDetailsScreen));

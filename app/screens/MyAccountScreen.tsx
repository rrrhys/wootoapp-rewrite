import { Dimensions, FlatList, SectionList, View, Text, ScrollView } from "react-native";

import Actions from "../actions";
import { Category, Order } from "../types/woocommerce";
import Loading from "../components/Loading";
import ProductTile from "../components/ProductTile";
import React from "react";
import { connect } from "react-redux";
import RequiresAuthenticatedUser from "../components/RequiresAuthenticatedUser";
import { Icon, withTheme } from "react-native-elements";
import { DIVIDER_HEIGHT } from "../styles";
import ListItem from "../primitives/ListItem";
import ThemedScrollableTabView from "../primitives/ThemedScrollableTabView";
import { IOrders } from "../reducers/orders";
import Button from "../components/Button";
import Price from "../components/Price";

export interface IMyAccountScreenProps {
	navigation: {
		state: {
			params: {
				category: Category;
			};
		};
	};
	orders: IOrders;
}

class MyAccountScreen extends React.Component<IMyAccountScreenProps> {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "My Account",
			backButton: true,
		};
	};

	componentWillMount() {
		this.props.loadOrders();
	}

	constructor(props: IMyAccountScreenProps) {
		super(props);
	}

	render() {
		const { signoutCustomer, theme, orders } = this.props;

		return (
			<RequiresAuthenticatedUser>
				<View
					accessibilityLabel={"MyAccountScreenBaseView"}
					style={{
						flex: 1,
						backgroundColor: theme.colors.backgroundColor,
					}}
				>
					<ThemedScrollableTabView>
						<ScrollView tabLabel="My Orders">
							{orders.orders.map((o: Order, i) => {
								return (
									<ListItem
										contentContainerStyle={{
											paddingLeft: 10,
										}}
										bottomDivider
										leftIcon={
											<Icon name="shopping-bag" type="font-awesome" color={theme.colors.text} />
										}
										title={`Order #${o.id}`}
										subtitle={"Status: " + o.status}
										rightElement={
											o.status === "pending" && (
												<Button
													title={<Price prefix="Pay " price={o.total} />}
													onPress={() => this.props.navigation.navigate("Pay", { order: o })}
												/>
											)
										}
										chevron
										onPress={() => {
											this.props.navigation.navigate("Order", { order: o });
										}}
									/>
								);
							})}
						</ScrollView>
					</ThemedScrollableTabView>
					<ListItem
						contentContainerStyle={{
							paddingLeft: 10,
						}}
						titleStyle={{ color: theme.colors.text }}
						bottomDivider
						topDivider
						separator
						leftIcon={<Icon name="sign-out" type="font-awesome" color={theme.colors.text} />}
						title="Sign Out"
						chevron
						onPress={() => {
							signoutCustomer();

							this.props.navigation.navigate("Home");
						}}
					/>
				</View>
			</RequiresAuthenticatedUser>
		);
	}
}

const select = (store, ownProps: IMyAccountScreenProps) => {
	return {
		cart: store.cart,
		orders: store.orders,
		ui: store.ui,
		categories: store.categories,
	};
};

const actions = dispatch => {
	const { loadOrders, signoutCustomer } = Actions;
	return {
		loadOrders: () => dispatch(loadOrders()),
		signoutCustomer: () => dispatch(signoutCustomer()),
	};
};

export default connect(
	select,
	actions
)(withTheme(MyAccountScreen));

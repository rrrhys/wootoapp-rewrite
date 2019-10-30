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

export const INTERNAL_QUANTITY = "INTERNAL_QUANTITY";
export const ATTRIBUTE_MATCHING_PROPERTY = "name";
export interface IOrderScreenProps {
	navigation: {
		state: {
			params: {
				product: Product;
			};
		};
		goBack: () => void;
	};
	order: Order;
}

export interface IOrderScreenState {}

const DEFAULT_WIDTH = 375;
class OrderScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {
	state = {
		activeSlide: 0,
		quantity: 1,
		attributesSelected: {},
		variation: null,
		viewWidth: DEFAULT_WIDTH,
	};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "<Put order view stuff here>",
			backButton: true,
		};
	};

	constructor(props: IOrderScreenProps) {
		super(props);
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
				<Text>I'm the order screen. #{this.props.navigation.state.params.order.id}</Text>
			</View>
		);
	}
}

const select = (store, ownProps: IOrderScreenProps) => {
	const { order } = ownProps.navigation.state.params;

	return {};
};

const actions = dispatch => {
	return {};
};

export default connect(
	select,
	actions
)(withTheme(OrderScreen));

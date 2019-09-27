import { Dimensions, FlatList, SectionList, View, Text } from "react-native";

import Actions from "../actions";
import { Category } from "../types/woocommerce";
import Loading from "../components/Loading";
import ProductTile from "../components/ProductTile";
import React from "react";
import { connect } from "react-redux";

export interface ISearchScreenProps {
	navigation: {
		state: {
			params: {
				category: Category;
			};
		};
	};
	loadProductsInCategory: (category: number, page: number) => void;
	productsByCategory: Array<number>;
}

class SearchScreen extends React.Component<ISearchScreenProps> {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "Search",
			backButton: true,
		};
	};

	constructor(props: ISearchScreenProps) {
		super(props);
	}

	render() {
		return (
			<View
				accessibilityLabel={"SearchScreenBaseView"}
				style={{
					flex: 1,
				}}
			>
				<Text>Search</Text>
			</View>
		);
	}
}

const select = (store, ownProps: ISearchScreenProps) => {
	return {
		cart: store.cart,
		ui: store.ui,
		categories: store.categories,
	};
};

const actions = dispatch => {
	const { loadProductsInCategory } = Actions;
	return {
		loadProductsInCategory: (category: number, page: number) => dispatch(loadProductsInCategory(category, page)),
	};
};

export default connect(
	select,
	actions
)(SearchScreen);

import { Text } from "react-native";

import Actions from "../actions";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import Loading from "../components/Loading";

export interface IProductScreenProps {
	navigation: {
		state: {
			params: {
				product: Product;
			};
		};
	};
	loadProductById: (id: number) => void;
	product: Product;
}

class ProductScreen extends React.Component<IProductScreenProps> {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: navigation.state.params.product.name,
			backButton: true,
		};
	};

	constructor(props: IProductScreenProps) {
		super(props);
		props.loadProductById(props.navigation.state.params.product.id);
	}

	render() {
		const { product } = this.props;
		return product ? <Text>{JSON.stringify(product)}</Text> : <Loading />;
	}
}

const select = (store, ownProps: IProductScreenProps) => {
	const { product } = ownProps.navigation.state.params;

	return {
		cart: store.cart,
		ui: store.ui,
		categories: store.categories,
		product: store.products.products[product.id],
	};
};

const actions = dispatch => {
	const { loadProductById } = Actions;
	return {
		loadProductById: (id: number) => dispatch(loadProductById(id)),
	};
};

export default connect(
	select,
	actions
)(ProductScreen);

import { Text, View, TouchableOpacity } from "react-native";

import { IStore } from "../types/store";
import { NavigationInjectedProps } from "react-navigation";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

export interface Props {
	id: number;
	product: Product;
}

class ProductTile extends React.Component<Partial<NavigationInjectedProps> & Partial<Props>> {
	navigateToProduct = () => {
		const { product } = this.props;
		this.props.navigation.navigate("Product", { product });
	};

	render() {
		const { product } = this.props;

		let image;

		try {
			image = product.images && product.images.length > 0 ? product.images[0] : null;
		} catch (e) {
			debugger;
		}

		return (
			<View>
				<TouchableOpacity onPress={this.navigateToProduct}>
					<Card title={`${product.name}`} image={{ uri: image && image.src }} />
				</TouchableOpacity>
			</View>
		);
	}
}

const select = (store: IStore, ownProps: Props) => {
	return { product: store.products.products[ownProps.id] };
};

const actions = dispatch => {
	return {};
};

export default connect(
	select,
	actions
)(ProductTile);

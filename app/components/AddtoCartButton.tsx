import { Product, Variation } from "../types/woocommerce";

import Actions from "../actions";
import Button from "../components/Button";
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface IProps {
	product: Product;
	variation: Variation;
	quantity: number;
	enabled: boolean;
	style: ViewStyle;
	addProductToCart: (product: Product, variation: Variation, quantity) => void;
}

class AddToCartButton extends React.Component<IProps> {
	addProductToCart = () => {
		const { product, variation, quantity } = this.props;
		this.props.addProductToCart(product, variation, quantity);
	};
	render() {
		const { enabled, style } = this.props;
		return <Button title="Add to Cart" disabled={!enabled} style={style} onPress={this.addProductToCart} />;
	}
}

const mapStateToProps = (state: IStore, ownProps: IProps) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	const { addProductToCart } = Actions;

	return {
		addProductToCart: (product, variation, quantity) => dispatch(addProductToCart(product, variation, quantity)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToCartButton);

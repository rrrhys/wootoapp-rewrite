import { Button, Card, Image, ListItem } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

import Debug from "./Debug";
import FavoriteIcon from "./FavoriteIcon";
import { ICartLineItem } from "../reducers/cart";
import { IStore } from "../types/store";
import Loading from "./Loading";
import Price from "./Price";
import { Product } from "../types/woocommerce";
import React from "react";
import actions from "../actions";
import { connect } from "react-redux";
import { styles } from "../styles";

export interface IProps {
	lineItem: ICartLineItem;
	style?: ViewStyle;
	removeProductFromCart: (id: number) => void;
}

const AttributesList = props => {
	const { variation, quantity } = props;

	return [
		!!(variation && variation.attributes) &&
			variation.attributes.map((att, index) => {
				return <Text key={att.name}>{`${att.name}: ${att.option}`}</Text>;
			}),
		<Text key={"quantity"}>Quantity: {quantity}</Text>,
	];
};

class CartLineItem extends React.Component<Partial<NavigationInjectedProps> & Partial<IProps>> {
	navigateToProduct = () => {
		const { lineItem } = this.props;

		const { product, variation } = lineItem;

		this.props.navigation.navigate("Product", { product });
	};

	removeProductFromCart = () => {
		const { id } = this.props.lineItem;
		this.props.removeProductFromCart(id);
	};

	render() {
		const { lineItem } = this.props;

		const { product, variation } = lineItem;
		let image;

		try {
			image = product.images && product.images.length > 0 ? product.images[0] : null;
		} catch (e) {
			debugger;
		}

		return (
			<ListItem
				onPress={this.navigateToProduct}
				chevron={true}
				leftAvatar={{
					source: image && { uri: image.src },
					title: lineItem.product.name,
				}}
				title={
					<View style={{ paddingHorizontal: 10 }}>
						<Text>{lineItem.product.name}</Text>
						<AttributesList variation={variation} quantity={lineItem.quantity} />
						<Text>
							<Price price={lineItem.price} />
						</Text>
					</View>
				}
				subtitle={
					<Button
						onPress={this.removeProductFromCart}
						title="Remove"
						buttonStyle={{ justifyContent: "flex-start" }}
						titleStyle={{ fontSize: 12 }}
						type="clear"
					/>
				}
			/>
		);
	}
}

const mapStateToProps = (store: IStore, ownProps: IProps) => {
	return {
		product: store.products.products[ownProps.id],
	};
};

const mapDispatchToProps = dispatch => {
	const { removeProductFromCart } = actions;
	return {
		removeProductFromCart: lineItem => {
			dispatch(removeProductFromCart(lineItem));
		},
	};
};

export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CartLineItem)
);

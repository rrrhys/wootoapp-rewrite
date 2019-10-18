import { Button, Card, Image, ListItem, withTheme } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import Text from "../primitives/Text";
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
import KeyValuePicker from "./KeyValuePicker";
import { INTERNAL_QUANTITY } from "../screens/ProductScreen";

export interface IProps {
	lineItem: ICartLineItem;
	style?: ViewStyle;
	removeProductFromCart: (id: number) => void;
}

export const CART_CARD_HORIZONTAL_PADDING = 10;
const AttributesList = props => {
	const { variation, quantity } = props;

	return [
		!!(variation && variation.attributes) &&
			variation.attributes.map((att, index) => {
				return <Text key={att.name}>{`${att.name}: ${att.option}`}</Text>;
			}),
		quantity !== null && <Text key={"quantity"}>Quantity: {quantity}</Text>,
	];
};

AttributesList.defaultProps = {
	quantity: null,
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
		const { lineItem, theme } = this.props;

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
				leftAvatar={{
					source: image && { uri: image.src },
					title: lineItem.product.name,
				}}
				containerStyle={{ backgroundColor: theme.colors.backgroundColor }}
				title={
					<View style={{ paddingHorizontal: CART_CARD_HORIZONTAL_PADDING }}>
						<Text h4 style={{ marginBottom: 10 }}>
							{lineItem.product.name}
						</Text>

						<AttributesList variation={variation} />

						<KeyValuePicker
							label="Qty"
							key={INTERNAL_QUANTITY}
							id={INTERNAL_QUANTITY}
							values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
							currentValue={lineItem.quantity}
							onValueChanged={this.valueChanged}
						/>
						<Button
							onPress={this.removeProductFromCart}
							title="Remove"
							buttonStyle={{ justifyContent: "flex-start" }}
							titleStyle={{ fontSize: 12, color: theme.colors.text }}
							type="clear"
						/>
					</View>
				}
				rightTitle={
					<View style={{ marginHorizontal: CART_CARD_HORIZONTAL_PADDING }}>
						<Text style={{ textAlign: "right" }}>
							<Price price={lineItem.price} />
						</Text>
					</View>
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
	)(withTheme(CartLineItem))
);

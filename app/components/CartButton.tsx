import Button from "../components/Button";
import React from "react";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { ViewStyle } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

export interface IProps {
	style: ViewStyle;
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class CartButton extends React.Component<IProps> {
	navigateToCart = () => {
		this.props.navigation.navigate("Cart");
	};

	render() {
		return <Button title="View Cart" style={this.props.style} onPress={this.navigateToCart} />;
	}
}

export default withNavigation(CartButton);

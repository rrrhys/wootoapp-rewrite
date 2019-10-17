import {
	NavigationInjectedProps,
	NavigationParams,
	NavigationScreenProp,
	NavigationState,
	withNavigation,
} from "react-navigation";

import { Card, withTheme } from "react-native-elements";
import { Category } from "../types/woocommerce";
import React from "react";
import { TouchableOpacity } from "react-native";

export interface Props {
	category: Category;
}
class CategoryTile extends React.Component<Partial<NavigationInjectedProps> & Partial<Props>> {
	navigateToCategory = () => {
		const { category } = this.props;
		this.props.navigation.navigate("Category", { category });
	};
	render() {
		const { category, theme } = this.props;
		return (
			<TouchableOpacity onPress={this.navigateToCategory}>
				<Card
					containerStyle={{ backgroundColor: theme.colors.backgroundColor }}
					title={`${category.name} (${category.count})`}
					image={{ uri: category.image && category.image.src }}
				/>
			</TouchableOpacity>
		);
	}
}

export default withNavigation(withTheme(CategoryTile));

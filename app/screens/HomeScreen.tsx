import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { ScrollView, View } from "react-native";

import Actions from "../actions";
import CategoryTile from "../components/CategoryTile";
import { ICategories } from "../reducers/categories";
import { IStore } from "../types/store";
import { Iui } from "../reducers/ui";
import React from "react";
import config from "../../env";
import { connect } from "react-redux";
import { withTheme } from "react-native-elements";

export interface IAppProps {
	categories: ICategories;
	loadCategories: () => void;
	ui: Iui;
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class HomeScreen extends React.Component<IAppProps> {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: navigation.getParam("title"),
		};
	};

	constructor(props: IAppProps) {
		super(props);

		// we need an app definition.
		const { store_id, publishable_key, access_jwt } = config;

		props.navigation.setParams({ title: props.ui.name });

		props.loadShop();
		props.loadCategories();
		/*setTimeout(() => {
			this.props.navigation.navigate("Cart");
		}, 300);*/
	}

	render() {
		const { categories, theme } = this.props;
		return (
			<View style={{ backgroundColor: theme.colors.backgroundColor }}>
				<ScrollView>
					{categories.data.map(category => (
						<CategoryTile key={category.id} category={category} />
					))}
				</ScrollView>
			</View>
		);
	}
}

const select = (store: IStore) => {
	return {
		cart: store.cart,
		ui: store.ui,
		categories: store.categories,
	};
};

const actions = dispatch => {
	const { loadCategories, loadShop } = Actions;
	return {
		loadCategories: () => dispatch(loadCategories()),
		loadShop: () => dispatch(loadShop()),
	};
};

export default connect(
	select,
	actions
)(withTheme(HomeScreen));

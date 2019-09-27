import React from "react";
import { NavigationInjectedProps, withNavigation, NavigationActions } from "react-navigation";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { colors } from "../styles";

import Actions from "../actions";
import { connect } from "react-redux";
export interface SidebarProps {}

type SidebarElement = {
	id: number;
	title: string;
	onPress: () => void;
	icon: string;
};

const Sidebar = (props: SidebarProps) => {
	let ids = 0;

	const dispatchToRoute = (routeName, routeParams) => {
		props.closeDrawer();
		props.navigatorRef.dispatch(
			NavigationActions.navigate({
				routeName,
				routeParams,
			})
		);
	};

	const sidebarElements: Array<SidebarElement> = [
		{
			id: ids++,
			title: "Home",
			icon: "home",
			onPress: () => {
				dispatchToRoute("Home", {});
			},
		},
		{ id: ids++, title: "My Account", icon: "account-circle", onPress: () => {} },
		{ id: ids++, title: "Shop", icon: "store", onPress: () => {} },
		{ id: ids++, title: "Favorites", icon: "favorite", onPress: () => {} },
		{
			id: ids++,
			title: "Search",
			icon: "search",
			onPress: () => {
				dispatchToRoute("Search", {});
			},
		},
		{ id: ids++, title: "Checkout", icon: "shopping-cart", onPress: () => {} },
	];
	return (
		<View style={{ backgroundColor: colors.darkGreyBg + "ee", flex: 1 }}>
			<View style={{ height: 100 }}></View>

			{sidebarElements.map((el: SidebarElement) => {
				return (
					<ListItem
						containerStyle={{ backgroundColor: colors.darkGreyBg }}
						titleStyle={{ color: colors.lightGreyText }}
						key={el.id}
						title={el.title}
						leftIcon={{ name: el.icon, color: colors.lightGreyText, size: 22 }}
						contentContainerStyle={{ marginLeft: 8 }}
						onPress={el.onPress}
					/>
				);
			})}
		</View>
	);
};

const mapStateToProps = () => {
	return {};
};
const mapDispatchToProps = dispatch => {
	const { closeDrawer } = Actions;

	return {
		closeDrawer: () => dispatch(closeDrawer()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar);

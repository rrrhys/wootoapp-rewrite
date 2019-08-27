import { Alert, AsyncStorage, Image, Platform, Text, View } from "react-native";
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import CategoryScreen from "./screens/CategoryScreen";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Category: CategoryScreen,
		Product: ProductScreen,
	},
	{
		initialRouteName: "Home",
		/* The header config from HomeScreen is now here */
		defaultNavigationOptions: ({ navigation, screenProps }) => ({
			header: props => (
				<Header
					navigation={navigation}
					title={props.scene.descriptor.options.title}
					backButton={props.scene.descriptor.options.backButton}
				/>
			),
		}),
	}
);

const Navigation = createAppContainer(RootStack);

class Root extends React.Component {
	state: {
		isLoadingStore?: any;
		store?: any;
	};

	constructor(props) {
		super(props);

		console.disableYellowBox = true;
		this.state = {
			isLoadingStore: true,
			store: configureStore(this.onStoreConfigured),
		};
	}

	onStoreConfigured = () => {
		this.setState({ isLoadingStore: false });
	};

	render() {
		let { isLoadingStore } = this.state;
		if (isLoadingStore) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			);
		}

		return (
			<Provider store={this.state.store}>
				<Drawer>
					<Navigation />
				</Drawer>
			</Provider>
		);
	}
}

export default Root;

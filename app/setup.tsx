import { Text, View } from "react-native";
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import CartScreen from "./screens/CartScreen";
import SearchScreen from "./screens/SearchScreen";
import CategoryScreen from "./screens/CategoryScreen";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import MobileModeIfDesktop from "./components/MobileModeIfDesktop";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { ThemeProvider, Theme, withTheme } from "react-native-elements";
import { setTheme } from "./styles";

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Category: CategoryScreen,
		Product: ProductScreen,
		Cart: CartScreen,
		Search: SearchScreen,
	},
	{
		initialRouteName: "Home",
		/* The header config from HomeScreen is now here */
		defaultNavigationOptions: ({ navigation, screenProps }) => ({
			header: props => {
				// translate props passed in navigationOptions in the screen
				// into regular props for header
				const extraProps = props.scene.descriptor.options;

				return <Header navigation={navigation} {...extraProps} />;
			},
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
			navigatorRef: null,
		};
	}

	onStoreConfigured = () => {
		this.setState({ isLoadingStore: false });
	};

	render() {
		let { isLoadingStore, navigatorRef } = this.state;
		if (isLoadingStore) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			);
		}

		const darkMode = {
			text: "#ffffff",
			primary: "#000000", // header bg, button bg ,
			backgroundColor: "#121212",
			secondary: "#0000ff",
			grey0: "#ff00ff",
			grey1: "#cf6679", // heading text ,
			grey2: "#ccccff",
			grey3: "#00ffcc",
			grey4: "#ffff00",
			grey5: "#333333", //card borders, input borders ,
			greyOutline: "#ccff00",
			searchbg: "#ccccaa",
			success: "#ffcc00",
			divider: "#000000",
		};
		const lightMode = {};
		const theme: Theme = {
			colors: lightMode,
		};

		return (
			<MobileModeIfDesktop>
				<Provider store={this.state.store}>
					<ThemeProvider theme={theme}>
						<MergeToColors>
							<View style={{ flex: 1 }}>
								<Drawer navigatorRef={navigatorRef}>
									<View style={{ flex: 1 }} accessibilityLabel={"test-label"}>
										<Navigation
											ref={_navigatorRef => {
												!this.state.navigatorRef &&
													this.setState({ navigatorRef: _navigatorRef });
											}}
										/>
									</View>
								</Drawer>
							</View>
						</MergeToColors>
					</ThemeProvider>
				</Provider>
			</MobileModeIfDesktop>
		);
	}
}

const MergeToColors = withTheme(props => {
	setTheme(props.theme);
	return props.children;
});

export default Root;

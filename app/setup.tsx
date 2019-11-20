import { Text, View, Platform } from "react-native";
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import SearchScreen from "./screens/SearchScreen";
import CategoryScreen from "./screens/CategoryScreen";
import OrderScreen from "./screens/OrderScreen";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import MobileModeIfDesktop from "./components/MobileModeIfDesktop";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { ThemeProvider, Theme, withTheme } from "react-native-elements";
import { setTheme } from "./styles";
import PayScreen from "./screens/PayScreen";
import OrderPaidScreen from "./screens/OrderPaidScreen";
import config from "../env";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import { setAddressBarToDerivedPath } from "../helpers/routing";
import RootStack from "./navigation/RootStack";

const Navigation = createAppContainer(RootStack);

const darkMode = {
  text: "#ffffff",
  primary: "#cccccc", // header bg, button bg ,
  navbarText: "#ffffff",
  navbarBackgroundColor: "#000000",
  backgroundColor: "#121212",
  listBackgroundColor: "#000000",
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
  divider: "#cccccc",
  overlayBackground: "#eeeeee33"
};
const lightMode = {
  navbarText: "#333333",
  navbarBackgroundColor: "#ffffff",
  backgroundColor: "#fafafa",
  listBackgroundColor: "#ffffff",
  overlayBackground: "#333333cc"
};

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
      navigatorRef: null
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

    const theme: Theme = {
      Text: {
        h4Style: {
          fontSize: 20
        },
        h3Style: {
          fontSize: 24
        }
      }
    };

    return (
      <MobileModeIfDesktop>
        <Provider store={this.state.store}>
          <ThemeProvider theme={theme}>
            <MergeToColors store={this.state.store}>
              <View style={{ flex: 1 }}>
                <Drawer navigatorRef={navigatorRef}>
                  <View style={{ flex: 1 }} accessibilityLabel={"test-label"}>
                    <Navigation
                      uriPrefix={config.scheme}
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
  const state = props.store.getState();

  let branding;

  if (state.shop.business) {
    branding = state.shop.business.branding;
  }
  if (config.branding) {
    branding = config.branding;
  }

  props.theme.colors = {
    ...props.theme.colors,
    ...(branding && branding.darkMode ? darkMode : lightMode)
  };

  setTheme(props.theme);
  return props.children;
});

export default Root;

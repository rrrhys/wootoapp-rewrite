import {
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Platform,
  Text,
  View
} from "react-native";
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import CartScreen from "./screens/CartScreen";
import CategoryScreen from "./screens/CategoryScreen";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import MobileModeIfDesktop from "./components/MobileModeIfDesktop";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Category: CategoryScreen,
    Product: ProductScreen,
    Cart: CartScreen
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
      }
    })
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
      store: configureStore(this.onStoreConfigured)
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
      <MobileModeIfDesktop>
        <Provider store={this.state.store}>
          <View style={{ flex: 1 }}>
            <Drawer>
              <View style={{ flex: 1 }} accessibilityLabel={"test-label"}>
                <Navigation />
              </View>
            </Drawer>
          </View>
        </Provider>
      </MobileModeIfDesktop>
    );
  }
}

export default Root;

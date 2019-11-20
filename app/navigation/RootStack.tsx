import React from "react";
import Header from "../components/Header";
import { createStackNavigator } from "react-navigation";
import { setAddressBarToDerivedPath } from "../../helpers/routing";
import { Routes } from "./Routes";

const RootStack = createStackNavigator(Routes, {
  initialRouteName: "Home",
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: ({ navigation, screenProps }) => ({
    header: props => {
      // translate props passed in navigationOptions in the screen
      // into regular props for header
      const extraProps = props.scene.descriptor.options;

      setAddressBarToDerivedPath(
        navigation.state.routeName,
        navigation.state.params
      );

      return <Header navigation={navigation} {...extraProps} />;
    }
  })
});

export default RootStack;

import { Alert, AsyncStorage, Image, Platform, View } from "react-native";
import React, { Component } from "react";

import App from "./App";
import { Provider } from "react-redux";
import Storage from "react-native-storage"; // persistent storage
import configureStore from "./store/configureStore";

class Root extends React.Component {
  state: {
    isLoading?: any;
    store?: any;
  };

  constructor(props) {
    super(props);

    console.disableYellowBox = true;
    this.state = {
      isLoading: true,
      store: configureStore(() => this.onComplete())
    };
  }

  onComplete = () => {
    console.log("onComplete");
    this.setState({ isLoading: false });
  };

  render() {
    let { isLoading } = this.state;
    if (isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}

var storage = new Storage({
  size: 1000, // maximum capacity, default 1000
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds), can be null, which means never expire.
  defaultExpires: null,
  enableCache: true,
  sync: {
    // we'll talk about the details later.
  }
});

export default Root;

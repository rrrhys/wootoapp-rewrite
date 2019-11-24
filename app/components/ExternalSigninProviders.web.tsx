// the providers have not been implemented for web.

import React from "react";
import { View } from "react-native";

import { connect } from "react-redux";
import { withTheme } from "react-native-elements";
const ExternalSigninProviders = props => {
  return <View></View>;
};

const select = store => {
  return {};
};

const actions = dispatch => {
  return {};
};

export default connect(select, actions)(withTheme(ExternalSigninProviders));

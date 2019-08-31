import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { Card } from "react-native-elements";
import HTMLView from "react-native-htmlview";
import { IStore } from "../types/store";
import Loading from "./Loading";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface Props {
  description: string;
}

class ProductDescription extends React.Component<
  Partial<NavigationInjectedProps> & Partial<Props>
> {
  render() {
    const { description } = this.props;

    return (
      <View style={{ padding: rules.padding }}>
        <HTMLView value={description} />
      </View>
    );
  }
}

export default ProductDescription;

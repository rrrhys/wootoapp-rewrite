import {
  NavigationInjectedProps,
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  withNavigation
} from "react-navigation";

import { withTheme } from "react-native-elements";
import { Category } from "../types/woocommerce";
import React from "react";
import { TouchableOpacity } from "react-native";

import Card from "../primitives/Card";
//import { Card } from "react-native-elements";
import { CART_CARD_HORIZONTAL_PADDING } from "./CartLineItem";

export interface Props {
  category: Category;
}
class CategoryTile extends React.Component<
  Partial<NavigationInjectedProps> & Partial<Props>
> {
  navigateToCategory = () => {
    const { category } = this.props;
    this.props.navigation.navigate("Category", {
      category,
      category_id: category.id
    });
  };
  render() {
    const { category, theme } = this.props;

    return (
      <TouchableOpacity onPress={this.navigateToCategory}>
        <Card
          containerStyle={{
            backgroundColor: theme.colors.backgroundColor,
            minWidth: 200,
            borderRadius: 6,
            overflow: "hidden",
            margin: CART_CARD_HORIZONTAL_PADDING
          }}
          featuredTitle={`${category.name}`}
          featuredTitleStyle={{
            textAlign: "left",
            width: "100%",
            paddingHorizontal: 8
          }}
          featuredSubtitle={`${category.count} items`}
          featuredSubtitleStyle={{
            textAlign: "left",
            width: "100%",
            paddingHorizontal: 8
          }}
          image={{ uri: category.image && category.image.src }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(withTheme(CategoryTile));

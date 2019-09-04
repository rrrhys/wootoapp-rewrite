import { Product, Variation } from "../types/woocommerce";

import { Button } from "react-native-elements";
import React from "react";
import { View } from "react-native";
import { rules } from "../styles";

export interface Props {
  product: Product;
  variations: Array<Variation>;
}
class AddToCartButton extends React.Component<Props> {
  render() {
    return (
      <View style={{ padding: rules.padding }}>
        <Button title="Add to Cart" />
      </View>
    );
  }
}

export default AddToCartButton;

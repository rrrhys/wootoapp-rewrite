import { IStore } from "../types/store";
import { Product } from "../types/woocommerce";
import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import he from "he";
import products from "../actions/products";
import { styles } from "../styles";

export interface Props {
  onPress: () => void;
  product: Product;
  currency_symbol: string;
  currency_position: "left" | "right";
  number_of_decimals: number;
}

export const parsePriceFromHtml = product => {
  let price_html = he.decode(product.price_html.replace(/<[^>]+>/g, ""));

  return price_html;
};

class Price extends React.Component<Props> {
  priceWithCurrency = price => {
    const {
      currency_position,
      currency_symbol,
      number_of_decimals
    } = this.props;

    price = parseFloat(price).toFixed(number_of_decimals);

    return (
      <Text>
        {currency_position == "left" && currency_symbol}
        {price}
        {currency_position == "right" && currency_symbol}
      </Text>
    );
  };

  render() {
    const { product, currency_symbol, currency_position } = this.props;

    const shouldRenderHtmlPrice =
      product.type === "grouped" || product.type === "variable";

    console.log("shouldRenderHtmlPrice", shouldRenderHtmlPrice);
    return [
      shouldRenderHtmlPrice && (
        <Text style={styles.productTileRegularPrice}>
          {parsePriceFromHtml(product)}
        </Text>
      ),
      !shouldRenderHtmlPrice &&
        product.on_sale == true && [
          <Text style={styles.productTileSalePrice} key="sale-price">
            {this.priceWithCurrency(product.sale_price)}
          </Text>,
          <Text key="spacer"> </Text>,
          <Text style={styles.productTileOldPrice} key="old-price">
            {this.priceWithCurrency(product.regular_price)}
          </Text>
        ],
      !shouldRenderHtmlPrice && product.on_sale == false && (
        <Text style={styles.productTileRegularPrice}>
          {this.priceWithCurrency(
            product.regular_price !== "" ? product.regular_price : product.price
          )}
        </Text>
      )
    ];
  }
}

const mapStateToProps = (store: IStore) => {
  const { shop } = store;
  let {
    currency_symbol,
    currency_code,
    currency_position,
    number_of_decimals
  } = shop.business;

  currency_symbol = he.decode(currency_symbol);
  return {
    currency_symbol,
    currency_code,
    currency_position,
    number_of_decimals
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Price);

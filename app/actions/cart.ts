import { Product, Variation } from "../types/woocommerce";

import api from "./../../data/api";

const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const addProductToCart = (
  product: Product,
  variation: Variation,
  quantity: number
): addProductToCartAction => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    variation,
    quantity
  };
};

export type addProductToCartAction = {
  type: typeof ADD_PRODUCT_TO_CART;
  product: Product;
  variation: Variation;
  quantity: number;
};

export type cartActionTypes = addProductToCartAction;

export default { addProductToCart, ADD_PRODUCT_TO_CART };

import { Product, Variation } from "../types/woocommerce";

import api from "./../../data/api";

const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
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

export type removeProductFromCartAction = {
  type: typeof REMOVE_PRODUCT_FROM_CART;
  line_item_id: number;
};

const removeProductFromCart = (line_item_id: number) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    line_item_id
  };
};

export type addProductToCartAction = {
  type: typeof ADD_PRODUCT_TO_CART;
  product: Product;
  variation: Variation;
  quantity: number;
};

export type cartActionTypes =
  | addProductToCartAction
  | removeProductFromCartAction;

export default {
  addProductToCart,
  ADD_PRODUCT_TO_CART,
  removeProductFromCart,
  REMOVE_PRODUCT_FROM_CART
};

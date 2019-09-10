import { Product, Variation } from "../types/woocommerce";
import { addProductToCartAction, cartActionTypes } from "../actions/cart";

import Actions from "../actions";

const { ADD_PRODUCT_TO_CART } = Actions;

export interface ICart {
  lineItems: Array<ICartLineItem>;
  shippingLineItems: Array<ICartLineItem>;
  couponCode?: string;
  coupon: any; //TODO: The wooc coupon object.
  user: any; //TODO: should be a wooc user.

  lineItemsTotal: number; //the total of all the goods
  shippingTotal: number; // the total of the shipping
  couponTotalDiscount: number;
  grandTotal: number; //the amount to be charged. line items + shipping - coupon.
}

export interface ICartLineItem {
  id: number; //guid identifier.
  product: Product;
  variation: Variation;
  quantity: number;
  price: number;
  totalLine: number;
}

const initialState: ICart = {
  lineItems: [],
  shippingLineItems: [],
  couponCode: null,
  coupon: null,
  user: null,
  lineItemsTotal: 0,
  shippingTotal: 0,
  couponTotalDiscount: 0,
  grandTotal: 0
};

const cart = (state = initialState, action: cartActionTypes) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const { product, variation, quantity } = action as addProductToCartAction;

      const priceableEntity = variation ? variation : product;

      const price = parseFloat(
        priceableEntity.sale_price
          ? priceableEntity.sale_price
          : priceableEntity.price
      );
      const lineItem: ICartLineItem = {
        id: state.lineItems.length,
        product,
        variation,
        quantity,
        price,
        totalLine: price * quantity
      };

      return {
        ...state,
        lineItems: [...state.lineItems, lineItem]
      };
      break;
  }

  return state;
};

export default cart;

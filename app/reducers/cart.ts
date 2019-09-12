import { Product, Variation } from "../types/woocommerce";
import {
  addProductToCartAction,
  cartActionTypes,
  removeProductFromCartAction
} from "../actions/cart";

import Actions from "../actions";

const { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } = Actions;

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
  priceString: string;
  totalLineString: string;
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
    case REMOVE_PRODUCT_FROM_CART:
      const { line_item_id } = action as removeProductFromCartAction;

      return {
        ...state,
        lineItems: state.lineItems.filter(l => l.id !== line_item_id)
      };

      break;
    case ADD_PRODUCT_TO_CART:
      const { product, variation, quantity } = action as addProductToCartAction;

      const priceableEntity = variation ? variation : product;

      const price = parseFloat(
        priceableEntity.sale_price
          ? priceableEntity.sale_price
          : priceableEntity.price
      );

      //TODO: String numbers should use the local currency character etc.
      const lineItem: ICartLineItem = {
        id: state.lineItems.length,
        product,
        variation,
        quantity,
        price,
        totalLine: price * quantity,
        priceString: price.toFixed(2),
        totalLineString: (price * quantity).toFixed(2)
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

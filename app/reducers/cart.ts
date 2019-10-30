import {
	selectShippingMethodAction,
	getShippingQuoteAction as getShippingQuotesAction,
	ShippingQuote,
} from "./../actions/cart";
import { PaymentMethod } from "./cart";
import { Product, Variation } from "../types/woocommerce";
import {
	addProductToCartAction,
	cartActionTypes,
	removeProductFromCartAction,
	selectPaymentMethodAction,
} from "../actions/cart";

import Actions from "../actions";

const {
	ADD_PRODUCT_TO_CART,
	REMOVE_PRODUCT_FROM_CART,
	SET_PAYMENT_METHOD,
	SET_SHIPPING_METHOD,
	SHIPPING_QUOTES_RECEIVED,
	RESET_SHIPPING_QUOTES,
	ORDER_CREATED_FROM_CART,
} = Actions;

export type PaymentMethod = "Stripe" | "Paypal" | null;
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
	paymentMethod: PaymentMethod;
	shippingMethod: ShippingQuote;
	shippingQuotes: Array<ShippingQuote> | null;
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
	grandTotal: 0,
	paymentMethod: null,
	shippingMethod: null,
	shippingQuotes: null,
};

const cart = (state = initialState, action: cartActionTypes) => {
	let shippingMethod;
	let shippingQuotes;
	switch (action.type) {
		case RESET_SHIPPING_QUOTES:
			shippingMethod = null;
			shippingQuotes = null;
			return {
				...state,
				shippingMethod,
				shippingQuotes,
			};
			break;
		case ORDER_CREATED_FROM_CART:
			debugger;
			return { ...initialState };
			break;
		case REMOVE_PRODUCT_FROM_CART:
			const { line_item_id } = action as removeProductFromCartAction;

			return {
				...state,
				lineItems: state.lineItems.filter(l => l.id !== line_item_id),
			};

			break;
		case SET_SHIPPING_METHOD:
			({ shippingMethod } = action as selectShippingMethodAction);
			return {
				...state,
				shippingMethod,
			};
			break;
		case SET_PAYMENT_METHOD:
			const { paymentMethod } = action as selectPaymentMethodAction;
			return {
				...state,
				paymentMethod,
			};
			break;
		case RESET_SHIPPING_QUOTES:
			break;
		case SHIPPING_QUOTES_RECEIVED:
			({ shippingQuotes } = action as getShippingQuotesAction);
			return {
				...state,
				shippingQuotes,
			};
			break;
		case ADD_PRODUCT_TO_CART:
			const { product, variation, quantity } = action as addProductToCartAction;

			const priceableEntity = variation ? variation : product;

			const price = parseFloat(priceableEntity.sale_price ? priceableEntity.sale_price : priceableEntity.price);

			//TODO: String numbers should use the local currency character etc.
			const lineItem: ICartLineItem = {
				id: state.lineItems ? state.lineItems.length : 0,
				product,
				variation,
				quantity,
				price,
				totalLine: price * quantity,
				priceString: price.toFixed(2),
				totalLineString: (price * quantity).toFixed(2),
			};

			if (!state.lineItems) {
				state.lineItems = [];
			}

			return {
				...state,
				lineItems: [...state.lineItems, lineItem],
			};
			break;
	}

	return state;
};

export default cart;

import { PaymentMethod } from "./../reducers/cart";
import { Product, Variation, Order, ShippingLine } from "../types/woocommerce";

import api from "./../../data/api";

const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
const SET_SHIPPING_METHOD = "SET_SHIPPING_METHOD";
const SHIPPING_QUOTES_RECEIVED = "SHIPPING_QUOTES_RECEIVED";
const RESET_SHIPPING_QUOTES = "RESET_SHIPPING_QUOTES";
const ORDER_CREATED_FROM_CART = "ORDER_CREATED_FROM_CART";
const addProductToCart = (product: Product, variation: Variation, quantity: number) => {
	return (dispatch, getState) => {
		dispatch(resetShipping());

		dispatch({
			type: ADD_PRODUCT_TO_CART,
			product,
			variation,
			quantity,
		} as addProductToCartAction);
	};
};

export type removeProductFromCartAction = {
	type: typeof REMOVE_PRODUCT_FROM_CART;
	line_item_id: number;
};

const getShippingQuotes = () => {
	return (dispatch, getState) => {
		const { cart, customer } = getState();

		api.shipping.quote({ cart, customer }).then(r => {
			dispatch({
				type: SHIPPING_QUOTES_RECEIVED,
				shippingQuotes: r.shipping_methods,
			} as getShippingQuotesAction);
		});
	};
};

const createOrderFromCart = () => {
	return (dispatch, getState) => {
		const { cart, customer } = getState();
		return api.orders.create({ cart, customer }).then((order: Order) => {
			debugger;
			dispatch({
				type: ORDER_CREATED_FROM_CART,
				cart,
			});

			return order;
		});
	};
};

const setShippingMethod = (shippingMethod: ShippingLine) => {
	return {
		type: SET_SHIPPING_METHOD,
		shippingMethod,
	};
};

const setPaymentMethod = (paymentMethod: PaymentMethod) => {
	return {
		type: SET_PAYMENT_METHOD,
		paymentMethod,
	};
};

const resetShipping = () => {
	return {
		type: RESET_SHIPPING_QUOTES,
	} as resetShippingAction;
};
const removeProductFromCart = (line_item_id: number) => {
	return {
		type: REMOVE_PRODUCT_FROM_CART,
		line_item_id,
	};
};

export type getShippingQuotesAction = {
	type: typeof SHIPPING_QUOTES_RECEIVED;
	shippingQuotes: Array<ShippingLine>; //TODO: Strongly type
};
export type addProductToCartAction = {
	type: typeof ADD_PRODUCT_TO_CART;
	product: Product;
	variation: Variation;
	quantity: number;
};

export type resetShippingAction = {
	type: typeof RESET_SHIPPING_QUOTES;
};
export type selectPaymentMethodAction = {
	type: typeof SET_PAYMENT_METHOD;
	paymentMethod: PaymentMethod;
};
export type selectShippingMethodAction = {
	type: typeof SET_PAYMENT_METHOD;
	shippingMethod: ShippingMethod;
};

export type cartActionTypes =
	| addProductToCartAction
	| removeProductFromCartAction
	| selectPaymentMethodAction
	| selectShippingMethodAction
	| getShippingQuotesAction
	| resetShippingAction;

export default {
	addProductToCart,
	ADD_PRODUCT_TO_CART,
	removeProductFromCart,
	REMOVE_PRODUCT_FROM_CART,
	SET_PAYMENT_METHOD,
	SET_SHIPPING_METHOD,
	SHIPPING_QUOTES_RECEIVED,
	ORDER_CREATED_FROM_CART,
	setPaymentMethod,
	setShippingMethod,
	getShippingQuotes,
	createOrderFromCart,
};

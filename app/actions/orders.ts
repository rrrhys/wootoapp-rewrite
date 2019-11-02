import { ICustomer } from "./../reducers/customer";
import { Order } from "./../types/woocommerce.d";
import api from "../../data/api";

const ORDERS_LOADED = "ORDERS_LOADED";
const ORDER_LOADED = "ORDER_LOADED";

const loadOrders = (page: number = 1) => {
	//TODO: Add status filtering etc.

	return (dispatch, getState) => {
		const { customer } = <{ customer: ICustomer }>getState();
		api.orders.list({ customer_id: customer.wc_customer.id }).then((r: Array<Order>) => {
			dispatch(getOrdersSuccess(r, page, customer.wc_customer.id));
		});
	};
};

const loadOrderById = (order_id: number) => {
	return (dispatch, getState) => {
		const { customer } = getState();
		return api.orders
			.get({ order_id, customer })
			.then((order: Order) => dispatch(getOrderSuccess(order_id, order)));
	};
};

export type ordersSuccessAction = {
	type: typeof ORDERS_LOADED;
	results: Array<Order>;
	page: number;
	customer_id: number;
};
export type orderSuccessAction = {
	type: typeof ORDER_LOADED;
	id: number;
	order: Order;
};

export type orderActionTypes = ordersSuccessAction | orderSuccessAction;

const getOrderSuccess = (id, order): orderSuccessAction => {
	return {
		type: ORDER_LOADED,
		id,
		order,
	};
};

const getOrdersSuccess = (results, page, customer_id): ordersSuccessAction => {
	return {
		type: ORDERS_LOADED,
		results,
		page,
		customer_id,
	};
};

export default {
	ORDERS_LOADED,
	ORDER_LOADED,
	loadOrders,
	loadOrderById,
};

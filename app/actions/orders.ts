import { ICustomer } from "./../reducers/customer";
import { Order } from "./../types/woocommerce.d";
import api from "../../data/api";

const ORDERS_LOADED = "ORDERS_LOADED";

const loadOrders = (page: number = 1) => {
	//TODO: Add status filtering etc.

	return (dispatch, getState) => {
		const { customer } = <{ customer: ICustomer }>getState();
		api.orders.list({ customer_id: customer.wc_customer.id }).then((r: Array<Order>) => {
			dispatch(getOrdersSuccess(r, page, customer.wc_customer.id));
		});
	};
};

export type ordersSuccessAction = {
	type: typeof ORDERS_LOADED;
	results: Array<Order>;
	page: number;
	customer_id: number;
};

export type orderActionTypes = ordersSuccessAction;

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
	loadOrders,
};

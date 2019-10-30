import { orderActionTypes } from "./../actions/orders";
import Actions from "../actions";
import { Order } from "../types/woocommerce";

const { ORDERS_LOADED } = Actions;

export interface IOrders {
	lastUpdated: boolean | Date;
	customer_id: number;
	orders: Array<Order>;
}

const initialState: IOrders = {
	lastUpdated: false,
	customer_id: null,
	orders: [],
};

const orders = (state = initialState, action: orderActionTypes): IOrders => {
	switch (action.type) {
		case ORDERS_LOADED:
			return { ...state, orders: action.results, customer_id: action.customer_id };

			break;
	}

	return state;
};

export default orders;

import { orderActionTypes, ordersSuccessAction, orderSuccessAction } from "./../actions/orders";
import Actions from "../actions";
import { Order } from "../types/woocommerce";

import _ from "lodash";
const { ORDERS_LOADED, ORDER_LOADED } = Actions;

export interface IOrders {
	lastUpdated: boolean | Date;
	customer_id: number;
	orders: { [id: number]: Order };
	byId: Array<number>;
}

const initialState: IOrders = {
	lastUpdated: false,
	customer_id: null,
	orders: {},
	byId: [],
};

const orders = (state = initialState, action: orderActionTypes): IOrders => {
	let orders;
	switch (action.type) {
		case ORDERS_LOADED:
			orders = _.cloneDeep(state.orders);

			const { results, customer_id } = action as ordersSuccessAction;
			results.map(o => {
				orders[o.id] = o;
			});

			const ids = results.map(r => r.id);
			const byId = _.uniq([...ids, ...state.byId]);

			return { ...state, orders, customer_id, byId };

			break;

		case ORDER_LOADED:
			orders = _.cloneDeep(state.orders);
			const { id, order } = action as orderSuccessAction;
			orders[id] = order;

			return { ...state, orders };
			break;
	}

	return state;
};

export default orders;

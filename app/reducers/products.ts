import Actions from "../actions";
import { Product } from "../types/woocommerce";
import _ from "lodash";

export interface IProducts {
	byId: Array<number>;
	byPage: { [id: number]: Array<number> };
	byCategoryId: { [id: number]: Array<number> };
	products: { [id: number]: Product };
	lastUpdated: boolean | Date;
}

const { PRODUCTS_IN_CATEGORY_LOADED } = Actions;

const initialState: IProducts = {
	byId: [],
	byPage: {},
	products: {},
	byCategoryId: {},
	lastUpdated: false,
};

const products = (
	state = initialState,
	action: {
		results: Array<Product>;
		category: number;
		page: number;
		type: string;
	}
) => {
	// type category results page
	switch (action.type) {
		case PRODUCTS_IN_CATEGORY_LOADED:
			const newState = _.cloneDeep(state);
			const { results, category, page } = action;
			if (results) {
				_.forEach(results, p => {
					newState.products[p.id] = p;
				});
				const ids = results.map(r => r.id);
				newState.byId = _.uniq([...ids, ...newState.byId]);

				// store ids for ref by page.
				newState.byPage = _.get(newState, "byPage", []);
				newState.byPage[page] = ids;

				// initialise if doesnt exist.

				newState.byCategoryId[category] = _.get(newState.byCategoryId, category, []);

				// store ids for ref by category.
				newState.byCategoryId[category] = ids;

				return {
					...state,
					...newState,
					lastUpdated: new Date(),
				};
			}
			break;
	}
	return state;
};

export default products;

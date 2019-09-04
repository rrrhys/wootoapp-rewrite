import { Product, Variation } from "../types/woocommerce";

import Actions from "../actions";
import _ from "lodash";

export interface IProducts {
  byId: Array<number>;
  byPage: { [id: number]: Array<number> };
  byCategoryId: { [id: number]: Array<number> };
  variations: { [product_id: number]: Array<Variation> };
  products: { [id: number]: Product };
  lastUpdated: boolean | Date;
}

const {
  PRODUCTS_IN_CATEGORY_LOADED,
  VARIATION_BY_PRODUCT_ID_LOADED,
  PRODUCT_LOADED
} = Actions;

const initialState: IProducts = {
  byId: [],
  byPage: {},
  products: {},
  variations: {},
  byCategoryId: {},
  lastUpdated: false
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
    case VARIATION_BY_PRODUCT_ID_LOADED:
      let variations = _.cloneDeep(state.variations);
      const { product_id, variations: thisVariations } = action;
      if (product_id) {
        variations[product_id] = thisVariations;

        return { ...state, variations };
      }
      break;
    case PRODUCT_LOADED:
      let products = _.cloneDeep(state.products);
      const { id, product } = action;
      products[id] = product;

      return { ...state, products };
      break;
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

        newState.byCategoryId[category] = _.get(
          newState.byCategoryId,
          category,
          []
        );

        // store ids for ref by category.
        newState.byCategoryId[category] = ids;

        return {
          ...state,
          ...newState,
          lastUpdated: new Date()
        };
      }
      break;
  }
  return state;
};

export default products;

import Actions from "../actions";
import { Category } from "../types/woocommerce";

const { CATEGORIES_LOADED, CATEGORY_LOADED } = Actions;

export interface ICategories {
  data: Array<Category>;
  lastUpdated: boolean | Date;
}
const initialState: ICategories = {
  data: [],
  lastUpdated: false
};

const categories = (state = initialState, action) => {
  if (action.type === CATEGORIES_LOADED) {
    let { data } = action;

    if (data) {
      return {
        ...state,
        data,
        lastUpdated: new Date()
      };
    }
  }

  if (action.type === CATEGORY_LOADED) {
    let { data } = action;

    let { category_id, result } = data;

    let existingData = state.data;

    existingDataFiltered = existingData.filter(e => e.id != category_id);
    existingDataFiltered.push(data.result);
    state.data = [...existingDataFiltered];

    if (data) {
      return {
        ...state,
        lastUpdated: new Date()
      };
    }
  }

  return state;
};

export default categories;

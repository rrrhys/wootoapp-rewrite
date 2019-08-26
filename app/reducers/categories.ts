import Actions from "../actions";
import { Category } from "../types/woocommerce";

const { CATEGORIES_LOADED } = Actions;

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

  return state;
};

export default categories;

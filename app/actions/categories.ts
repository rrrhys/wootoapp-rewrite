import { Category } from "./../types/woocommerce.d";
const CATEGORIES_LOADED = "CATEGORIES_LOADED";
const CATEGORY_LOADED = "CATEGORY_LOADED";

import api from "./../../data/api";

const getCategoriesSuccess = categories => {
  return {
    type: CATEGORIES_LOADED,
    data: categories
  };
};

const getCategorySuccess = (category_id, result: Category) => {
  return {
    type: CATEGORY_LOADED,
    data: { category_id, result }
  };
};

const loadCategory = category_id => {
  return (dispatch, getState) => {
    return api.categories.get(category_id).then(r => {
      dispatch(getCategorySuccess(category_id, r));
    });
  };
};
const loadCategories = () => {
  return (dispatch, getState) => {
    return api.categories.list().then(r => {
      dispatch(getCategoriesSuccess(r));
    });

    // TODO: ERROR HANDLE
  };
};

export default {
  CATEGORIES_LOADED,
  CATEGORY_LOADED,
  loadCategories,
  loadCategory
};

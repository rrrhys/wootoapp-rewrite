const PRODUCTS_IN_CATEGORY_LOADED = "PRODUCTS_IN_CATEGORY_LOADED";

import api from "./../../data/api";

const loadProductsInCategory = (category: number, page: number = 1) => {
  return (dispatch, getState) => {
    api.products.list({ category, page: page }).then(r => {
      dispatch(getProductsInCategorySuccess(category, r, page));
    });
    // TODO ERROR HANDLE.
  };
};

const getProductsInCategorySuccess = (category, results, page) => {
  return {
    type: PRODUCTS_IN_CATEGORY_LOADED,
    category,
    results,
    page
  };
};

export default {
  PRODUCTS_IN_CATEGORY_LOADED,
  loadProductsInCategory
};

import { Action, ActionCreator } from "redux";

import { ThunkAction } from "redux-thunk";
import woo from "./../../data/woo";

const CATEGORIES_LOADED = "CATEGORIES_LOADED";
/**
 * Loads the core store info from the API.
 * @param shop_id
 * @param publishable_key
 * @param access_jwt
 */
const loadShop = (
  shop_id: number,
  publishable_key: string,
  access_jwt: string
) => {
  return (dispatch, getState) => {
    woo.categories.list().then(r => {
      dispatch(getCategoriesSuccess(r));
    });
  };
};

const getCategoriesSuccess = categories => {
  console.log("Get cat sucess");
  return {
    type: CATEGORIES_LOADED,
    data: categories
  };
};

export default {
  loadShop,
  CATEGORIES_LOADED
};

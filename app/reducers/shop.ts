import Actions from "../actions";
import { Product } from "../types/woocommerce";
import _ from "lodash";
import { string } from "prop-types";

export interface IShop {
  business: {
    currency_symbol: string;
    currency_code: string;
    currency_position: string;
  };
}

const { STORE_LOADED } = Actions;

const initialState: IShop = {};

const shop = (
  state = initialState,
  action: {
    type: string;
    result: any;
  }
) => {
  // type category results page
  switch (action.type) {
    case STORE_LOADED:
      let { result } = action;

      if (result) {
        return {
          ...state,
          business: result.business,
          lastUpdated: new Date()
        };
      }
      break;
  }
  return state;
};

export default shop;

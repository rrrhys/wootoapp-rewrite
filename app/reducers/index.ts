import cart from "./cart";
import categories from "./categories";
import customer from "./customer";
import { combineReducers } from "redux";
import products from "./products";
import shop from "./shop";
import orders from "./orders";
import ui from "./ui";
import Actions from "../actions";
const { SIGNOUT_USER } = Actions;

const reducers = combineReducers({
  cart,
  categories,
  products,
  shop,
  orders,
  ui,
  customer
});

//wrapped with the logged out action
const reducersWithLogoutDumpState = (state, action) => {
  if (action.type === SIGNOUT_USER) {
    let newState = {};
    ["shop", "ui", "categories", "products"].map(k => {
      newState[k] = state[k];
    });
    state = newState;
  }
  return reducers(state, action);
};

export default reducersWithLogoutDumpState;

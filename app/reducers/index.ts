import cart from "./cart";
import categories from "./categories";
import { combineReducers } from "redux";
import products from "./products";
import shop from "./shop";
import ui from "./ui";

export default combineReducers({ cart, categories, products, shop, ui });

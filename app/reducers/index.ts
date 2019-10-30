import cart from "./cart";
import categories from "./categories";
import customer from "./customer";
import { combineReducers } from "redux";
import products from "./products";
import shop from "./shop";
import orders from "./orders";
import ui from "./ui";

export default combineReducers({ cart, categories, products, shop, orders, ui, customer });

import cart from "./cart";
import categories from "./categories";
import { combineReducers } from "redux";
import ui from "./ui";

export default combineReducers({ cart, categories, ui });

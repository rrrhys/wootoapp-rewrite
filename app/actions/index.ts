import cart from "./cart";
import categories from "./categories";
import customer from "./customer";
import products from "./products";
import shop from "./shop";
import ui from "./ui";
import orders from "./orders";

const actions = {
	...shop,
	...categories,
	...ui,
	...products,
	...cart,
	...customer,
	...orders,
};

console.log("actions", actions);
export default actions;

import cart from "./cart";
import categories from "./categories";
import customer from "./customer";
import products from "./products";
import shop from "./shop";
import ui from "./ui";

const actions = {
	...shop,
	...categories,
	...ui,
	...products,
	...cart,
	...customer,
};

console.log("actions", actions);
export default actions;

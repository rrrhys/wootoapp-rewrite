import cart from "./cart";
import categories from "./categories";
import products from "./products";
import shop from "./shop";
import ui from "./ui";

const actions = {
  ...shop,
  ...categories,
  ...ui,
  ...products,
  ...cart
};

console.log("actions", actions);
export default actions;

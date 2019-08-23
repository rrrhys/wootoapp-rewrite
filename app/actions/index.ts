import shop from "./shop";
import ui from "./ui";

const actions = {
  ...shop,
  ...ui
};

console.log("actions", actions);
export default actions;

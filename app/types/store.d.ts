import { ICategories } from "./../reducers/categories";
import { IProducts } from "./../reducers/products";
import { Iui } from "../reducers/ui";
import { IShop } from "../reducers/shop";

export interface IStore {
  products: IProducts;
  categories: ICategories;
  ui: Iui;
  shop: IShop;
}

import { ICategories } from "./../reducers/categories";
import { IProducts } from "./../reducers/products";
import { Iui } from "../reducers/ui";

export interface IStore {
  products: IProducts;
  categories: ICategories;
  ui: Iui;
}

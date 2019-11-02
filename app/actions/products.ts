const PRODUCTS_IN_CATEGORY_LOADED = "PRODUCTS_IN_CATEGORY_LOADED";
const VARIATION_BY_PRODUCT_ID_LOADED = "VARIATION_BY_PRODUCT_ID_LOADED";
const PRODUCT_LOADED = "PRODUCT_LOADED";

import { Category, Product, Variation } from "../types/woocommerce";

import api from "./../../data/api";

const loadProductsInCategory = (category: number, page: number = 1) => {
	return (dispatch, getState) => {
		api.products.list({ category, page: page }).then((r: Array<Product>) => {
			r.forEach((p: Product) => {
				if (p.variations.length > 0) {
					// fetch child variable types.
					dispatch(loadVariationByProductId(p.id));
				}
			});
			dispatch(getProductsInCategorySuccess(category, r, page));
		});
		// TODO ERROR HANDLE.
	};
};

const loadVariationByProductId = (id: number) => {
	return (dispatch, getState) => {
		api.products.variations.get(id).then((v: Array<Variation>) => {
			dispatch(getVariationByProductIdSuccess(id, v));
		});
	};
};
const loadProductById = (id: number) => {
	// TODO: Load this product fresh from server, and update it in the products store.
	return (dispatch, getState) => {
		api.products.get(id).then((product: Product) => dispatch(getProductSuccess(id, product)));
	};
};

const getProductSuccess = (id, product): productSuccessAction => {
	return {
		type: PRODUCT_LOADED,
		id,
		product,
	};
};
const getVariationByProductIdSuccess = (product_id, variations): productVariationSuccessAction => {
	return {
		type: VARIATION_BY_PRODUCT_ID_LOADED,
		product_id,
		variations,
	};
};

const getProductsInCategorySuccess = (category, results, page): productsInCategorySuccessAction => {
	return {
		type: PRODUCTS_IN_CATEGORY_LOADED,
		category,
		results,
		page,
	};
};

export type productsInCategorySuccessAction = {
	type: typeof PRODUCTS_IN_CATEGORY_LOADED;
	category: number;
	results: Array<Product>;
	page: number;
};

export type productSuccessAction = {
	type: typeof PRODUCT_LOADED;
	id: number;
	product: Product;
};

export type productVariationSuccessAction = {
	type: typeof VARIATION_BY_PRODUCT_ID_LOADED;
	product_id: number;
	variations: Array<Variation>;
};

export type productActionTypes = productSuccessAction | productVariationSuccessAction | productsInCategorySuccessAction;

export default {
	PRODUCTS_IN_CATEGORY_LOADED,
	VARIATION_BY_PRODUCT_ID_LOADED,
	PRODUCT_LOADED,
	loadProductsInCategory,
	loadProductById,
};

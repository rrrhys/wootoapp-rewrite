const CATEGORIES_LOADED = "CATEGORIES_LOADED";

import api from "./../../data/api";

const getCategoriesSuccess = categories => {
	return {
		type: CATEGORIES_LOADED,
		data: categories,
	};
};

const loadCategories = () => {
	return (dispatch, getState) => {
		return api.categories.list().then(r => {
			dispatch(getCategoriesSuccess(r));
		});

		// TODO: ERROR HANDLE
	};
};

export default { CATEGORIES_LOADED, loadCategories };

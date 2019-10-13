import api from "./../../data/api";

const STORE_LOADED = "STORE_LOADED";
const loadShop = () => {
	return (dispatch, getState) => {
		api.store().then(r => {
			dispatch(storeLoadedSuccess(r));
		});
		// TODO ERROR HANDLE.
	};
};

const storeLoadedSuccess = result => {
	return {
		type: STORE_LOADED,
		result,
	};
};

export default { loadShop, STORE_LOADED };

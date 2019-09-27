const TOGGLE_DRAWER = "TOGGLE_DRAWER";

const openDrawer = () => {
	return {
		type: TOGGLE_DRAWER,
		data: true,
	};
};
const closeDrawer = () => {
	return {
		type: TOGGLE_DRAWER,
		data: false,
	};
};

export default {
	openDrawer,
	closeDrawer,
	TOGGLE_DRAWER,
};

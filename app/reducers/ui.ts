import Actions from "../actions";
import config from "../../env";

const { TOGGLE_DRAWER } = Actions;

export interface Iui {
	drawerOpen: boolean;
	name: string;
}
const initialState: Iui = {
	drawerOpen: false,
	name: config.name,
};

const ui = (state = initialState, action) => {
	if (action.type === TOGGLE_DRAWER) {
		console.log("action.data", action.type, action.data);
		return {
			...state,
			drawerOpen: action.data,
		};
	}

	return state;
};

export default ui;

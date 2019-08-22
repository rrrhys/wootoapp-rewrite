import Actions from "../actions";

const { CATEGORIES_LOADED } = Actions;

const initialState = {
  categories: {
    data: []
  }
};

const categories = (state = initialState, action) => {
  if (action.type === CATEGORIES_LOADED) {
    let categories = action.data;
    console.log("action.data", action.type, action.data);
    return {
      ...state,
      categories
    };
  }

  return state;
};

export default categories;

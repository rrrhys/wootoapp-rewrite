const initialState = {
  cartwrap: { cart: "Yes" }
};

const cart = (state = initialState, action) => {
  if (action.type === "GET_AUDITS") {
    let auditsByProject = action.data;
    // console.log('action.data GET_AUDITS ', auditsByProject);
    return {
      ...state,
      auditsByProject
    };
  }

  return state;
};

export default cart;

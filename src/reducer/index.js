// action
export const UPDATE_USERINFO = "UPDATE_USERINFO";

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
};

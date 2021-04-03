const registerReducer = (state ={}, action) => {
  switch (action.type) {
    case "REG_RESPONSE":
      return action.payload
    default:
      return state;
  }
};

export default registerReducer;
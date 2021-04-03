const modalInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "MODAL_INFO":
      return action.payload
    default:
      return state;
  }
};

export default modalInfoReducer;
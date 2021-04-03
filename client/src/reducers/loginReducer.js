let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_RESPONSE":
      return {
        loggedIn: action.payload.status === 200 ? true : false,
        user: action.payload,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default loginReducer;

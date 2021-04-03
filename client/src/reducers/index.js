import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import marketReducer from "./marketReducer";
import selectCoinReducer from "./selectCoinReducer";
import modalInfoReducer from "./modalInfoReducer";
import favoriteReducer from "./favoriteReducer";
import transactionReducer from "./transactionReducer";
import portListReducer from "./portListReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  market: marketReducer,
  selectedCoin: selectCoinReducer,
  portfolio: portListReducer,
  info: modalInfoReducer,
  favorites: favoriteReducer,
  transactions: transactionReducer,
  registerInfo: registerReducer,
  userInfo: loginReducer,
  form: formReducer,
});

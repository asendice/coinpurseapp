const transactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case "ADD_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION":
      const transaction = action.payload;
      return { ...state, transactions: state.transactions.concat(transaction) };
    default:
      return state;
  }
};

export default transactionReducer;
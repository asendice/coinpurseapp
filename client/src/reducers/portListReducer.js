const portListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case "CREATE_PORTLIST":
      const transactions = action.payload;
      const mapTransactions = transactions.map((trans) => {
        return {
          name: trans.name,
          amt: trans.buy
            ? Number(trans.amt)
            : -Math.abs(trans.amt),
          total: trans.buy
            ? Number(trans.amt * trans.price)
            : -Math.abs(trans.amt * trans.price),
        };
      });
      const addAmts = Array.from(
        mapTransactions.reduce(
          (m, { name, amt }) => m.set(name, (m.get(name) || 0) + amt),
          new Map()
        ),
        ([name, amt]) => ({ name, amt })
      );

      const addTotals = Array.from(
        mapTransactions.reduce(
          (m, { name, total }) => m.set(name, (m.get(name) || 0) + total),
          new Map()
        ),
        ([name, total]) => ({ name, total })
      );

      const mergeByName = (arr1, arr2, arr3) =>
        arr1.map((itm) => ({
          ...arr2.find((item) => item.name === itm.name && item),
          ...arr3.find((item) => item.name === itm.name && item),
          ...itm,
        }));

      const portfolio = mergeByName(addAmts, mapTransactions, addTotals);
      return { ...state, list: portfolio };
    default:
      return state;
  }
};

export default portListReducer;

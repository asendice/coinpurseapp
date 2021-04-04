import coinGeckoApi from "../apis/coinGeckoApi";
import backendApi from "../apis/backendApi";
//Actions
//Asynchronous Action Creator to retrieve market data from api
export const getMarket = () => {
  return async (dispatch) => {
    const response = await coinGeckoApi.get("/");
    dispatch({ type: "FETCH_MARKET", payload: response.data });
  };
};

export const modalInfo = () => {
  return async (dispatch) => {
    const response = await backendApi.get("/modalInfo");
    dispatch({ type: "MODAL_INFO", payload: response.data.message });
  };
};

export const coinSelect = (coin) => {
  return {
    type: "COIN_SELECTED",
    payload: coin,
  };
};

//<-----> BEGINNING OF ACTION CREATORS FOR FAVORITE <----->
export const addFavorite = (coin) => {
  return {
    type: "ADD_FAVORITE",
    payload: coin,
  };
};

export const addFavorites = (coins) => {
  return {
    type: "ADD_FAVORITES",
    payload: coins,
  };
};

export const deleteFavorite = (id) => (dispatch) => {
  backendApi
    .delete(`/favorites`, {
      params: {
        id: id,
      },
    })
    .then((fav) =>
      dispatch({
        type: "DELETE_FAVORITE",
        payload: id,
      })
    );
};

export const getFavorites = (userId) => {
  return async (dispatch) => {
    await backendApi
      .get("/favorites", {
        params: {
          userId: userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response.data;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((favorites) => dispatch(addFavorites(favorites.message)));
  };
};

export const postFavorite = (coin) => {
  const json = JSON.stringify(coin);
  return (dispatch) => {
    backendApi
      .post("/favorites", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((favorites) => dispatch(addFavorite(favorites.data.result)))
      .catch((error) => {
        console.log("postFavorite", error.message);
      });
  };
};

//<-----> END OF ACTION CREATORS FOR FAVORITE <----->

//<-----> BEGINNING OF ACTION CREATORS FOR TRANSACTIONS <----->
export const postTransaction = (trans) => {
  const json = JSON.stringify(trans);
  return (dispatch) => {
    backendApi
      .post("/transactions", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response) {
          console.log("response", response);
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((transactions) =>
        dispatch(addTransaction(transactions.data.result))
      )
      .catch((error) => {
        console.log("postTransaction", error.message);
      });
  };
};
export const getTransactions = (userId) => {
  return async (dispatch) => {
    await backendApi
      .get("/transactions", {
        params: {
          userId: userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response.data;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((transactions) =>
        dispatch(
          addTransactions(transactions.message),
          dispatch(createPortList(transactions.message))
        )
      );
  };
};

export const addTransactions = (trans) => {
  return {
    type: "ADD_TRANSACTIONS",
    payload: trans,
  };
};
export const addTransaction = (trans) => {
  return {
    type: "ADD_TRANSACTION",
    payload: trans,
  };
};

//<-----> END OF ACTION CREATORS FOR TRANSACTION <----->

//<-----> BEGINNING OF ACTION CREATORS FOR PORT LIST <----->

export const createPortList = (transList) => {
  return {
    type: "CREATE_PORTLIST",
    payload: transList,
  };
};
//<-----> END OF ACTION CREATORS FOR PORT LIST <----->

export const register = (formValues) => {
  const json = JSON.stringify({
    email: formValues.email,
    name: formValues.username,
    password: formValues.password,
    password_confirmation: formValues.confirmPassword,
    skill: formValues.skill,
  });

  return (dispatch) => {
    backendApi
      .post("/signup", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(registered(response)))
      .catch((error) => {
        dispatch(registered(error.response));
      });
  };
};

export const registered = (res) => {
  return {
    type: "REG_RESPONSE",
    payload: res,
  };
};

export const login = (formValues) => {
  const json = JSON.stringify({
    name: formValues.username,
    password: formValues.password,
  });
  return (dispatch) => {
    backendApi
      .post("/signin", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(response));
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          console.log(error, "error");
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(loggedin(response)))
      .catch((error) => {
        dispatch(loggedin(error.response));
      });
  };
};

export const loggedin = (res) => {
  return {
    type: "LOG_RESPONSE",
    payload: res,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: "LOGOUT",
  });
};

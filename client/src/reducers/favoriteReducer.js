const favoriteReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case "ADD_FAVORITES":
      return { ...state, favorites: action.payload };
    case "ADD_FAVORITE":
      const favorite = action.payload;
      return { ...state, favorites: state.favorites.concat(favorite) };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav._id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoriteReducer;

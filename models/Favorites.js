const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "favorites",
  }
);

module.exports = mongoose.model("Favorites", favoritesSchema);

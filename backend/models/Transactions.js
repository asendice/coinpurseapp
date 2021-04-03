const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amt: {
      type: Number,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    symbol: {
      type: String,
      required: false,
    },
    buy: {
      type: Boolean,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "transactions",
  }
);

module.exports = mongoose.model("Transactions", transactionsSchema);

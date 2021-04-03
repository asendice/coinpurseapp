const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modalInfoSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    labelDescription: {
      type: String,
      required: true,
    },
  },
  {
    collection: "modalInfo",
  }
);

module.exports = mongoose.model("ModalInfo", modalInfoSchema);

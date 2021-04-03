const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  postTransactions,
  getTransactions,
  postFavorites,
  getFavorites,
  delFavorites,
  getModalInfo
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/transactions", postTransactions);
router.get("/transactions", getTransactions);
router.post("/favorites", postFavorites);
router.get("/favorites", getFavorites);
router.delete("/favorites", delFavorites);
router.get("/modalInfo", getModalInfo)

module.exports = router;

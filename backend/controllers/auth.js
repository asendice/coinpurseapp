const User = require("../models/User");
const Transactions = require("../models/Transactions");
const Favorites = require("../models/Favorites");
const ModalInfo = require("../models/ModalInfo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongo = require("mongodb");
const { createJWT } = require("../utils/auth");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = (req, res, next) => {
  const { name, email, password, password_confirmation, skill } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "passwords do not match" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: `${name} username already exists` }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
          skill: skill,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};
exports.signin = (req, res) => {
  const { name, password } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ name: name })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "Username is not recognized..." }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "Password is incorrect..." }] });
            }
            const access_token = createJWT(user.name, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  return res.status(500).json({ erros: err }), console.log(err);
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ erro: err }), console.log(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ erro: err });
    });
};
exports.postTransactions = (req, res) => {
  const {
    userId,
    amt,
    note,
    name,
    symbol,
    buy,
    image,
    price,
    date,
    time,
  } = req.body;
  const transactions = new Transactions({
    userId: userId,
    amt: amt,
    note: note,
    name: name,
    symbol: symbol,
    buy: buy,
    image: image,
    price: price,
    date: date,
    time: time,
  });
  transactions
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: err }],
      });
    });
};

exports.getTransactions = (req, res) => {
  const { userId } = req.query;
  Transactions.find({ userId: userId }).then((trans) => {
    if (!trans) {
      return res.status(404).json({
        errors: [{ user: `${userId} does not have transactions` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: trans,
      });
    }
  });
};

exports.postFavorites = (req, res) => {
  const { userId, symbol } = req.body;
  const favorites = new Favorites({
    userId: userId,
    symbol: symbol,
  });
  favorites
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: err }],
      });
    });
};

exports.getFavorites = (req, res) => {
  const { userId } = req.query;
  Favorites.find({ userId: userId }).then((favs) => {
    if (!favs) {
      return res.status(404).json({
        errors: [{ user: `${userId} does not have favorites` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: favs,
      });
    }
  });
};

exports.delFavorites = (req, res) => {
  const { id } = req.query;
  console.log(id);
  Favorites.find({ id: id });
  Favorites.deleteOne({ _id:  mongo.ObjectId(id) }).then((fav) => {
    console.log("fav", fav);
    if (!fav) {
      return res.status(404).json({
        errors: [{ fav: `${id} does not exist.` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: `${id} has been deleted`,
      });
    }
  });
};

exports.getModalInfo = (req, res) => {
  ModalInfo.find().then((info) => {
    if (!info) {
      return res.status(404).json({
        errors: [{ user: `Modal Info cannot be found.` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: info,
      });
    }
  });
};
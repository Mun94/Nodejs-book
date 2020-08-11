var express = require("express");
var User = require("../models/index.js").User;

var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.render("sequelize", { users });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

var express = require("express");
var User = require("../schemas/user.js");

var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("mongoose", { users });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

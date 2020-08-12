var express = require("express");
var User = require("../schemas/user.js");

var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    res.status(201).json(user);
    console.log(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

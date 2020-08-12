var express = require("express");
var User = require("../models").User;

var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
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
    console.log(user);
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
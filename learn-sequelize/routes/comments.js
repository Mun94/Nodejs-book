var express = require("express");
var { User, Comment } = require("../models");

var router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await Comment.update(
      { comment: req.body.comment },
      { where: { id: req.params.id } }
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Comment.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

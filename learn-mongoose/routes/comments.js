const express = require("express");
const Comment = require("../schemas/comment");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    const result = await Comment.populate(comment, { path: "commenter" });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const comments = await Comment.find({
        commenter: req.params.id,
      }).populate("commenter");
      res.json(comments);
    } catch (e) {
      console.error(e);
      next(e);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          _id: req.params.id,
        },
        {
          comment: req.body.comment,
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;

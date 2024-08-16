const express = require("express");
const router = express.Router();

const Comments = require("../models/comments");

router.get("/get-comments", (req, res) => {
   Comments.find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

router.get("/get-comments/:postID", (req, res) => {
   const { postID } = req.params;

   Comments.find({ postID: postID })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

router.post("/comment", (req, res) => {
   const { name, email, comment, website, postID } = req.body;
   const commentInstance = new Comments({
      name: name,
      email: email,
      comment: comment,
      website: website,
      postID: postID,
   });
   console.log(`Name: ${name} Email: ${email}`);
   commentInstance
      .save()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => console.log(err));
});

module.exports = router;

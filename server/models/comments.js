const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      website: {
         type: String,
         required: false,
      },
      comment: {
        type: String,
        required: false
      },
      postID: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;

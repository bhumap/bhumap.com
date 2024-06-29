const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    replies: [
      {
        text: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const Comment =
  mongoose.models?.comments || mongoose.model("comments", commentSchema);

export default Comment;

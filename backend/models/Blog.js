import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    thambnail: {
      type: String,
      default: "",
      // required: true,
    },
    description: {
      type: String,
      maxlength: 200,
      default: "",
      // required: true
    },
    content: {
      type: String,
      default: "",
      // required: true
    },
    tags: {
      type: [String],
      // required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    activity: {
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    // comments: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'comments'
    // },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  },
);

export default mongoose.model("Blog", blogSchema);


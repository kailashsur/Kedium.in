import mongoose, { Schema } from "mongoose";

let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.google_auth;
      },
      select: false,
    },

    profile: {
      bio: {
        type: String,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
      },
      cover_img: {
        type: String,
      },

      profile_img: {
        type: String,
        default: () => {
          return `https://api.dicebear.com/6.x/${
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
          }/svg?seed=${
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ]
          }`;
        },
      },
      profile_color: {
        type: String,
        default: "#FBA1B7",
      },
    },

    role: {
      type: String,
      enum: ["USER", "MEMBER", "ADMIN"], // role can only be 'user' or 'admin'
      default: "USER", // default role is 'user'
    },
    verified: {
      type: Boolean,
      default: false,
    },
    interested_in: {
      type: [String], // catagories
      default: [],
    },

    reading_list: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },

    total_posts: {
      type: Number,
      default: 0,
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    following_count: {
      type: Number,
      default: 0,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
    // other fields as needed
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    google_auth: {
      type: Boolean,
      default: false,
      select: false,
    },
    pinned_post: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  },
);

export default mongoose.model("User", userSchema);

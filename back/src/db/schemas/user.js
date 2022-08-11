import { Schema, model } from "mongoose";

const KeywordSchema = new Schema({
  job: String,
  jobDetail: String,
  workPlace: String,
  career: String,
  education: String,
  employ: String,
});

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    registerNumber: {
      type: String,
      required: false,
    },
    ownerName: {
      type: String,
      required: false,
    },
    imageLink: {
      type: String,
      required: false,
      default:
        "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png",
    },
    keywords: [KeywordSchema],
    followers: [
      {
        follower: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    followings: [
      {
        following: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };

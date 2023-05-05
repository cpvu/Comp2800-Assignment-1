import mongoose, { model, Schema } from "mongoose";

export const userModel = model(
  "users",
  new Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      userType: { type: String, default: "user" }
    },
    { collection: "users" }
  )
);

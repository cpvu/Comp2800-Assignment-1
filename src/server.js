import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import { apiRouter, catchRouter, clientRouter } from "./routes/index.js";
import mongoose from "mongoose";

dotenv.config();
export const root = path.join(path.resolve(), "src", "public");

export let expressInstance = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      dbName: "Comp_Two",
      keepAlive: true,
    });

    const app = express();

    app.set("view engine", "ejs");
    app.set('views', path.join(path.resolve(), "src", 'views/'));
    app.use(express.static(root));
    app.use(cors({ credentials: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(
      sessions({
        secret: "secret",
        saveUninitialized: true,
        authenticated: Boolean,
        username: String,
        cookie: { maxAge: 0 },
        resave: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URL,
        }),
      })
    );

    app.use("/api", apiRouter());
    app.use(clientRouter());
    app.use("*", catchRouter());

    return app;
  } catch (e) {
    console.log(e);
  }
};

import { Router } from "express";
import {
  postLogin,
  postSignOut,
  postSignup,
} from "../controllers/authController.js";

export const apiRouter = () => {
  const router = Router();

  router.post("/signup", postSignup);
  router.post("/login", postLogin);
  router.post("/signout", postSignOut);

  return router;
};

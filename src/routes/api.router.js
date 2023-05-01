import { Router } from "express";
import { postLogin, postSignup } from "../controllers/authController.js";

export const apiRouter = () => {
  const router = Router();

  router.post("/signup", postSignup);
  router.post("/login", postLogin);

  return router;
};

import { Router } from "express";
import {
  getSignUp,
  getHomePage,
  getLogin,
} from "../controllers/clientController.js";

export const clientRouter = () => {
  const router = Router();

  router.get("/", getHomePage);
  router.get("/signup", getSignUp);
  router.get("/login", getLogin);

  return router;
};

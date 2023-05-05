import { Router } from "express";
import {
  getSignUp,
  getHomePage,
  getLogin,
  getUserPage,
  getAdminPage,
} from "../controllers/clientController.js";

export const clientRouter = () => {
  const router = Router();

  router.get("/", getHomePage);
  router.get("/signup", getSignUp);
  router.get("/login", getLogin);
  router.get("/userPage", getUserPage);
  router.get("/admin", getAdminPage);

  return router;
};

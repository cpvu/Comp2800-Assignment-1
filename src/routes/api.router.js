import { Router } from "express";
import {
  postAddAdmin,
  postLogin,
  postRemoveAdmin,
  postSignOut,
  postSignup,
} from "../controllers/authController.js";

export const apiRouter = () => {
  const router = Router();

  router.post("/signup", postSignup);
  router.post("/login", postLogin);
  router.post("/signout", postSignOut);
  router.post("/admin/addAdmin", postAddAdmin);
  router.post("/admin/removeAdmin", postRemoveAdmin);

  return router;
};

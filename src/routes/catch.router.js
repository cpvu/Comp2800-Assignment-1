import { Router } from "express";

export const catchRouter = () => {
  const router = Router();

  router.get("*", (req, res) => {
    res.send("404 - Not Found");
  });
  return router;
};

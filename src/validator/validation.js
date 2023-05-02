import Joi from "joi";
import { loginSchema } from "./authSchema.js";

export const handleAuthValidate = (input) => {
  console.log(input);
  const error = loginSchema.validate(input);
  return error;
};

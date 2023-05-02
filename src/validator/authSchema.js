import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().min(5).max(15).alphanum().required(),
  password: Joi.string().min(5).max(20).required(),
}).unknown(true);

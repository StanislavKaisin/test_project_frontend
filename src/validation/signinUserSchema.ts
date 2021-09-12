import * as joi from "joi";

export const signinUserSchema = joi.object({
  password: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
});

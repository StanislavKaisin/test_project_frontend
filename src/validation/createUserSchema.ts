import * as joi from "joi";

const phoneNumberJoi = joi.extend(require("joi-phone-number"));

export const createUserSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().alphanum().min(3).max(30).required(),
  phone: phoneNumberJoi
    .string()
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  viber: phoneNumberJoi
    .string()
    .allow(null, "")
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  //'+32 494 32 24 56'
  address: joi.string().allow(null, "").min(10).max(100),
});

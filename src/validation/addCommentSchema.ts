import * as joi from "joi";

export const addAlertSchema = joi.object({
  name: joi.string().min(3).max(10).allow(null, ""),
  description: joi.string().min(3).max(600).required(),
  userId: joi.string().alphanum().required(),
  alertd: joi.string().alphanum().required(),
});

import Joi from "joi";

const userSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userUpdateStatusSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userUpdateStatusSchema,
  userEmailSchema,
};

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

export default {
  userSignupSchema,
  userSigninSchema,
};

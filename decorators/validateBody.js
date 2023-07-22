import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "Missing required field"));
    }
    next();
  };
  return fn;
};

export default validateBody;

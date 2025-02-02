import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authControllers from "../../controllers/auth-controllers.js";
import { upload, authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.singup
);

authRouter.get("/verify/:verificationToken", authControllers.verify);
authRouter.post(
  "/verify",
  validateBody(usersSchemas.userEmailSchema),
  authControllers.resendVerify
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  authControllers.singin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.userUpdateStatusSchema),
  authControllers.updateSubscription
);

export default authRouter;

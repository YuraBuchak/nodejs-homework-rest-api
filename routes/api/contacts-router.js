import express from "express";
import contactControllers from "../../controllers/contact-controllers.js";
import { validateBody } from "../../decorators/index.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:contactId", isValidId, contactControllers.getContactById);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.contactAddSchema),
  contactControllers.addContact
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactControllers.deleteContactById
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(contactsSchemas.contactAddSchema),
  contactControllers.updateContactById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactControllers.updateStatusContact
);

export default contactsRouter;

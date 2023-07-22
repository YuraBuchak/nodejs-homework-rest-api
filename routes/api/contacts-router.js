import express from "express";
import contactControllers from "../../controllers/contact-controllers.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewares/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:contactId", contactControllers.getContactById);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.contactAddSchema),
  contactControllers.addContact
);

contactsRouter.delete("/:contactId", contactControllers.deleteContactById);

contactsRouter.put(
  "/:contactId",
  validateBody(contactsSchemas.contactAddSchema),
  contactControllers.updateContactById
);

export default contactsRouter;

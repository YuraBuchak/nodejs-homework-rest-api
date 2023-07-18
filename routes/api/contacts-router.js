import express, { json } from "express";
import Joi from "joi";

import { HttpError } from "../../helpers/index.js";
import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const listContacts = await contactsService.listContacts();
    res.json(listContacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsService.getContactById(contactId);

    if (!contactById) {
      throw HttpError(404, `Contact with id= ${contactId} was not found`);
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required field");
    }
    const addContact = await contactsService.addContact(req.body);
    res.status(201).json(addContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsService.removeContact(contactId);
    if (!removedContact) {
      throw HttpError(404, `Contact with id= ${contactId} was not found`);
    }
    res.json({
      message: `Contact with id= ${contactId} was deleted successful`,
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required field");
    }
    console.log(req.params);
    const { contactId } = req.params;
    const updatedContact = await contactsService.updateContact(
      contactId,
      req.body
    );

    if (!updatedContact) {
      throw HttpError(404, `Contact with ${contactId} was not found`);
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;

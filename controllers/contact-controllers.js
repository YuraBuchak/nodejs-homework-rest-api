import { HttpError } from "../helpers/index.js";
import { controllerWrapper } from "../decorators/index.js";
import contactsService from "../models/contacts.js";

const getAllContacts = async (req, res) => {
  const listContacts = await contactsService.listContacts();
  res.json(listContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsService.getContactById(contactId);

  if (!contactById) {
    throw HttpError(404, `Contact with id= ${contactId} was not found`);
  }

  res.json(contactById);
};

const addContact = async (req, res) => {
  const addContact = await contactsService.addContact(req.body);
  res.status(201).json(addContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contactsService.removeContact(contactId);
  if (!removedContact) {
    throw HttpError(404, `Contact with id= ${contactId} was not found`);
  }
  res.json({
    message: `Contact with id= ${contactId} was deleted successful`,
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }

  res.json(updatedContact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
};

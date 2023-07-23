import { HttpError } from "../helpers/index.js";
import { controllerWrapper } from "../decorators/index.js";
import Contact from "../models/contact.js";

const getAllContacts = async (req, res) => {
  const listContacts = await Contact.find();
  res.json(listContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    throw HttpError(404, `Contact with id= ${contactId} was not found`);
  }

  res.json(contactById);
};

const addContact = async (req, res) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HttpError(404, `Contact with id= ${contactId} was not found`);
  }
  res.json({
    message: `Contact with id= ${contactId} was deleted successful`,
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedContact) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

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
  updateStatusContact: controllerWrapper(updateStatusContact),
};

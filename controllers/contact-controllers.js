import { HttpError } from "../helpers/index.js";
import { controllerWrapper } from "../decorators/index.js";
import Contact from "../models/contact.js";

// (GET /contacts?page=1&limit=20)

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const listContacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
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
  const { _id: owner } = req.user;
  const addContact = await Contact.create({ ...req.body, owner });
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

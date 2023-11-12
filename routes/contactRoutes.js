const asyncHandler = require("express-async-handler");
const express = require("express");
const contact = require("../models/contactModel");
const router = express.Router();

// GET ALL CONTACTS
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
  })
);

// POST A CONTACT
router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("the req body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const newContact = await contact.create({
      name,
      email,
      phone,
    });

    res.status(200).json(newContact);
  })
);

// FIND A CONTACT
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const newContact = await contact.findById(req.params.id);
    if (!newContact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(newContact);
  })
);

// PUT A CONTACT
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id; // gets the id from the url
    try {
      updatedContact = await contact.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    } catch (e) {
      res.status(404);
      throw new Error("Contact not found", e);
    }
    res.status(200).json(updatedContact);
  })
);

// DELETE A CONTACT
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const deletedContact = await contact.findByIdAndDelete(id);
      if (!deletedContact) {
        res.status(404).json({ message: "Contact not found" });
      } else {
        res.status(200).json({ message: `Deleting contact ${id}` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while deleting the contact" });
    }
  })
);

module.exports = router;

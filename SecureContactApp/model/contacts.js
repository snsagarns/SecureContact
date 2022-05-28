const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // // Association : Since we have one admin neglect this
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },

    prefix: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
    contactByMail: String,
    contactByEmail: String,
    contactByPhone: String,
    contactByAny: String,
    lat: String,
    lng: String,
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

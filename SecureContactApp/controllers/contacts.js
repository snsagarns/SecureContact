const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Contact = require("../model/contacts");
const User = require("../model/userModel");
const { ensureAuthenticated } = require("../middleware/authMiddleware");
// Does not work this way
// const { getToken } = require("../controllers/users");
// const val = getToken();
// const decoded = jwt.verify(val, process.env.JWT_SECRET);

const geocode = require("../utils/geocode");

const postContacts = asyncHandler(async (req, res, ensureAuthenticated) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please handle the error by sending data in a text field");
  }
  let isMail = "No";
  let isPhone = "No";
  let isEmail = "No";

  if (req.body.isAny == "Any") {
    isMail = "Yes";
    isPhone = "Yes";
    isEmail = "Yes";
  } else {
    if (req.body.isMail == "Mail") {
      isMail = "Yes";
    }
    if (req.body.isEmail == "Email") {
      isEmail = "Yes";
    }
    if (req.body.isPhone == "Phone") {
      isPhone = "Yes";
    }
  }

  const address =
    req.body.street +
    " " +
    req.body.city +
    " " +
    req.body.zip +
    " " +
    req.body.zip;

  geocode(address, async (err, data) => {
    const contact = await Contact.create({
      prefix: req.body.prefix,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      contactByMail: isMail,
      contactByPhone: isPhone,
      contactByEmail: isEmail,
      lat: data.latitude,
      lng: data.longtitude,
    });
    contact.save((err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.status(200).render("success", { post: contact });
      }
    });
  });
});

const getContacts = asyncHandler(async (req, res, ensureAuthenticated) => {
  // const token = req.body.token;
  // console.log(token);

  const contact = await Contact.find({});
  if (!contact) {
    res.send("No Contact Exists yet");
  }
  res.render("contacts", { contact: contact });
});

const getMailer = asyncHandler(async (req, res, ensureAuthenticated) => {
  res.render("mailer", {});
});

const editContact = asyncHandler(async (req, res, ensureAuthenticated) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  res.render("editContact", { contact: contact });
});

const updateContact = asyncHandler(async (req, res, ensureAuthenticated) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please handle the error by sending data in a text field");
  }
  let isMail = "No";
  let isPhone = "No";
  let isEmail = "No";

  if (req.body.isAny == "Any") {
    isMail = "Yes";
    isPhone = "Yes";
    isEmail = "Yes";
  } else {
    if (req.body.isMail == "Mail") {
      isMail = "Yes";
    }
    if (req.body.isEmail == "Email") {
      isEmail = "Yes";
    }
    if (req.body.isPhone == "Phone") {
      isPhone = "Yes";
    }
  }
  const address =
    req.body.street +
    " " +
    req.body.city +
    " " +
    req.body.zip +
    " " +
    req.body.zip;

  console.log(req.params.id);
  geocode(address, async (err, data) => {
    Contact.updateOne(
      { _id: req.params.id },
      {
        $set: {
          prefix: req.body.prefix,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          phone: req.body.phone,
          email: req.body.email,
          contactByMail: isMail,
          contactByPhone: isPhone,
          contactByEmail: isEmail,
          lat: data.latitude,
          lng: data.longtitude,
        },
      }
    ).then((obj) => {
      Contact.find({}, (err, contact) => {
        res.render("contacts", { contact: contact });
      });
    });
  });
});

const getDelete = asyncHandler(async (req, res, ensureAuthenticated) => {
  const contact = await Contact.findById(req.params.id);
  res.render("delete", { post: contact });
});

const deleteContacts = asyncHandler(async (req, res, ensureAuthenticated) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  // // get the user
  // const user = await User.findById(req.user.id);
  // // if the user does not exists
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  // // Check the contact user id matches the user logged in id
  // if (contact.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await contact.remove();
  res.redirect("/contacts");
});
module.exports = {
  getContacts,
  updateContact,
  postContacts,
  deleteContacts,
  getMailer,
  editContact,
  getDelete,
};

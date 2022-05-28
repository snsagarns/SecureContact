const express = require("express");
const {
  getContacts,
  updateContact,
  postContacts,
  deleteContacts,
  getMailer,
  editContact,
  getDelete,
} = require("../controllers/contacts");
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/mailer").get(ensureAuthenticated, getMailer);
router.route("/mailer").post(ensureAuthenticated, postContacts);
router
  .route("/")
  .get(ensureAuthenticated, getContacts)
  .post(ensureAuthenticated, postContacts);

router
  .route("/update/:id")
  .get(ensureAuthenticated, editContact)
  .post(ensureAuthenticated, updateContact);

router
  .route("/delete/:id")
  .get(ensureAuthenticated, getDelete)
  .post(ensureAuthenticated, deleteContacts);

module.exports = router;

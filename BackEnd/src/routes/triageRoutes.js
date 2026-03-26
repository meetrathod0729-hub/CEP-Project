const express = require("express");
const router = express.Router();

const triageController = require("../controllers/triageController");
const authMiddleware = require("../middleware/authMiddleware");

/* SUBMIT TRIAGE FORM */
router.post("/", authMiddleware, triageController.submitTriage);

/* GET ALL TRIAGE RECORDS */
router.get("/", authMiddleware, triageController.getAllTriage);

module.exports = router;

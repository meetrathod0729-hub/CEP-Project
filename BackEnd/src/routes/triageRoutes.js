const express = require("express");
const router = express.Router();
const { submitTriage, getAllTriage } = require("../controllers/triageController");

router.post("/", submitTriage);
router.get("/", getAllTriage);

module.exports = router;
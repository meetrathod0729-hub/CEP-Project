const express = require("express");
const router = express.Router();

const {
  createToken,
  getTokensByHospital,
  updateTokenStatus
} = require("../controllers/token.controller");

router.post("/", createToken);
router.get("/:hospitalId", getTokensByHospital);
router.put("/:id", updateTokenStatus);

module.exports = router;
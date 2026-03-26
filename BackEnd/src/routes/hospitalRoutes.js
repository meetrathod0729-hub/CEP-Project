const express = require("express");
const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

// 🔹 CREATE hospital
router.post("/", hospitalController.createHospital);

// 🔹 GET all hospitals
router.get("/", hospitalController.getAllHospitals);

// 🔹 GET hospital by ID
router.get("/:id", hospitalController.getHospitalById);

// 🔹 UPDATE hospital
router.put("/:id", hospitalController.updateHospital);

// 🔹 DELETE hospital
router.delete("/:id", hospitalController.deleteHospital);

module.exports = router;
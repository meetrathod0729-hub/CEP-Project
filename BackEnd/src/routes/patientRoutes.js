const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

// 🔹 CREATE patient
router.post("/", patientController.createPatient);

// 🔹 GET all patients
router.get("/", patientController.getAllPatients);

// 🔹 GET patient by ID
router.get("/:id", patientController.getPatientById);

// 🔹 UPDATE patient
router.put("/:id", patientController.updatePatient);

// 🔹 DELETE patient
router.delete("/:id", patientController.deletePatient);

module.exports = router;
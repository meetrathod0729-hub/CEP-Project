// services/triageService.js

const triageModel = require("../models/triage");
const hospitalModel = require("../models/hospital");

const { calculateRiskScore, getRiskCategory } = require("../utils/riskScore");
const { selectBestHospital } = require("../utils/hospitalSelector");


const processTriage = async (data) => {

  // 🔹 Step 1: Calculate score
  const score = calculateRiskScore(data);

  // 🔹 Step 2: Get category
  const category = getRiskCategory(score);

  data.priority_score = score;
  data.triage_category = category;

  // 🔹 Step 3: Save triage
  const triageResult = await triageModel.createTriage(data);

  // 🔹 Step 4: Fetch hospitals
  const hospitals = await hospitalModel.getAllHospitals();

  // 🔹 Step 5: Select best hospital
  const bestHospital = selectBestHospital(
    hospitals,
    {
      lat: data.latitude,
      lon: data.longitude
    },
    category
  );

  return {
    triage: triageResult,
    priority_score: score,
    triage_category: category,
    hospital: bestHospital
  };
};


module.exports = {
  processTriage
};
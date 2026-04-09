// services/triageService.js

const triageModel = require("../models/triage");
const hospitalModel = require("../models/hospital");

const { calculateRiskScore, getRiskCategory } = require("../utils/riskScore");
const { selectNearestHospitals } = require("../utils/hospitalSelector");


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

  // 🔹 Step 5: Select nearest hospitals (based on TOTAL TIME)
  const nearestHospitals = selectNearestHospitals(
    hospitals,
    {
      lat: data.latitude,
      lon: data.longitude
    },
    category,
    10 // top 10 hospitals
  );

  return {
    triage: triageResult,
    priority_score: score,
    triage_category: category,
    nearestHospitals   // 🔥 important change
  };
};


module.exports = {
  processTriage
};

triage service.js
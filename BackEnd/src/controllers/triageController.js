const triageModel = require("../models/triage");


/* TRIAGE SCORING LOGIC */

const calculateScore = (data) => {

let score = 0;

if (data.chest_pain) score += 4;
if (data.breathing_difficulty) score += 4;
if (data.heavy_bleeding) score += 5;
if (data.unconscious) score += 6;
if (data.severe_burns) score += 5;
if (data.head_injury) score += 4;
if (data.seizure) score += 4;

score += data.pain_level || 0;

return score;

};


/* TRIAGE CATEGORY */

const getCategory = (score) => {

if (score >= 8) return "RED";
if (score >= 4) return "YELLOW";

return "GREEN";

};


/* CREATE TRIAGE SUBMISSION */

exports.submitTriage = async (req, res) => {

try {

const data = req.body;

/* calculate score */

const score = calculateScore(data);

/* determine category */

const category = getCategory(score);

data.priority_score = score;
data.triage_category = category;

/* save to database */

const result = await triageModel.createTriage(data);

res.status(201).json({

success: true,
message: "Triage assessment completed",
priority_score: score,
triage_category: category,
data: result

});

}

catch (error) {

console.error(error);

res.status(500).json({
success: false,
message: "Server error"
});

}

};



/* GET ALL TRIAGE SUBMISSIONS */

exports.getAllTriage = async (req, res) => {

try {

const triageList = await triageModel.getAllTriage();

res.json({
success: true,
data: triageList
});

}

catch (error) {

console.error(error);

res.status(500).json({
success: false,
message: "Server error"
});

}

};
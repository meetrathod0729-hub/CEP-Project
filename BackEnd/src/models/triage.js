const pool = require("../config/db");


/*
CREATE TRIAGE SUBMISSION
Stores questionnaire results
*/

const createTriage = async (triageData) => {

const query = `
INSERT INTO triage_submissions
(
patient_name,
age,
gender,
chest_pain,
breathing_difficulty,
heavy_bleeding,
unconscious,
severe_burns,
head_injury,
accident,
high_fever,
vomiting,
seizure,
pain_level,
symptom_duration_hours,
priority_score,
triage_category
)

VALUES
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)

RETURNING *
`;

const values = [

triageData.patient_name,
triageData.age,
triageData.gender,

triageData.chest_pain,
triageData.breathing_difficulty,
triageData.heavy_bleeding,
triageData.unconscious,
triageData.severe_burns,
triageData.head_injury,
triageData.accident,
triageData.high_fever,
triageData.vomiting,
triageData.seizure,

triageData.pain_level,
triageData.symptom_duration_hours,

triageData.priority_score,
triageData.triage_category

];

const result = await pool.query(query, values);

return result.rows[0];

};



/*
GET ALL TRIAGE SUBMISSIONS
Used for admin / logs
*/

const getAllTriage = async () => {

const result = await pool.query(`
SELECT *
FROM triage_submissions
ORDER BY created_at DESC
`);

return result.rows;

};



/*
GET TRIAGE BY ID
*/

const getTriageById = async (id) => {

const result = await pool.query(
`SELECT * FROM triage_submissions WHERE submission_id = $1`,
[id]
);

return result.rows[0];

};



module.exports = {

createTriage,
getAllTriage,
getTriageById

};
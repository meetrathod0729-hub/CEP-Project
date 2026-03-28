// utils/hospitalSelector.js

const { calculateHospitalLoad } = require("./calculateLoad");
const { calculateDistance } = require("./distance");

const selectBestHospital = (hospitals, patientLocation, priority) => {
  let bestHospital = null;
  let bestScore = Infinity;

  for (let hospital of hospitals) {

    // ❌ skip full hospitals
    if (hospital.status === "FULL") continue;

    // ❌ RED needs ICU
    if (priority === "RED" && hospital.available_icu <= 0) continue;

    const distance = calculateDistance(
      patientLocation.lat,
      patientLocation.lon,
      hospital.latitude,
      hospital.longitude
    );

    const load = calculateHospitalLoad(hospital);

    // final score
    const score = (distance * 0.5) + (load * 0.5);

    if (score < bestScore) {
      bestScore = score;
      bestHospital = hospital;
    }
  }

  return bestHospital;
};

module.exports = {
  selectBestHospital
};
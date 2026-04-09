const { calculateHospitalLoad } = require("./calculateLoad");
const { calculateDistance } = require("./distance");

/**
 * Select nearest hospitals based on TOTAL TIME
 * totalTime = travelTime + waitTime
 */

const selectNearestHospitals = (
  hospitals,
  patientLocation,
  priority,
  limit = 10
) => {
  let filtered = [];

  for (let hospital of hospitals) {

    // ❌ Skip full hospitals
    if (hospital.status === "FULL") continue;

    // ❌ RED patients need ICU
    if (priority === "RED" && hospital.available_icu <= 0) continue;

    // 📍 Distance in KM
    const distance = calculateDistance(
      patientLocation.lat,
      patientLocation.lon,
      hospital.latitude,
      hospital.longitude
    );

    // 🚗 Travel Time (in minutes)
    const avgSpeed = 30; // km/h
    const travelTime = (distance / avgSpeed) * 60;

    // 🏥 Wait Time (you can improve later)
    const waitTime =
      hospital.estimated_wait_time ||
      hospital.avgWaitTime ||
      10;

    // 📊 Load (optional)
    const load = calculateHospitalLoad(hospital);

    // ⏱️ TOTAL TIME
    const totalTime = travelTime + waitTime;

    filtered.push({
      ...hospital,
      distance,      // km
      travelTime,    // minutes
      waitTime,      // minutes
      totalTime,     // minutes
      load
    });
  }

  // 🔥 SORT BY LOWEST TOTAL TIME
  filtered.sort((a, b) => a.totalTime - b.totalTime);

  // 🔝 Return top N
  return filtered.slice(0, limit);
};

module.exports = {
  selectNearestHospitals
};

hospital sector js
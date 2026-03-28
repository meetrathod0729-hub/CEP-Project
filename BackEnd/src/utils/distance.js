// utils/distance.js

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dx = lat1 - lat2;
  const dy = lon1 - lon2;
  return Math.sqrt(dx * dx + dy * dy);
};

module.exports = {
  calculateDistance
};
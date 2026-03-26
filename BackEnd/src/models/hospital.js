const pool = require("../config/db");

// CREATE HOSPITAL
const createHospital = async (data) => {
  const query = `
    INSERT INTO hospitals
    (name, address, latitude, longitude,
     total_rooms, emergency_rooms, icu_beds, ventilators,
     occupied_rooms, available_rooms,
     occupied_icu, available_icu,
     staff_available, status)
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;
  `;

  const values = [
    data.name,
    data.address,
    data.latitude,
    data.longitude,
    data.total_rooms,
    data.emergency_rooms,
    data.icu_beds,
    data.ventilators,
    data.occupied_rooms || 0,
    data.available_rooms || 0,
    data.occupied_icu || 0,
    data.available_icu || 0,
    data.staff_available || 0,
    data.status || "AVAILABLE"
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


// GET ALL HOSPITALS
const getAllHospitals = async () => {
  const result = await pool.query(`SELECT * FROM hospitals`);
  return result.rows;
};


// GET HOSPITAL BY ID
const getHospitalById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM hospitals WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};


// UPDATE HOSPITAL
const updateHospital = async (id, data) => {
  const query = `
    UPDATE hospitals
    SET name=$1, address=$2, latitude=$3, longitude=$4,
        total_rooms=$5, emergency_rooms=$6,
        icu_beds=$7, ventilators=$8,
        occupied_rooms=$9, available_rooms=$10,
        occupied_icu=$11, available_icu=$12,
        staff_available=$13, status=$14
    WHERE id=$15
    RETURNING *;
  `;

  const values = [
    data.name,
    data.address,
    data.latitude,
    data.longitude,
    data.total_rooms,
    data.emergency_rooms,
    data.icu_beds,
    data.ventilators,
    data.occupied_rooms,
    data.available_rooms,
    data.occupied_icu,
    data.available_icu,
    data.staff_available,
    data.status,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


// DELETE HOSPITAL
const deleteHospital = async (id) => {
  await pool.query(`DELETE FROM hospitals WHERE id = $1`, [id]);
};


module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
};
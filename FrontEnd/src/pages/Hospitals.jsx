import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/hospitals");
      setHospitals(res.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        Loading hospitals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-8 py-10">
      <h1 className="text-5xl font-bold mb-10">Nearby Hospitals</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {hospitals.map((hospital, index) => (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold">
              {hospital.name}
            </h2>

            <p className="mt-4 text-slate-300">
              Address: {hospital.address || "Not available"}
            </p>

            <p className="mt-2 text-slate-400">
              Beds: {hospital.availableBeds || "N/A"}
            </p>

            <button className="mt-6 w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold">
              Book Token
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold tracking-wide">
          Medi<span className="text-cyan-400">ROUTE</span>
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-10 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold leading-tight">
            Smart Emergency
            <br />
            <span className="text-cyan-400">Hospital Routing</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-8">
            Reduce ER overcrowding with real-time hospital load balancing,
            dynamic triage, optional token booking, and fastest route ETA.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/triage"
              className="px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
            >
              Start Emergency Check
            </Link>

            <Link
              to="/hospitals"
              className="px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition"
            >
              View Hospitals
            </Link>
          </div>
        </motion.div>

        {/* Right side hospital cards */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-5"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">VJTI General</h2>
              <span className="text-green-400">Low Load</span>
            </div>
            <p className="mt-2 text-slate-300">ETA: 8 mins</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Matunga Care</h2>
              <span className="text-yellow-400">Medium</span>
            </div>
            <p className="mt-2 text-slate-300">ETA: 12 mins</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">City Trauma</h2>
              <span className="text-red-400">High Load</span>
            </div>
            <p className="mt-2 text-slate-300">ETA: 16 mins</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
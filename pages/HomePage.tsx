import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Pill,
  Stethoscope,
  Users,
  ShieldCheck,
  Clock,
  Star,
  ChevronRight,
  Truck,
  Activity,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } },
};

const quickMeds = [
  { id: "m1", name: "Paracetamol 500mg", price: 28, unit: "Strip of 10", emoji: "💊" },
  { id: "m2", name: "Vitamin C 1000mg", price: 199, unit: "Bottle of 60", emoji: "🍊" },
  { id: "m3", name: "Cetirizine 10mg", price: 35, unit: "Strip of 10", emoji: "💊" },
  { id: "m4", name: "Omeprazole 20mg", price: 45, unit: "Strip of 14", emoji: "🔵" },
  { id: "m5", name: "Multivitamin", price: 349, unit: "Bottle of 30", emoji: "🌿" },
  { id: "m6", name: "Azithromycin 500mg", price: 89, unit: "Strip of 3", emoji: "💊" },
];

const doctors = [
  { id: "d1", name: "Dr. Priya Mehta", specialty: "Cardiologist", rating: 4.9, consultations: 1240, fee: 800, available: true, emoji: "👩‍⚕️" },
  { id: "d2", name: "Dr. Rahul Sharma", specialty: "Dermatologist", rating: 4.8, consultations: 980, fee: 600, available: true, emoji: "👨‍⚕️" },
  { id: "d3", name: "Dr. Ananya Bose", specialty: "Neurologist", rating: 4.9, consultations: 2100, fee: 1200, available: false, emoji: "👩‍⚕️" },
];

const stats = [
  { value: "50K+", label: "Medicines", icon: Pill },
  { value: "2,000+", label: "Doctors", icon: Stethoscope },
  { value: "1M+", label: "Patients", icon: Users },
  { value: "4.9★", label: "Rating", icon: Star },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (med: (typeof quickMeds)[0]) => {
    addItem({ id: med.id, name: med.name, price: med.price, unit: med.unit });
    setAddedIds((prev) => new Set([...prev, med.id]));
    setTimeout(() => setAddedIds((prev) => { const s = new Set(prev); s.delete(med.id); return s; }), 1200);
  };

  return (
    <div className="pt-16">
      {/* ─── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-700/10 blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-500/5 blur-[80px]" />
        </div>

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={stagger.container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={stagger.item}>
                <span className="badge bg-accent/10 text-accent border border-accent/20">
                  <Zap size={11} className="fill-accent" /> Healthcare reimagined
                </span>
              </motion.div>

              <motion.h1
                variants={stagger.item}
                className="text-5xl sm:text-6xl lg:text-7xl font-display text-white leading-[1.05]"
              >
                Your health,{" "}
                <span className="gradient-text italic">our priority</span>
              </motion.h1>

              <motion.p
                variants={stagger.item}
                className="text-lg text-slate-400 leading-relaxed max-w-lg"
              >
                Order medicines, consult certified doctors, and connect with a caring medical community — all in one modern platform built for India.
              </motion.p>

              {/* Search bar */}
              <motion.div variants={stagger.item} className="relative max-w-lg">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search medicines, doctors, conditions…"
                  className="w-full bg-surface-card border border-surface-border rounded-2xl pl-11 pr-32 py-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !py-2 !px-4 !rounded-xl text-sm">
                  Search
                </button>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={stagger.item} className="flex items-center flex-wrap gap-3">
                <Link to="/medicines" className="btn-primary flex items-center gap-2">
                  <Pill size={16} /> Order Medicines
                </Link>
                <Link to="/doctors" className="btn-ghost flex items-center gap-2">
                  <Stethoscope size={16} /> Talk to a Doctor
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={stagger.item} className="flex items-center gap-6 pt-2">
                {[
                  { icon: ShieldCheck, text: "100% Genuine" },
                  { icon: Truck, text: "Express Delivery" },
                  { icon: Clock, text: "24/7 Support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon size={13} className="text-accent" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="hidden lg:block relative h-[560px]"
            >
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-0 w-72 card p-5 shadow-glow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-accent flex items-center justify-center text-2xl">
                    👩‍⚕️
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Dr. Priya Mehta</p>
                    <p className="text-xs text-slate-500">Cardiologist • Available</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star size={12} className="fill-amber-400" /> 4.9
                    <span className="text-slate-600 ml-1">1.2K reviews</span>
                  </div>
                  <button className="text-xs text-accent border border-accent/30 px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-all">
                    Book Now →
                  </button>
                </div>
              </motion.div>

              {/* Medicine delivery card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-48 left-0 w-64 card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Truck size={16} className="text-accent" />
                  <p className="text-sm font-medium text-white">Order Dispatched</p>
                </div>
                <div className="flex gap-2 mb-2">
                  {["🔵", "💊", "🍊"].map((e, i) => (
                    <div key={i} className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-lg">
                      {e}
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-xs text-slate-500">
                    +3
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "72%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent"
                    />
                  </div>
                  <span className="text-xs text-slate-500">Arriving in 28 min</span>
                </div>
              </motion.div>

              {/* Health score */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-12 right-8 glass rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <Activity size={20} className="text-accent" />
                <div>
                  <p className="text-xs text-slate-500">Health Score</p>
                  <p className="text-2xl font-display text-white">87<span className="text-sm text-accent">/100</span></p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Quick Order ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Quick Order</h2>
            <p className="text-slate-500 mt-1 text-sm">Fast delivery on all essentials</p>
          </div>
          <Link to="/medicines" className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium">
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickMeds.map((med, i) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card p-4 flex flex-col gap-3 hover:border-accent/30 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {med.emoji}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-200 leading-snug">{med.name}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{med.unit}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent">₹{med.price}</span>
                <button
                  onClick={() => handleAdd(med)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    addedIds.has(med.id)
                      ? "bg-green-500/20 text-green-400"
                      : "bg-accent/10 text-accent hover:bg-accent/20"
                  }`}
                >
                  {addedIds.has(med.id) ? "Added ✓" : "+ Add"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Doctors ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Top Doctors</h2>
            <p className="text-slate-500 mt-1 text-sm">Board-certified specialists, online now</p>
          </div>
          <Link to="/doctors" className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium">
            All doctors <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-5 hover:border-accent/30 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-3xl flex-shrink-0">
                  {doc.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white text-sm">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doc.specialty}</p>
                    </div>
                    <span
                      className={`badge shrink-0 ${
                        doc.available
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-700/50 text-slate-500"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? "bg-emerald-400" : "bg-slate-600"}`} />
                      {doc.available ? "Online" : "Offline"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Star size={11} className="fill-amber-400" /> {doc.rating}
                    </div>
                    <span className="text-xs text-slate-600">{doc.consultations.toLocaleString()} consults</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-border">
                <div>
                  <p className="text-[11px] text-slate-600">Consultation fee</p>
                  <p className="text-sm font-semibold text-white">₹{doc.fee}</p>
                </div>
                <Link
                  to="/doctors"
                  className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
                    doc.available
                      ? "bg-accent/10 text-accent hover:bg-accent hover:text-white"
                      : "bg-surface-muted text-slate-600 cursor-not-allowed"
                  }`}
                >
                  Book Now <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-brand-800/60 via-surface-card to-brand-950/60 border border-brand-700/30 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-accent/10 blur-[80px] rounded-full" />
          <div className="relative">
            <span className="badge bg-accent/10 text-accent border border-accent/20 mb-4">
              <Users size={11} /> Join 1M+ patients
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
              Start your health journey today
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm">
              Get access to medicines, verified doctors, and a supportive community. Your wellbeing is just one click away.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/medicines" className="btn-primary flex items-center gap-2">
                <Pill size={16} /> Browse Medicines
              </Link>
              <Link to="/community" className="btn-ghost flex items-center gap-2">
                <Users size={16} /> Join Community
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

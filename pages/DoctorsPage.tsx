import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Star, Clock, Video, Phone, MessageSquare,
  ChevronRight, X, Calendar, Check
} from "lucide-react";

const specialties = ["All", "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist"];

const doctors = [
  { id: "d1", name: "Dr. Priya Mehta", specialty: "Cardiologist", exp: "12 yrs", rating: 4.9, reviews: 1240, fee: 800, available: true, emoji: "👩‍⚕️", slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"], bio: "Senior cardiologist at Apollo Hospitals with expertise in interventional cardiology and heart failure management." },
  { id: "d2", name: "Dr. Rahul Sharma", specialty: "Dermatologist", exp: "8 yrs", rating: 4.8, reviews: 980, fee: 600, available: true, emoji: "👨‍⚕️", slots: ["9:00 AM", "12:00 PM", "3:30 PM"], bio: "Expert in medical and cosmetic dermatology. Specializes in acne, psoriasis, and skin rejuvenation." },
  { id: "d3", name: "Dr. Ananya Bose", specialty: "Neurologist", exp: "15 yrs", rating: 4.9, reviews: 2100, fee: 1200, available: false, emoji: "👩‍⚕️", slots: ["10:30 AM", "1:00 PM"], bio: "Neurologist specializing in epilepsy, stroke, and movement disorders at NIMHANS Bangalore." },
  { id: "d4", name: "Dr. Suresh Iyer", specialty: "Orthopedic", exp: "10 yrs", rating: 4.7, reviews: 780, fee: 900, available: true, emoji: "👨‍⚕️", slots: ["8:30 AM", "11:00 AM", "3:00 PM", "5:00 PM"], bio: "Orthopedic surgeon with expertise in joint replacement, sports injuries, and spine surgery." },
  { id: "d5", name: "Dr. Kavya Nair", specialty: "Pediatrician", exp: "6 yrs", rating: 4.8, reviews: 1560, fee: 500, available: true, emoji: "👩‍⚕️", slots: ["9:30 AM", "11:00 AM", "2:30 PM"], bio: "Child specialist with a gentle approach. Expertise in newborn care, vaccinations, and child development." },
  { id: "d6", name: "Dr. Arjun Patel", specialty: "Psychiatrist", exp: "9 yrs", rating: 4.9, reviews: 640, fee: 1000, available: false, emoji: "👨‍⚕️", slots: ["10:00 AM", "1:30 PM"], bio: "Psychiatrist focusing on anxiety, depression, OCD, and PTSD. Advocates for mental health awareness." },
];

const consultTypes = [
  { id: "video", icon: Video, label: "Video Call" },
  { id: "audio", icon: Phone, label: "Audio Call" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
];

export default function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");
  const [selected, setSelected] = useState<typeof doctors[0] | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [consultType, setConsultType] = useState("video");
  const [booked, setBooked] = useState(false);

  const filtered = doctors.filter((d) => {
    const matchSpec = activeSpec === "All" || d.specialty === activeSpec;
    const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase());
    return matchSpec && matchQ;
  });

  const handleBook = () => {
    if (!slot) return;
    setBooked(true);
    setTimeout(() => { setBooked(false); setSelected(null); setSlot(null); }, 2500);
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="section-title mb-2">
          Find a <span className="gradient-text">Doctor</span>
        </h1>
        <p className="text-slate-500">Book online consultations with verified specialists</p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6 max-w-xl">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctor name or specialty…"
          className="w-full bg-surface-card border border-surface-border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all"
        />
      </div>

      {/* Specialty filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSpec(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeSpec === s
                ? "bg-accent text-white shadow-glow-sm"
                : "bg-surface-card border border-surface-border text-slate-400 hover:border-accent/40 hover:text-slate-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card p-5 hover:border-accent/30 transition-all duration-200"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-4xl flex-shrink-0">
                {doc.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">{doc.name}</p>
                    <p className="text-xs text-accent mt-0.5">{doc.specialty}</p>
                  </div>
                  <span className={`badge text-[10px] ${doc.available ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700/50 text-slate-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? "bg-emerald-400" : "bg-slate-600"}`} />
                    {doc.available ? "Online" : "Offline"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star size={11} className="fill-amber-400" /> {doc.rating}
                    <span className="text-slate-600">({doc.reviews})</span>
                  </div>
                  <span className="text-xs text-slate-600">{doc.exp}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed line-clamp-2">{doc.bio}</p>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {consultTypes.map(({ id, icon: Icon, label }) => (
                <span key={id} className="badge bg-surface-muted text-slate-500 text-[10px] gap-1">
                  <Icon size={9} /> {label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-border">
              <div>
                <p className="text-[11px] text-slate-600">Fee</p>
                <p className="text-sm font-bold text-white">₹{doc.fee}</p>
              </div>
              <button
                onClick={() => doc.available && setSelected(doc)}
                disabled={!doc.available}
                className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
                  doc.available
                    ? "bg-accent/10 text-accent hover:bg-accent hover:text-white"
                    : "bg-surface-muted text-slate-600 cursor-not-allowed"
                }`}
              >
                Book Appointment <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-surface-card border border-surface-border rounded-3xl p-6 z-50 shadow-2xl"
            >
              {booked ? (
                <div className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Appointment Booked!</h3>
                  <p className="text-slate-400 text-sm">Your consultation with {selected.name} is confirmed for {slot}.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-white">Book Appointment</h3>
                    <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface-muted rounded-xl mb-5">
                    <div className="text-3xl">{selected.emoji}</div>
                    <div>
                      <p className="font-medium text-white text-sm">{selected.name}</p>
                      <p className="text-xs text-slate-500">{selected.specialty} · ₹{selected.fee}</p>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Video size={12} /> Consultation Type
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {consultTypes.map(({ id, icon: Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setConsultType(id)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs transition-all ${
                          consultType === id ? "bg-accent/10 border border-accent/40 text-accent" : "bg-surface-muted text-slate-500 hover:text-slate-200"
                        }`}
                      >
                        <Icon size={16} /> {label}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar size={12} /> Available Slots — Today
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selected.slots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg text-xs transition-all ${
                          slot === s ? "bg-accent text-white" : "bg-surface-muted text-slate-400 hover:text-white"
                        }`}
                      >
                        <Clock size={12} /> {s}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleBook} disabled={!slot} className={`w-full btn-primary flex items-center justify-center gap-2 ${!slot ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Confirm Booking — ₹{selected.fee}
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

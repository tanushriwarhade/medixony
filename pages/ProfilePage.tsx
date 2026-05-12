import { motion } from "framer-motion";
import {
  User, Settings, Bell, Shield, CreditCard, Package,
  Calendar, Activity, Pill, Heart, ChevronRight, Edit3,
  TrendingUp, Award
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const appointments = [
  { doctor: "Dr. Priya Mehta", specialty: "Cardiologist", date: "Jul 28, 2024", time: "11:30 AM", status: "upcoming" },
  { doctor: "Dr. Rahul Sharma", specialty: "Dermatologist", date: "Jul 15, 2024", time: "10:00 AM", status: "completed" },
];

const orders = [
  { id: "ORD-001", items: "Paracetamol, Vitamin C", date: "Jul 22, 2024", status: "delivered", amount: 227 },
  { id: "ORD-002", items: "Cetirizine, Omeprazole", date: "Jul 18, 2024", status: "delivered", amount: 80 },
];

const healthMetrics = [
  { label: "Blood Pressure", value: "118/78", unit: "mmHg", trend: "stable", icon: Heart, color: "text-rose-400 bg-rose-500/10" },
  { label: "Blood Sugar", value: "95", unit: "mg/dL", trend: "good", icon: Activity, color: "text-emerald-400 bg-emerald-500/10" },
  { label: "Heart Rate", value: "72", unit: "bpm", trend: "normal", icon: TrendingUp, color: "text-amber-400 bg-amber-500/10" },
  { label: "Health Score", value: "87", unit: "/100", trend: "great", icon: Award, color: "text-accent bg-accent/10" },
];

const menuItems = [
  { icon: Package, label: "My Orders", count: "3" },
  { icon: Calendar, label: "Appointments", count: "1 upcoming" },
  { icon: Pill, label: "Prescriptions", count: "2 active" },
  { icon: Bell, label: "Notifications", count: "5 new" },
  { icon: CreditCard, label: "Payment Methods", count: null },
  { icon: Shield, label: "Privacy & Security", count: null },
  { icon: Settings, label: "Settings", count: null },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { count, total } = useCart();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="section-title mb-2">My <span className="gradient-text">Profile</span></h1>
        <p className="text-slate-500 text-sm">Your health dashboard and account settings</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left col */}
        <div className="space-y-5">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-accent flex items-center justify-center text-4xl shadow-glow">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
                  ) : "👤"}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-lg flex items-center justify-center shadow-md hover:bg-accent-dark transition-colors">
                  <Edit3 size={12} className="text-white" />
                </button>
              </div>
              <h2 className="font-semibold text-white">{user?.name ?? "Guest"}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="badge bg-accent/10 text-accent text-[10px]">Verified Member</span>
                <span className="badge bg-emerald-500/10 text-emerald-400 text-[10px]">Gold Plan</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-surface-border text-center">
              {[
                { label: "Orders", value: "12" },
                { label: "Consults", value: "5" },
                { label: "Saved", value: "8" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="text-[11px] text-slate-600">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cart summary */}
          {count > 0 && (
            <div className="card p-4 border-accent/20 bg-accent/5">
              <div className="flex items-center gap-2 mb-2">
                <Pill size={15} className="text-accent" />
                <p className="text-sm font-medium text-white">Cart Summary</p>
              </div>
              <p className="text-xs text-slate-500">{count} item{count !== 1 ? "s" : ""} · ₹{total.toFixed(0)} total</p>
            </div>
          )}

          {/* Menu */}
          <div className="card overflow-hidden">
            {menuItems.map(({ icon: Icon, label, count: c }, i) => (
              <button
                key={label}
                className={`flex items-center gap-3 w-full px-5 py-3.5 hover:bg-white/5 transition-all text-left ${i !== 0 ? "border-t border-surface-border" : ""}`}
              >
                <Icon size={16} className="text-slate-500" />
                <span className="flex-1 text-sm text-slate-300">{label}</span>
                {c && <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-md">{c}</span>}
                <ChevronRight size={14} className="text-slate-700" />
              </button>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="lg:col-span-2 space-y-5">
          {/* Health metrics */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={14} /> Health Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {healthMetrics.map(({ label, value, unit, trend, icon: Icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-4"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-xl font-bold text-white">{value}<span className="text-xs text-slate-500 font-normal">{unit}</span></p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block capitalize">{trend}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming appointments */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar size={14} /> Appointments
            </h3>
            <div className="space-y-3">
              {appointments.map((apt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-xl flex-shrink-0">
                    👩‍⚕️
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{apt.doctor}</p>
                    <p className="text-xs text-slate-500">{apt.specialty}</p>
                    <p className="text-xs text-slate-600 mt-1">{apt.date} · {apt.time}</p>
                  </div>
                  <span className={`badge text-[10px] ${apt.status === "upcoming" ? "bg-accent/10 text-accent" : "bg-slate-700/50 text-slate-500"}`}>
                    {apt.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Package size={14} /> Recent Orders
            </h3>
            <div className="space-y-3">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-xl flex-shrink-0">💊</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{order.id}</p>
                    <p className="text-xs text-slate-500 truncate">{order.items}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">₹{order.amount}</p>
                    <span className="badge bg-emerald-500/10 text-emerald-400 text-[10px] mt-1">
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

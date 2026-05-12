import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, Truck, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useCart } from "../context/CartContext";

const categories = [
  { id: "all", label: "All", emoji: "🔍" },
  { id: "fever", label: "Fever & Pain", emoji: "🌡️" },
  { id: "vitamins", label: "Vitamins", emoji: "💊" },
  { id: "allergy", label: "Allergy", emoji: "🤧" },
  { id: "diabetes", label: "Diabetes", emoji: "🩸" },
  { id: "heart", label: "Heart Care", emoji: "❤️" },
  { id: "digestive", label: "Digestive", emoji: "🫁" },
];

const medicines = [
  { id: "m1", name: "Paracetamol 500mg", brand: "Calpol", category: "fever", price: 28, mrp: 35, unit: "Strip of 10", rating: 4.7, reviews: 12340, inStock: true, emoji: "💊", prescription: false },
  { id: "m2", name: "Vitamin C 1000mg", brand: "HealthViva", category: "vitamins", price: 199, mrp: 249, unit: "Bottle of 60", rating: 4.8, reviews: 8920, inStock: true, emoji: "🍊", prescription: false },
  { id: "m3", name: "Cetirizine 10mg", brand: "Zyrtec", category: "allergy", price: 35, mrp: 40, unit: "Strip of 10", rating: 4.6, reviews: 5670, inStock: true, emoji: "💊", prescription: false },
  { id: "m4", name: "Metformin 500mg", brand: "Glucophage", category: "diabetes", price: 55, mrp: 70, unit: "Strip of 15", rating: 4.9, reviews: 9800, inStock: true, emoji: "🔵", prescription: true },
  { id: "m5", name: "Atorvastatin 20mg", brand: "Lipitor", category: "heart", price: 125, mrp: 155, unit: "Strip of 10", rating: 4.8, reviews: 7640, inStock: false, emoji: "❤️", prescription: true },
  { id: "m6", name: "Omeprazole 20mg", brand: "Prilosec", category: "digestive", price: 45, mrp: 55, unit: "Strip of 14", rating: 4.7, reviews: 6230, inStock: true, emoji: "💊", prescription: false },
  { id: "m7", name: "Multivitamin Daily", brand: "Revital H", category: "vitamins", price: 349, mrp: 420, unit: "Bottle of 30", rating: 4.5, reviews: 15600, inStock: true, emoji: "🌿", prescription: false },
  { id: "m8", name: "Ibuprofen 400mg", brand: "Brufen", category: "fever", price: 38, mrp: 45, unit: "Strip of 10", rating: 4.6, reviews: 11200, inStock: true, emoji: "💊", prescription: false },
  { id: "m9", name: "Azithromycin 500mg", brand: "Azithral", category: "fever", price: 89, mrp: 110, unit: "Strip of 3", rating: 4.8, reviews: 4500, inStock: true, emoji: "💊", prescription: true },
];

export default function MedicinePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (med: typeof medicines[0]) => {
    addItem({ id: med.id, name: med.name, price: med.price, unit: med.unit });
    setAddedIds((p) => new Set([...p, med.id]));
    setTimeout(() => setAddedIds((p) => { const s = new Set(p); s.delete(med.id); return s; }), 1200);
  };

  const filtered = medicines.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    const matchQ = m.name.toLowerCase().includes(query.toLowerCase()) || m.brand.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="section-title mb-2">
          Medicines & <span className="gradient-text">Healthcare</span>
        </h1>
        <p className="text-slate-500">Genuine medicines, fast delivery, great prices</p>
      </motion.div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or brand…"
            className="w-full bg-surface-card border border-surface-border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 btn-ghost">
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-accent text-white shadow-glow-sm"
                : "bg-surface-card border border-surface-border text-slate-400 hover:border-accent/40 hover:text-slate-200"
            }`}
          >
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { icon: ShieldCheck, label: "100% Genuine Medicines" },
          { icon: Truck, label: "Delivery in 30 mins" },
          { icon: Filter, label: "Easy Returns" },
          { icon: Star, label: "Top Rated Platform" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-slate-500 bg-surface-card border border-surface-border px-3 py-2 rounded-lg">
            <Icon size={13} className="text-accent" /> {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((med, i) => {
          const discount = Math.round(((med.mrp - med.price) / med.mrp) * 100);
          return (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card p-4 flex flex-col gap-3 hover:border-accent/30 transition-all group"
            >
              <div className="relative">
                <div className="w-full aspect-square rounded-xl bg-surface-muted flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  {med.emoji}
                </div>
                {discount > 0 && (
                  <span className="absolute top-2 right-2 badge bg-emerald-500/20 text-emerald-400 text-[10px]">
                    -{discount}%
                  </span>
                )}
                {med.prescription && (
                  <span className="absolute top-2 left-2 badge bg-amber-500/20 text-amber-400 text-[10px]">
                    Rx
                  </span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs font-medium text-white leading-snug">{med.name}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{med.brand} · {med.unit}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-[11px] text-slate-400">{med.rating} ({(med.reviews / 1000).toFixed(1)}K)</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-base font-bold text-accent">₹{med.price}</span>
                  <span className="text-[11px] text-slate-600 line-through">₹{med.mrp}</span>
                </div>
                <button
                  onClick={() => med.inStock && handleAdd(med)}
                  disabled={!med.inStock}
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                    !med.inStock
                      ? "bg-surface-muted text-slate-600 cursor-not-allowed"
                      : addedIds.has(med.id)
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-accent/10 text-accent hover:bg-accent hover:text-white"
                  }`}
                >
                  {!med.inStock ? "Out of Stock" : addedIds.has(med.id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>No medicines found for "<span className="text-slate-300">{query}</span>"</p>
        </div>
      )}
    </div>
  );
}

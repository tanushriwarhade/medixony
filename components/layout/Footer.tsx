import { Link } from "react-router-dom";
import { Activity, Twitter, Github, Linkedin, Heart } from "lucide-react";

const links = {
  Platform: [
    { to: "/medicines", label: "Medicines" },
    { to: "/doctors", label: "Doctors" },
    { to: "/community", label: "Community" },
    { to: "/profile", label: "My Profile" },
  ],
  Company: [
    { to: "#", label: "About Us" },
    { to: "#", label: "Careers" },
    { to: "#", label: "Press" },
    { to: "#", label: "Blog" },
  ],
  Legal: [
    { to: "#", label: "Privacy Policy" },
    { to: "#", label: "Terms of Service" },
    { to: "#", label: "Cookie Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-brand-700 flex items-center justify-center">
                <Activity size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl text-white">
                Meди<span className="text-accent">xony</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Modern healthcare, at your fingertips. Medicines, doctors, and community — all in one place.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center text-slate-500 hover:text-accent hover:bg-accent/10 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2024 Medixony. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            Built with <Heart size={11} className="text-red-500 fill-red-500" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}

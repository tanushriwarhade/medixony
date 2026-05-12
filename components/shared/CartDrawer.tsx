import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-surface-card border-l border-surface-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-surface-border">
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={18} className="text-accent" />
                <h2 className="font-semibold text-white">Your Cart</h2>
                {items.length > 0 && (
                  <span className="badge bg-accent/20 text-accent">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                  <div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center">
                    <ShoppingCart size={28} className="text-slate-600" />
                  </div>
                  <p className="text-slate-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="card p-4 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface-muted flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center text-accent text-lg">
                          💊
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.unit}</p>
                      <p className="text-sm text-accent font-semibold mt-0.5">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-surface-muted flex items-center justify-center text-slate-400 hover:text-white transition-all"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-surface-muted flex items-center justify-center text-slate-400 hover:text-white transition-all"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-surface-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Subtotal</span>
                  <span className="text-white font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-600 hover:text-red-400 transition-colors w-full text-center"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

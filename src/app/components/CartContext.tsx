import React, { createContext, useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { ShoppingCart, X, Plus, Minus, Check, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  category?: string;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function CartSidebar() {
  const { cart, cartCount, cartTotal, isCartOpen, setCartOpen, updateQty, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isCartOpen ? 1 : 0, pointerEvents: isCartOpen ? "auto" : "none" }}
        onClick={() => setCartOpen(false)}
      />

      {/* Sidebar panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[420px] flex flex-col"
        style={{
          background: "var(--wf-bg-card)",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          boxShadow: "-12px 0 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--wf-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--wf-bg-alt)" }}
            >
              <ShoppingCart size={18} style={{ color: "#2D6A4F" }} />
            </div>
            <div>
              <h3
                className="font-semibold"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}
              >
                Your Cart
              </h3>
              <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                style={{ color: "var(--wf-text-4)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "var(--wf-border-2)" }}
            >
              <X size={18} style={{ color: "var(--wf-text-3)" }} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: "var(--wf-bg-alt)" }}
              >
                <ShoppingCart size={32} style={{ color: "var(--wf-border)" }} />
              </div>
              <p
                className="font-semibold mb-2"
                style={{ color: "var(--wf-text-1)", fontFamily: "'Playfair Display', serif" }}
              >
                Your cart is empty
              </p>
              <p className="text-sm mb-6" style={{ color: "var(--wf-text-4)" }}>
                Browse our shop and add items to get started.
              </p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "#2D6A4F",
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Browse Shop <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-start py-4 border-b"
                  style={{ borderColor: "var(--wf-border-2)" }}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <p
                        className="text-xs mb-0.5"
                        style={{ color: "var(--wf-text-4)", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.category}
                      </p>
                    )}
                    <p
                      className="text-sm font-medium leading-tight mb-1"
                      style={{ color: "var(--wf-text-1)" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: "#2D6A4F", fontFamily: "'Playfair Display', serif" }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors"
                        style={{ borderColor: "var(--wf-border)", color: "var(--wf-text-1)", background: "var(--wf-bg-input)" }}
                      >
                        <Minus size={11} />
                      </button>
                      <span
                        className="text-sm font-medium w-6 text-center"
                        style={{ color: "var(--wf-text-1)" }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors"
                        style={{ borderColor: "var(--wf-border)", color: "var(--wf-text-1)", background: "var(--wf-bg-input)" }}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--wf-text-1)", fontFamily: "'Playfair Display', serif" }}
                    >
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={13} style={{ color: "var(--wf-text-4)" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            className="px-6 py-5 border-t space-y-4"
            style={{ borderColor: "var(--wf-border)", background: "var(--wf-bg-subtle)" }}
          >
            {/* Free delivery notice */}
            {cartTotal >= 50 ? (
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}
              >
                <Check size={14} style={{ color: "#16A34A" }} />
                <span className="text-xs font-medium" style={{ color: "#16A34A" }}>
                  You qualify for free delivery!
                </span>
              </div>
            ) : (
              <div
                className="px-4 py-2.5 rounded-xl"
                style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs" style={{ color: "#92400E" }}>
                    Add ${(50 - cartTotal).toFixed(2)} more for free delivery
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "#92400E" }}>
                    ${cartTotal.toFixed(2)} / $50
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#FED7AA" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartTotal / 50) * 100)}%`, background: "#F97316" }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span
                className="text-sm"
                style={{ color: "var(--wf-text-3)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Subtotal
              </span>
              <span
                className="text-xl font-bold"
                style={{ color: "var(--wf-text-1)", fontFamily: "'Playfair Display', serif" }}
              >
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="block w-full py-4 rounded-xl font-semibold text-sm text-center transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
              style={{
                background: "#2D6A4F",
                color: "white",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Checkout — ${cartTotal.toFixed(2)}
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="block w-full py-3 rounded-xl text-sm text-center transition-colors"
              style={{ color: "var(--wf-text-3)" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    toast.success("Added to cart!", {
      description: item.name,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const isIn = prev.includes(id);
      toast(isIn ? "Removed from wishlist" : "Added to wishlist! ❤️");
      return isIn ? prev.filter((i) => i !== id) : [...prev, id];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
      <CartSidebar />
    </CartContext.Provider>
  );
}
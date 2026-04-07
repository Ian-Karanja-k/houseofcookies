import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <h2 className="font-heading text-2xl text-foreground">Your cart is empty</h2>
        <Link to="/products" className="text-primary hover:text-gold-light transition-colors">
          Browse our menu →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
          Your <span className="text-gradient-gold">Cart</span>
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.cookie.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border"
            >
              <img
                src={item.cookie.image}
                alt={item.cookie.name}
                className="w-20 h-20 rounded-md object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground truncate">{item.cookie.name}</h3>
                <p className="text-primary text-sm font-medium">KSh {item.cookie.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.cookie.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Minus className="w-3 h-3 text-secondary-foreground" />
                </button>
                <span className="text-foreground font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cookie.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Plus className="w-3 h-3 text-secondary-foreground" />
                </button>
              </div>
              <p className="text-foreground font-bold w-20 text-right">
                KSh {item.cookie.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.cookie.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <div className="flex justify-between items-center text-lg">
            <span className="font-heading font-semibold text-foreground">Total</span>
            <span className="font-heading font-bold text-gradient-gold text-2xl">KSh {totalPrice}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-4 w-full inline-flex items-center justify-center bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

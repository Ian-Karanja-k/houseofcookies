import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    deliveryMethod: "delivery" as "delivery" | "pickup",
    paymentMethod: "mpesa" as "mpesa" | "cash",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          customer_phone: form.phone.trim(),
          delivery_location: form.location.trim() || null,
          delivery_method: form.deliveryMethod,
          payment_method: form.paymentMethod,
          total_price: totalPrice,
          user_id: user?.id || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.cookie.id,
        quantity: item.quantity,
        unit_price: item.cookie.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      toast.success("Order placed successfully! We'll contact you shortly.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
            <span className="text-gradient-gold">Checkout</span>
          </h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty. Add some cookies first!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="bg-card rounded-lg p-5 border border-border space-y-3">
                <h2 className="font-heading text-lg font-semibold text-foreground">Order Summary</h2>
                {items.map((item) => (
                  <div key={item.cookie.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.cookie.name} x{item.quantity}
                    </span>
                    <span className="text-primary font-medium">KSh {item.cookie.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-gradient-gold">KSh {totalPrice}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">Your Details</h2>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary text-secondary-foreground border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-secondary text-secondary-foreground border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Delivery Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-secondary text-secondary-foreground border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Delivery Method */}
              <div className="space-y-3">
                <h2 className="font-heading text-lg font-semibold text-foreground">Delivery Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(["delivery", "pickup"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setForm({ ...form, deliveryMethod: method })}
                      className={`p-4 rounded-md border text-sm font-medium capitalize transition-all ${
                        form.deliveryMethod === method
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary text-secondary-foreground hover:border-primary/30"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-3">
                <h2 className="font-heading text-lg font-semibold text-foreground">Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "mpesa" as const, label: "M-Pesa" },
                    { id: "cash" as const, label: "Cash on Delivery" },
                  ]).map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: pm.id })}
                      className={`p-4 rounded-md border text-sm font-medium transition-all ${
                        form.paymentMethod === pm.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary text-secondary-foreground hover:border-primary/30"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors text-lg disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : `Place Order — KSh ${totalPrice}`}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ShieldAlert, Package, DollarSign, Clock } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery_location: string | null;
  delivery_method: string;
  payment_method: string;
  status: string;
  total_price: number;
  created_at: string;
}

const statusOptions = ["pending", "confirmed", "preparing", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  preparing: "bg-orange-500/20 text-orange-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update order status");
    } else {
      toast.success(`Order updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <ShieldAlert className="w-16 h-16 text-destructive" />
        <h2 className="font-heading text-2xl text-foreground">Access Denied</h2>
        <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        <Link to="/" className="text-primary hover:text-primary/80">Go Home →</Link>
      </div>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_price, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
          Admin <span className="text-gradient-gold">Dashboard</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: `KSh ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
            { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-yellow-400" },
            { label: "Delivered", value: deliveredOrders, icon: Package, color: "text-primary" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg p-5 border border-border"
            >
              <div className="flex items-center gap-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-heading text-lg font-semibold text-foreground">All Orders ({orders.length})</h2>
          </div>

          {loading ? (
            <p className="p-5 text-muted-foreground">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="p-5 text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Phone</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-foreground">{order.customer_name}</td>
                      <td className="p-4 text-foreground">{order.customer_phone}</td>
                      <td className="p-4 text-foreground capitalize">{order.delivery_method}</td>
                      <td className="p-4 text-primary font-medium">KSh {order.total_price}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-KE", {
                          day: "numeric", month: "short",
                        })}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full font-medium capitalize border-0 cursor-pointer ${statusColors[order.status] || "bg-secondary text-foreground"}`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s} className="bg-card text-foreground">
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

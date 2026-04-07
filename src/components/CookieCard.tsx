import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Cookie } from "@/data/cookies";
import { toast } from "sonner";

interface CookieCardProps {
  cookie: Cookie;
  index?: number;
}

const CookieCard = ({ cookie, index = 0 }: CookieCardProps) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(cookie);
    toast.success(`${cookie.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:glow-gold"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={cookie.image}
          alt={cookie.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">{cookie.name}</h3>
          <span className="text-primary font-bold text-sm whitespace-nowrap">KSh {cookie.price}</span>
        </div>
        <p className="text-muted-foreground text-sm">{cookie.description}</p>
        <button
          onClick={handleAdd}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default CookieCard;

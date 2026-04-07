import { useState } from "react";
import { motion } from "framer-motion";
import { cookies, type CookieCategory } from "@/data/cookies";
import CookieCard from "@/components/CookieCard";

const categories: ("All" | CookieCategory)[] = ["All", "Chocolate", "Vanilla", "Coconut", "Special Editions"];

const Products = () => {
  const [active, setActive] = useState<"All" | CookieCategory>("All");

  const filtered = active === "All" ? cookies : cookies.filter((c) => c.category === active);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Menu</span>
          </h1>
          <p className="text-muted-foreground mt-2">Explore our handcrafted collection</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cookie, i) => (
            <CookieCard key={cookie.id} cookie={cookie} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

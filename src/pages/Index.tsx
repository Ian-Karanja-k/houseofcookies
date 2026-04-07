import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-cookie.jpg";
import { cookies } from "@/data/cookies";
import CookieCard from "@/components/CookieCard";

const Index = () => {
  const featured = cookies.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium cookie" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Freshly Baked Cookies{" "}
              <span className="text-gradient-gold">Delivered to You</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-md">
              Handcrafted with premium ingredients. Every bite is an experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery across the city" },
            { icon: Clock, title: "Freshly Baked", desc: "Baked to order, never day-old" },
            { icon: Award, title: "Premium Quality", desc: "Only the finest ingredients" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6"
            >
              <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cookies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Our <span className="text-gradient-gold">Signature</span> Collection
            </h2>
            <p className="text-muted-foreground mt-3">Handpicked favorites from our kitchen</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((cookie, i) => (
              <CookieCard key={cookie.id} cookie={cookie} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-medium"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

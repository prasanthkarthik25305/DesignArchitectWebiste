import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "3D Renders", "Completed", "Interior", "2D Plans"];

const portfolioData = [
  { id: 1, title: "Contemporary 3BHK Villa", location: "Kakinada", category: "3D Renders", icon: "🏡" },
  { id: 2, title: "G+2 Apartment Building", location: "Samalkot", category: "Completed", icon: "🏢" },
  { id: 3, title: "Modern Living & Dining", location: "Kakinada", category: "Interior", icon: "🛋️" },
  { id: 4, title: "Commercial Complex Layout", location: "Peddapuram", category: "2D Plans", icon: "📐" },
  { id: 5, title: "Duplex Villa Design", location: "Rajahmundry", category: "3D Renders", icon: "🏠" },
  { id: 6, title: "2BHK Family Home", location: "Kakinada", category: "Completed", icon: "🔑" },
  { id: 7, title: "Modular Kitchen + Dining", location: "Samalkot", category: "Interior", icon: "🍽️" },
  { id: 8, title: "School Building Layout", location: "Kakinada", category: "2D Plans", icon: "🏫" },
  { id: 9, title: "Office Building Elevation", location: "Kakinada", category: "3D Renders", icon: "🏦" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData = activeTab === "All" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeTab);

  return (
    <main className="w-full pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            Our <span className="gold-gradient-text">Works</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of our precision engineering, aesthetic architecture, and high-quality executions across the region.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === cat 
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(201,168,76,0.3)]" 
                  : "bg-card text-muted-foreground border border-white/5 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-white/10 cursor-pointer"
              >
                {/* Fallback architectural image using Unsplash */}
                {/* Unsplash abstract architecture/interior photo */}
                <img 
                  src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop&sig=${item.id}`} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-white mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <span className="text-primary">📍</span> {item.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  );
}

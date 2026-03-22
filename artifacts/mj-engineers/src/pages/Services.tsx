import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

const servicesList = [
  { 
    id: "survey",
    icon: "🗺️", 
    title: "Land Survey", 
    desc: "Highly accurate digital surveying to establish exact boundaries before planning begins.",
    benefits: ["GPS boundary mapping", "Legal documentation prep", "Dispute resolution", "Topographical maps"],
    why: "We use advanced DGPS equipment ensuring millimeter precision, saving you from future legal border disputes."
  },
  { 
    id: "planning",
    icon: "📐", 
    title: "Building Planning", 
    desc: "Custom architectural planning optimizing space, light, and airflow.",
    benefits: ["100% Vastu-compliant", "Structural drawings", "Multiple layout options", "Space optimization"],
    why: "Our designs balance modern aesthetics with traditional Vastu principles perfectly."
  },
  { 
    id: "permissions",
    icon: "🏛️", 
    title: "Govt. Permissions", 
    desc: "Complete liaison work for all required government building approvals.",
    benefits: ["GHMC / Panchayat approvals", "DTCP & RERA compliance", "Faster processing", "Zero client visits required"],
    why: "As a licensed surveyor, our paperwork is processed faster by local authorities."
  },
  { 
    id: "estimation",
    icon: "🧮", 
    title: "Cost Estimation", 
    desc: "Detailed Bill of Quantities (BOQ) so you know exactly what your project costs.",
    benefits: ["Detailed BOQ", "Material & Labour breakdown", "Bank loan formats", "No hidden surprises"],
    why: "We provide transparent, real-market estimations preventing budget overruns mid-construction."
  },
  { 
    id: "3d",
    icon: "🖥️", 
    title: "2D & 3D Design", 
    desc: "See your building before it's built with stunning photorealistic renders.",
    benefits: ["Photorealistic exteriors", "Detailed floor plans", "Walkthrough videos", "Material visualization"],
    why: "Change colors and designs digitally, saving thousands in physical rework."
  },
  { 
    id: "interior",
    icon: "🛋️", 
    title: "Interior Design", 
    desc: "Premium, functional interior spaces tailored to your lifestyle.",
    benefits: ["Modular kitchens", "False ceilings & lighting", "Custom furniture", "Space planning"],
    why: "We merge interior planning into the architectural phase, ensuring electricals align perfectly."
  },
  { 
    id: "valuation",
    icon: "📊", 
    title: "Valuation Services", 
    desc: "Certified property valuations for loans, tax, or sales.",
    benefits: ["Bank-approved formats", "SBI/HDFC/ICICI accepted", "Quick turnaround", "Market-accurate pricing"],
    why: "Our valuations carry high credibility with major financial institutions."
  },
  { 
    id: "lrs",
    icon: "📋", 
    title: "Land Regularisation", 
    desc: "Legalizing unauthorized plots and constructions.",
    benefits: ["LRS/BRS schemes", "Paperwork management", "Penalty calculation", "Follow-ups"],
    why: "We navigate complex government schemes efficiently, removing legal stress."
  },
  { 
    id: "quality",
    icon: "✅", 
    title: "Quality Control", 
    isPremium: true,
    desc: "Independent auditing of construction materials and processes.",
    benefits: ["Stage-wise inspections", "Material lab testing", "Structural integrity checks", "Detailed reporting"],
    why: "Our premium differentiator. We act as your eyes on site to ensure the contractor builds exactly to spec."
  },
];

export default function Services() {
  return (
    <main className="w-full pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            Our <span className="gold-gradient-text">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive suite of engineering and architectural solutions. From empty plots to finished interiors.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-card rounded-xl border ${service.isPremium ? 'border-primary shadow-[0_0_15px_rgba(201,168,76,0.1)]' : 'border-white/5'} p-8 flex flex-col h-full hover-gold-glow relative overflow-hidden`}
            >
              {service.isPremium && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Premium
                </div>
              )}
              
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold font-serif text-white mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
              
              <div className="space-y-3 mb-8">
                {service.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10">
                <span className="text-xs text-primary uppercase tracking-widest block mb-2 font-bold">Why Us</span>
                <p className="text-sm text-muted-foreground italic">{service.why}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center bg-card border border-primary/20 p-12 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Need a custom service package?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">We can tailor our offerings to exactly match your project requirements and budget.</p>
            <Link 
              href="/contact"
              className="px-8 py-3 rounded-sm font-semibold text-primary-foreground gold-gradient-bg transition-all hover:scale-105 inline-block"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

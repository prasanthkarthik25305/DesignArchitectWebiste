import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Info } from "lucide-react";

const plans = [
  {
    name: "2BHK Plan",
    price: "₹20,000",
    desc: "Perfect for single-family residential plots.",
    features: [
      "Complete architectural drawings",
      "Vastu-compliant Floor plan",
      "2D Elevation design",
      "Structural layout",
      "Area statement",
      "1 free revision"
    ],
    popular: false,
  },
  {
    name: "3BHK & Above",
    price: "₹30,000",
    desc: "Comprehensive design for larger homes.",
    features: [
      "Full architectural set",
      "2D + 3D exterior design",
      "Structural engineering drawings",
      "Electrical & plumbing layout",
      "Govt approval support documents",
      "2 free revisions"
    ],
    popular: true,
  },
  {
    name: "G+1 Building",
    price: "₹45,000",
    desc: "Multi-floor planning and structural safety.",
    features: [
      "Multi-floor architecture",
      "Advanced structural engineering",
      "3D photorealistic elevation",
      "Govt approval drawings prep",
      "Foundation design",
      "1 Site supervision visit"
    ],
    popular: false,
  },
  {
    name: "Interior Design",
    price: "Custom",
    desc: "Premium aesthetic living spaces.",
    features: [
      "Full space planning",
      "3D interior renders (all rooms)",
      "Material selection & BOQ",
      "Modular kitchen design",
      "False ceiling + lighting plan",
      "Vendor coordination"
    ],
    popular: false,
  }
];

export default function Pricing() {
  return (
    <main className="w-full pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            Transparent <span className="gold-gradient-text">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            No hidden costs. Premium architectural and engineering services structured for clear understanding.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-card rounded-2xl p-8 flex flex-col ${
                plan.popular 
                  ? "border-2 border-primary shadow-[0_0_30px_rgba(201,168,76,0.15)] transform md:-translate-y-4" 
                  : "border border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gold-gradient-bg text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-serif text-white mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{plan.desc}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/contact"
                className={`w-full py-3 rounded-md font-semibold text-center transition-all ${
                  plan.popular
                    ? "gold-gradient-bg text-primary-foreground hover:shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                    : "bg-white/5 text-white hover:bg-primary hover:text-primary-foreground border border-white/10"
                }`}
              >
                {plan.price === "Custom" ? "Get Quote" : "Choose Plan"}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 flex items-start sm:items-center gap-4 max-w-3xl">
            <Info className="w-6 h-6 text-primary shrink-0 mt-1 sm:mt-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-white">Note on Government Fees:</strong> The prices above reflect our professional architectural and engineering service charges. They do <span className="text-primary">not</span> include official government chalans, permit fees, or LRS/BRS penalties, which are paid directly to the respective authorities based on the actual plot size.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

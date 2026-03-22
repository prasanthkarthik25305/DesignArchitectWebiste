import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, ShieldCheck, Clock, Award } from "lucide-react";

export default function About() {
  return (
    <main className="w-full pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            About <span className="gold-gradient-text">MJ Engineers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Planning, Designing, and Building the future of Kakinada with unmatched precision and transparency.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/about-vision.png`} 
              alt="Architectural Vision" 
              className="rounded-lg shadow-2xl shadow-black/50 border border-white/10 w-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold font-serif text-white">Our Story & Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Founded by <strong>M. Jaya Lakshman</strong>, a highly experienced Licensed Surveyor, MJ Engineers & Architects was built on a singular vision: <span className="text-primary">Complete Architecture Thinking</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We noticed that individual home builders often struggle managing separate surveyors, architects, approval agents, and contractors. We eliminate that friction. We are a true one-stop solution, handling everything from the moment you purchase a plot to the day you step into your fully furnished home.
            </p>
            <div className="pt-6">
              <div className="inline-block p-[1px] rounded-sm gold-gradient-bg">
                <div className="bg-background px-6 py-3 rounded-sm">
                  <p className="font-serif text-lg italic text-slate-300">
                    "Our goal isn't just to build houses; it's to engineer peace of mind for property owners."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="w-8 h-8"/>, title: "End-to-End", desc: "No running between multiple contractors. We do it all." },
              { icon: <ShieldCheck className="w-8 h-8"/>, title: "100% Legal", desc: "Licensed surveying and authentic govt permissions." },
              { icon: <Clock className="w-8 h-8"/>, title: "Time Bound", desc: "Strict adherence to project timelines and milestones." },
              { icon: <Award className="w-8 h-8"/>, title: "Quality First", desc: "Dedicated stage-wise quality control inspections." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-lg border border-white/5 hover:border-primary/30 transition-colors text-center"
              >
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-semibold text-primary-foreground gold-gradient-bg hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all hover:-translate-y-1"
          >
            Explore Our Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </main>
  );
}

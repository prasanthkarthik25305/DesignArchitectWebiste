import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star, Quote } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-medium tracking-widest uppercase text-sm">Planning • Designing • Building</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              From Land to Living <br />
              <span className="gold-gradient-text italic font-normal">We Design Everything</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Kakinada's premier Licensed Surveyor & Architects. A one-stop solution for surveying, government approvals, construction, and premium interiors.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="px-8 py-4 rounded-sm font-semibold text-primary-foreground gold-gradient-bg hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/portfolio"
                className="px-8 py-4 rounded-sm font-semibold text-white border border-white/20 hover:border-primary hover:bg-primary/5 transition-all text-center text-lg"
              >
                View Our Work
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-sm font-medium text-slate-300">Licensed Surveyor</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-sm font-medium text-slate-300">End-to-End Solution</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-sm font-medium text-slate-300">Local Expertise (Kakinada)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Complete Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We handle everything from the initial land survey to the final interior handover, ensuring quality at every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🗺️", title: "Land Survey", desc: "Precise GPS boundary mapping and legal documentation." },
              { icon: "📐", title: "Building Planning", desc: "Vastu-compliant, space-optimized 2D & 3D floor plans." },
              { icon: "🏛️", title: "Govt. Permissions", desc: "Hassle-free approvals from local authorities." },
              { icon: "🧮", title: "Cost Estimation", desc: "Accurate BOQ and material breakdowns." },
              { icon: "🖥️", title: "3D Elevations", desc: "Photorealistic exterior designs before construction." },
              { icon: "✅", title: "Quality Control", desc: "Stage-wise premium inspections and testing." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-background border border-white/5 p-8 rounded-lg hover-gold-glow group cursor-pointer"
              >
                <div className="text-4xl mb-6 bg-card w-16 h-16 rounded-full flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif text-white group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:text-white transition-colors">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The Journey From<br/>Land to Living</h2>
              <p className="text-muted-foreground mb-8 text-lg">We follow a strict Complete Architecture Thinking approach. You don't need multiple contractors; we manage the entire lifecycle.</p>
              <Link 
                href="/about"
                className="px-6 py-3 rounded-sm font-medium text-white border border-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Learn About Us
              </Link>
            </div>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Free Consultation", desc: "Understanding your vision and requirements." },
                { step: "02", title: "Land Survey & Testing", desc: "Digital mapping and soil condition checks." },
                { step: "03", title: "Design & Planning", desc: "2D/3D Vastu designs and material estimation." },
                { step: "04", title: "Govt Approvals", desc: "Securing necessary building permissions." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6 group"
                >
                  <div className="text-3xl font-serif font-bold text-primary/30 group-hover:text-primary transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Client Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it. Here is what property owners across Kakinada district have to say.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ravi Kumar Reddy", location: "Kakinada", text: "MJ Engineers handled everything from my plot survey to the final handover of my 3BHK. I didn't visit a single government office. Truly end-to-end!" },
              { name: "Lakshmi Prasad", location: "Samalkot", text: "The 3D render was exactly what got built. Their Quality control team was present at every stage, giving me immense peace of mind." },
              { name: "Anitha Devi", location: "Kakinada", text: "The interior design they provided is stunning. They helped me pick beautiful materials that fit perfectly within my budget." }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-white/5 relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h5 className="font-bold text-white">{testimonial.name}</h5>
                  <span className="text-xs text-primary uppercase tracking-wider">{testimonial.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gold-gradient-bg opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-white">Ready to Build Your Dream Home?</h2>
          <p className="text-lg text-slate-300 mb-10">Get a transparent quote and expert consultation from Kakinada's leading architecture firm today.</p>
          <Link 
            href="/contact"
            className="px-8 py-4 rounded-sm font-semibold text-primary-foreground gold-gradient-bg hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transition-all hover:-translate-y-1 inline-flex items-center gap-2 text-lg"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

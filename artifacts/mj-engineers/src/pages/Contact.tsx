import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageCircle } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "General Inquiry"
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Message Sent Successfully",
            description: "We will get back to you shortly.",
            className: "bg-primary text-primary-foreground border-none",
          });
          reset();
        },
        onError: () => {
          toast({
            title: "Error Sending Message",
            description: "Please try again or contact us via WhatsApp.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <main className="w-full pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            Get In <span className="gold-gradient-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Ready to start your building journey? Contact us for a free consultation or detailed quotation.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-card p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Office Address</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  5/164 Gopinath Nagar,<br/>
                  Near Water Tank, Sarapavaram,<br/>
                  Kakinada District – 533005
                </p>
              </div>
            </div>

            <a href="tel:+919177479958" className="bg-card p-6 rounded-xl border border-white/5 flex items-start gap-4 hover:border-primary/40 transition-colors group">
              <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Call Now</h4>
                <p className="text-primary text-sm font-semibold mb-0.5">+91 9177479958</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">M. Jaya Lakshman</p>
              </div>
            </a>

            <a href="mailto:mjengg7@gmail.com" className="bg-card p-6 rounded-xl border border-white/5 flex items-start gap-4 hover:border-primary/40 transition-colors group">
              <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email Us</h4>
                <p className="text-primary text-sm font-semibold">mjengg7@gmail.com</p>
              </div>
            </a>

            <a
              href="https://wa.me/916302199958?text=Hello%20MJ%20Engineers%2C%20I%20need%20a%20free%20consultation%20for%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/10 p-6 rounded-xl border border-[#25D366]/20 flex items-start gap-4 hover:border-[#25D366]/50 transition-colors group"
            >
              <div className="bg-[#25D366]/20 p-3 rounded-lg text-[#25D366] group-hover:bg-[#25D366]/30 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">WhatsApp Chat</h4>
                <p className="text-[#25D366] text-sm font-semibold">Chat for Free Consultation</p>
                <p className="text-muted-foreground text-xs mt-0.5">Tap to open WhatsApp</p>
              </div>
            </a>

            <div className="bg-card p-6 rounded-xl border border-white/5 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Working Hours</h4>
                <p className="text-muted-foreground text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-muted-foreground text-sm">Sun: By Appointment</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-card p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-6 relative z-10">Send us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                    <input 
                      {...register("phone")}
                      className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Required</label>
                  <select 
                    {...register("service")}
                    className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Land Survey">Land Survey</option>
                    <option value="Building Planning">Building Planning</option>
                    <option value="Govt. Permissions / Building Approvals">Govt. Permissions / Building Approvals</option>
                    <option value="Cost Estimation">Cost Estimation (BOQ)</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Valuation Services">Valuation Services</option>
                    <option value="2D & 3D Design">2D & 3D Design / Renders</option>
                    <option value="Land Regularisation">Land Regularisation (LRS/BRS)</option>
                    <option value="Quality Control">Quality Control & Site Supervision</option>
                    <option value="Full Construction">Full Construction</option>
                  </select>
                  {errors.service && <p className="text-destructive text-xs mt-1">{errors.service.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message Details</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Tell us about your plot size, location, and requirements..."
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full py-4 rounded-md font-bold text-primary-foreground gold-gradient-bg hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitMutation.isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <div className="mt-20 rounded-2xl overflow-hidden border border-white/10 h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30523.12341!2d82.2475!3d16.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382759e20a7e09%3A0xb7b7f8b7f07c89f0!2sKakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>

      </div>
    </main>
  );
}

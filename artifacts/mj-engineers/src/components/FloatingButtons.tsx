import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingButtons() {
  const whatsappMsg = encodeURIComponent("Hello MJ Engineers, I need a free consultation for my project.");
  const whatsappUrl = `https://wa.me/916302199958?text=${whatsappMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Call Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        href="tel:+919177479958"
        className="w-14 h-14 rounded-full gold-gradient-bg shadow-lg shadow-primary/30 flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6 fill-current" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:scale-110 transition-transform relative"
        aria-label="WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <MessageCircle className="w-7 h-7 relative z-10" />
      </motion.a>
    </div>
  );
}

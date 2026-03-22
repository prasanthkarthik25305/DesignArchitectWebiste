import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-mark.png`} 
                alt="MJ Engineers Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-tight tracking-wider text-white">
                  MJ ENGINEERS
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                  & Architects
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed pr-4">
              Complete Architecture Thinking. From land purchase to final interior — everything handled professionally under one roof.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 hover:border-primary text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/mjengineers7?igsh=MWRwNjF5bHVwaHU3OQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 hover:border-primary text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 hover:border-primary text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Services</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">Portfolio</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-6 tracking-wide">Key Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Building Planning</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Govt. Approvals</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Interior Design</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Land Survey</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">3D Elevations</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>5/164 Gopinath Nagar, Near Water Tank, Sarapavaram, Kakinada District – 533005</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919177479958" className="hover:text-white transition-colors">+91 9177479958</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:mjengg7@gmail.com" className="hover:text-white transition-colors">mjengg7@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MJ Engineers & Architects. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Licensed Surveyor: M. Jaya Lakshman
          </p>
        </div>
      </div>
    </footer>
  );
}

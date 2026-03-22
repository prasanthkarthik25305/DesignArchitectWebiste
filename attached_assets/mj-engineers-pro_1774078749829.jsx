import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const COMPANY = {
  name: "MJ Engineers & Architects",
  tagline: "Planning • Designing • Building",
  owner: "M. Jaya Lakshman",
  role: "Licensed Surveyor",
  phone: "+91 9177479958",
  phoneRaw: "919177479958",
  email: "mjengg7@gmail.com",
  address: "5/164 Gopinath Nagar, Near Water Tank,\nSarapavaram, Kakinada – 533005",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30523.12341!2d82.2475!3d16.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382759e20a7e09%3A0xb7b7f8b7f07c89f0!2sKakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000",
  mapLink: "https://maps.google.com/?q=5/164+Gopinath+Nagar+Near+Water+Tank+Sarapavaram+Kakinada+533005+Andhra+Pradesh+India",
  whatsapp: "https://wa.me/919177479958?text=Hello%20MJ%20Engineers%2C%20I%20need%20a%20free%20consultation%20for%20my%20project."
};

const SERVICES = [
  { icon: "🗺️", color: "#1e4a6e", title: "Land Survey", short: "Precise boundary demarcation & topographic surveys with GPS accuracy.", benefits: ["GPS-based boundary mapping", "Legal documentation ready", "Revenue records support", "Dispute resolution data"], why: "Licensed surveyor with deep local knowledge of Kakinada land records & revenue offices." },
  { icon: "📐", color: "#1a3a4a", title: "Building Planning", short: "Complete architectural planning from concept to detailed working drawings.", benefits: ["Vastu-compliant floor plans", "Structural drawings included", "Utility & drainage layouts", "Multiple design options"], why: "Every plan is optimised for your lifestyle, plot shape, and local climate." },
  { icon: "🏛️", color: "#2a1a4a", title: "Govt. Permissions", short: "Full government approval processing — GHMC, DTCP, Panchayat & RERA.", benefits: ["All authorities handled", "Zero office visits for you", "Fast-tracked processing", "100% legal compliance"], why: "We know exactly what each authority needs. Approvals without stress or bribes." },
  { icon: "🧮", color: "#1a3a2a", title: "Cost Estimation", short: "Detailed BOQ and accurate construction cost estimation before you spend.", benefits: ["Material-wise breakdown", "Labour cost included", "No cost surprises", "Budget scenario planning"], why: "Transparent estimates that let you plan finances with complete confidence." },
  { icon: "🛋️", color: "#3a2a1a", title: "Interior Design", short: "Modern interiors — modular kitchens, living spaces, bedrooms & false ceilings.", benefits: ["3D interior visualisation", "Space-efficient layouts", "Material selection help", "Custom furniture planning"], why: "From concrete shell to dream home — we complete every inch beautifully." },
  { icon: "📊", color: "#3a1a1a", title: "Valuation Services", short: "Certified property valuation for bank loans, legal matters & transactions.", benefits: ["Bank-approved reports", "Legal valuation certificates", "Market-rate analysis", "Fast 48-hour turnaround"], why: "Valuations accepted by SBI, HDFC, ICICI and all major banks in Andhra Pradesh." },
  { icon: "🖥️", color: "#1a2a3a", title: "2D & 3D Design", short: "Photorealistic renders, floor plans & elevations — see it before you build it.", benefits: ["Photorealistic 3D renders", "Multiple elevation options", "Quick revision rounds", "Client presentation-ready"], why: "Visualise and approve your dream home before the first brick is laid." },
  { icon: "📋", color: "#2a3a1a", title: "Land Regularisation", short: "Regularisation of unauthorised constructions under LRS/BRS schemes.", benefits: ["Legal status restored", "All paperwork managed", "Govt. liaison included", "Penalty minimisation"], why: "Complex regularisation cases across Kakinada district handled with expertise." },
  { icon: "✅", color: "#1a3a1a", title: "Quality Control", short: "On-site inspections, material testing & stage-wise construction supervision.", benefits: ["Stage-wise site inspections", "Material quality checks", "Structural safety assured", "Written inspection reports"], why: "Our premium differentiator — your investment is protected at every single stage.", premium: true }
];

const PROCESS = [
  { step: "01", icon: "📞", title: "Free Consultation", desc: "Call or WhatsApp us. We understand your vision, budget, and site conditions at no charge." },
  { step: "02", icon: "🗺️", title: "Land Survey", desc: "GPS survey of your plot with legal boundary documentation and revenue records support." },
  { step: "03", icon: "📐", title: "Design & Planning", desc: "2D floor plans, 3D renders, and structural drawings tailored to your requirements." },
  { step: "04", icon: "🏛️", title: "Govt. Approvals", desc: "We handle all permissions — GHMC, DTCP, Panchayat. You don't visit a single office." },
  { step: "05", icon: "🏗️", title: "Construction", desc: "Supervised construction with quality control checks at every stage of the build." },
  { step: "06", icon: "🏠", title: "Handover", desc: "Final inspection, interior finishing, and keys delivered — on time, every time." }
];

const PRICING = [
  { plan: "2BHK Plan", price: "₹20,000", note: "design package", features: ["Complete architectural drawings", "Floor plan + elevation", "Structural layout", "Area statement", "1 free revision"], popular: false, cta: "Get 2BHK Quote" },
  { plan: "3BHK & Above", price: "₹30,000", note: "design package", features: ["Full architectural set", "2D + 3D design", "Structural drawings", "Electrical & plumbing layout", "2 revisions + approval support"], popular: true, cta: "Get 3BHK Quote" },
  { plan: "G+1 Building", price: "₹45,000", note: "design package", features: ["Multi-floor planning", "Structural engineering", "3D elevation render", "Govt. approval drawings", "Site supervision option"], popular: false, cta: "Get G+1 Quote" },
  { plan: "Interior Design", price: "Custom", note: "based on scope", features: ["Full space planning", "3D interior renders", "Material & BOQ", "Modular kitchen design", "False ceiling + lighting"], popular: false, cta: "Request Quote" }
];

const TESTIMONIALS = [
  { name: "Ravi Kumar Reddy", loc: "Kakinada", stars: 5, text: "MJ Engineers handled everything from my plot survey to the final handover of my 3BHK. I didn't visit a single government office. Truly end-to-end!", project: "3BHK Home", initial: "R" },
  { name: "Lakshmi Prasad", loc: "Samalkot", stars: 5, text: "The 3D render was exactly what got built. Quality control team was present at every stage. Very professional and completely trustworthy.", project: "G+1 Building", initial: "L" },
  { name: "Suresh Babu", loc: "Peddapuram", stars: 5, text: "Got my unauthorised building regularised without any stress. Jaya Lakshman sir knows every government department perfectly. Highly recommended!", project: "LRS Regularisation", initial: "S" },
  { name: "Anitha Devi", loc: "Kakinada", stars: 5, text: "The interior design is stunning. Beautiful materials within my budget. The modular kitchen is everyone's favourite. Thank you MJ Engineers!", project: "Interior Design", initial: "A" },
  { name: "Prasad Rao", loc: "Rajahmundry", stars: 5, text: "Got building permission in just 22 days. They handled everything — drawings, submissions, follow-up. I was amazed at the speed.", project: "Building Permit", initial: "P" },
  { name: "Vijaya Kumari", loc: "Kakinada", stars: 5, text: "Land survey was done very precisely. The GPS documentation helped resolve a boundary dispute with my neighbour professionally.", project: "Land Survey", initial: "V" }
];

const FAQS = [
  { q: "How long does building permission take?", a: "Typically 15–45 days depending on the authority (GHMC, DTCP or Panchayat). We handle the entire process and follow up on your behalf. In most cases, clients don't visit any office." },
  { q: "Do you work outside Kakinada city?", a: "Yes! We serve the entire Kakinada district including Samalkot, Peddapuram, Tuni, Prathipadu, Gollaprolu, and Rajahmundry area." },
  { q: "Is the pricing all-inclusive?", a: "Our service charges are fixed as listed. Government fees, stamp duty, and authority charges are paid directly to the respective departments and are always informed to you upfront before we start." },
  { q: "Can I get a 3D render before confirming?", a: "Absolutely. We provide photorealistic 3D renders so you can fully visualise and approve the design before any construction begins. Changes are easy at this stage." },
  { q: "Do you handle Vastu-compliant designs?", a: "Yes, all our plans can be made fully Vastu-compliant as per your preferences, at no extra charge. Just mention it during consultation." },
  { q: "What is the payment schedule?", a: "We work on a milestone-based payment plan. Typically 40% on agreement, 40% on design delivery, and 20% on approval or handover. We're flexible for genuine clients." },
  { q: "How do I get started?", a: "Simply call or WhatsApp +91 9177479958. We'll schedule a free consultation at your site or our office within 24 hours." }
];

const PORTFOLIO_ITEMS = [
  { cat: "3D Renders", title: "Contemporary 3BHK Villa", loc: "Kakinada", tag: "Residential", emoji: "🏠", bg: "#0d2137" },
  { cat: "Completed", title: "G+2 Apartment Building", loc: "Samalkot", tag: "Apartment", emoji: "🏢", bg: "#0d1a2e" },
  { cat: "Interior", title: "Modern Living & Dining", loc: "Kakinada", tag: "Interior", emoji: "🛋️", bg: "#1a0d2e" },
  { cat: "2D Plans", title: "Commercial Complex Layout", loc: "Peddapuram", tag: "Commercial", emoji: "🏪", bg: "#0d2e1a" },
  { cat: "3D Renders", title: "Duplex Villa Design", loc: "Rajahmundry", tag: "Villa", emoji: "🏡", bg: "#2e1a0d" },
  { cat: "Completed", title: "2BHK Family Home", loc: "Kakinada", tag: "Residential", emoji: "🏘️", bg: "#2e0d0d" },
  { cat: "Interior", title: "Modular Kitchen + Dining", loc: "Samalkot", tag: "Interior", emoji: "🍳", bg: "#0d2e2e" },
  { cat: "2D Plans", title: "School Building Layout", loc: "Kakinada", tag: "Institutional", emoji: "🏫", bg: "#1a2e0d" },
  { cat: "3D Renders", title: "Office Building Elevation", loc: "Kakinada", tag: "Commercial", emoji: "🏦", bg: "#2e0d1a" }
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [toast, setToast] = useState(null);
  const [quoteModal, setQuoteModal] = useState(false);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 60); setShowBackTop(window.scrollY > 400); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }, [page]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const nav = (p) => setPage(p);

  const PAGES = ["Home", "About", "Services", "Portfolio", "Pricing", "Contact"];

  return (
    <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif", background: "#080E1A", color: "#fff", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#080E1A}
        ::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:3px}
        .dm{font-family:'DM Sans',sans-serif}
        .serif{font-family:'Cormorant Garamond',serif}
        .gold{color:#C9A84C}
        .btn-gold{background:linear-gradient(135deg,#C9A84C 0%,#E8C96A 50%,#C9A84C 100%);color:#080E1A;font-weight:700;padding:15px 36px;border-radius:3px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;letter-spacing:1px;text-transform:uppercase;transition:all .25s;display:inline-block;text-decoration:none;background-size:200%;background-position:left}
        .btn-gold:hover{background-position:right;transform:translateY(-2px);box-shadow:0 10px 32px rgba(201,168,76,0.45)}
        .btn-outline{background:transparent;color:#C9A84C;border:1.5px solid #C9A84C;font-weight:600;padding:14px 32px;border-radius:3px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;letter-spacing:1px;text-transform:uppercase;transition:all .25s;display:inline-block;text-decoration:none}
        .btn-outline:hover{background:rgba(201,168,76,0.1);transform:translateY(-2px)}
        .btn-ghost{background:rgba(255,255,255,0.06);color:#fff;border:1px solid rgba(255,255,255,0.1);padding:12px 28px;border-radius:3px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all .2s;display:inline-block;text-decoration:none}
        .btn-ghost:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.2)}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.12);border-radius:6px;transition:all .3s}
        .card:hover{border-color:rgba(201,168,76,0.45);transform:translateY(-5px);box-shadow:0 20px 60px rgba(0,0,0,0.4)}
        .lbl{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:3.5px;text-transform:uppercase;color:#C9A84C}
        .h1{font-size:clamp(38px,6vw,80px);font-weight:600;line-height:1.05;letter-spacing:-1px}
        .h2{font-size:clamp(28px,4vw,52px);font-weight:600;line-height:1.1}
        .h3{font-size:clamp(20px,2.5vw,30px);font-weight:600}
        .divider{width:56px;height:2px;background:linear-gradient(90deg,#C9A84C,transparent);margin:18px 0 28px}
        .tag{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:50px;background:rgba(201,168,76,0.12);color:#C9A84C;border:1px solid rgba(201,168,76,0.25)}
        .premium-pill{background:linear-gradient(135deg,#C9A84C,#E8C96A);color:#080E1A;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:4px 12px;border-radius:50px;font-family:'DM Sans',sans-serif;text-transform:uppercase}
        input,textarea,select{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:14px 18px;border-radius:4px;width:100%;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:all .2s;-webkit-appearance:none}
        input:focus,textarea:focus,select:focus{border-color:#C9A84C;background:rgba(201,168,76,0.04);box-shadow:0 0 0 3px rgba(201,168,76,0.08)}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3)}
        select option{background:#0F1A2E;color:#fff}
        label.dm{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.45);display:block;margin-bottom:6px}
        .grid-dots{background-image:radial-gradient(rgba(201,168,76,0.06) 1.5px,transparent 1.5px);background-size:28px 28px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes slideIn{from{transform:translateX(120%)}to{transform:translateX(0)}}
        .fadein{animation:fadeUp .6s ease both}
        .fadein-1{animation:fadeUp .6s .1s ease both}
        .fadein-2{animation:fadeUp .6s .2s ease both}
        .fadein-3{animation:fadeUp .6s .3s ease both}
        .fadein-4{animation:fadeUp .6s .4s ease both}
        .hero-line{overflow:hidden}
        .star{color:#C9A84C}
        .mobile-drawer{position:fixed;inset:0;z-index:300;transition:opacity .3s}
        .drawer-panel{position:absolute;right:0;top:0;bottom:0;width:300px;background:#0A1525;border-left:1px solid rgba(201,168,76,0.2);padding:88px 32px 40px;overflow-y:auto;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1)}
        .drawer-open .drawer-panel{transform:translateX(0)}
        .drawer-bg{position:absolute;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px)}
        .nav-item{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.75);transition:color .2s;display:flex;align-items:center;justify-content:space-between}
        .nav-item:hover,.nav-item.active{color:#C9A84C}
        .timeline-connector{position:absolute;left:28px;top:56px;bottom:-20px;width:1px;background:linear-gradient(to bottom,rgba(201,168,76,0.4),transparent)}
        @media(max-width:768px){.hide-mob{display:none!important}.show-mob{display:flex!important}}
        @media(min-width:769px){.show-mob{display:none!important}}
        .section-wrap{padding:96px 6%}
        @media(max-width:640px){.section-wrap{padding:64px 5%}}
        .prose{font-family:'DM Sans',sans-serif;font-size:16px;line-height:1.85;color:rgba(255,255,255,0.62)}
        .check-item{font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.72);padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:flex-start;gap:10px}
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.07);overflow:hidden;transition:all .3s}
        .portfolio-card{position:relative;overflow:hidden;border-radius:8px;aspect-ratio:4/3;cursor:pointer}
        .portfolio-card .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,14,26,.95) 0%,rgba(8,14,26,.3) 50%,transparent);opacity:0;transition:opacity .35s;display:flex;align-items:flex-end;padding:20px}
        .portfolio-card:hover .overlay{opacity:1}
        .portfolio-card:hover .pcard-inner{transform:scale(1.05);transition:transform .5s}
        .pcard-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px;transition:transform .5s}
        .trust-chip{background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.15);padding:12px 20px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;white-space:nowrap;display:flex;align-items:center;gap:8px}
        .step-card{position:relative;padding:28px;transition:all .3s}
        .step-card:hover{background:rgba(201,168,76,0.04);border-color:rgba(201,168,76,0.3)!important}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s ease}
        .modal-box{background:#0D1829;border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:40px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
        .toast{position:fixed;bottom:160px;left:50%;transform:translateX(-50%);background:#0D1829;border:1px solid;padding:14px 24px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;z-index:600;animation:slideIn .3s ease,fadeIn .3s ease;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.5)}
        .float-wa{position:fixed;bottom:32px;right:24px;z-index:400;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;padding:14px 22px;border-radius:50px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 8px 28px rgba(37,211,102,0.45);transition:all .25s;letter-spacing:.5px}
        .float-wa:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 14px 40px rgba(37,211,102,0.55)}
        .float-call{position:fixed;bottom:96px;right:24px;z-index:400;background:linear-gradient(135deg,#C9A84C,#E8C96A);color:#080E1A;padding:12px 20px;border-radius:50px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 8px 28px rgba(201,168,76,0.45);transition:all .25s}
        .float-call:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(201,168,76,0.55)}
        .back-top{position:fixed;bottom:32px;left:24px;z-index:400;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all .25s;backdrop-filter:blur(8px)}
        .back-top:hover{background:rgba(201,168,76,0.2);border-color:#C9A84C;color:#C9A84C}
        .geo-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);padding:6px 14px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#C9A84C;letter-spacing:.5px}
      `}</style>

      {/* ── FLOATING BUTTONS ── */}
      <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="float-wa">
        <span style={{fontSize:18}}>💬</span> WhatsApp
      </a>
      <a href={`tel:${COMPANY.phone}`} className="float-call">
        <span style={{fontSize:16}}>📞</span> Call Now
      </a>
      {showBackTop && (
        <div className="back-top" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>↑</div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast" style={{borderColor: toast.type==="success"?"#C9A84C":"#e74c3c", color: toast.type==="success"?"#C9A84C":"#e74c3c"}}>
          {toast.type==="success"?"✅":"❌"} {toast.msg}
        </div>
      )}

      {/* ── QUICK QUOTE MODAL ── */}
      {quoteModal && <QuoteModal onClose={() => setQuoteModal(false)} onSuccess={() => { setQuoteModal(false); showToast("Quote request sent! We'll call you within 2 hours."); }} />}

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:72,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 6%",background:scrolled?"rgba(8,14,26,0.97)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(201,168,76,0.12)":"none",transition:"all .35s"}}>
        <div onClick={() => nav("Home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:42,height:42,background:"linear-gradient(135deg,#C9A84C,#E8C96A)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏗️</div>
          <div>
            <div style={{fontWeight:700,fontSize:15,letterSpacing:.5,lineHeight:1.1}}>MJ ENGINEERS</div>
            <div className="dm" style={{fontSize:9,color:"#C9A84C",letterSpacing:2.5,textTransform:"uppercase"}}>& Architects</div>
          </div>
        </div>
        {/* Desktop */}
        <div className="hide-mob" style={{display:"flex",gap:28,alignItems:"center"}}>
          {["Home","About","Services","Portfolio","Pricing","Contact"].map(l => (
            <span key={l} onClick={() => nav(l)} className="dm" style={{fontSize:13,fontWeight:500,cursor:"pointer",color:page===l?"#C9A84C":"rgba(255,255,255,0.7)",borderBottom:page===l?"2px solid #C9A84C":"2px solid transparent",paddingBottom:2,transition:"all .2s",letterSpacing:.3}}>{l}</span>
          ))}
          <button onClick={() => setQuoteModal(true)} className="btn-gold" style={{padding:"10px 24px",fontSize:12}}>Free Quote</button>
        </div>
        {/* Hamburger */}
        <button className="show-mob" onClick={() => setMenuOpen(true)} style={{background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",width:40,height:40,borderRadius:6,cursor:"pointer",alignItems:"center",justifyContent:"center",fontSize:18}}>☰</button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className={`mobile-drawer drawer-open`} style={{opacity:1}}>
          <div className="drawer-bg" onClick={() => setMenuOpen(false)} />
          <div className="drawer-panel">
            <button onClick={() => setMenuOpen(false)} style={{position:"absolute",top:24,right:24,background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",width:36,height:36,borderRadius:50,cursor:"pointer",fontSize:16}}>✕</button>
            <div style={{marginBottom:24}}>
              <div style={{fontWeight:700,fontSize:16}}>MJ ENGINEERS <span className="gold">& ARCHITECTS</span></div>
              <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:4}}>Planning • Designing • Building</div>
            </div>
            {["Home","About","Services","Portfolio","Pricing","Contact"].map(l => (
              <div key={l} className={`nav-item ${page===l?"active":""}`} onClick={() => { nav(l); }}>
                <span>{l}</span>
                <span style={{opacity:.4}}>→</span>
              </div>
            ))}
            <div style={{marginTop:28, display:"flex",flexDirection:"column",gap:10}}>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-gold" style={{textAlign:"center",padding:"13px 20px"}}>💬 WhatsApp Now</a>
              <a href={`tel:${COMPANY.phone}`} className="btn-outline" style={{textAlign:"center",padding:"12px 20px"}}>📞 Call Now</a>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE RENDER ── */}
      <div style={{paddingTop:72}} key={page}>
        {page==="Home" && <HomePage nav={nav} setQuoteModal={setQuoteModal} />}
        {page==="About" && <AboutPage nav={nav} />}
        {page==="Services" && <ServicesPage nav={nav} setQuoteModal={setQuoteModal} />}
        {page==="Portfolio" && <PortfolioPage />}
        {page==="Pricing" && <PricingPage nav={nav} setQuoteModal={setQuoteModal} showToast={showToast} />}
        {page==="Contact" && <ContactPage showToast={showToast} />}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{background:"#05090F",borderTop:"1px solid rgba(201,168,76,0.1)",padding:"72px 6% 32px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:48,marginBottom:56}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:40,height:40,background:"linear-gradient(135deg,#C9A84C,#E8C96A)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏗️</div>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>MJ ENGINEERS</div>
                <div className="dm" style={{fontSize:9,color:"#C9A84C",letterSpacing:2}}>& ARCHITECTS</div>
              </div>
            </div>
            <p className="dm" style={{color:"rgba(255,255,255,0.45)",fontSize:13,lineHeight:1.8,marginBottom:20}}>Your one-stop solution for all building needs in Kakinada. From land to living — we handle everything.</p>
            <div style={{display:"flex",gap:10}}>
              {[["📞",`tel:${COMPANY.phone}`],["✉️",`mailto:${COMPANY.email}`],["💬",COMPANY.whatsapp]].map(([e,h]) => (
                <a key={e} href={h} target={h.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{width:36,height:36,borderRadius:6,background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,textDecoration:"none",transition:"all .2s"}}>{e}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="lbl" style={{marginBottom:20}}>Services</div>
            {["Land Survey","Building Planning","Govt. Permissions","2D & 3D Design","Interior Design","Valuation","Quality Control"].map(s => (
              <div key={s} className="dm" style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:9,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}>→ {s}</div>
            ))}
          </div>
          <div>
            <div className="lbl" style={{marginBottom:20}}>Quick Links</div>
            {["Home","About Us","Services","Portfolio","Pricing","Contact"].map(s => (
              <div key={s} className="dm" style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:9,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}>→ {s}</div>
            ))}
          </div>
          <div>
            <div className="lbl" style={{marginBottom:20}}>Contact</div>
            <div className="dm" style={{color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:2}}>
              <a href={`tel:${COMPANY.phone}`} style={{display:"block",color:"#C9A84C",textDecoration:"none",fontWeight:600}}>📞 {COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} style={{display:"block",color:"rgba(255,255,255,0.55)",textDecoration:"none",marginTop:4}}>✉️ {COMPANY.email}</a>
              <a href={COMPANY.mapLink} target="_blank" rel="noreferrer" style={{display:"block",color:"rgba(255,255,255,0.55)",textDecoration:"none",marginTop:4}}>📍 Sarapavaram, Kakinada<br />&nbsp;&nbsp;&nbsp;&nbsp;District – 533005</a>
            </div>
            <div style={{marginTop:20}}>
              <div className="lbl" style={{marginBottom:12}}>Working Hours</div>
              <div className="dm" style={{color:"rgba(255,255,255,0.45)",fontSize:12,lineHeight:1.9}}>
                Mon–Sat: 9:00 AM – 7:00 PM<br />
                Sunday: 10:00 AM – 2:00 PM<br />
                <span style={{color:"#C9A84C"}}>WhatsApp: 24/7</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div className="dm" style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>© 2024 MJ Engineers and Architects. All rights reserved. | M. Jaya Lakshman – Licensed Surveyor, Kakinada</div>
          <div className="dm" style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>Planning • Designing • Building</div>
        </div>
      </footer>
    </div>
  );
}

// ─── QUICK QUOTE MODAL ────────────────────────────────────────────────────────
function QuoteModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name:"", phone:"", service:"", plotSize:"", timeline:"" });
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(p => ({...p,[k]:v}));

  const submit = () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-box fadein">
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:50,cursor:"pointer",fontSize:16}}>✕</button>
        <div className="lbl" style={{marginBottom:10}}>Free Consultation</div>
        <h2 className="serif" style={{fontSize:26,fontWeight:600,marginBottom:6}}>Get a <span className="gold">Free Quote</span></h2>
        <p className="dm" style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:28}}>We'll call you back within 2 hours.</p>
        <div style={{display:"grid",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div><label className="dm">Your Name *</label><input placeholder="e.g. Ravi Kumar" value={form.name} onChange={e=>set("name",e.target.value)} /></div>
            <div><label className="dm">Phone *</label><input placeholder="+91 9XXXXXXXXX" value={form.phone} onChange={e=>set("phone",e.target.value)} /></div>
          </div>
          <div><label className="dm">Service Required</label>
            <select value={form.service} onChange={e=>set("service",e.target.value)}>
              <option value="">Select a service...</option>
              {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div><label className="dm">Plot Size (sq.yards)</label><input placeholder="e.g. 200" value={form.plotSize} onChange={e=>set("plotSize",e.target.value)} /></div>
            <div><label className="dm">Timeline</label>
              <select value={form.timeline} onChange={e=>set("timeline",e.target.value)}>
                <option value="">When to start?</option>
                <option>Immediately</option>
                <option>Within 1 month</option>
                <option>Within 3 months</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>
          <button onClick={submit} className="btn-gold" style={{width:"100%",padding:16,fontSize:14,cursor:"pointer",border:"none",opacity:loading?.7:1}}>
            {loading ? "Sending..." : "🎯 Request Free Quote →"}
          </button>
        </div>
        <div className="dm" style={{textAlign:"center",marginTop:16,color:"rgba(255,255,255,0.35)",fontSize:12}}>
          Or call/WhatsApp directly: <a href={`tel:${COMPANY.phone}`} style={{color:"#C9A84C",textDecoration:"none",fontWeight:600}}>{COMPANY.phone}</a>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav, setQuoteModal }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p+1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{minHeight:"93vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",padding:"80px 6% 60px"}} className="grid-dots">
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 65% 40%,rgba(201,168,76,0.05) 0%,transparent 70%)"}} />
        <div style={{position:"absolute",top:"10%",right:"6%",width:"42%",background:"rgba(13,24,48,0.6)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:12,padding:"32px",backdropFilter:"blur(8px)"}} className="hide-mob">
          <div className="lbl" style={{marginBottom:14}}>Your All-in-One Building Partner</div>
          {["🗺️ Land Survey → Legal Docs","📐 Design → Vastu Plans","🏛️ Govt. Approvals → Fast Track","🏗️ Construction → Quality Assured","🛋️ Interiors → Ready to Move"].map(item => (
            <div key={item} className="dm" style={{padding:"10px 14px",margin:"6px 0",background:"rgba(255,255,255,0.03)",borderLeft:"3px solid #C9A84C",borderRadius:"0 6px 6px 0",fontSize:14,color:"rgba(255,255,255,0.75)"}}>{item}</div>
          ))}
          <div style={{marginTop:20,padding:"16px",background:"rgba(201,168,76,0.08)",borderRadius:8,border:"1px solid rgba(201,168,76,0.2)"}}>
            <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:4}}>LICENSED PROFESSIONAL</div>
            <div style={{fontWeight:600,fontSize:16}}>M. Jaya Lakshman</div>
            <div className="dm" style={{fontSize:13,color:"#C9A84C"}}>Licensed Surveyor · Kakinada</div>
          </div>
        </div>
        <div style={{maxWidth:620,position:"relative",zIndex:2}}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24}}>
            <span className="geo-badge">📍 Kakinada District</span>
            <span className="geo-badge">⭐ 15+ Years Experience</span>
          </div>
          <div className="lbl fadein" style={{marginBottom:20}}>✦ Complete Architecture Solutions</div>
          <h1 className="h1 fadein-1" style={{marginBottom:20}}>
            From <span className="gold">Land</span><br />to <span className="gold">Living</span> —<br />We Handle It All.
          </h1>
          <div className="divider fadein-2" />
          <p className="prose fadein-2" style={{maxWidth:500,marginBottom:40,fontSize:17}}>
            One call. One team. Everything handled — survey, design, permissions, construction, interiors. Serving Kakinada & surrounding districts since 2008.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:56}} className="fadein-3">
            <button onClick={() => setQuoteModal(true)} className="btn-gold" style={{fontSize:14}}>🎯 Free Consultation</button>
            <button onClick={() => nav("Services")} className="btn-outline">Our Services →</button>
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">💬 WhatsApp</a>
          </div>
          <div style={{display:"flex",gap:40,flexWrap:"wrap"}} className="fadein-4">
            {[["500+","Projects Done"],["15+","Yrs Experience"],["100%","Legal Compliance"],["48hr","Quote Delivery"]].map(([n,l]) => (
              <div key={l}>
                <div className="serif" style={{fontSize:32,fontWeight:600,color:"#C9A84C",lineHeight:1}}>{n}</div>
                <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.4)",letterSpacing:1.2,marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{background:"linear-gradient(135deg,#C9A84C,#E8C96A)",padding:"16px 6%",overflowX:"auto",display:"flex",gap:32,alignItems:"center"}}>
        {["🏛️ GHMC Approved Drawings","📐 Licensed Surveyor","🗺️ GPS Precision Survey","🏆 15+ Years Expertise","💯 500+ Happy Families","🔒 Zero Hidden Charges","⚡ Fast Govt. Approvals"].map(t => (
          <div key={t} className="dm" style={{color:"#080E1A",fontWeight:700,fontSize:13,whiteSpace:"nowrap"}}>{t}</div>
        ))}
      </div>

      {/* SERVICES GRID */}
      <section className="section-wrap">
        <div style={{textAlign:"center",marginBottom:64}}>
          <div className="lbl" style={{marginBottom:14}}>What We Do</div>
          <h2 className="h2">Complete Building Services<br /><span className="gold">Under One Roof</span></h2>
          <div className="divider" style={{margin:"20px auto"}} />
          <p className="prose" style={{maxWidth:500,margin:"0 auto"}}>Nine specialised services. One team. No need to deal with multiple contractors ever again.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
          {SERVICES.map(s => (
            <div key={s.title} className="card" style={{padding:"28px 24px",position:"relative",cursor:"pointer"}} onClick={() => {}}>
              {s.premium && <span className="premium-pill" style={{position:"absolute",top:14,right:14}}>★ Premium</span>}
              <div style={{width:54,height:54,background:`${s.color}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:18,border:"1px solid rgba(201,168,76,0.15)"}}>{s.icon}</div>
              <div className="serif" style={{fontWeight:600,fontSize:20,marginBottom:8}}>{s.title}</div>
              <div className="dm" style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7}}>{s.short}</div>
              <div style={{marginTop:16,display:"flex",flexWrap:"wrap",gap:6}}>
                {s.benefits.slice(0,2).map(b=><span key={b} className="dm" style={{fontSize:11,color:"rgba(201,168,76,0.7)",background:"rgba(201,168,76,0.06)",padding:"3px 8px",borderRadius:3}}>✓ {b}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:48}}>
          <button onClick={() => nav("Services")} className="btn-outline">View All Services & Details →</button>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{padding:"80px 6%",background:"rgba(0,0,0,0.25)"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div className="lbl" style={{marginBottom:14}}>How It Works</div>
          <h2 className="h2">Your <span className="gold">6-Step Journey</span><br />From Plot to Home</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:0,border:"1px solid rgba(201,168,76,0.08)",borderRadius:12,overflow:"hidden"}}>
          {PROCESS.map((p,i) => (
            <div key={p.step} className="step-card" style={{borderRight:i%3!==2?"1px solid rgba(201,168,76,0.08)":"none",borderBottom:"1px solid rgba(201,168,76,0.08)"}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{flexShrink:0}}>
                  <div style={{width:48,height:48,borderRadius:10,background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{p.icon}</div>
                </div>
                <div>
                  <div className="dm" style={{fontSize:10,color:"rgba(201,168,76,0.5)",fontWeight:700,letterSpacing:2,marginBottom:4}}>STEP {p.step}</div>
                  <div className="serif" style={{fontWeight:600,fontSize:18,marginBottom:8,color:"#C9A84C"}}>{p.title}</div>
                  <div className="dm" style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.7}}>{p.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:48}}>
          <button onClick={() => setQuoteModal(true)} className="btn-gold">Start Your Project Today →</button>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{padding:"72px 6%",background:"linear-gradient(135deg,rgba(201,168,76,0.07) 0%,rgba(201,168,76,0.02) 100%)",borderTop:"1px solid rgba(201,168,76,0.12)",borderBottom:"1px solid rgba(201,168,76,0.12)"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:40,alignItems:"center"}}>
          <div>
            <div className="lbl" style={{marginBottom:14}}>Proven Track Record</div>
            <h2 className="h2" style={{marginBottom:16}}>Trusted by <span className="gold">500+ Families</span><br />Across Kakinada</h2>
            <p className="prose">From small 2BHK homes to commercial complexes — every project delivered with the same precision and care.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[["📍","Kakinada & District","Local Expertise"],["⚖️","100% Legal","All Approvals Handled"],["💰","Transparent","Zero Hidden Costs"],["🏆","15+ Years","Field Experience"]].map(([e,t,s]) => (
              <div key={t} style={{padding:"20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:8,textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:8}}>{e}</div>
                <div className="dm" style={{fontWeight:700,fontSize:14,color:"#C9A84C"}}>{t}</div>
                <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-wrap">
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="lbl" style={{marginBottom:14}}>Client Stories</div>
          <h2 className="h2">Real Clients. <span className="gold">Real Results.</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
          {TESTIMONIALS.map((t,i) => (
            <div key={t.name} className="card" style={{padding:"28px",transition:"all .3s",background:i===activeTestimonial%TESTIMONIALS.length?"rgba(201,168,76,0.06)":"rgba(255,255,255,0.02)",borderColor:i===activeTestimonial%TESTIMONIALS.length?"rgba(201,168,76,0.4)":"rgba(201,168,76,0.1)"}}>
              <div style={{display:"flex",gap:2,marginBottom:14}}>{"★★★★★".split("").map((s,j)=><span key={j} className="star">{s}</span>)}</div>
              <p className="dm" style={{color:"rgba(255,255,255,0.68)",fontSize:14,lineHeight:1.8,marginBottom:20,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:50,background:"linear-gradient(135deg,#C9A84C,#E8C96A)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#080E1A",fontSize:16,flexShrink:0}}>{t.initial}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{t.name}</div>
                  <div className="dm" style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>📍 {t.loc}</div>
                </div>
                <span className="tag" style={{marginLeft:"auto"}}>{t.project}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section style={{padding:"80px 6%",background:"rgba(0,0,0,0.2)"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="lbl" style={{marginBottom:14}}>Pricing</div>
          <h2 className="h2">Honest Prices.<br /><span className="gold">No Surprises.</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20,maxWidth:1000,margin:"0 auto"}}>
          {PRICING.map(p => (
            <div key={p.plan} style={{padding:"32px 24px",background:p.popular?"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))":"rgba(255,255,255,0.03)",border:p.popular?"2px solid #C9A84C":"1px solid rgba(201,168,76,0.12)",borderRadius:10,position:"relative",textAlign:"center"}}>
              {p.popular && <span className="premium-pill" style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",padding:"5px 16px"}}>★ Most Popular</span>}
              <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,marginBottom:8}}>{p.plan}</div>
              <div className="serif" style={{fontSize:42,fontWeight:600,color:"#C9A84C",lineHeight:1}}>{p.price}</div>
              <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:20}}>{p.note}</div>
              <button onClick={() => {}} className={p.popular?"btn-gold":"btn-outline"} style={{width:"100%",padding:"12px",fontSize:12,cursor:"pointer",border:p.popular?"none":"1.5px solid #C9A84C"}}>Get Quote</button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:40}}>
          <button onClick={() => {}} className="btn-ghost" style={{cursor:"default"}}>✔ Transparent pricing &nbsp;|&nbsp; ✔ No hidden costs &nbsp;|&nbsp; ✔ GST as applicable</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-wrap">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:64}}>
          <div>
            <div className="lbl" style={{marginBottom:14}}>Got Questions?</div>
            <h2 className="h2" style={{marginBottom:20}}>Frequently<br /><span className="gold">Asked Questions</span></h2>
            <p className="prose" style={{marginBottom:32}}>Still have doubts? Call us anytime — we love talking to clients before they commit.</p>
            <a href={`tel:${COMPANY.phone}`} className="btn-gold" style={{display:"inline-block"}}>📞 Call & Ask Anything</a>
          </div>
          <div>
            {FAQS.map((f,i) => (
              <div key={i} className="faq-item">
                <div onClick={() => setOpenFaq(openFaq===i?null:i)} style={{padding:"18px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}}>
                  <span className="dm" style={{fontWeight:600,fontSize:15,color:openFaq===i?"#C9A84C":"rgba(255,255,255,0.85)"}}>{f.q}</span>
                  <span style={{color:"#C9A84C",fontSize:22,flexShrink:0,fontWeight:300,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform .25s"}}>+</span>
                </div>
                {openFaq===i && <div className="dm" style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.8,paddingBottom:18}}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"80px 6%",textAlign:"center",background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.01))",borderTop:"1px solid rgba(201,168,76,0.15)"}}>
        <div className="lbl" style={{marginBottom:16}}>Take the First Step</div>
        <h2 className="h2" style={{marginBottom:16}}>Ready to Build Your <span className="gold">Dream Home?</span></h2>
        <p className="prose" style={{maxWidth:480,margin:"0 auto 40px"}}>Free consultation. Transparent quote. No pressure. Just honest advice from a licensed professional.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={() => setQuoteModal(true)} className="btn-gold" style={{fontSize:15}}>🎯 Get Free Consultation</button>
          <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{borderColor:"#25D366",color:"#25D366"}}>💬 WhatsApp Now</a>
          <a href={`tel:${COMPANY.phone}`} className="btn-ghost">📞 {COMPANY.phone}</a>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ nav }) {
  return (
    <div>
      <section className="section-wrap grid-dots" style={{position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.04),transparent 60%)"}} />
        <div style={{maxWidth:640,position:"relative",zIndex:1}}>
          <div className="lbl" style={{marginBottom:14}}>About Us</div>
          <h1 className="h1" style={{marginBottom:16}}>Building <span className="gold">Trust,</span><br />Brick by Brick.</h1>
          <div className="divider" />
          <p className="prose" style={{fontSize:18}}>Founded by M. Jaya Lakshman, a licensed surveyor with 15+ years in Kakinada — MJ Engineers was built on a single belief: every family deserves a stress-free journey from land to home.</p>
        </div>
      </section>

      {/* STORY */}
      <section style={{padding:"0 6% 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:60}}>
          <div>
            <h2 className="h2" style={{marginBottom:20}}>The <span className="gold">Story</span></h2>
            <p className="prose" style={{marginBottom:20}}>We noticed families being forced to deal with a surveyor here, an architect there, a contractor elsewhere — and still struggling with government approvals on their own. This fragmentation wasted time, money, and caused immense stress.</p>
            <p className="prose" style={{marginBottom:20}}>MJ Engineers was founded to solve this permanently. We became the <strong style={{color:"#C9A84C"}}>one single point of contact</strong> that handles everything — from the first GPS survey of your land to the final coat of paint on your walls.</p>
            <p className="prose">Today, we've completed 500+ projects across Kakinada district, and every one of them was handled with the same dedication that earned us our first client's trust.</p>
          </div>
          <div>
            <div style={{background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",border:"1px solid rgba(201,168,76,0.2)",borderRadius:12,padding:36,marginBottom:20}}>
              <div style={{width:64,height:64,borderRadius:12,background:"linear-gradient(135deg,#C9A84C,#E8C96A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:20}}>👷</div>
              <div className="serif" style={{fontWeight:600,fontSize:24,marginBottom:4}}>M. Jaya Lakshman</div>
              <span className="tag" style={{marginBottom:16,display:"inline-block"}}>Licensed Surveyor</span>
              <div className="dm" style={{color:"rgba(255,255,255,0.55)",fontSize:14,lineHeight:1.9}}>
                ✓ Govt. of AP Licensed Surveyor<br />
                ✓ GHMC, DTCP & Panchayat expert<br />
                ✓ Kakinada land records specialist<br />
                ✓ 15+ years field experience<br />
                ✓ 500+ completed projects
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[["500+","Projects"],["15+","Years"],["9","Services"],["100%","Legal"]].map(([n,l]) => (
                <div key={l} style={{padding:"20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.1)",borderRadius:8,textAlign:"center"}}>
                  <div className="serif" style={{fontSize:32,fontWeight:600,color:"#C9A84C"}}>{n}</div>
                  <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section style={{padding:"72px 6%",background:"rgba(0,0,0,0.2)"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div className="lbl" style={{marginBottom:14}}>Our Philosophy</div>
          <h2 className="h2">Complete Architecture <span className="gold">Thinking</span></h2>
          <p className="prose" style={{maxWidth:580,margin:"20px auto 0"}}>Inspired by Frank Lloyd Wright — we believe a building is a complete system from the land it stands on to the air inside. We design and build that entire system.</p>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:800,margin:"0 auto"}}>
          {["Land Purchase","→","GPS Survey","→","Site Analysis","→","Design & Plans","→","Govt. Approvals","→","Construction","→","Quality Checks","→","Interiors","→","Handover"].map((item,i) => (
            <span key={i} className="dm" style={{padding:item==="→"?"6px 0":"8px 18px",background:item==="→"?"transparent":"rgba(201,168,76,0.08)",border:item==="→"?"none":"1px solid rgba(201,168,76,0.2)",borderRadius:50,fontSize:item==="→"?18:13,color:item==="→"?"rgba(201,168,76,0.5)":"#C9A84C",fontWeight:item==="→"?300:600}}>{item}</span>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section-wrap">
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="lbl" style={{marginBottom:14}}>Why Clients Choose Us</div>
          <h2 className="h2">Our <span className="gold">Core Values</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:20}}>
          {[
            {icon:"⚖️",t:"100% Legal",d:"Every project is fully compliant with local regulations. We never take shortcuts that could risk your investment."},
            {icon:"💰",t:"Transparent Pricing",d:"Full cost breakdown before signing. No hidden fees, no surprise bills. What you see is what you pay."},
            {icon:"🎯",t:"GPS Precision",d:"Licensed survey instruments and field-experienced hands ensure accuracy at every boundary and measurement."},
            {icon:"🤝",t:"Local Expertise",d:"We know Kakinada's land records, revenue offices, and construction landscape better than anyone."},
            {icon:"⚡",t:"Fast Turnaround",d:"Quick permit processing, fast design delivery, 48-hour quotes. We respect your time as much as our own."},
            {icon:"🛡️",t:"Quality Assured",d:"Stage-wise inspections and material quality checks ensure your building stands for generations."},
          ].map(v => (
            <div key={v.t} className="card" style={{padding:"28px 24px"}}>
              <div style={{fontSize:32,marginBottom:16}}>{v.icon}</div>
              <div className="serif" style={{fontWeight:600,fontSize:19,marginBottom:10,color:"#C9A84C"}}>{v.t}</div>
              <div className="dm" style={{color:"rgba(255,255,255,0.5)",fontSize:13,lineHeight:1.75}}>{v.d}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:56}}>
          <button onClick={() => nav("Contact")} className="btn-gold" style={{fontSize:14}}>Start Your Project →</button>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ nav, setQuoteModal }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <section className="section-wrap grid-dots" style={{position:"relative",paddingBottom:40}}>
        <div className="lbl" style={{marginBottom:14}}>What We Offer</div>
        <h1 className="h1" style={{marginBottom:16}}>Complete Services.<br /><span className="gold">One Team.</span></h1>
        <div className="divider" />
        <p className="prose" style={{maxWidth:540}}>Nine specialised services handled by one licensed professional team. No middlemen. No confusion. Full accountability.</p>
      </section>
      <section style={{padding:"0 6% 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
          {SERVICES.map((s,i) => (
            <div key={s.title} onClick={() => setOpen(open===i?null:i)} className="card" style={{padding:"32px 28px",cursor:"pointer",background:open===i?"rgba(201,168,76,0.05)":"rgba(255,255,255,0.02)",borderColor:open===i?"rgba(201,168,76,0.5)":"rgba(201,168,76,0.1)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                <div style={{width:56,height:56,background:`${s.color}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:"1px solid rgba(201,168,76,0.15)"}}>{s.icon}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {s.premium && <span className="premium-pill">★ Premium</span>}
                  <span style={{color:"#C9A84C",fontSize:24,transform:open===i?"rotate(45deg)":"none",transition:"transform .25s",display:"inline-block"}}>+</span>
                </div>
              </div>
              <div className="serif" style={{fontWeight:600,fontSize:22,marginBottom:8}}>{s.title}</div>
              <div className="dm" style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.7}}>{s.short}</div>
              {open===i && (
                <div style={{marginTop:24,paddingTop:24,borderTop:"1px solid rgba(201,168,76,0.15)"}}>
                  <div className="lbl" style={{marginBottom:12}}>Key Benefits</div>
                  {s.benefits.map(b => (
                    <div key={b} className="dm" style={{fontSize:14,color:"rgba(255,255,255,0.7)",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",display:"flex",gap:10}}>
                      <span style={{color:"#C9A84C",flexShrink:0}}>✓</span>{b}
                    </div>
                  ))}
                  <div style={{marginTop:16,padding:"14px 18px",background:"rgba(201,168,76,0.06)",borderRadius:8,borderLeft:"3px solid #C9A84C"}}>
                    <div className="lbl" style={{marginBottom:6,fontSize:10}}>Why Choose Us</div>
                    <div className="dm" style={{fontSize:13,color:"rgba(255,255,255,0.65)",lineHeight:1.7}}>{s.why}</div>
                  </div>
                  <div style={{marginTop:20,display:"flex",gap:10}}>
                    <button onClick={e=>{e.stopPropagation();setQuoteModal(true)}} className="btn-gold" style={{padding:"11px 24px",fontSize:12,cursor:"pointer",border:"none"}}>Get Quote →</button>
                    <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="btn-outline" style={{padding:"10px 22px",fontSize:12}}>WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{marginTop:64,background:"linear-gradient(135deg,rgba(201,168,76,0.07),transparent)",border:"1px solid rgba(201,168,76,0.18)",borderRadius:12,padding:"48px 40px",textAlign:"center"}}>
          <h2 className="serif" style={{fontWeight:600,fontSize:28,marginBottom:12}}>Not Sure What You Need?</h2>
          <p className="prose" style={{marginBottom:32,maxWidth:420,margin:"0 auto 32px"}}>Call us for a free 15-minute consultation. We'll guide you to exactly the right services for your project.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={() => setQuoteModal(true)} className="btn-gold">📞 Free Consultation</button>
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{borderColor:"#25D366",color:"#25D366"}}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const filters = ["All","2D Plans","3D Renders","Completed","Interior"];
  const shown = filter==="All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p=>p.cat===filter);

  return (
    <div>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-box" style={{maxWidth:640}} onClick={e=>e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:50,cursor:"pointer",fontSize:16}}>✕</button>
            <div style={{height:220,background:selected.bg,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80,marginBottom:24}}>{selected.emoji}</div>
            <span className="tag" style={{marginBottom:12,display:"inline-block"}}>{selected.cat}</span>
            <h2 className="serif" style={{fontWeight:600,fontSize:26,marginBottom:6}}>{selected.title}</h2>
            <div className="dm" style={{color:"rgba(255,255,255,0.4)",marginBottom:20,fontSize:14}}>📍 {selected.loc} · {selected.tag}</div>
            <p className="prose" style={{fontSize:14}}>This project showcases our team's expertise in delivering premium quality {selected.cat.toLowerCase()} work for residential and commercial clients across Kakinada district. Every detail was crafted with precision and care.</p>
            <div style={{marginTop:24,display:"flex",gap:12}}>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:13}}>💬 Enquire Similar Project</a>
              <a href={`tel:${COMPANY.phone}`} className="btn-outline" style={{fontSize:13}}>📞 Call Now</a>
            </div>
          </div>
        </div>
      )}
      <section className="section-wrap grid-dots" style={{paddingBottom:40,position:"relative"}}>
        <div className="lbl" style={{marginBottom:14}}>Our Portfolio</div>
        <h1 className="h1" style={{marginBottom:16}}>Work We're<br /><span className="gold">Proud Of.</span></h1>
        <div className="divider" />
        <p className="prose" style={{maxWidth:500}}>From 2D blueprints to completed homes — a glimpse of our work across Kakinada district.</p>
      </section>
      <section style={{padding:"0 6% 80px"}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:40}}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="dm" style={{padding:"10px 24px",borderRadius:50,border:"1.5px solid",borderColor:filter===f?"#C9A84C":"rgba(255,255,255,0.12)",background:filter===f?"rgba(201,168,76,0.1)":"transparent",color:filter===f?"#C9A84C":"rgba(255,255,255,0.55)",fontWeight:600,fontSize:13,cursor:"pointer",transition:"all .2s",letterSpacing:.5}}>{f}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {shown.map((p,i) => (
            <div key={i} className="portfolio-card" onClick={() => setSelected(p)}>
              <div className="pcard-inner" style={{background:`linear-gradient(135deg,${p.bg},${p.bg}dd)`,position:"absolute",inset:0}}>{p.emoji}</div>
              <div className="overlay" style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,14,26,.95),rgba(8,14,26,.3) 50%,transparent)",opacity:0,transition:"opacity .35s",display:"flex",alignItems:"flex-end",padding:20}}>
                <div>
                  <span className="tag" style={{marginBottom:8,display:"inline-block"}}>{p.cat}</span>
                  <div className="serif" style={{fontWeight:600,fontSize:18,marginBottom:4}}>{p.title}</div>
                  <div className="dm" style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>📍 {p.loc} · {p.tag}</div>
                </div>
              </div>
              <style>{`.portfolio-card:hover .overlay{opacity:1!important}`}</style>
              {/* Always-visible caption */}
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(8,14,26,0.95),transparent)",padding:"20px 16px 16px"}}>
                <span className="tag" style={{marginBottom:6,display:"inline-block"}}>{p.cat}</span>
                <div className="dm" style={{fontWeight:600,fontSize:14}}>{p.title}</div>
                <div className="dm" style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>📍 {p.loc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:56}}>
          <p className="prose" style={{marginBottom:20,fontSize:14}}>Want to see more completed projects? Contact us for a detailed portfolio presentation.</p>
          <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-gold">💬 Request Full Portfolio</a>
        </div>
      </section>
    </div>
  );
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
function PricingPage({ nav, setQuoteModal, showToast }) {
  return (
    <div>
      <section className="section-wrap grid-dots" style={{paddingBottom:40,position:"relative"}}>
        <div className="lbl" style={{marginBottom:14}}>Transparent Pricing</div>
        <h1 className="h1" style={{marginBottom:16}}>Simple, Honest Pricing.<br /><span className="gold">No Surprises.</span></h1>
        <div className="divider" />
        <p className="prose" style={{maxWidth:540}}>The price you see is what you pay for design services. Government fees are paid directly to authorities and always informed upfront.</p>
      </section>
      <section style={{padding:"0 6% 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24,maxWidth:1100,margin:"0 auto 64px"}}>
          {PRICING.map(p => (
            <div key={p.plan} style={{padding:"44px 32px",background:p.popular?"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))":"rgba(255,255,255,0.02)",border:p.popular?"2px solid #C9A84C":"1px solid rgba(201,168,76,0.12)",borderRadius:10,position:"relative",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(0,0,0,0.4)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              {p.popular && <span className="premium-pill" style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",padding:"6px 18px",fontSize:10}}>★ Most Popular</span>}
              <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1.5,marginBottom:8}}>{p.plan}</div>
              <div className="serif" style={{fontSize:52,fontWeight:600,color:"#C9A84C",lineHeight:1,marginBottom:4}}>{p.price}</div>
              <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginBottom:28}}>{p.note}</div>
              <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,marginBottom:28}}>
                {p.features.map(f => (
                  <div key={f} className="check-item">
                    <span style={{color:"#C9A84C",flexShrink:0,marginTop:1}}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button onClick={() => setQuoteModal(true)} className={p.popular?"btn-gold":"btn-outline"} style={{width:"100%",padding:15,fontSize:13,cursor:"pointer",border:p.popular?"none":"1.5px solid #C9A84C"}}>{p.cta}</button>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(201,168,76,0.1)",borderRadius:10,padding:"36px 40px",marginBottom:56}}>
          <div className="lbl" style={{marginBottom:20}}>Pricing Transparency Promise</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
            {["✔ No hidden charges","✔ Govt. fees informed upfront","✔ GST as applicable","✔ Milestone-based payment","✔ Revision policy included","✔ Written quote provided"].map(t=>(
              <div key={t} className="dm" style={{fontSize:14,color:"rgba(255,255,255,0.65)",fontWeight:500}}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",padding:"48px",background:"linear-gradient(135deg,rgba(201,168,76,0.07),transparent)",borderRadius:12,border:"1px solid rgba(201,168,76,0.15)"}}>
          <h2 className="serif" style={{fontWeight:600,fontSize:30,marginBottom:12}}>Need a Custom Quote?</h2>
          <p className="prose" style={{marginBottom:32,maxWidth:400,margin:"0 auto 32px"}}>Commercial projects, large plots, or unique requirements? We'll prepare a detailed custom quote.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={() => setQuoteModal(true)} className="btn-gold">📋 Get Custom Quote</button>
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{borderColor:"#25D366",color:"#25D366"}}>💬 WhatsApp Quote</a>
            <a href={`tel:${COMPANY.phone}`} className="btn-ghost">📞 Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ showToast }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", message:"", plotSize:"", timeline:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const submit = () => {
    if(!form.name.trim()||!form.phone.trim()){showToast("Please fill name and phone number","error");return;}
    if(form.phone.length<10){showToast("Please enter a valid phone number","error");return;}
    setLoading(true);
    setTimeout(()=>{setLoading(false);setDone(true);showToast("Message sent! We'll call you within 2 hours.");},1400);
  };

  return (
    <div>
      <section className="section-wrap grid-dots" style={{paddingBottom:40,position:"relative"}}>
        <div className="lbl" style={{marginBottom:14}}>Get In Touch</div>
        <h1 className="h1" style={{marginBottom:16}}>Let's Build Something<br /><span className="gold">Great Together.</span></h1>
        <div className="divider" />
        <p className="prose" style={{maxWidth:480}}>Free consultation. Honest advice. No pressure. Just reach out and we'll handle the rest.</p>
      </section>

      <section style={{padding:"0 6% 40px"}}>
        {/* CONTACT METHODS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:64}}>
          {[
            {icon:"📞",label:"Call Us Anytime",val:COMPANY.phone,sub:"Mon–Sat: 9AM–7PM",href:`tel:${COMPANY.phone}`,action:"Call Now",color:"#C9A84C"},
            {icon:"💬",label:"WhatsApp",val:"Quick Response",sub:"Usually within 30 mins",href:COMPANY.whatsapp,action:"Chat Now",color:"#25D366"},
            {icon:"✉️",label:"Email Us",val:COMPANY.email,sub:"Response within 24 hrs",href:`mailto:${COMPANY.email}`,action:"Send Email",color:"#C9A84C"},
            {icon:"📍",label:"Visit Office",val:"Sarapavaram, Kakinada",sub:"Near Water Tank",href:COMPANY.mapLink,action:"Get Directions",color:"#C9A84C"}
          ].map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{padding:"24px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:10,textDecoration:"none",color:"#fff",transition:"all .25s",display:"block"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-4px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.12)";e.currentTarget.style.transform="none"}}>
              <div style={{fontSize:32,marginBottom:12}}>{c.icon}</div>
              <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>{c.label}</div>
              <div className="dm" style={{fontWeight:600,fontSize:14,color:c.color,marginBottom:2}}>{c.val}</div>
              <div className="dm" style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginBottom:14}}>{c.sub}</div>
              <div className="dm" style={{fontSize:12,color:c.color,fontWeight:600}}>→ {c.action}</div>
            </a>
          ))}
        </div>

        {/* FORM + MAP */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:48}}>
          {/* FORM */}
          <div>
            <div className="lbl" style={{marginBottom:16}}>Request Free Consultation</div>
            {done ? (
              <div style={{background:"rgba(201,168,76,0.06)",border:"2px solid #C9A84C",borderRadius:12,padding:"48px 32px",textAlign:"center"}}>
                <div style={{fontSize:56,marginBottom:20}}>🎉</div>
                <h3 className="serif" style={{fontSize:28,fontWeight:600,marginBottom:12,color:"#C9A84C"}}>Message Received!</h3>
                <p className="prose" style={{marginBottom:20}}>Thank you, <strong>{form.name}</strong>. M. Jaya Lakshman will personally call you on <strong style={{color:"#C9A84C"}}>{form.phone}</strong> within 2 hours.</p>
                <div className="dm" style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>Can't wait? WhatsApp or call us directly below.</div>
                <div style={{marginTop:28,display:"flex",gap:12,justifyContent:"center"}}>
                  <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:13}}>💬 WhatsApp</a>
                  <a href={`tel:${COMPANY.phone}`} className="btn-outline" style={{fontSize:13}}>📞 Call</a>
                </div>
              </div>
            ) : (
              <div style={{display:"grid",gap:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div><label className="dm">Full Name *</label><input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Ravi Kumar" /></div>
                  <div><label className="dm">Phone Number *</label><input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 9XXXXXXXXX" /></div>
                </div>
                <div><label className="dm">Email Address</label><input value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com" /></div>
                <div><label className="dm">Service Required</label>
                  <select value={form.service} onChange={e=>set("service",e.target.value)}>
                    <option value="">Choose a service...</option>
                    {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div><label className="dm">Plot Size</label><input value={form.plotSize} onChange={e=>set("plotSize",e.target.value)} placeholder="e.g. 200 sq.yards" /></div>
                  <div><label className="dm">When to Start?</label>
                    <select value={form.timeline} onChange={e=>set("timeline",e.target.value)}>
                      <option value="">Select timeline</option>
                      <option>Immediately</option>
                      <option>Within 1 month</option>
                      <option>Within 3 months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                </div>
                <div><label className="dm">Message (Optional)</label><textarea rows={3} value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Tell us about your project..." /></div>
                <button onClick={submit} className="btn-gold" style={{padding:16,fontSize:14,cursor:"pointer",border:"none",opacity:loading?.7:1}}>
                  {loading?"⏳ Sending...":"🎯 Send Consultation Request →"}
                </button>
                <div className="dm" style={{textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.3)"}}>We respond within 2 hours during business hours. Your data is safe with us.</div>
              </div>
            )}
          </div>

          {/* MAP + ADDRESS */}
          <div>
            <div className="lbl" style={{marginBottom:16}}>Our Location</div>
            <div style={{borderRadius:10,overflow:"hidden",marginBottom:20,border:"1px solid rgba(201,168,76,0.15)"}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30523.845212!2d82.23261!3d16.98321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382759e20a7e09%3A0x76b7f8b7f07c89f0!2sKakinada%2C%20Andhra%20Pradesh%20533005!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                width="100%" height="260" style={{border:0,display:"block"}}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="MJ Engineers Location – Kakinada"
              />
            </div>
            <div style={{display:"grid",gap:12}}>
              {[
                {icon:"📍",t:"Office Address",v:COMPANY.address},
                {icon:"📞",t:"Phone & WhatsApp",v:COMPANY.phone},
                {icon:"✉️",t:"Email",v:COMPANY.email}
              ].map(item=>(
                <div key={item.t} style={{display:"flex",gap:14,padding:"16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.1)",borderRadius:8}}>
                  <span style={{fontSize:22,flexShrink:0}}>{item.icon}</span>
                  <div>
                    <div className="dm" style={{fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{item.t}</div>
                    <div className="dm" style={{fontSize:14,color:"rgba(255,255,255,0.75)",whiteSpace:"pre-line",lineHeight:1.7}}>{item.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={COMPANY.mapLink} target="_blank" rel="noreferrer" className="btn-outline" style={{marginTop:16,display:"block",textAlign:"center",fontSize:13}}>🗺️ Open in Google Maps</a>

            {/* Business Hours */}
            <div style={{marginTop:24,padding:"20px",background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:8}}>
              <div className="lbl" style={{marginBottom:14}}>Business Hours</div>
              {[["Monday – Saturday","9:00 AM – 7:00 PM",true],["Sunday","10:00 AM – 2:00 PM",false],["WhatsApp","Available 24/7",true],["Emergency Call","Anytime",false]].map(([d,t,a])=>(
                <div key={d} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <span className="dm" style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>{d}</span>
                  <span className="dm" style={{fontSize:13,color:a?"#C9A84C":"rgba(255,255,255,0.7)",fontWeight:a?600:400}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{padding:"64px 6%",background:"rgba(0,0,0,0.2)"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div className="lbl" style={{marginBottom:14}}>Service Areas</div>
          <h2 className="h2">We Serve All of <span className="gold">Kakinada District</span></h2>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
          {["Kakinada","Samalkot","Peddapuram","Tuni","Prathipadu","Gollaprolu","Jagannadhapuram","Pithapuram","Kotapeta","Ravulapalem","Rajahmundry (nearby)","Amalapuram (nearby)"].map(area => (
            <span key={area} className="trust-chip" style={{color:area.includes("nearby")?"rgba(201,168,76,0.6)":"rgba(255,255,255,0.75)"}}><span className="gold">📍</span>{area}</span>
          ))}
        </div>
      </section>

      <section style={{padding:"64px 6%",textAlign:"center"}}>
        <h2 className="serif" style={{fontWeight:600,fontSize:28,marginBottom:12}}>Still Have Questions?</h2>
        <p className="prose" style={{marginBottom:28,maxWidth:380,margin:"0 auto 28px"}}>Call us right now for an immediate, no-pressure conversation.</p>
        <a href={`tel:${COMPANY.phone}`} className="btn-gold" style={{fontSize:16}}>📞 Call {COMPANY.phone}</a>
      </section>
    </div>
  );
}

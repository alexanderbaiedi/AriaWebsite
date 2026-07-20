import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  Scale, 
  HeartPulse, 
  Car, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const AnimatedCounter = ({ from, to, duration = 2, label, suffix = "" }: { from: number, to: number, duration?: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(from);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <div 
      className="flex flex-col items-center justify-center border-l border-white/10 first:border-0 py-8 px-4"
      ref={(el) => {
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setIsInView(true);
        }, { threshold: 0.5 });
        observer.observe(el);
      }}
    >
      <div className="text-5xl md:text-7xl font-serif font-semibold text-white mb-2 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-white/60 uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* 1. NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-border py-4 shadow-sm" : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => window.scrollTo(0,0)}
            data-testid="nav-logo"
          >
            <img
              src="/aria_logo_new.png"
              alt="Aria Language Services"
              className="h-16 w-auto max-w-[45vw] -my-3 object-contain transition-transform group-hover:scale-105 md:h-[72px] md:max-w-none md:-my-4"
            />
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            {["Services", "Why Aria", "Languages", "Case Studies", "About"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))} 
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${isScrolled ? "text-foreground/80" : "text-white/90"}`}
                data-testid={`nav-${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </button>
            ))}
            <a 
              href="/leadership"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${isScrolled ? "text-foreground/80" : "text-white/90"}`}
              data-testid="nav-leadership"
            >
              Leadership
            </a>
          </nav>

          <div className="hidden lg:block">
            <Button 
              onClick={() => scrollTo("contact")}
              className={`rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold transition-all ${
                isScrolled 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-white text-primary hover:bg-white/90"
              }`}
              data-testid="nav-cta"
            >
              Contact Us
            </Button>
          </div>

          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X className={isScrolled ? "text-foreground" : "text-white"} /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-2xl font-serif mt-10">
              {["Services", "Why Aria", "Languages", "Case Studies", "About", "Contact"].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))} 
                  className="text-left border-b border-border pb-4 hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <a href="/leadership" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Leadership</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-secondary">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Abstract Persian geometric pattern" className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/50 to-secondary"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-20">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">The Premier Global Full Service Language Agency</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-serif mb-8">
              <span className="block text-6xl md:text-8xl lg:text-[7rem] italic text-accent leading-[1.1] mb-2">We Speak Your Language.</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-white/70 font-light tracking-wide">Authority in Every Syllable.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed mb-12 border-l-2 border-primary pl-6">
              Delivering precision interpretation in 100+ languages. Where cultural competency meets uncompromising institutional standards.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" onClick={() => scrollTo("contact")} className="rounded-none px-10 h-16 text-sm uppercase tracking-widest font-semibold bg-primary hover:bg-primary/90 text-white" data-testid="hero-cta-consultation">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("services")} className="rounded-none px-10 h-16 text-sm uppercase tracking-widest font-semibold border-white/20 text-white hover:bg-white hover:text-secondary bg-transparent backdrop-blur-sm" data-testid="hero-cta-services">
                Explore Expertise
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. TRUSTED BY */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm uppercase tracking-widest font-semibold text-muted-foreground mb-8">Trusted by Leading Institutions</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {["Regional Medical Center", "Superior Court of California", "Dept of Health & Human Services", "Veterans Affairs", "State Bar Association"].map((logo, i) => (
              <div key={i} className="font-serif font-bold text-xl md:text-2xl text-foreground flex items-center">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IMPACT NUMBERS */}
      <section className="bg-secondary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/cultural-abstract.png')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter from={0} to={15000} suffix="+" label="Appointments Annually" />
            <AnimatedCounter from={0} to={100} suffix="+" label="Languages Supported" />
            <AnimatedCounter from={0} to={98} suffix=".7%" label="Client Satisfaction" />
            <AnimatedCounter from={0} to={5000} suffix="+" label="Certified Interpreters" />
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section id="services" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-primary"></div>
                <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">Practice Areas</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">Critical Communication, <br />Expertly Handled.</h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              From the courtroom to the clinic, we provide certified interpreters who understand the gravity of every institutional interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Medical */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group relative h-[500px] overflow-hidden bg-secondary"
            >
              <img src="/service-medical.png" alt="Medical Interpretation" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-90"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <HeartPulse className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-3xl font-serif text-white mb-4">Medical Interpretation</h3>
                <p className="text-white/80 mb-8 leading-relaxed max-w-md">Certified interpreters for hospitals, clinics, and patient consultations. We ensure absolute medical accuracy paired with necessary cultural sensitivity.</p>
                <div className="flex flex-col gap-2">
                  {["Patient consultations", "Emergency room support", "Mental health sessions"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-accent" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Judicial */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group relative h-[500px] overflow-hidden bg-secondary"
            >
              <img src="/service-judicial.png" alt="Judicial Interpretation" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-90"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <Scale className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-3xl font-serif text-white mb-4">Judicial & Legal</h3>
                <p className="text-white/80 mb-8 leading-relaxed max-w-md">Court-certified interpreters for proceedings, depositions, and hearings. We deliver precise legal translation that withstands the highest scrutiny.</p>
                <div className="flex flex-col gap-2">
                  {["Court proceedings & trials", "Depositions & mediation", "Immigration hearings"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-accent" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 border border-border flex flex-col items-start hover:border-primary transition-colors">
              <Building2 className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-xl font-serif font-bold mb-4">Nurse Case Management</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Bilingual case management support connecting healthcare providers with non-English speaking patients efficiently.</p>
            </div>
            <div className="bg-white p-10 border border-border flex flex-col items-start hover:border-primary transition-colors">
              <Car className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-xl font-serif font-bold mb-4">Transportation Services</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Coordinated, culturally-sensitive transportation logistics for clients attending critical appointments.</p>
            </div>
            <div className="bg-white p-10 border border-border flex flex-col items-start hover:border-primary transition-colors">
              <Globe2 className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-xl font-serif font-bold mb-4">Corporate & Government</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Simultaneous interpreting for conferences, international meetings, and sensitive government agency outreach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE ARIA */}
      <section id="why-aria" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">The Aria Standard</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">Uncompromising Quality as a Standard.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Most agencies assign interpreters based on lowest cost. We never do this. When stakes are highest, precision is the only metric that matters.
                </p>
                <Button onClick={() => scrollTo("contact")} className="rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold bg-secondary hover:bg-secondary/90">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="border-l border-primary pl-8">
                <h4 className="text-2xl font-serif font-bold mb-4 text-foreground">Dialect-Level Precision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We match interpreters to specific regional dialects. An Iraqi Arabic speaker is not interchangeable with a Moroccan or Levantine speaker. Most agencies don't know the difference. We staff for it.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="border-l border-primary pl-8">
                <h4 className="text-2xl font-serif font-bold mb-4 text-foreground">Cultural Competency as a Standard</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Aria is the ONLY agency that actively incorporates cultural understanding into every placement. A medically accurate translation that violates cultural norms fails the patient. We prevent that.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="border-l border-primary pl-8">
                <h4 className="text-2xl font-serif font-bold mb-4 text-foreground">Largest Certified Network</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain the largest dedicated, certified interpreter and translator network specializing specifically in Middle Eastern languages.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="border-l border-primary pl-8">
                <h4 className="text-2xl font-serif font-bold mb-4 text-foreground">Outcomes-Focused</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our precision directly improves patient outcomes, legal accuracy, and client satisfaction. We view language services as risk mitigation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CULTURAL COMPETENCY CALLOUT */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cultural-abstract.png')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-10"
          >
            "Language services are only as good as the <span className="italic text-accent">cultural fluency</span> behind them."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-light">
              We go out of our way to create cultural matches between interpreters and clients — building long-term relationships that go far beyond just interpreting. When a patient sees the same culturally aligned interpreter visit after visit, trust deepens, communication improves, and outcomes change.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              This is what separates Aria from every other agency: we don't just fill a slot. We build connections that last — because the best interpretation happens when both parties feel truly understood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. LANGUAGES SECTION */}
      <section id="languages" className="py-32 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">Linguistic Breadth</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">100+ Languages. Depth Where It Counts.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We serve global languages with excellence, but our definitive edge lies in the complex dialects of the Middle East and Africa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-secondary text-white p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-2xl font-serif mb-8 text-accent">Middle Eastern Core</h3>
              <div className="space-y-6 font-light">
                <div><strong className="font-semibold text-white text-lg">Persian (Farsi)</strong><br/><span className="text-white/70">Dari, Tajik</span></div>
                <div><strong className="font-semibold text-white text-lg">Arabic</strong><br/><span className="text-white/70">Egyptian, Levantine, Gulf/Khaleeji, Moroccan, Iraqi, Sudanese, Yemeni</span></div>
                <div><strong className="font-semibold text-white text-lg">Kurdish</strong><br/><span className="text-white/70">Kurmanji, Sorani</span></div>
                <div className="pt-4 border-t border-white/10"><strong className="font-semibold text-white text-lg">Pashto • Urdu • Turkish • Hebrew</strong></div>
              </div>
            </div>

            <div className="bg-white border border-border p-10 hover:border-primary transition-colors">
              <h3 className="text-2xl font-serif mb-8 text-foreground">African & Rare</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Amharic</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Somali</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Tigrinya</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Swahili</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Oromo</li>
              </ul>
            </div>

            <div className="bg-white border border-border p-10 hover:border-primary transition-colors">
              <h3 className="text-2xl font-serif mb-8 text-foreground">Global Reach</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Spanish & Portuguese</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> French</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Mandarin & Cantonese</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Vietnamese</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Russian</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CASE STUDIES */}
      <section id="case-studies" className="py-32 bg-secondary text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-accent"></div>
                <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Impact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">Proven Outcomes.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="mb-8"><HeartPulse className="text-accent w-8 h-8" /></div>
              <h3 className="text-xl font-serif font-bold mb-6">Healthcare: Dialect Specificity</h3>
              <div className="space-y-4 text-sm text-white/70 flex-grow">
                <p><strong className="text-white">Challenge:</strong> A regional medical center struggled with non-compliance among Iraqi patients despite using general Arabic interpreters.</p>
                <p><strong className="text-white">Approach:</strong> Aria staffed certified Iraqi dialect interpreters who navigated specific cultural nuances regarding medication.</p>
                <p><strong className="text-white">Result:</strong> Patient compliance increased by 42% over six months.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="mb-8"><Scale className="text-accent w-8 h-8" /></div>
              <h3 className="text-xl font-serif font-bold mb-6">Legal: Cultural Context</h3>
              <div className="space-y-4 text-sm text-white/70 flex-grow">
                <p><strong className="text-white">Challenge:</strong> A complex deposition involving a Sorani Kurdish speaker was failing due to idioms not translating directly.</p>
                <p><strong className="text-white">Approach:</strong> Aria provided a court-certified Sorani expert with deep understanding of regional idiomatic expressions.</p>
                <p><strong className="text-white">Result:</strong> A highly accurate transcript that withstood intensive cross-examination.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="mb-8"><Building2 className="text-accent w-8 h-8" /></div>
              <h3 className="text-xl font-serif font-bold mb-6">Government: Outreach</h3>
              <div className="space-y-4 text-sm text-white/70 flex-grow">
                <p><strong className="text-white">Challenge:</strong> A federal agency needed to disseminate critical policy changes to Afghan communities rapidly.</p>
                <p><strong className="text-white">Approach:</strong> Aria deployed a coordinated team of Dari and Pashto interpreters for town halls.</p>
                <p><strong className="text-white">Result:</strong> Successfully reached 5,000+ community members with verified comprehension metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ACCREDITATIONS */}
      <section className="py-16 bg-primary text-white border-y border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { icon: ShieldCheck, text: "NBCMI Certified" },
              { icon: Award, text: "ATA Member" },
              { icon: FileText, text: "HIPAA Compliant" },
              { icon: Scale, text: "Court Certified" },
              { icon: MapPin, text: "State Licensed" }
            ].map((Badge, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Badge.icon className="w-8 h-8 text-accent" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{Badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ABOUT / OUR STORY */}
      <section id="about" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <img src="/aria_logo_new.png" alt="Aria Logo" className="w-16 h-16 object-contain mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Institutional Pedigree.<br/>Cultural Roots.</h2>
          </div>

          <div className="relative border-l border-border pl-8 md:pl-12 ml-4 md:ml-12 space-y-16">
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-primary rounded-full ring-8 ring-background"></div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-3">The Genesis</h4>
              <p className="text-muted-foreground leading-relaxed">Founded by Persian-American language professionals who identified a critical gap: large agencies were treating Middle Eastern languages as a monolith, failing to account for vast dialectical and cultural differences.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-border rounded-full ring-8 ring-background"></div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-3">Targeted Focus</h4>
              <p className="text-muted-foreground leading-relaxed">Starting exclusively with Persian, Arabic, and Kurdish, Aria built the most rigorous vetting process in the industry, focusing on medical and legal certifications.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-border rounded-full ring-8 ring-background"></div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-3">Scale & Depth</h4>
              <p className="text-muted-foreground leading-relaxed">Expanded to 100+ languages while maintaining the founding principle: never compromise on cultural fluency. If we cannot staff a language accurately, we will not staff it at all.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-primary rounded-full ring-8 ring-background"></div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-3">The Premier Standard</h4>
              <p className="text-muted-foreground leading-relaxed">Today, Aria is trusted by the nation's top hospitals, courts, law firms, and government agencies to handle their most sensitive and critical communications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTACT */}
      <section id="contact" className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Contact Us</span>
              <div className="h-[1px] w-8 bg-accent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Get in Touch.</h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Partner with the definitive authority in language services. Our senior placement specialists respond to all inquiries within 2 business hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="tel:+19493851807" className="group block" data-testid="contact-phone">
              <div className="border border-white/10 p-10 hover:border-accent/40 transition-all duration-300 hover:bg-white/[0.03]">
                <div className="w-14 h-14 bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Direct Line</p>
                <p className="text-2xl font-serif text-white mb-4">+1 (949) 385-1807</p>
                <p className="text-white/50 text-sm">Available during business hours.<br/>Urgent requests accommodated 24/7.</p>
              </div>
            </a>
            <a href="mailto:aria@arialanguageservices.com" className="group block" data-testid="contact-email">
              <div className="border border-white/10 p-10 hover:border-accent/40 transition-all duration-300 hover:bg-white/[0.03]">
                <div className="w-14 h-14 bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Mail className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Email</p>
                <p className="text-2xl font-serif text-white mb-4">aria@arialanguageservices.com</p>
                <p className="text-white/50 text-sm">For quotes, scheduling, and partnership inquiries.<br/>We respond within 2 business hours.</p>
              </div>
            </a>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 border border-white/10 px-8 py-4">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-white/60 text-sm">Serving clients nationwide from Southern California</span>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[#0a0f1a] text-white/60 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src="/aria_logo_new.png" alt="Aria Logo" className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none tracking-wide text-white">ARIA</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 text-white/50">Language Services</span>
              </div>
            </div>
            <p className="font-serif italic text-lg text-white/80 max-w-sm">We Speak Your Language.</p>
          </div>
          
          <div>
            <h5 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">Expertise</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#services" className="hover:text-accent transition-colors">Medical</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Judicial & Legal</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Corporate</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Government</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">Firm</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><a href="/leadership" className="hover:text-accent transition-colors">Leadership</a></li>
              <li><a href="/interpreter-expectations" className="hover:text-accent transition-colors">Interpreter Expectations</a></li>
              <li><Link href="#why-aria" className="hover:text-accent transition-colors">The Aria Standard</Link></li>
              <li><Link href="#languages" className="hover:text-accent transition-colors">Languages</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs">
          <p>&copy; {new Date().getFullYear()} Aria Language Services. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

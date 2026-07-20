import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Menu, X, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const leaders = [
  {
    name: "Noah Saeedy",
    title: "Chief Executive Officer & Founder",
    description: "With over 20 years of experience in language services — including military interpreting and translating in high-stakes environments — Noah founded Aria with a singular vision: to build the most culturally precise language services agency in the nation. His military background instilled a discipline for accuracy and an understanding that miscommunication in critical settings is not an option. Noah's firsthand experience bridging cultures under the most demanding circumstances shapes every aspect of how Aria operates today.",
    initials: "NS",
    accentColor: "bg-primary"
  },
  {
    name: "Hossein Saeedy",
    title: "Director of Exotic Languages & Engineering",
    description: "Hossein brings a rare combination of deep linguistic knowledge and engineering precision to Aria. As Director of Exotic Languages, he oversees the recruitment, vetting, and deployment of interpreters in the hardest-to-staff languages — the languages other agencies simply cannot serve. His engineering background drives the systems and processes that allow Aria to match interpreters to specific dialects and cultural contexts with unmatched accuracy and speed.",
    initials: "HS",
    accentColor: "bg-accent"
  },
  {
    name: "Alexander Baiedi",
    title: "Director of Business Operations & Technology",
    description: "Alexander leads Aria's operational infrastructure and technology strategy, ensuring that the agency's commitment to quality is reflected in every client interaction. Beyond operations, Alexander is a champion for customers — he ensures that every institutional partner receives the responsiveness, transparency, and precision they expect from a premier agency. His focus on operational excellence means that when a hospital calls at 2 AM needing a Dari interpreter, the system works.",
    initials: "AB",
    accentColor: "bg-primary",
    photo: "/alex-baiedi.jpg"
  },
  {
    name: "Lyda Saeedy",
    title: "Medical Director",
    description: "With over 40 years of experience in the medical field, Lyda brings unparalleled clinical expertise to Aria's medical interpretation services. Her deep understanding of healthcare workflows, patient communication needs, and clinical terminology ensures that Aria's medical interpreters are not just linguistically accurate but clinically informed. Lyda's oversight means that every medical interpretation meets the highest standards of patient care — because she knows firsthand what's at stake when communication fails in a clinical setting.",
    initials: "LS",
    accentColor: "bg-accent"
  },
  {
    name: "Santiago Assis",
    title: "Customer Success Manager",
    description: "Santiago has been making clients his top priority for over a decade, approaching every relationship with grace and humility. His unwavering dedication to customer success ensures that every institution partnering with Aria receives not just a service, but a genuine commitment to their needs. Santiago's ability to listen, anticipate, and deliver has made him a trusted point of contact for Aria's most valued partners.",
    initials: "SA",
    accentColor: "bg-primary",
    photo: "/santiago-assis.jpg"
  }
];

export default function Leadership() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-border py-4 shadow-sm" : "bg-secondary border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a 
            href="/"
            className="flex items-center cursor-pointer group"
            data-testid="nav-logo"
          >
            <img
              src="/aria_logo_new.png"
              alt="Aria Language Services"
              className="h-16 w-auto max-w-[45vw] -my-3 object-contain transition-transform group-hover:scale-105 md:h-[72px] md:max-w-none md:-my-4"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className={`text-sm font-medium tracking-wide transition-colors hover:text-primary flex items-center gap-2 ${isScrolled ? "text-foreground/80" : "text-white/90"}`} data-testid="nav-back-home">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <a href="/#contact">
              <Button className="rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold bg-primary text-white hover:bg-primary/90" data-testid="nav-cta-leadership">
                Contact Us
              </Button>
            </a>
          </div>

          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle-leadership"
          >
            {isMobileMenuOpen ? <X className={isScrolled ? "text-foreground" : "text-white"} /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col">
          <nav className="flex flex-col gap-6 text-2xl font-serif mt-10">
            <a href="/" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Home</a>
            <a href="/#services" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Services</a>
            <a href="/#contact" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      )}

      <section className="bg-secondary pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cultural-abstract.png')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">Our People</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              Leadership.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/70 font-light max-w-2xl leading-relaxed border-l-2 border-primary pl-6">
              The people behind Aria bring decades of experience across military, medical, legal, and technology disciplines — united by a shared commitment to precision and cultural integrity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid gap-0"
          >
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                className={`grid lg:grid-cols-12 gap-0 ${index !== leaders.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="lg:col-span-4 py-12 lg:py-16 lg:pr-12">
                  {leader.photo ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-8">
                      <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 ${leader.accentColor} flex items-center justify-center mb-8`}>
                      <span className="text-white font-serif text-3xl font-bold">{leader.initials}</span>
                    </div>
                  )}
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">{leader.name}</h3>
                  <p className="text-primary font-semibold text-sm uppercase tracking-widest">{leader.title}</p>
                </div>
                <div className="lg:col-span-8 py-12 lg:py-16 lg:pl-12 lg:border-l border-border flex items-center">
                  <p className="text-muted-foreground leading-[1.9] text-lg font-light">{leader.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cultural-abstract.png')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Ready to Work With Us?</h2>
            <p className="text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Our leadership team is personally invested in every institutional partnership. Reach out to discuss how Aria can serve your organization.
            </p>
            <a href="/#contact">
              <Button className="rounded-none px-12 h-16 text-sm uppercase tracking-widest font-semibold bg-white text-primary hover:bg-white/90" data-testid="leadership-cta">
                Contact Us
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#0a0f1a] text-white/60 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/aria_logo_new.png" alt="Aria Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="font-serif font-bold text-lg text-white">ARIA</span>
            <span className="text-white/40">|</span>
            <span className="font-serif italic text-white/60">We Speak Your Language.</span>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Aria Language Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

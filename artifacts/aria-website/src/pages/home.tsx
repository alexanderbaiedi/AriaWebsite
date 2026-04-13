import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Scale, HeartPulse, Building2, CheckCircle2, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)} data-testid="link-home-logo">
            <img src="/aria-logo.jpg" alt="Aria Language Services Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-primary leading-tight">Aria</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Language Services</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors" data-testid="nav-services">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-primary transition-colors" data-testid="nav-why-us">Why Choose Us</button>
            <button onClick={() => scrollToSection('languages')} className="hover:text-primary transition-colors" data-testid="nav-languages">Languages</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors" data-testid="nav-about">About</button>
            <Button onClick={() => scrollToSection('contact')} className="rounded-full px-6" data-testid="btn-get-quote">Get a Quote</Button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="btn-mobile-menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollToSection('services')} className="text-left font-medium py-2 border-b border-border/50" data-testid="mobile-nav-services">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="text-left font-medium py-2 border-b border-border/50" data-testid="mobile-nav-why-us">Why Choose Us</button>
            <button onClick={() => scrollToSection('languages')} className="text-left font-medium py-2 border-b border-border/50" data-testid="mobile-nav-languages">Languages</button>
            <button onClick={() => scrollToSection('about')} className="text-left font-medium py-2 border-b border-border/50" data-testid="mobile-nav-about">About</button>
            <Button onClick={() => scrollToSection('contact')} className="w-full mt-2" data-testid="mobile-btn-get-quote">Get a Quote</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Abstract cultural bridge" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Globe2 className="w-4 h-4" />
              <span>Premier Middle Eastern Language Agency</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              We Speak Your <span className="text-primary italic">Language.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl font-light">
              The only agency combining 100+ languages with unmatched cultural competency. We translate meaning, not just words.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToSection('contact')} className="rounded-full px-8 text-base h-14 bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="hero-btn-quote">
                Get a Quote Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')} className="rounded-full px-8 text-base h-14 bg-background/50 backdrop-blur" data-testid="hero-btn-services">
                Explore Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">Critical Communication, <br/>Expertly Handled</h2>
            <p className="text-lg text-muted-foreground">From the courtroom to the clinic, we provide certified interpreters who understand the gravity of every interaction.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Medical Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] w-full relative overflow-hidden">
                <img src="/service-medical.png" alt="Medical Interpretation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <HeartPulse className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-serif font-bold mb-3">Medical Interpretation</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Certified interpreters for hospitals, clinics, and patient consultations. We ensure complete medical accuracy while maintaining the cultural sensitivity required for compassionate care.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Patient consultations</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Emergency room support</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Mental health sessions</li>
                </ul>
              </div>
            </motion.div>

            {/* Judicial Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] w-full relative overflow-hidden">
                <img src="/service-judicial.png" alt="Judicial Interpretation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <Scale className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-serif font-bold mb-3">Judicial & Legal Interpretation</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Court-certified interpreters for proceedings, depositions, and immigration hearings. We deliver precise legal translation that withstands the highest scrutiny of the justice system.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Court proceedings & trials</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Depositions & mediation</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Immigration hearings</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-background border border-border p-6 rounded-xl">
              <Building2 className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-lg mb-2">Nurse Case Management</h4>
              <p className="text-sm text-muted-foreground">Bilingual case management support connecting healthcare providers with non-English speaking patients.</p>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl">
              <Globe2 className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-lg mb-2">Corporate Events</h4>
              <p className="text-sm text-muted-foreground">Simultaneous interpreting for conferences, international meetings, and corporate training.</p>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-lg mb-2">Transportation Services</h4>
              <p className="text-sm text-muted-foreground">Coordinated, culturally-sensitive transportation for clients attending critical appointments.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cultural Competency Callout */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/cultural-abstract.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Aria is the ONLY agency that actively incorporates <span className="italic text-secondary">cultural understanding</span> into every interpreter placement.
            </h2>
            <p className="text-xl md:text-2xl font-light text-primary-foreground/90 max-w-3xl mx-auto">
              This is not optional for us — it is foundational. A medically accurate translation that offends cultural sensibilities fails the patient. We prevent that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                The Aria Standard
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10">
                Most agencies assign interpreters based on lowest cost, with little or no regard for cultural sensitivity, regional nuance, or dialect. We never do this. Here is what sets us apart.
              </motion.p>

              <div className="space-y-8">
                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Dialect-Level Precision</h4>
                    <p className="text-muted-foreground leading-relaxed">Many agencies assign any Arabic or Persian speaker. We match interpreters to the specific regional dialect. An Iraqi Arabic speaker is not interchangeable with a Moroccan or Levantine speaker. We know this. We staff for it.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Largest Dedicated Network</h4>
                    <p className="text-muted-foreground leading-relaxed">We have the largest dedicated, certified interpreter and translator network in Middle Eastern languages in the region, offering unparalleled availability and depth.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Outcomes-Focused</h4>
                    <p className="text-muted-foreground leading-relaxed">Our linguistic precision directly improves patient outcomes, legal accuracy, and client satisfaction. When the stakes are highest, precision matters most.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <img src="/cultural-abstract.png" alt="Cultural connection abstract" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-background/90 backdrop-blur p-6 rounded-xl border border-border">
                <p className="font-serif italic text-xl text-foreground mb-2">"Language services are only as good as the cultural fluency behind them."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">100+ Languages.<br/>Unmatched Depth.</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16">
              While we serve common languages with excellence, our true distinction is our unparalleled depth in the Middle Eastern and exotic languages that other agencies cannot properly staff.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-primary">Middle Eastern Core</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong className="text-foreground">Arabic</strong> (Egyptian, Levantine, Gulf, Moroccan, Iraqi, Sudanese, Yemeni)</li>
                <li><strong className="text-foreground">Persian/Farsi</strong> (Dari, Tajik)</li>
                <li><strong className="text-foreground">Kurdish</strong> (Kurmanji, Sorani)</li>
                <li><strong className="text-foreground">Pashto</strong> & <strong className="text-foreground">Urdu</strong></li>
                <li><strong className="text-foreground">Turkish</strong> & <strong className="text-foreground">Hebrew</strong></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm"
            >
              <h3 className="text-2xl font-serif font-bold mb-4">African & Exotic</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Amharic</li>
                <li>Somali</li>
                <li>Tigrinya</li>
                <li>Swahili</li>
                <li>Oromo</li>
                <li>And dozens more hard-to-staff languages.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm"
            >
              <h3 className="text-2xl font-serif font-bold mb-4">Global Reach</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Spanish</li>
                <li>French</li>
                <li>Mandarin & Cantonese</li>
                <li>Vietnamese</li>
                <li>Portuguese</li>
                <li>Russian</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
              <img src="/aria-logo.jpg" alt="Aria Logo Mark" className="w-16 h-16 object-contain mix-blend-multiply" />
            </div>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-serif font-bold mb-8 text-foreground">
              Our Story
            </motion.h2>
            <motion.div variants={fadeIn} className="text-lg text-muted-foreground space-y-6 leading-relaxed font-light">
              <p>
                Aria Language Services was founded by a team of Persian-American language professionals who saw a critical gap in the market: agencies that could serve Middle Eastern communities with the linguistic precision and cultural sensitivity those communities deserve.
              </p>
              <p>
                Starting with Persian, Arabic, and Kurdish, the agency expanded over the years into 100+ languages — always maintaining the founding principle that language services are only as good as the cultural fluency behind them. The Homa bird in our logo symbolizes freedom and nobility, guiding our mission to empower individuals through clear communication.
              </p>
              <p>
                Today, Aria is the premier Middle Eastern language services agency, trusted by hospitals, courts, law firms, and government agencies across the region to handle their most sensitive interactions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Request a Quote</h2>
              <p className="text-xl text-primary-foreground/80 mb-10 font-light">
                Partner with the leading agency in cultural and linguistic accuracy. <strong className="text-white">We respond within 2 business hours.</strong>
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">Call Us</p>
                    <p className="text-lg font-medium">1-800-555-ARIA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-lg font-medium">quotes@arialanguages.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()} data-testid="form-quote">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" className="bg-background" data-testid="input-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org">Organization</Label>
                    <Input id="org" placeholder="General Hospital" className="bg-background" data-testid="input-org" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language Needed</Label>
                  <Input id="language" placeholder="e.g., Levantine Arabic, Dari, Spanish" className="bg-background" data-testid="input-language" />
                </div>

                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select>
                    <SelectTrigger className="bg-background" data-testid="select-service-type">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Interpretation</SelectItem>
                      <SelectItem value="judicial">Judicial / Legal Interpretation</SelectItem>
                      <SelectItem value="document">Document Translation</SelectItem>
                      <SelectItem value="nurse">Nurse Case Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea id="message" placeholder="Tell us about your specific requirements, dates, or dialect needs..." className="min-h-[120px] bg-background" data-testid="input-message" />
                </div>

                <Button type="submit" className="w-full h-12 text-base rounded-xl" data-testid="btn-submit-quote">
                  Submit Request
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/aria-logo.jpg" alt="Aria Language Services Logo" className="h-10 w-auto object-contain" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl text-primary leading-tight">Aria</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Language Services</span>
                </div>
              </div>
              <p className="text-2xl font-serif italic text-muted-foreground mb-6">
                "We Speak Your Language"
              </p>
              <p className="text-muted-foreground max-w-md">
                The premier Middle Eastern language services agency, providing certified interpretation and translation with unmatched cultural competency.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors" data-testid="footer-nav-medical">Medical Interpretation</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors" data-testid="footer-nav-judicial">Judicial Interpretation</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors" data-testid="footer-nav-nurse">Nurse Case Management</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors" data-testid="footer-nav-transport">Transportation</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><button onClick={() => scrollToSection('why-us')} className="hover:text-primary transition-colors" data-testid="footer-nav-why-us">Why Choose Us</button></li>
                <li><button onClick={() => scrollToSection('languages')} className="hover:text-primary transition-colors" data-testid="footer-nav-languages">Languages</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors" data-testid="footer-nav-about">Our Story</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors" data-testid="footer-nav-contact">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Aria Language Services. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-privacy">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

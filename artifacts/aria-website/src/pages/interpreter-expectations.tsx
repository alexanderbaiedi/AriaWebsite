import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Menu,
  X,
  Clock,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  Lock,
  FileText,
  Ban,
  Briefcase,
  Phone,
  Mail,
  MessageCircle,
  CalendarCheck,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const expectations = [
  {
    icon: Briefcase,
    title: "Professional Appearance",
    description:
      "Interpreter's appearance must be professional at all times. Acceptable attire includes a collared shirt or blouse, slacks or skirt, and dress shoes. Sneakers, sandals, jeans, shorts, and t-shirts are not permitted. Clothes must be clean and pressed.",
  },
  {
    icon: Clock,
    title: "Punctual Arrival",
    description:
      "Interpreter must arrive at the appointment 15 minutes prior to the scheduled appointment time. Upon arrival, identify yourself as the Aria Language Services interpreter assigned to the claimant.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Updates & Issue Reporting",
    description:
      "Interpreter must text Aria Language Services with the patient's arrival time, the session end time, and any issues, delays, or changes encountered along the way — including incidents involving the claimant or unexpected circumstances. Keeping us informed in real time allows our team to support you and the claimant at every step of the appointment.",
  },
  {
    icon: UserCheck,
    title: "No-Show Protocol",
    description:
      "If the claimant does not arrive, the no-show must be reported to Aria Language Services before the Interpreter is released — this is what guarantees payment of the no-show fee. Under no circumstances should you leave the premises until the session has concluded successfully or you have received an official release. If you cannot reach our team, call the insurance company directly at +1 (949) 385-1807 to confirm release.",
  },
  {
    icon: ShieldCheck,
    title: "Objectivity & Impartiality",
    description:
      "Interpreter must maintain objectivity and impartiality at all times during an assignment. Communicate in a thorough and precise manner. Interpreters may only ask questions of the physician, case manager, or therapist that are posed by the claimant or one of the above parties.",
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up Appointment Coordination",
    description:
      "It is critical that, at the conclusion of every session, the Interpreter assists the patient in scheduling any necessary follow-up appointments — and texts that date and time to Aria Language Services the moment it is confirmed. This ensures continuity of care and allows us to assign coverage promptly.",
  },
  {
    icon: FileText,
    title: "Authorization for Additional Fees",
    description:
      "Any requests, services, or fees not listed on the original authorization must be reported to Aria Language Services for approval before proceeding. No fees outside of the agreed-upon rates will apply, and failure to obtain pre-approval may result in non-payment for those additional services.",
  },
  {
    icon: Clock,
    title: "Post-Appointment Reporting (24 Hours)",
    description:
      "Final appointment length, any additional authorized fees, and any discrepancies must be received by Aria Language Services within 24 hours of completion of the assignment. Prompt reporting ensures accurate billing and timely follow-up with the requesting party.",
  },
  {
    icon: Ban,
    title: "No Direct Payment or Tips",
    description:
      "The claimant — or any party other than Aria Language Services — shall not be asked for payment, tips, or gratuities of any kind. All rates and payment matters must be discussed exclusively with Aria Language Services.",
  },
  {
    icon: Lock,
    title: "Strict Confidentiality",
    description:
      "All information about the claimant, including any legal or financial matters, must be kept strictly confidential. Names, addresses, phone numbers, and any other identifying information are the property of Aria Language Services and must not be distributed for any purpose.",
  },
  {
    icon: Ban,
    title: "Zero-Tolerance Drug & Alcohol Policy",
    description:
      "Aria Language Services maintains a strict zero-tolerance policy regarding drug and alcohol use. Interpreters must never report to an assignment under the influence of any substance that could impair judgment, performance, or professionalism. Any violation will result in immediate and permanent removal from our interpreter roster, and any related incidents must be reported to Aria Language Services without delay.",
  },
  {
    icon: LifeBuoy,
    title: "How to Escalate Issues",
    description:
      "For any issue that arises during an assignment, raise it in the Aria Language Services WhatsApp group and call any of the phone numbers listed there. You may also reach our main company line at any time by calling +1 (949) 385-1807. Always escalate before the session ends — never afterward.",
  },
];

const standards = [
  "Be fluent in English and the target language.",
  "Interpret effectively, accurately, and impartially at all times.",
  "Understand and present information of a medical, legal, or technical nature.",
  "Maintain professional dress and conduct with all parties.",
  "Adhere to the standard code of ethics for interpreters in healthcare and legal settings.",
  "Accreditation by a recognized interpretation entity or completion of a recognized medical/legal interpreter course is preferred.",
  "Bachelor's Degree is preferred.",
  "A minimum of 2 years of experience in professional interpretation is preferred.",
  "Maintain a zero-tolerance policy for drugs and alcohol during all assignments.",
];

export default function InterpreterExpectations() {
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
          <a href="/" className="flex items-center gap-4 cursor-pointer group" data-testid="nav-logo">
            <img src="/aria-logo.jpg" alt="Aria Language Services Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-xl leading-none tracking-wide ${isScrolled ? "text-foreground" : "text-white"}`}>ARIA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 text-primary">Language Services</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className={`text-sm font-medium tracking-wide transition-colors hover:text-primary flex items-center gap-2 ${isScrolled ? "text-foreground/80" : "text-white/90"}`} data-testid="nav-back-home">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <a href="/#contact">
              <Button className="rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold bg-primary text-white hover:bg-primary/90" data-testid="nav-cta-expectations">
                Contact Us
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle-expectations"
          >
            {isMobileMenuOpen ? <X className={isScrolled ? "text-foreground" : "text-white"} /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col">
          <nav className="flex flex-col gap-6 text-2xl font-serif mt-10">
            <a href="/" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Home</a>
            <a href="/leadership" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Leadership</a>
            <a href="/#contact" className="text-left border-b border-border pb-4 hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section className="bg-secondary pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">For Our Interpreters</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              Interpreter Expectations.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/70 font-light max-w-3xl leading-relaxed border-l-2 border-primary pl-6">
              These standards define the conduct, professionalism, and accountability we require of every interpreter representing Aria Language Services. Our reputation — and the trust our clients place in us — depends on your adherence to every expectation outlined below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CORE EXPECTATIONS */}
      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">Assignment Conduct</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Core Expectations.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl">
              These rules apply to every assignment — without exception. They are non-negotiable and form the foundation of our partnership with you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 gap-px bg-border"
          >
            {expectations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-background p-10 hover:bg-muted/30 transition-colors"
                  data-testid={`expectation-${i}`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-xs font-bold text-accent tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="text-xl font-serif font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-light">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* INTERPRETER STANDARDS */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Professional Standards</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6">
              Interpreter Standards.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/70 mb-12 max-w-2xl">
              All interpreters working with Aria Language Services are expected to meet and continuously maintain the following professional standards.
            </motion.p>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {standards.map((standard, i) => (
                <div key={i} className="flex items-start gap-4 border-l border-accent/30 pl-5 py-2">
                  <span className="text-accent font-serif text-2xl leading-none flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-white/80 leading-relaxed">{standard}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NON-COMPLIANCE NOTICE */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="border-l-4 border-accent bg-muted/30 p-10"
          >
            <div className="flex items-start gap-5">
              <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Non-Compliance Notice</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Failure to adhere to these expectations may result in immediate removal from the active interpreter roster and forfeiture of payment for the assignment in question. Aria Language Services maintains a zero-tolerance policy for drug and alcohol violations, breaches of confidentiality, and unprofessional conduct.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By accepting an assignment from Aria Language Services, you acknowledge that you have read, understood, and agree to abide by all expectations and standards set forth on this page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FOR QUESTIONS */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Questions About an Assignment?</h2>
          <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto">
            Our coordination team is available to support you. Reach out at any time during business hours — and immediately for urgent matters during an active assignment.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="tel:+19493851807" className="flex items-center gap-3 text-white hover:text-accent transition-colors" data-testid="expectations-contact-phone">
              <Phone className="w-5 h-5" />
              <span className="text-xl font-serif">+1 (949) 385-1807</span>
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a href="mailto:aria@arialanguageservices.com" className="flex items-center gap-3 text-white hover:text-accent transition-colors" data-testid="expectations-contact-email">
              <Mail className="w-5 h-5" />
              <span className="text-xl font-serif">aria@arialanguageservices.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0f1a] text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-3">
            <img src="/aria-logo-transparent.png" alt="Aria Logo" className="h-8 w-auto object-contain" />
            <span className="text-white/80">Aria Language Services</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Aria Language Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ClipboardPenLine, Circle } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const benefits = [
  {
    eyebrow: "The Pay",
    title: (
      <>
        $25<span className="text-2xl md:text-3xl font-normal text-[#b9892e]">/hr</span>
      </>
    ),
    copy: (
      <>
        Starting rate <span className="text-[#b9892e]">--</span> plus paid <strong>mileage</strong> on every assignment you accept.
        Your time and travel are both covered.
      </>
    ),
  },
  {
    eyebrow: "The Schedule",
    title: "Yours",
    copy: "Work only when you're available. You choose when, where, and how often you take assignments -- full control.",
  },
  {
    eyebrow: "The Future",
    title: "A Career",
    copy: "Start on the side or go all in. As Aria's network grows, your opportunities grow right along with it.",
  },
];

const languages = ["Farsi", "Vietnamese", "Mandarin", "Korean", "Arabic", "Tagalog"];

export default function Careers() {
  return (
    <div className="min-h-[100dvh] bg-[#071a30] font-sans text-white selection:bg-[#d5a445] selection:text-[#06172c]">
      <section className="relative overflow-hidden border-t-[5px] border-[#c99a3c] bg-[#06182d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_31%),linear-gradient(110deg,rgba(5,18,34,0.96),rgba(4,22,42,0.9)_50%,rgba(6,31,52,0.96))]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-9 md:px-10 md:pb-20">
          <div className="mb-14 flex items-start justify-between gap-8">
            <Link href="/" className="inline-flex flex-col items-start" data-testid="careers-logo">
              <img src="/aria_logo_new.png" alt="Aria Language Services" className="h-16 w-auto object-contain brightness-0 invert md:h-[72px]" />
            </Link>

            <div className="mt-3 hidden items-center gap-4 rounded-full border border-[#d5a445] px-6 py-3 text-xs font-bold uppercase tracking-[0.36em] text-[#d5a445] md:flex">
              <Circle className="h-4 w-4 fill-[#d5a445] text-[#d5a445]" />
              Now Hiring Interpreters
            </div>
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeUp} className="mb-8 text-lg text-white/92">
              <Link href="/" className="hover:text-[#d5a445]">Home</Link>
              <span className="px-3 text-[#d5a445]">/</span>
              <span>Careers</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-[660px] font-serif text-[3.7rem] font-bold leading-[0.98] tracking-normal text-white md:text-[5.4rem]">
              Speak a second language?{" "}
              <span className="italic text-[#d5a445]">Get paid for it.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-[790px] text-[1.35rem] font-light leading-relaxed text-white/86 md:text-[1.55rem]">
              Join Aria's nationwide network of interpreters. Flexible assignments, real pay, and a path that goes as far as
              you want to take it.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-7">
              <div className="h-1 w-12 bg-[#d5a445]" />
              <p className="font-serif text-2xl italic text-white md:text-3xl">This can be a career if you want it to be.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fbf8ef] text-[#071a30]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3 md:gap-0 md:px-10 md:py-12">
          {benefits.map((benefit, index) => (
            <motion.article
              key={benefit.eyebrow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className={`md:px-12 ${index === 0 ? "md:pl-0" : "md:border-l md:border-[#d7d1c4]"} ${index === 2 ? "md:pr-0" : ""}`}
            >
              <p className="mb-6 text-sm font-extrabold uppercase tracking-[0.34em] text-[#087281]">{benefit.eyebrow}</p>
              <h2 className="mb-5 font-serif text-5xl font-bold leading-none text-[#071a30] md:text-6xl">{benefit.title}</h2>
              <p className="max-w-[310px] text-xl leading-relaxed text-[#151922]">{benefit.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#087987] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(100deg,#087987,#056d7e_58%,#0b7d8c)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-11">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.36em] text-white/95">The Languages We Need Most</p>
              <h2 className="font-serif text-5xl font-bold leading-tight md:text-6xl">
                Spanish <span className="font-sans text-[#d5a445]">&harr;</span> English
              </h2>
            </div>
            <p className="max-w-[340px] text-xl font-semibold leading-relaxed text-white/92 lg:justify-self-end">
              Our greatest need <span className="text-white/70">--</span> and <strong>every language &harr; English</strong> is welcome.
            </p>
          </div>

          <div className="mt-9 border-t border-white/28 pt-7">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span className="mr-1 text-sm font-extrabold uppercase tracking-[0.3em] text-white/92">Also Needed</span>
              {languages.map((language) => (
                <span key={language} className="rounded-full border border-white/42 px-5 py-2 text-lg font-semibold text-white/95">
                  {language}
                </span>
              ))}
              <span className="rounded-full border border-[#d5a445] px-6 py-2 text-lg font-semibold text-[#d5a445]">&amp; many more</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06182d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_23%_12%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(115deg,#06182d,#071d35_55%,#06182d)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-11 md:px-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="mb-4 text-sm font-extrabold uppercase tracking-[0.34em] text-[#d5a445]">
              Ready to Start?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-5 font-serif text-5xl font-bold leading-tight md:text-6xl">
              Apply in minutes.
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-[560px] text-xl leading-relaxed text-white/90">
              All you need is <strong>fluency in English and one other language.</strong> No prior agency experience required to
              begin the conversation.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="https://arialanguageservices.com"
              className="mt-8 inline-flex items-center gap-4 text-2xl font-bold text-white hover:text-[#d5a445]"
              data-testid="careers-website-link"
            >
              <ArrowRight className="h-6 w-6 text-[#d5a445]" />
              arialanguageservices.com
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-stretch"
          >
            <Link
              href="/careers/apply"
              className="group flex min-h-[192px] w-full max-w-[390px] flex-col items-center justify-center gap-5 rounded-2xl bg-[#d5a445] px-8 text-center text-[#06182d] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition hover:bg-[#e0b856] focus:outline-none focus:ring-4 focus:ring-[#d5a445]/40"
              data-testid="careers-apply-now"
            >
              <ClipboardPenLine className="h-14 w-14 stroke-[1.8] transition group-hover:scale-105" />
              <span className="text-3xl font-extrabold uppercase tracking-[0.24em]">Apply Now</span>
            </Link>
            <a href="tel:+19493851807" className="mt-8 text-center text-2xl font-semibold text-white hover:text-[#d5a445]">
              <span className="font-normal text-[#d5a445]">or call </span>(949) 385-1807
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#c99a3c] text-[#06182d]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 text-center md:flex-row md:px-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/aria_logo_new.png" alt="Aria" className="h-9 w-auto object-contain brightness-0" />
          </Link>
          <p className="text-sm font-extrabold uppercase tracking-[0.32em]">Medical &middot; Legal &middot; Workers' Comp</p>
          <p className="text-sm font-extrabold uppercase tracking-[0.32em]">We Speak Your Language</p>
        </div>
      </footer>
    </div>
  );
}

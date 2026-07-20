import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  languages: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  languages: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.languages.trim()) errors.languages = "Languages spoken is required.";

  return errors;
}

export default function CareersApply() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/interpreter-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          languages: values.languages.trim(),
        }),
      });

      if (!response.ok) {
        setSubmitError("We could not send your application. Please try again or call (949) 385-1807.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("We could not send your application. Please try again or call (949) 385-1807.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#06182d] font-sans text-white selection:bg-[#d5a445] selection:text-[#06182d]">
      <section className="relative overflow-hidden border-t-[5px] border-[#c99a3c]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_31%),linear-gradient(112deg,rgba(5,18,34,0.97),rgba(4,22,42,0.92)_52%,rgba(6,31,52,0.98))]" />
        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-6 py-9 md:px-10">
          <header className="mb-10 flex items-start justify-between gap-8">
            <Link href="/" className="inline-flex" data-testid="careers-apply-logo">
              <img src="/aria_logo_new.png" alt="Aria Language Services" className="h-16 w-auto object-contain brightness-0 invert md:h-[72px]" />
            </Link>

            <Link
              href="/careers"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#d5a445] hover:text-white"
              data-testid="careers-apply-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Careers
            </Link>
          </header>

          <main className="grid flex-1 gap-10 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.34em] text-[#d5a445]">Interpreter Application</p>
              <h1 className="max-w-[620px] font-serif text-5xl font-bold leading-[1.02] text-white md:text-7xl">
                Apply to join Aria.
              </h1>
              <p className="mt-7 max-w-[560px] text-xl font-light leading-relaxed text-white/84">
                Tell us how to reach you and which languages you speak. Our team will follow up when there is a fit for
                your language pair and availability.
              </p>
              <div className="mt-9 flex items-center gap-6">
                <div className="h-1 w-12 bg-[#d5a445]" />
                <p className="font-serif text-2xl italic text-white">Fluency in English and one other language is enough to begin.</p>
              </div>
            </div>

            <div className="bg-[#fbf8ef] p-6 text-[#071a30] shadow-[0_28px_80px_rgba(0,0,0,0.28)] md:p-10">
              {submitted ? (
                <div className="flex min-h-[440px] flex-col justify-center">
                  <CheckCircle2 className="mb-8 h-16 w-16 text-[#087281]" />
                  <h2 className="mb-5 font-serif text-4xl font-bold leading-tight md:text-5xl">Thank you.</h2>
                  <p className="text-xl font-semibold leading-relaxed">Thank you. We received your application.</p>
                  <p className="mt-3 text-xl leading-relaxed text-[#333842]">You may also call us at (949) 385-1807.</p>
                  <Link
                    href="/careers"
                    className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#087281] hover:text-[#071a30]"
                    data-testid="careers-apply-success-back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Careers
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6" data-testid="careers-application-form">
                  <div>
                    <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">Apply Now</h2>
                    <p className="mt-3 text-lg text-[#424751]">All fields are required.</p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-extrabold uppercase tracking-[0.22em] text-[#087281]">Full name</span>
                    <input
                      value={values.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                      className="h-14 w-full border border-[#d7d1c4] bg-white px-4 text-lg text-[#071a30] outline-none transition focus:border-[#d5a445] focus:ring-2 focus:ring-[#d5a445]/30"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      data-testid="careers-apply-full-name"
                    />
                    {errors.fullName && <p id="fullName-error" className="mt-2 text-sm font-semibold text-[#a13d2d]">{errors.fullName}</p>}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-extrabold uppercase tracking-[0.22em] text-[#087281]">Phone number</span>
                    <input
                      value={values.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className="h-14 w-full border border-[#d7d1c4] bg-white px-4 text-lg text-[#071a30] outline-none transition focus:border-[#d5a445] focus:ring-2 focus:ring-[#d5a445]/30"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      data-testid="careers-apply-phone"
                    />
                    {errors.phone && <p id="phone-error" className="mt-2 text-sm font-semibold text-[#a13d2d]">{errors.phone}</p>}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-extrabold uppercase tracking-[0.22em] text-[#087281]">Email address</span>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="h-14 w-full border border-[#d7d1c4] bg-white px-4 text-lg text-[#071a30] outline-none transition focus:border-[#d5a445] focus:ring-2 focus:ring-[#d5a445]/30"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      data-testid="careers-apply-email"
                    />
                    {errors.email && <p id="email-error" className="mt-2 text-sm font-semibold text-[#a13d2d]">{errors.email}</p>}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-extrabold uppercase tracking-[0.22em] text-[#087281]">Languages spoken</span>
                    <textarea
                      value={values.languages}
                      onChange={(event) => updateField("languages", event.target.value)}
                      className="min-h-32 w-full resize-y border border-[#d7d1c4] bg-white px-4 py-3 text-lg text-[#071a30] outline-none transition focus:border-[#d5a445] focus:ring-2 focus:ring-[#d5a445]/30"
                      aria-invalid={Boolean(errors.languages)}
                      aria-describedby={errors.languages ? "languages-error" : undefined}
                      data-testid="careers-apply-languages"
                    />
                    {errors.languages && <p id="languages-error" className="mt-2 text-sm font-semibold text-[#a13d2d]">{errors.languages}</p>}
                  </label>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-16 w-full rounded-none bg-[#d5a445] text-base font-extrabold uppercase tracking-[0.24em] text-[#06182d] hover:bg-[#e0b856]"
                    data-testid="careers-apply-submit"
                  >
                    <Send className="mr-3 h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Submit Application"}
                  </Button>
                  {submitError && (
                    <p className="border-l-4 border-[#a13d2d] bg-white px-4 py-3 text-sm font-semibold text-[#a13d2d]" data-testid="careers-apply-submit-error">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

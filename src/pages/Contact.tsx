import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const Contact: React.FC = () => (
  <>
    {/* Hero Section */}
    <section className="w-full flex flex-col items-center justify-center min-h-[30vh] pb-4 bg-white pt-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-3 drop-shadow-lg tracking-tight mt-0 flex justify-center items-center gap-2">
        <span style={{ color: "#720D4C" }}>GET IN</span>
        <span className="bg-gradient-to-r from-[#E0A935] to-[#FFD300] bg-clip-text text-transparent">TOUCH</span>
      </h1>
      <p className="max-w-2xl text-center text-lg md:text-xl font-medium text-[#1F1F1F] mb-8">
        Expert guidance for your Dubai real estate journey, powered by AI insights.
      </p>
    </section>

    {/* Contact Form */}
    <section className="w-full max-w-2xl mx-auto mb-8 bg-white/95 rounded-2xl shadow-lg p-8 border border-[#E0A935]/30">
      <h2 className="text-2xl font-bold text-[#720D4C] mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4" /></svg>
        Get in Touch
      </h2>
      <p className="text-[#3a2b3c] mb-6 text-base">
        Have a question or want personalized guidance? Fill out the form—one of our experts will respond within one business day.
      </p>
      <ContactForm />
    </section>

    {/* Contact Info & Business Hours */}
    <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-stretch justify-center px-4 md:px-0 mb-8">
      {/* Contact Info Panel */}
      <div className="flex-1 bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col gap-4 items-start border border-[#E0A935]/30">
        <h2 className="text-xl font-semibold text-[#720D4C] mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Contact Information
        </h2>
        <div className="flex items-center gap-3 text-lg">
          <a
            href="tel:+971588037152"
            className="flex items-center gap-2 text-[#720D4C] hover:text-[#E0A935] font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            +971 58 803 7152
          </a>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <a
            href="mailto:Support@lykarealty.ae"
            className="flex items-center gap-2 text-[#720D4C] hover:text-[#E0A935] font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4" /></svg>
            Support@lykarealty.ae
          </a>
        </div>
      </div>
      {/* Business Hours */}
      <div className="flex-1 bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-[#E0A935]/30">
        <h2 className="text-xl font-semibold text-[#720D4C] mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Business Hours
        </h2>
        <div className="flex flex-col gap-1 text-base text-[#3a2b3c]">
          <div className="flex justify-between">
            <span>Monday – Saturday:</span>
            <span className="font-medium text-[#720D4C]">9AM – 6PM (GST)</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span className="font-medium text-[#E0A935]">Closed</span>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="w-full max-w-2xl mx-auto mb-10 bg-white/95 rounded-2xl shadow-lg p-8 border border-[#E0A935]/30">
      <h2 className="text-2xl font-bold text-[#720D4C] mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
        Frequently Asked Questions
      </h2>
      <FAQAccordion />
    </section>

    {/* Social Media Links */}
    <section className="w-full max-w-2xl mx-auto mb-10 bg-white/95 rounded-2xl shadow-lg p-8 border border-[#E0A935]/30 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#720D4C] mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /></svg>
        Connect with Us on Social Media
      </h2>
      <div className="flex flex-row gap-6 mt-2">
        <a href="https://instagram.com/lykarealty" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
          className="transition-transform hover:scale-110 hover:text-[#E0A935] text-[#720D4C]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="6" strokeWidth="2" />
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <circle cx="17" cy="7" r="1.5" fill="#E0A935" />
          </svg>
        </a>
        <a href="https://linkedin.com/company/lykarealty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="transition-transform hover:scale-110 hover:text-[#E0A935] text-[#720D4C]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
            <rect x="7" y="10" width="2" height="7" fill="#720D4C" />
            <rect x="11" y="10" width="2" height="7" fill="#720D4C" />
            <circle cx="8" cy="7" r="1" fill="#E0A935" />
            <rect x="15" y="13" width="2" height="4" fill="#720D4C" />
          </svg>
        </a>
        <a href="https://facebook.com/lykarealty" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
          className="transition-transform hover:scale-110 hover:text-[#E0A935] text-[#720D4C]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="6" strokeWidth="2" />
            <path d="M16 8h-2a2 2 0 00-2 2v2h4l-.5 3H12v7" strokeWidth="2" />
          </svg>
        </a>
        <a href="https://twitter.com/lykarealty" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
          className="transition-transform hover:scale-110 hover:text-[#E0A935] text-[#720D4C]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="6" strokeWidth="2" />
            <path d="M8 15c6 0 9-5 9-9 0-.14 0-.28-.01-.42A6.48 6.48 0 0020 4.5a6.48 6.48 0 01-1.89.52A3.28 3.28 0 0019.45 3a6.56 6.56 0 01-2.08.8A3.28 3.28 0 0012 6.29c0 .26.03.52.08.76A9.32 9.32 0 013 4.1a3.28 3.28 0 001.02 4.37A3.28 3.28 0 012.8 8.1v.04a3.28 3.28 0 002.63 3.22 3.28 3.28 0 01-.86.12c-.21 0-.41-.02-.61-.06a3.28 3.28 0 003.06 2.28A6.57 6.57 0 012 18.58a9.29 9.29 0 005.03 1.47" strokeWidth="2" />
          </svg>
        </a>
      </div>
    </section>

    {/* Location Map & Address */}
    <section className="w-full max-w-2xl mx-auto mb-8 bg-white/95 rounded-2xl shadow-lg p-8 border border-[#E0A935]/30 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#720D4C] mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243z" /></svg>
        Our Office
      </h2>
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-3">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115622.08548512192!2d55.09045278671559!3d25.095423107536575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bd9cbec92fd%3A0x2e22bf2c8f28da68!2sLyka%20Realty!5e0!3m2!1sen!2sin!4v1753990033843!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lyka Realty Office Location"
          className="rounded-xl"
        />
      </div>
      <div className="text-[#3a2b3c] text-base text-center">
        Dubai, United Arab Emirates
      </div>
    </section>

    {/* Privacy Policy Note */}
    <div className="w-full max-w-2xl mx-auto pb-28 flex flex-col items-center gap-4">
      <p className="text-sm text-center text-[#3a2b3c] opacity-80 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#720D4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V7a4 4 0 10-8 0v4a4 4 0 008 0zm0 0v4a4 4 0 01-8 0v-4" /></svg>
        All information provided is handled with strict confidentiality
      </p>
    </div>
  </>
);

// --- Contact Form Component ---
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.subject) newErrors.subject = "Please select a subject";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted)
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <svg className="h-12 w-12 text-[#E0A935] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        <div className="text-xl font-semibold text-[#720D4C] mb-1">Thank you!</div>
        <div className="text-base text-[#3a2b3c]">We'll contact you within 24 hours.</div>
      </div>
    );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-[#720D4C] font-medium mb-1" htmlFor="name">
          Full Name<span className="text-[#E0A935]">*</span>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
      </div>
      <div>
        <label className="block text-[#720D4C] font-medium mb-1" htmlFor="email">
          Email Address<span className="text-[#E0A935]">*</span>
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500 pr-10" : "pr-10"}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E0A935]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4" /></svg>
          </span>
        </div>
        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
      </div>
      <div>
        <label className="block text-[#720D4C] font-medium mb-1" htmlFor="phone">
          Phone Number <span className="text-xs text-[#888]">(optional)</span>
        </label>
        <div className="relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. +971 58 803 7152"
            value={form.phone}
            onChange={handleChange}
            className="pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E0A935]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </span>
        </div>
      </div>
      <div>
        <label className="block text-[#720D4C] font-medium mb-1" htmlFor="subject">
          Subject<span className="text-[#E0A935]">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={`w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A935] ${errors.subject ? "border-red-500" : "border-input"}`}
        >
          <option value="">Select a subject</option>
          <option value="Enquiry">Enquiry</option>
          <option value="Support">Support</option>
          <option value="Feedback">Feedback</option>
          <option value="Investment">Investment</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <span className="text-red-500 text-xs">{errors.subject}</span>}
      </div>
      <div>
        <label className="block text-[#720D4C] font-medium mb-1" htmlFor="message">
          Message<span className="text-[#E0A935]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Type your message here..."
          value={form.message}
          onChange={handleChange}
          className={`w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A935] ${errors.message ? "border-red-500" : "border-input"}`}
        />
        {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
      </div>
      <Button
        type="submit"
        className="mt-2 bg-[#E0A935] text-[#1F1F1F] hover:bg-[#FFD700] font-semibold text-lg py-3 rounded-xl transition-colors"
      >
        Send Message
      </Button>
    </form>
  );
};

const faqs = [
  {
    q: "How quickly will I get a response?",
    a: "We aim to respond to all inquiries within one business day. Our team monitors messages closely to ensure prompt support.",
  },
  {
    q: "Which locations do you serve?",
    a: "We specialize in Dubai real estate but can assist with select opportunities across the UAE. Contact us for specific location queries.",
  },
  {
    q: "How can AI help me with real estate in Dubai?",
    a: "Our AI tools analyze market trends, predict investment returns, and match you with properties that fit your goals—saving you time and maximizing ROI.",
  },
  {
    q: "Can I get advice on legal or financial aspects?",
    a: "Yes, our advisors can connect you with trusted legal and financial experts to guide you through every step of your Dubai property journey.",
  },
];

const FAQAccordion: React.FC = () => (
  <Accordion type="single" collapsible className="w-full">
    {faqs.map((item, idx) => (
      <AccordionItem key={idx} value={`faq-${idx}`}>
        <AccordionTrigger className="flex items-center gap-2 text-[#720D4C] text-lg font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E0A935]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4h.01" /></svg>
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="flex items-start gap-2 text-[#3a2b3c]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 text-[#720D4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" /></svg>
          <span>{item.a}</span>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default Contact;

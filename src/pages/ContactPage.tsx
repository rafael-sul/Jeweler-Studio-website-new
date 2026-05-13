import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Sparkles, Heart, Compass } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

export const ContactPage = () => {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <ContactHero />
      <AboutUs />
      <ContactForm />
    </div>
  );
};

// =============================================================================
// HERO
// =============================================================================

const ContactHero = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-5 sm:px-6 border-t border-rule overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-[10%] w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.12), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 right-[8%] w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(109,213,250,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className="eyebrow mb-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease, transform 700ms ease',
          }}
        >
          Get in touch
        </div>
        <h1
          className="display-sans text-ink font-bold text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] leading-[1.0] tracking-tight"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 800ms ease 100ms, transform 800ms ease 100ms',
          }}
        >
          Real humans. <em className="accent-italic">Real answers.</em>
        </h1>
        <p
          className="text-ink-mute text-[17px] md:text-[19px] leading-relaxed mt-7 max-w-[56ch] mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 800ms ease 280ms, transform 800ms ease 280ms',
          }}
        >
          Whether you have a question about pricing, want a live walkthrough, or just want to nerd out about jewelry tech — we'd love to hear from you.
        </p>
      </div>
    </section>
  );
};

// =============================================================================
// ABOUT US
// =============================================================================

const VALUES = [
  {
    icon: Heart,
    title: 'Built by jewelers, for jewelers.',
    body: 'Every feature started as a problem a real custom-jewelry studio handed us. We don\'t build hypotheticals — we build what the trade actually needs.',
  },
  {
    icon: Compass,
    title: 'Show, then sell.',
    body: 'Custom orders die in the imagination gap between what the customer dreams and what they can see. We close that gap.',
  },
  {
    icon: Sparkles,
    title: 'Your brand is the brand.',
    body: 'Jeweler Studio is the engine. Your customers only ever see your logo, your colors, your domain. We stay invisible.',
  },
];

const AboutUs = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-5 sm:px-6 border-t border-rule bg-paper-tinted relative overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        <div
          className="text-center mb-14 md:mb-16 max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        >
          <div className="eyebrow-accent mb-5">About us</div>
          <h2 className="display-sans text-ink font-bold text-[36px] sm:text-[48px] md:text-[60px] leading-[1.05] tracking-tight">
            We're closing the <em className="accent-italic">imagination gap.</em>
          </h2>
          <p className="text-ink-mute text-[16px] md:text-[18px] leading-relaxed mt-6">
            Jeweler Studio started in a New York jewelry shop where the founder watched custom orders die one ghosted text at a time. Customers were excited, but couldn't visualize the piece — so they stalled, then disappeared. We built the tool that should have existed.
          </p>
        </div>

        {/* Values — 3 cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl bg-paper-2 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid #E8EAEE',
                  boxShadow:
                    '0 1px 0 rgba(10,11,20,0.02), 0 8px 24px -12px rgba(10,11,20,0.06)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 800ms ease, transform 800ms ease',
                  transitionDelay: `${200 + i * 120}ms`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(178,152,255,0.10)',
                    border: '1px solid rgba(178,152,255,0.30)',
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} className="text-aurora-violet" />
                </div>
                <h3 className="display-sans text-ink text-[20px] md:text-[22px] font-bold leading-tight tracking-tight mb-3">
                  {v.title}
                </h3>
                <p className="text-ink-3 text-[14.5px] leading-relaxed">{v.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// CONTACT FORM
// =============================================================================

const ContactForm = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    store_name: '',
    website_url: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Reuses the same Supabase write path as LeadModal — schema-compatible payload
    const { error: err } = await supabase.from('leads').insert([
      {
        name: form.name,
        email: form.email,
        store_name: form.store_name,
        website_url: form.website_url,
        inquiry_type: 'demo',
        status: 'new',
      },
    ]);
    setLoading(false);
    if (err) {
      setError(
        err.code === '23505'
          ? 'That email is already registered.'
          : 'Something went wrong. Please try again.'
      );
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', store_name: '', website_url: '', message: '' });
  };

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-5 sm:px-6 border-t border-rule bg-paper relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* Left — contact info */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 800ms ease, transform 800ms ease',
            }}
          >
            <div className="eyebrow mb-4">Reach us</div>
            <h2 className="display-sans text-ink font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight mb-6">
              Send us a <em className="accent-italic">note.</em>
            </h2>
            <p className="text-ink-mute text-[15.5px] md:text-[16.5px] leading-relaxed mb-10 max-w-[42ch]">
              Drop your info and a short message — our team replies within one business day.
            </p>

            <div className="space-y-5">
              <ContactInfoRow
                icon={Mail}
                label="Email"
                value="hello@jewelerstudio.ai"
                href="mailto:hello@jewelerstudio.ai"
              />
              <ContactInfoRow
                icon={MapPin}
                label="Based in"
                value="New York, NY"
              />
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl bg-paper-2 p-6 md:p-8 lg:p-10 relative overflow-hidden"
            style={{
              border: '1px solid #E8EAEE',
              boxShadow:
                '0 1px 0 rgba(10,11,20,0.02), 0 24px 60px -24px rgba(10,11,20,0.08), 0 48px 80px -32px rgba(178,152,255,0.10)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 800ms ease 150ms, transform 800ms ease 150ms',
            }}
          >
            {/* Top accent line */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-8 right-8 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(178,152,255,0.55), transparent)',
              }}
            />

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 size={44} className="mx-auto text-aurora-violet" />
                <h3 className="display-sans text-ink text-[28px] font-bold">
                  Message <em className="accent-italic">received.</em>
                </h3>
                <p className="text-ink-3 text-[15px] leading-relaxed max-w-sm mx-auto">
                  Our team will reach out within one business day. Talk soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  id="name"
                  label="Your name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <FormField
                  id="store_name"
                  label="Store name"
                  type="text"
                  value={form.store_name}
                  onChange={(v) => setForm((f) => ({ ...f, store_name: v }))}
                />
                <FormField
                  id="website_url"
                  label="Website URL"
                  type="url"
                  value={form.website_url}
                  onChange={(v) => setForm((f) => ({ ...f, website_url: v }))}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10.5px] tracking-eyebrow uppercase font-bold text-ink-mute mb-1.5"
                  >
                    What can we help with?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us a bit about your studio…"
                    className="w-full px-3.5 py-2.5 text-[14px] text-ink leading-relaxed rounded-lg outline-none transition-colors duration-200 focus:border-aurora-violet/60 resize-none"
                    style={{
                      background: '#FAFBFD',
                      border: '1px solid #E8EAEE',
                    }}
                  />
                </div>

                {error && (
                  <div className="text-[13px] font-medium" style={{ color: '#E87A6D' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-aurora w-full justify-center mt-2 disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Send message'}
                </button>

                <p className="text-ink-faint text-[11.5px] text-center mt-2">
                  We reply within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoRow = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="flex items-start gap-3">
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: 'rgba(178,152,255,0.10)',
          border: '1px solid rgba(178,152,255,0.30)',
        }}
      >
        <Icon size={15} strokeWidth={1.8} className="text-aurora-violet" />
      </span>
      <div>
        <div className="font-mono text-[10px] tracking-eyebrow uppercase font-bold text-ink-mute mb-0.5">
          {label}
        </div>
        <div className="text-ink text-[15px] font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
};

const FormField = ({
  id,
  label,
  type,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block font-mono text-[10.5px] tracking-eyebrow uppercase font-bold text-ink-mute mb-1.5"
    >
      {label}
      {required && <span className="text-aurora-violet ml-1">*</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 text-[14px] text-ink rounded-lg outline-none transition-colors duration-200 focus:border-aurora-violet/60"
      style={{
        background: '#FAFBFD',
        border: '1px solid #E8EAEE',
      }}
    />
  </div>
);

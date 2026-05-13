import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: 'How much does JewelerStudio cost?',                   a: 'Pricing is customized to your store size and transaction volume. Most jewelers see full ROI within the first month. We\'ll walk you through a personalized quote on your demo call.' },
  { q: 'How long does setup take?',                           a: 'The embed goes live in about a minute. Our onboarding team handles everything alongside you, no developer required.' },
  { q: 'Does it work with my website?',                       a: 'Yes. JewelerStudio works with Shopify, WooCommerce, Squarespace, Wix, Webflow, and any site that allows a custom embed snippet.' },
  { q: 'How do the AI renders work?',                         a: 'As customers select design options, our AI instantly generates photorealistic renders from those specifications. No CAD file required, no designer needed.' },
  { q: 'Is the branding fully white-labeled?',                a: 'Completely. Your customers only ever see your logo, your colors, your domain. JewelerStudio is invisible.' },
  { q: 'What payment methods support deposit collection?',    a: 'We integrate with Stripe, Square, and PayPal. Deposits are captured securely at the point of design, before the customer leaves your site.' },
  { q: 'Do you integrate with my CRM?',                       a: 'Yes. Native integrations with Salesforce, HubSpot, and Pipedrive, plus a full Zapier connection to 5,000+ other apps.' },
  { q: 'What support is included?',                           a: 'Dedicated account management, full onboarding training, 24/7 technical support via chat and email, and optional weekly strategy calls.' },
  { q: 'Can I control which products and options are shown?', a: 'Every metal type, stone, band style, and price range is fully configurable to match your inventory and margin targets.' },
  { q: 'Is there a free trial?',                              a: 'We offer a live demo and a 14-day pilot so you can validate results before committing. Book a demo to get started.' },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-6 border-t border-rule bg-paper">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <div className="eyebrow mb-4">FAQ</div>
          <h2 className="display-sans text-ink text-4xl md:text-[56px]">Got a <em className="accent-italic">question?</em></h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-paper-2 transition-all duration-300"
                style={{
                  border: `1px solid ${isOpen ? 'rgba(178,152,255,0.45)' : '#E8EAEE'}`,
                  boxShadow: isOpen
                    ? '0 6px 24px rgba(10,11,20,0.06), 0 0 0 4px rgba(178,152,255,0.06)'
                    : '0 1px 0 rgba(10,11,20,0.02)',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 md:px-6 py-5 text-left gap-6 group"
                >
                  <span className={`text-[15.5px] font-medium transition-colors duration-200 ${isOpen ? 'text-ink' : 'text-ink-3 group-hover:text-ink'}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isOpen ? 'text-aurora-violet' : 'text-ink-mute'
                    }`}
                    style={{
                      background: isOpen ? 'rgba(178,152,255,0.10)' : '#F5F6FA',
                      border: `1px solid ${isOpen ? 'rgba(178,152,255,0.30)' : '#E8EAEE'}`,
                    }}
                  >
                    {isOpen ? <Minus size={14} strokeWidth={2.2} /> : <Plus size={14} strokeWidth={2.2} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 -mt-1">
                    <div className="h-px bg-rule mb-4" />
                    <p className="text-ink-3 text-[14px] leading-relaxed max-w-2xl">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-10 border-t border-rule text-center">
          <p className="text-ink-3 text-[14px] mb-5">Still have questions?</p>
          <button className="btn-ghost-light">Talk to our team</button>
        </div>
      </div>
    </section>
  );
};

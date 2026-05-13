import { useState } from 'react';
import {
  Check,
  Minus,
  Plus,
  ArrowRight,
  Image as ImageIcon,
  Users,
  Globe,
  Mail,
  BarChart3,
  Palette,
  Calculator,
  ImagePlus,
  Stamp,
  Lock,
  Sparkles,
  Headphones,
  FileText,
  DollarSign,
  History,
  type LucideIcon,
} from 'lucide-react';
import { Pricing } from '../components/Pricing';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

type Audience = 'personal' | 'business';
type Billing  = 'monthly'  | 'yearly';

type TierConfig = {
  key: string;
  name: string;
  accent: string;
  monthly: number;
  yearly: number;
  popular?: boolean;
};

const BUSINESS_TIERS: TierConfig[] = [
  { key: 'silver',  name: 'Silver',  accent: '#7F8590', monthly: 149, yearly: 110                 },
  { key: 'gold',    name: 'Gold',    accent: '#D4B87A', monthly: 349, yearly: 260, popular: true  },
  { key: 'diamond', name: 'Diamond', accent: '#6DD5FA', monthly: 849, yearly: 635                 },
];

const PERSONAL_TIERS: TierConfig[] = [
  { key: 'starter', name: 'Starter', accent: '#7F8590', monthly: 39, yearly: 30                 },
  { key: 'pro',     name: 'Pro',     accent: '#D4B87A', monthly: 99, yearly: 75,  popular: true },
];

type CompareRow = {
  label: string;
  icon: LucideIcon;
  // Indexed by tier position — must match length of the active tier list.
  values: (string | boolean)[];
};

type CompareGroup = {
  title: string;
  rows: CompareRow[];
};

// Business — verbatim from jewelerstudio.ai/pricing, 4 categories
const BUSINESS_COMPARE_GROUPS: CompareGroup[] = [
  {
    title: 'Studio & Generation',
    rows: [
      { label: 'Premium Image Generations',  icon: ImageIcon,  values: ['500',        '1,200',          '3,000'         ] },
      { label: 'Reference Image Upload',     icon: ImagePlus,  values: [false,        true,             true            ] },
      { label: 'Watermarked Images',         icon: Stamp,      values: [false,        true,             true            ] },
      { label: 'Cost Breakdown',             icon: Calculator, values: [false,        true,             true            ] },
    ],
  },
  {
    title: 'Leads & Follow-up',
    rows: [
      { label: 'Lead Pipeline',              icon: Users,      values: [true,         true,             true            ] },
      { label: 'Analytics Dashboard',        icon: BarChart3,  values: [true,         true,             true            ] },
      { label: 'Automated Follow Up',        icon: Mail,       values: ['Email only', 'Email + SMS',    'Email + SMS'   ] },
    ],
  },
  {
    title: 'Integration & Brand',
    rows: [
      { label: 'Website Integration',        icon: Globe,      values: ['Standard',   'White-glove',    'White-glove'   ] },
      { label: 'Customization',              icon: Palette,    values: ['Basic',      'Branded',        'Enhanced'      ] },
      { label: 'Jeweler Studio Access',      icon: Sparkles,   values: ['Standard',   'Standard',       'Full Suite'    ] },
      { label: 'Direct Design Deposit',      icon: Lock,       values: [false,        false,            true            ] },
    ],
  },
  {
    title: 'Support',
    rows: [
      { label: 'Support',                    icon: Headphones, values: ['Basic',      'Pro',            '24/7 Priority' ] },
    ],
  },
];

// Personal — Starter and Pro are feature-identical; only the generation
// cap differs. Quotes & deposits toolkit is included on both.
const PERSONAL_COMPARE_GROUPS: CompareGroup[] = [
  {
    title: 'Studio & Generation',
    rows: [
      { label: 'Premium Image Generations',          icon: ImageIcon,  values: ['100', '350'] },
      { label: 'Premium Studio AI',                  icon: Sparkles,   values: [true,  true ] },
      { label: 'Customizable Styles, Materials & Settings', icon: Palette, values: [true,  true ] },
      { label: 'Reference Image Upload',             icon: ImagePlus,  values: [true,  true ] },
      { label: 'Personal Design Library',            icon: Users,      values: [true,  true ] },
    ],
  },
  {
    title: 'Customer Quotes & Deposits',
    rows: [
      { label: 'Generate & Send Custom Quotes',      icon: FileText,    values: [true, true] },
      { label: 'Accept Design Deposits',             icon: DollarSign,  values: [true, true] },
      { label: 'View & Track All Sent Quotes',       icon: History,     values: [true, true] },
    ],
  },
];

// Verbatim from jewelerstudio.ai/pricing FAQ
const PRICING_FAQS = [
  {
    q: 'How much does Jeweler Studio cost?',
    a: 'Silver at $149/month, Gold at $349/month, and Diamond at $849/month. Every plan includes a 7-day free trial.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Every Jeweler Studio plan includes a 7-day free trial with full access. No credit card required to start, and no setup fees.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. There are no long-term contracts. You can cancel anytime directly from your account settings.',
  },
  {
    q: "What's the difference between the Silver and Gold plans?",
    a: 'Gold plan adds automated email and SMS follow-up for every captured lead, plus a dedicated success manager.',
  },
];

export const PricingPage = ({ onDemoClick }: { onDemoClick: () => void }) => {
  // Lifted state — both Pricing (the tier cards) and ComparisonTable share
  // a single audience+billing source of truth so the toggle drives both.
  const [audience, setAudience] = useState<Audience>('business');
  const [billing,  setBilling]  = useState<Billing>('monthly');

  return (
    <div className="bg-paper text-ink min-h-screen">
      <Pricing
        onDemoClick={onDemoClick}
        audience={audience}
        onAudienceChange={setAudience}
        billing={billing}
        onBillingChange={setBilling}
      />
      <ComparisonTable audience={audience} billing={billing} />
      <PricingFaq />
      <PricingCta onDemoClick={onDemoClick} />

      {/* Section-scoped keyframes */}
      <style>{`
        @keyframes pricingPageAtmA {
          0%   { transform: translate(0, 0)    scale(1);   }
          100% { transform: translate(6%, -4%) scale(1.10); }
        }
        @keyframes pricingPageAtmB {
          0%   { transform: translate(0, 0)    scale(1);   }
          100% { transform: translate(-5%, 5%) scale(1.12); }
        }
        @keyframes pricingPageAtmC {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
          100% { transform: translate(-48%, -52%) scale(1.15); opacity: 1;   }
        }
        @keyframes pricingPageCurtain {
          0%   { transform: translateX(0); }
          100% { transform: translateX(33.33%); }
        }
      `}</style>
    </div>
  );
};


// =============================================================================
// COMPARISON TABLE — dark glass, lifted Gold column with animated aurora frame
// =============================================================================

const ComparisonTable = ({
  audience,
  billing,
}: {
  audience: Audience;
  billing: Billing;
}) => {
  const { ref, isVisible } = useScrollTrigger(0.1);

  // Active tier list + compare groups for the current audience.
  const tiers  = audience === 'personal' ? PERSONAL_TIERS         : BUSINESS_TIERS;
  const groups = audience === 'personal' ? PERSONAL_COMPARE_GROUPS : BUSINESS_COMPARE_GROUPS;
  const popularIdx = tiers.findIndex((t) => t.popular);

  // Grid template — 1.7fr for the Feature column, then equal columns for each tier.
  // (CSS grid can't be expressed via Tailwind class with dynamic counts, so this
  // goes through inline style on every grid row.)
  const gridTemplateColumns = `1.7fr ${tiers.map(() => '1fr').join(' ')}`;
  const gridStyle = { gridTemplateColumns } as const;

  // Stable key for remount-on-audience-change → reveal cascade replays each toggle.
  const remountKey = audience;

  // Flat row index for staggered reveals across all groups
  let rowCounter = 0;

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-5 sm:px-6 border-t border-rule relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #EEF0F6 0%, #E4E7F0 50%, #EAEDF4 100%)',
      }}
    >
      {/* Subtle wash + aurora tints — give the glass card something to refract */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.85), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/3 left-[10%] w-[480px] h-[460px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(178,152,255,0.18), transparent 70%)',
            filter: 'blur(70px)',
            animation: 'pricingPageAtmA 26s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute bottom-1/4 right-[10%] w-[480px] h-[460px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(109,213,250,0.18), transparent 70%)',
            filter: 'blur(70px)',
            animation: 'pricingPageAtmB 30s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))' }}
            />
            <div className="eyebrow">Compare plans</div>
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)' }}
            />
          </div>
          <h2 className="display-sans text-ink font-bold text-[32px] sm:text-[42px] md:text-[56px] lg:text-[68px] leading-[1.04] tracking-tight">
            Every feature, <em className="accent-italic">side by side.</em>
          </h2>
        </div>

        {/* Comparison card — remounts on audience change so the reveal
            cascade replays for the new column count. */}
        <div className="relative" key={remountKey}>
          {/* Most Popular badge — floats above the popular tier's column.
              Position by rendering one slot per column and only filling the
              popular one. The leading empty div represents the Feature column. */}
          <div
            className="absolute left-0 right-0 top-0 grid pointer-events-none z-20"
            style={{ ...gridStyle, transform: 'translateY(-50%)' }}
          >
            <div />
            {tiers.map((t, i) => (
              <div key={t.key} className="flex justify-center">
                {i === popularIdx && (
                  <span
                    className="font-mono text-[10px] tracking-eyebrow uppercase font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
                      color: '#0A0B14',
                      boxShadow:
                        '0 6px 18px -4px rgba(178,152,255,0.55), 0 1px 0 rgba(255,255,255,0.45) inset',
                      border: '1px solid rgba(255,255,255,0.40)',
                    }}
                  >
                    Most Popular
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Card surface — frosted light glass */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.30) 45%, rgba(255,255,255,0.45) 100%)',
              backdropFilter: 'blur(40px) saturate(180%) brightness(105%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(105%)',
              border: '1px solid rgba(255,255,255,0.85)',
              boxShadow: [
                '0 2px 0 rgba(255,255,255,0.95) inset',
                '0 -1px 0 rgba(10,11,20,0.04) inset',
                '0 0 0 1px rgba(255,255,255,0.40) inset',
                '0 24px 60px -16px rgba(10,11,20,0.12)',
                '0 1px 4px rgba(10,11,20,0.06)',
              ].join(', '),
            }}
          >
            {/* Top specular light line — glass catches light */}
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-12 h-px pointer-events-none z-30"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)',
              }}
            />
            {/* Faint upper inner glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, transparent 100%)',
              }}
            />
            {/* Popular-column highlight — tinted band on the popular tier */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 grid pointer-events-none z-0"
              style={{ ...gridStyle, left: 0, right: 0 }}
            >
              <div />
              {tiers.map((t, i) => (
                <div key={t.key} className="relative">
                  {i === popularIdx && (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(178,152,255,0.14) 0%, rgba(224,231,255,0.08) 50%, rgba(109,213,250,0.10) 100%)',
                          boxShadow:
                            '0 0 28px rgba(178,152,255,0.10) inset, 0 1px 0 rgba(255,255,255,0.50) inset',
                        }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-[40%]"
                        style={{
                          background:
                            'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(178,152,255,0.22) 0%, rgba(255,255,255,0.10) 35%, transparent 70%)',
                        }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Vertical column dividers — hairlines between each tier column,
                but not between Feature↔first-tier or after the last tier. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid pointer-events-none z-[5]"
              style={gridStyle}
            >
              <div />
              {tiers.map((t, i) => (
                <div
                  key={t.key}
                  style={{
                    borderRight:
                      i < tiers.length - 1
                        ? '1px solid rgba(10,11,20,0.14)'
                        : 'none',
                  }}
                />
              ))}
            </div>

            {/* Header row */}
            <div
              className="relative grid items-center px-4 md:px-6 py-5 md:py-6 z-10"
              style={{
                ...gridStyle,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.20) 100%)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.70) inset',
              }}
            >
              <div className="font-mono text-[11px] md:text-[13px] tracking-eyebrow uppercase font-bold text-ink-mute">
                Feature
              </div>
              {tiers.map((t, i) => (
                <TierHeaderCell
                  key={t.key}
                  name={t.name}
                  accent={t.accent}
                  highlighted={i === popularIdx}
                />
              ))}

              {/* Full-width grey underline at the bottom of the header */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: 'rgba(10,11,20,0.15)' }}
              />
            </div>

            {/* Categorized feature groups */}
            {groups.map((group, gIdx) => (
              <div key={group.title}>
                {/* Category header */}
                <div
                  className="relative grid items-center px-4 md:px-6 pt-7 pb-3 z-10"
                  style={{
                    ...gridStyle,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 600ms ease, transform 600ms ease',
                    transitionDelay: `${260 + gIdx * 90}ms`,
                  }}
                >
                  <div
                    className="font-mono text-[11px] md:text-[12.5px] tracking-eyebrow uppercase font-bold"
                    style={{ color: '#7C5BFF' }}
                  >
                    {group.title}
                  </div>
                  {tiers.map((t) => (
                    <div key={t.key} />
                  ))}
                </div>

                {/* Feature rows within this group */}
                {group.rows.map((row, rIdx) => {
                  const Icon = row.icon;
                  const myIdx = rowCounter++;
                  const isLastInGroup = rIdx === group.rows.length - 1;
                  return (
                    <div
                      key={row.label}
                      className="relative grid items-center px-4 md:px-6 py-3 md:py-3.5 z-10 transition-colors duration-200"
                      style={{
                        ...gridStyle,
                        borderBottom: isLastInGroup
                          ? 'none'
                          : '1px solid rgba(10,11,20,0.05)',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                        transition:
                          'opacity 500ms ease, transform 500ms ease, background-color 200ms ease',
                        transitionDelay: `${320 + myIdx * 40}ms`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.40)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="flex items-center gap-2.5 md:gap-3 pr-3">
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.45))',
                            border: '1px solid rgba(178,152,255,0.30)',
                            boxShadow:
                              '0 1px 0 rgba(255,255,255,0.80) inset, 0 4px 12px -4px rgba(178,152,255,0.15)',
                          }}
                        >
                          <Icon size={13} strokeWidth={1.8} className="text-aurora-violet" />
                        </span>
                        <span className="text-ink text-[15px] md:text-[16.5px] font-medium leading-snug">
                          {row.label}
                        </span>
                      </div>
                      {row.values.map((v, i) => (
                        <CompareCell
                          key={tiers[i]?.key ?? i}
                          value={v}
                          highlighted={i === popularIdx}
                        />
                      ))}
                    </div>
                  );
                })}

                {/* Group divider — stronger hairline between categories */}
                {gIdx < groups.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="relative h-px mx-4 md:mx-6 mt-5 z-10"
                    style={{ background: 'rgba(10,11,20,0.12)' }}
                  />
                )}
              </div>
            ))}

            {/* Bottom CTA strip — one final price reminder, reflects billing */}
            <div
              className="relative grid items-center px-4 md:px-6 py-5 md:py-6 mt-4 z-10"
              style={{
                ...gridStyle,
                borderTop: '1px solid rgba(255,255,255,0.50)',
                background:
                  'linear-gradient(0deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              }}
            >
              <div className="font-mono text-[11px] md:text-[13px] tracking-eyebrow uppercase font-bold text-ink-mute">
                Starting at
              </div>
              {tiers.map((t, i) => {
                const price = billing === 'yearly' ? t.yearly : t.monthly;
                return (
                  <TierPriceCell
                    key={`${t.key}-${billing}`}
                    price={`$${price}`}
                    highlighted={i === popularIdx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TierHeaderCell = ({
  name,
  accent,
  highlighted,
}: {
  name: string;
  accent: string;
  highlighted?: boolean;
}) => (
  <div className="text-center">
    <span
      className={`font-mono tracking-eyebrow uppercase font-bold ${
        highlighted ? 'text-[14px] md:text-[16px]' : 'text-[12px] md:text-[14px]'
      }`}
      style={{ color: accent }}
    >
      {name}
    </span>
  </div>
);

const TierPriceCell = ({ price, highlighted }: { price: string; highlighted?: boolean }) => (
  <div className="text-center">
    <span
      className={`display-sans tabular font-bold ${
        highlighted
          ? 'text-[22px] md:text-[28px] text-ink'
          : 'text-[18px] md:text-[22px] text-ink-mute'
      }`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {price}
      <span
        className={`font-sans font-normal ml-1 ${
          highlighted ? 'text-[12px] text-ink-mute' : 'text-[11px] text-ink-faint'
        }`}
      >
        /mo
      </span>
    </span>
  </div>
);

const CompareCell = ({
  value,
  highlighted,
}: {
  value: string | boolean;
  highlighted?: boolean;
}) => {
  if (typeof value === 'string') {
    return (
      <div
        className={`text-center tabular ${
          highlighted
            ? 'text-[15px] md:text-[17px] font-bold text-ink'
            : 'text-[14px] md:text-[16px] font-medium text-ink-3'
        }`}
      >
        {value}
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      {value ? (
        <Check
          size={20}
          strokeWidth={2.5}
          className={highlighted ? 'text-aurora-violet' : 'text-aurora-violet/80'}
        />
      ) : (
        <Minus size={20} strokeWidth={2} className="text-ink-faint" />
      )}
    </div>
  );
};

// =============================================================================
// PRICING FAQ
// =============================================================================

const PricingFaq = () => {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, isVisible } = useScrollTrigger(0.1);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-5 sm:px-6 border-t border-rule bg-paper"
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="text-center mb-12 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))' }}
            />
            <div className="eyebrow">Pricing FAQ</div>
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)' }}
            />
          </div>
          <h2 className="display-sans text-ink font-bold text-[32px] sm:text-[42px] md:text-[52px] leading-[1.05] tracking-tight">
            Got a <em className="accent-italic">question?</em>
          </h2>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, i) => {
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
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${i * 80}ms`,
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
      </div>
    </section>
  );
};

// =============================================================================
// FINAL CTA — cinematic dark closer with aurora curtains
// =============================================================================

const PricingCta = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  return (
    <section
      ref={ref}
      className="relative border-t border-hairline overflow-hidden bg-obsidian"
    >
      {/* Sweeping aurora curtains */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '-15%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: 'rotate(-8deg)',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.28) 35%, rgba(178,152,255,0.38) 50%, rgba(168,100,255,0.28) 65%, transparent 100%)',
              filter: 'blur(70px)',
              animation: 'pricingPageCurtain 18s linear infinite',
            }}
          />
        </div>
        <div
          className="absolute"
          style={{
            top: '30%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: 'rotate(6deg)',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(80,220,255,0.22) 35%, rgba(109,213,250,0.32) 50%, rgba(80,220,255,0.22) 65%, transparent 100%)',
              filter: 'blur(80px)',
              animation: 'pricingPageCurtain 24s linear infinite',
              animationDelay: '-6s',
            }}
          />
        </div>
        <div
          className="absolute"
          style={{
            bottom: '-10%',
            left: 0,
            width: '100%',
            height: '55%',
            transform: 'rotate(-12deg)',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.22) 30%, rgba(109,213,250,0.26) 50%, rgba(168,100,255,0.22) 70%, transparent 100%)',
              filter: 'blur(90px)',
              animation: 'pricingPageCurtain 30s linear infinite',
              animationDelay: '-14s',
            }}
          />
        </div>
      </div>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(8,9,13,0.55) 75%, rgba(8,9,13,0.85) 100%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center py-28 md:py-36 px-6">
        <div
          className="flex items-center justify-center gap-3 mb-7"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms ease',
          }}
        >
          <span
            className="h-px w-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))' }}
          />
          <div className="font-mono text-[11px] tracking-eyebrow uppercase font-bold text-aurora-violet">
            Start free
          </div>
          <span
            className="h-px w-10"
            style={{ background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)' }}
          />
        </div>

        <h2
          className="display text-ice text-[44px] md:text-[68px] lg:text-[88px] mb-8 text-balance leading-[1.02]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 800ms ease 150ms, transform 800ms ease 150ms',
          }}
        >
          Try Jeweler Studio<br /><em className="accent-italic">free for 7 days.</em>
        </h2>

        <p
          className="text-smoke text-[17px] md:text-[19px] font-normal mb-11 max-w-xl mx-auto leading-relaxed"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 800ms ease 300ms, transform 800ms ease 300ms',
          }}
        >
          No credit card. No commitment. Cancel anytime, directly from your account.
        </p>

        <button onClick={onDemoClick} className="btn-aurora group">
          Start 7-day free trial
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="font-mono text-[11px] tracking-eyebrow uppercase font-bold text-smoke-2 mt-7">
          ★ First lead captured within 48 hours
        </p>
      </div>
    </section>
  );
};

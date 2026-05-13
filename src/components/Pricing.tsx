import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

// =============================================================================
// REVEAL CASCADE
// =============================================================================

const TIER_DELAYS = {
  ornamentEyebrow: 0,
  headline:        120,
  subline:         280,
  card:            [380, 500, 620], // Silver / Gold / Diamond
} as const;

// =============================================================================
// COUNT-UP HOOK
// =============================================================================

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (
  target: number,
  start: number,
  isVisible: boolean,
  startDelay: number,
  duration = 1200
) => {
  const [n, setN] = useState(start);
  useEffect(() => {
    if (!isVisible) return;
    const t0 = performance.now() + startDelay;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - t0;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / duration, 1);
      const value = Math.round(start + (target - start) * easeOutExpo(p));
      setN(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target, start, startDelay, duration]);
  return n;
};

// =============================================================================
// TYPES + DATA
// =============================================================================

type Feature =
  | string
  | { text: string; bold?: true }
  | { text: string; plus: true }
  | { text: string; subItems: string[] };

type Tier = {
  name: string;
  price: number;        // monthly price
  yearlyPrice: number;  // pre-rounded yearly per-month price (25% off, rounded to clean values)
  priceFrom: number;
  popular?: boolean;
  ctaLabel: string;
  description: string;
  accent: string;
  accentRgb: string;
  features: Feature[];
};

type Audience = 'personal' | 'business';
type Billing  = 'monthly'  | 'yearly';

const priceFor = (tier: Tier, billing: Billing) =>
  billing === 'yearly' ? tier.yearlyPrice : tier.price;

// =============================================================================
// PERSONAL TIERS — design-tool only, no website embed or lead pipeline
// =============================================================================

// Starter ≡ Pro on features; the only difference is the generation cap.
// Both tiers ship with the customer-quote + design-deposit toolkit.
const PERSONAL_FEATURES_SHARED: Feature[] = [
  'Premium Studio AI',
  'Customizable jewelry styles, materials, and settings',
  'Reference image upload',
  'Personal design library',
  {
    text: 'Customer quotes & deposits:',
    subItems: [
      'Generate & send custom quotes',
      'Accept design deposits',
      'View & track all sent quotes',
    ],
  },
];

const PERSONAL_TIERS: Tier[] = [
  {
    name: 'Starter',
    price: 39,
    yearlyPrice: 30,
    priceFrom: 30,
    ctaLabel: 'Start with Starter',
    description: 'For hobbyists and individuals exploring AI jewelry design.',
    accent: '#B0B5BD',
    accentRgb: '176,181,189',
    features: [
      { text: '100 premium image generations / month', bold: true },
      ...PERSONAL_FEATURES_SHARED,
    ],
  },
  {
    name: 'Pro',
    price: 99,
    yearlyPrice: 75,
    priceFrom: 70,
    popular: true,
    ctaLabel: 'Start with Pro',
    description: 'For prosumer designers who create jewelry consistently.',
    accent: '#E8C97F',
    accentRgb: '232,201,127',
    features: [
      { text: '350 premium image generations / month', bold: true },
      ...PERSONAL_FEATURES_SHARED,
    ],
  },
];

// =============================================================================
// BUSINESS TIERS — full platform: design + lead pipeline + website embed
// (Verbatim feature lists from jewelerstudio.ai/pricing)
// =============================================================================

const BUSINESS_TIERS: Tier[] = [
  {
    name: 'Silver',
    price: 149,
    yearlyPrice: 110,
    priceFrom: 100,
    ctaLabel: 'Start with Silver',
    description: 'For solo jewelers and boutique studios starting with AI design.',
    accent: '#B0B5BD',
    accentRgb: '176,181,189',
    features: [
      { text: '500 premium image generations / month', bold: true },
      'Customizable jewelry styles, materials, and settings',
      'Sales opportunity pipeline with categorized leads',
      'Full website integration',
      'Customer quote request form for design follow-ups',
      'Analytics dashboard with customer behavior insights',
      'Automated email follow-ups for leads and abandoned designs',
      'Basic customization features',
    ],
  },
  {
    name: 'Gold',
    price: 349,
    yearlyPrice: 260,
    priceFrom: 250,
    popular: true,
    ctaLabel: 'Start with Gold',
    description: 'For growing custom jewelry businesses automating lead follow-up.',
    accent: '#E8C97F',
    accentRgb: '232,201,127',
    features: [
      { text: 'Everything in Silver, plus', plus: true },
      { text: '1,200 premium image generations / month', bold: true },
      'Integrated material cost breakdown',
      'Reference image upload for guided design generation',
      'Advanced automated follow-up via Email & SMS',
      'Business logo uploading for enhanced platform branding',
      'Watermarked images with your logo of choice',
      'Dedicated success manager + white-glove integration',
    ],
  },
  {
    name: 'Diamond',
    price: 849,
    yearlyPrice: 635,
    priceFrom: 700,
    ctaLabel: 'Start with Diamond',
    description: 'For established jewelers using the full Jeweler Studio AI suite.',
    accent: '#6DD5FA',
    accentRgb: '109,213,250',
    features: [
      { text: 'Everything in Silver & Gold, plus', plus: true },
      { text: '3,000 premium image generations / month', bold: true },
      'Seamless design-deposit integration',
      'Enhanced UI customization',
      {
        text: 'Full Jeweler Studio Suite Access:',
        subItems: [
          'AI Jeweler Designer',
          '3D Engagement Ring Customizer',
          'Integrated Picture Pendant Visualizer',
        ],
      },
    ],
  },
];

// =============================================================================
// MAIN
// =============================================================================

export const Pricing = ({
  onDemoClick,
  audience: audienceProp,
  onAudienceChange,
  billing: billingProp,
  onBillingChange,
}: {
  onDemoClick: () => void;
  audience?: Audience;
  onAudienceChange?: (a: Audience) => void;
  billing?: Billing;
  onBillingChange?: (b: Billing) => void;
}) => {
  const { ref, isVisible } = useScrollTrigger(0.12);
  // Controlled-when-prop-provided, otherwise internal state (keeps backwards compat).
  const [audienceState, setAudienceState] = useState<Audience>('business');
  const [billingState,  setBillingState]  = useState<Billing>('monthly');
  const audience = audienceProp ?? audienceState;
  const billing  = billingProp  ?? billingState;
  const setAudience = (a: Audience) => (onAudienceChange ? onAudienceChange(a) : setAudienceState(a));
  const setBilling  = (b: Billing)  => (onBillingChange  ? onBillingChange(b)  : setBillingState(b));

  const tiers = audience === 'personal' ? PERSONAL_TIERS : BUSINESS_TIERS;

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-28 md:py-36 px-5 sm:px-6 border-t border-hairline relative overflow-hidden"
      style={{
        // Solid dark base. The two bg layers cross-fade ON TOP of this so during
        // the transition the underlying light page bg never bleeds through.
        // Color animates between the two endpoint tints for a smooth color shift.
        background: audience === 'personal' ? '#2A2231' : '#08090D',
        transition: 'background-color 900ms ease-out',
      }}
    >
      {/* BUSINESS bg — cool obsidian + violet/cyan aurora */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-[900ms] ease-out"
        style={{ opacity: audience === 'business' ? 1 : 0 }}
      >
        <div className="absolute inset-0" style={{ background: '#08090D' }} />
        <div
          className="absolute top-1/4 left-[8%] w-[760px] h-[540px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.20), transparent 65%)',
            filter: 'blur(80px)',
            animation: 'pricingAtmA 24s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute bottom-[6%] right-[10%] w-[760px] h-[540px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(109,213,250,0.18), transparent 65%)',
            filter: 'blur(80px)',
            animation: 'pricingAtmB 28s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* PERSONAL bg — warm "atelier" mode: medium aubergine + champagne wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-[900ms] ease-out"
        style={{ opacity: audience === 'personal' ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #2A2231 0%, #322834 45%, #2A2231 100%)',
          }}
        />
        {/* Champagne wash from upper-left */}
        <div
          className="absolute top-[12%] left-[10%] w-[820px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,201,127,0.32), transparent 65%)',
            filter: 'blur(80px)',
            animation: 'pricingAtmA 28s ease-in-out infinite alternate',
          }}
        />
        {/* Soft rose-violet from lower-right */}
        <div
          className="absolute bottom-[10%] right-[12%] w-[700px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(248,200,212,0.20), transparent 65%)',
            filter: 'blur(80px)',
            animation: 'pricingAtmB 32s ease-in-out infinite alternate',
          }}
        />
        {/* Subtle iris highlight in the center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(224,231,255,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* PRIMARY TOGGLE — Personal / Business. Hero element at the top of the
            section, sets the entire experience that follows. */}
        <div
          className="flex justify-center mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition:
              'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <AudienceToggle audience={audience} onChange={setAudience} />
        </div>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div
            className="flex items-center justify-center gap-3 mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease',
              transitionDelay: `${TIER_DELAYS.ornamentEyebrow}ms`,
            }}
          >
            <span
              className="h-px"
              style={{
                width: isVisible ? '48px' : '0px',
                background:
                  audience === 'personal'
                    ? 'linear-gradient(90deg, transparent, rgba(232,201,127,0.65))'
                    : 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))',
                transition: 'width 900ms cubic-bezier(0.16,1,0.3,1) 100ms, background 500ms ease',
              }}
            />
            <div
              className="font-mono text-[11px] tracking-eyebrow uppercase font-bold transition-colors duration-500"
              style={{ color: audience === 'personal' ? '#E8C97F' : '#B298FF' }}
            >
              {audience === 'personal' ? 'For solo creators' : 'Pricing'}
            </div>
            <span
              className="h-px"
              style={{
                width: isVisible ? '48px' : '0px',
                background:
                  audience === 'personal'
                    ? 'linear-gradient(90deg, rgba(232,201,127,0.65), transparent)'
                    : 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)',
                transition: 'width 900ms cubic-bezier(0.16,1,0.3,1) 100ms, background 500ms ease',
              }}
            />
          </div>

          <h2
            className="display-sans text-ice font-bold text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[1.02] tracking-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
              transition:
                'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: `${TIER_DELAYS.headline}ms`,
            }}
          >
            {audience === 'personal' ? (
              <>Designed for the <em className="accent-italic">private jeweler.</em></>
            ) : (
              <>Simple pricing. <em className="accent-italic">Built for Scale.</em></>
            )}
          </h2>

          <p
            className="text-smoke text-[15.5px] md:text-[17px] leading-relaxed mt-6 max-w-[52ch] mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease, transform 700ms ease',
              transitionDelay: `${TIER_DELAYS.subline}ms`,
            }}
          >
            {audience === 'personal'
              ? 'A standalone AI design tool. Just you, your imagination, and the renders — no website embed, no lead pipeline, no follow-ups.'
              : 'Every plan ships with a 7-day free trial. No setup fees, no contracts.'}
          </p>
        </div>

        {/* SECONDARY TOGGLE — billing period. Smaller, sits as a quiet pill
            above the cards so it doesn't compete with the audience toggle above. */}
        <div
          className="flex justify-center mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease, transform 700ms ease',
            transitionDelay: '320ms',
          }}
        >
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* Tier cards */}
        <div
          className={`grid ${
            audience === 'personal'
              ? 'sm:grid-cols-2 max-w-3xl'
              : 'lg:grid-cols-3 max-w-6xl'
          } gap-5 md:gap-6 items-stretch mx-auto`}
        >
          {tiers.map((tier, i) => (
            <PricingCard
              key={`${audience}-${tier.name}`}
              tier={tier}
              billing={billing}
              isVisible={isVisible}
              delay={TIER_DELAYS.card[i] ?? 380 + i * 120}
              onDemoClick={onDemoClick}
            />
          ))}
        </div>

        {/* Trust row beneath cards */}
        <div
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 700ms ease, transform 700ms ease',
            transitionDelay: '1100ms',
          }}
        >
          <TrustChip>Cancel anytime</TrustChip>
          <TrustChip>Live in minutes</TrustChip>
        </div>
      </div>

      <style>{`
        @keyframes pricingAtmA {
          0%   { transform: translate(0, 0)       scale(1);   }
          100% { transform: translate(6%, -3%)    scale(1.08); }
        }
        @keyframes pricingAtmB {
          0%   { transform: translate(0, 0)       scale(1);   }
          100% { transform: translate(-5%, 4%)    scale(1.10); }
        }
        @keyframes pricingAuroraShift {
          0%   { background-position: 0% 50%;   }
          100% { background-position: 200% 50%; }
        }
        @keyframes pricingPopularGlow {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1;    }
        }
        @keyframes pricingPriceSwap {
          0%   { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </section>
  );
};

// =============================================================================
// AUDIENCE TOGGLE — the primary toggle. Large, premium glass control with a
// sliding pill indicator that animates between Personal and Business.
// =============================================================================

const AudienceToggle = ({
  audience,
  onChange,
}: {
  audience: Audience;
  onChange: (v: Audience) => void;
}) => (
  <div
    className="relative inline-flex rounded-full p-1.5"
    style={{
      background: 'rgba(20,22,30,0.72)',
      border: '1px solid rgba(255,255,255,0.14)',
      backdropFilter: 'blur(14px) saturate(150%)',
      WebkitBackdropFilter: 'blur(14px) saturate(150%)',
      boxShadow:
        '0 1px 0 rgba(255,255,255,0.10) inset, 0 8px 24px -8px rgba(0,0,0,0.45), 0 0 28px -8px rgba(178,152,255,0.22)',
    }}
    role="tablist"
    aria-label="Audience"
  >
    {/* Sliding indicator pill — slides between the two options */}
    <span
      aria-hidden="true"
      className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        left: audience === 'personal' ? '6px' : '50%',
        right: audience === 'business' ? '6px' : '50%',
        background:
          audience === 'personal'
            ? 'linear-gradient(135deg, #E8C97F, #D4B87A)'
            : 'linear-gradient(135deg, #6DD5FA, #B298FF)',
        boxShadow:
          audience === 'personal'
            ? '0 1px 0 rgba(255,255,255,0.35) inset, 0 4px 14px -4px rgba(232,201,127,0.55)'
            : '0 1px 0 rgba(255,255,255,0.35) inset, 0 4px 14px -4px rgba(178,152,255,0.55)',
      }}
    />

    {(['personal', 'business'] as const).map((v) => {
      const active = audience === v;
      return (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(v)}
          className="relative z-10 px-7 md:px-9 py-2.5 rounded-full font-sans text-[13.5px] md:text-[14.5px] font-semibold leading-none transition-colors duration-300"
          style={{
            color: active ? '#0A0B14' : 'rgba(245,246,248,0.75)',
          }}
        >
          {v === 'personal' ? 'Personal' : 'Business'}
        </button>
      );
    })}
  </div>
);

// =============================================================================
// BILLING TOGGLE — secondary, quieter pill. Sits between header and cards.
// =============================================================================

const BillingToggle = ({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (v: Billing) => void;
}) => (
  <div
    className="inline-flex items-center gap-2 rounded-full px-1.5 py-1.5"
    style={{
      background: 'rgba(20,22,30,0.55)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}
    role="tablist"
    aria-label="Billing period"
  >
    {(['monthly', 'yearly'] as const).map((v) => {
      const active = billing === v;
      return (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(v)}
          className="relative px-3.5 py-1.5 rounded-full font-mono text-[10.5px] tracking-eyebrow uppercase font-bold leading-none transition-all duration-300 flex items-center gap-1.5"
          style={{
            background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
            color: active ? '#F5F6F8' : 'rgba(245,246,248,0.50)',
            boxShadow: active ? '0 1px 0 rgba(255,255,255,0.16) inset' : 'none',
          }}
        >
          {v === 'monthly' ? 'Monthly' : 'Yearly'}
          {v === 'yearly' && (
            <span
              className="text-[9px] tracking-eyebrow uppercase font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: active ? 'rgba(107,211,163,0.18)' : 'rgba(107,211,163,0.12)',
                color: '#6BD3A3',
                border: '1px solid rgba(107,211,163,0.40)',
              }}
            >
              −25%
            </span>
          )}
        </button>
      );
    })}
  </div>
);

// =============================================================================
// TRUST CHIP
// =============================================================================

const TrustChip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-aurora-violet/40"
    style={{
      background: 'rgba(20,22,30,0.55)',
      border: '1px solid rgba(255,255,255,0.10)',
    }}
  >
    <Check size={11} strokeWidth={2.6} className="text-aurora-violet" />
    <span className="font-mono text-[10.5px] tracking-eyebrow uppercase font-bold text-smoke">
      {children}
    </span>
  </span>
);

// =============================================================================
// PRICING CARD
// =============================================================================

const PricingCard = ({
  tier,
  billing,
  isVisible,
  delay,
  onDemoClick,
}: {
  tier: Tier;
  billing: Billing;
  isVisible: boolean;
  delay: number;
  onDemoClick: () => void;
}) => {
  const isPopular = !!tier.popular;
  const displayPrice = priceFor(tier, billing);

  return (
    <div
      className="relative h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition:
          'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Animated aurora hairline frame for the popular card */}
      {isPopular && (
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #6DD5FA 0%, #B298FF 25%, #E0E7FF 50%, #B298FF 75%, #6DD5FA 100%)',
            backgroundSize: '200% 100%',
            animation: 'pricingAuroraShift 6s linear infinite',
          }}
        />
      )}

      <div
        className="relative h-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          // Card surface — flat dark for popular (no top color wash), subtle tier tint for others
          background: isPopular
            ? 'linear-gradient(180deg, #1A1D27 0%, #14161E 100%)'
            : `linear-gradient(180deg, rgba(${tier.accentRgb},0.04) 0%, #14161E 35%, #0F1117 100%)`,
          border: isPopular ? '1px solid transparent' : `1px solid rgba(${tier.accentRgb},0.20)`,
          boxShadow: isPopular
            ? '0 22px 60px -12px rgba(178,152,255,0.45), 0 0 60px -20px rgba(178,152,255,0.40), 0 0 0 1px rgba(255,255,255,0.04) inset'
            : `0 12px 36px -16px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 60px -20px rgba(${tier.accentRgb},0.35)`,
        }}
      >
        {/* Top accent stripe — tier-colored hairline at the very top edge */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-6 right-6 h-px pointer-events-none z-10"
          style={{
            background: isPopular
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.60), transparent)'
              : `linear-gradient(90deg, transparent, rgba(${tier.accentRgb},1), transparent)`,
          }}
        />

        {/* Spotlight glow at top — only on non-popular cards (Gold gets the outer aurora glow instead) */}
        {!isPopular && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[55%] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 85% 100% at 50% 0%, rgba(${tier.accentRgb},0.32) 0%, rgba(${tier.accentRgb},0.12) 40%, transparent 75%)`,
            }}
          />
        )}

        {/* Bottom edge color wash — pulls tier color down through the card */}
        {!isPopular && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 100% 80% at 50% 100%, rgba(${tier.accentRgb},0.08) 0%, transparent 70%)`,
            }}
          />
        )}

        <div className="relative p-7 md:p-8 flex flex-col h-full">
          {/* Tier name + Most Popular pill */}
          <div className="flex items-center justify-between mb-6">
            <h3
              className="font-sans text-[18px] md:text-[20px] font-medium leading-none"
              style={{ color: tier.accent }}
            >
              {tier.name}
            </h3>
            {isPopular && (
              <span
                className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(8,9,13,0.6)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#F5F6F8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Most Popular
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-1">
            <span
              key={`price-${billing}`}
              className="display-sans text-ice font-bold text-[44px] md:text-[52px] tabular leading-none tracking-tight"
              style={{
                fontVariantNumeric: 'tabular-nums',
                animation: 'pricingPriceSwap 380ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              ${displayPrice}
            </span>
            <span className="text-smoke text-[14px] font-normal">/month</span>
          </div>
          <div
            key={`caption-${billing}`}
            className="text-smoke-2 text-[11.5px] font-mono tracking-wide mb-4 min-h-[14px]"
            style={{
              animation: 'pricingPriceSwap 380ms cubic-bezier(0.16,1,0.3,1) 60ms both',
            }}
          >
            {billing === 'yearly' ? `billed annually · was $${tier.price}/mo` : 'billed monthly'}
          </div>

          {/* Description */}
          <p className="text-smoke text-[13.5px] md:text-[14px] leading-relaxed mb-7 min-h-[44px]">
            {tier.description}
          </p>

          {/* CTA */}
          <CtaButton onClick={onDemoClick} isPopular={isPopular} accentRgb={tier.accentRgb}>
            {tier.ctaLabel}
          </CtaButton>

          {/* FEATURES divider */}
          <div className="flex items-center gap-3 mt-8 mb-5">
            <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="font-mono text-[10px] tracking-eyebrow uppercase font-bold text-smoke-2">
              Features
            </span>
            <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Feature list */}
          <ul className="space-y-3 flex-1">
            {tier.features.map((feat, idx) => (
              <FeatureItem key={idx} feat={feat} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// CTA BUTTON
// =============================================================================

const CtaButton = ({
  onClick,
  isPopular,
  accentRgb,
  children,
}: {
  onClick: () => void;
  isPopular: boolean;
  accentRgb: string;
  children: React.ReactNode;
}) => {
  if (isPopular) {
    return (
      <button
        onClick={onClick}
        className="relative w-full py-3 rounded-xl font-sans font-semibold text-[14px] text-obsidian overflow-hidden transition-all duration-200 hover:brightness-110"
        style={{
          // Layered: top glass sheen + aurora gradient base
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%), linear-gradient(135deg, #6DD5FA 0%, #B298FF 100%)',
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: [
            '0 1px 0 rgba(255,255,255,0.55) inset',     // top specular
            '0 -1px 0 rgba(0,0,0,0.10) inset',          // bottom subtle dark
            '0 0 0 0.5px rgba(255,255,255,0.20) inset', // inner rim
            '0 8px 24px -6px rgba(178,152,255,0.55)',   // colored glow
            '0 1px 2px rgba(0,0,0,0.10)',               // contact shadow
          ].join(', '),
        }}
      >
        {/* Soft top-left specular highlight */}
        <span
          aria-hidden="true"
          className="absolute inset-x-4 top-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
          }}
        />
        <span className="relative">{children}</span>
      </button>
    );
  }
  // Non-popular — tier-tinted glass button
  return (
    <button
      onClick={onClick}
      className="relative w-full py-3 rounded-xl font-sans font-semibold text-[14px] text-ice overflow-hidden transition-all duration-200 hover:brightness-125"
      style={{
        background: `linear-gradient(180deg, rgba(${accentRgb},0.22) 0%, rgba(${accentRgb},0.10) 50%, rgba(${accentRgb},0.14) 100%), rgba(20,22,30,0.55)`,
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        border: `1px solid rgba(${accentRgb},0.45)`,
        boxShadow: [
          '0 1px 0 rgba(255,255,255,0.20) inset',
          '0 -1px 0 rgba(0,0,0,0.25) inset',
          `0 0 0 0.5px rgba(${accentRgb},0.20) inset`,
          `0 6px 18px -8px rgba(${accentRgb},0.40)`,
        ].join(', '),
      }}
    >
      {/* Top specular highlight in tier accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.80), transparent)`,
        }}
      />
      <span className="relative">{children}</span>
    </button>
  );
};

// =============================================================================
// FEATURE ITEM
// =============================================================================

const FeatureItem = ({ feat }: { feat: Feature }) => {
  const isPlus = typeof feat === 'object' && 'plus' in feat;
  const isBold = typeof feat === 'object' && 'bold' in feat;
  const hasSub = typeof feat === 'object' && 'subItems' in feat;
  const text = typeof feat === 'string' ? feat : feat.text;

  return (
    <li className="flex items-start gap-2.5">
      <span className="flex-shrink-0 mt-[2px]">
        {isPlus ? (
          <PlusBadge />
        ) : (
          <CheckBadge />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <span
          className={`block text-[13px] md:text-[13.5px] leading-snug ${
            isBold || isPlus ? 'font-semibold text-ice' : 'font-normal text-smoke'
          }`}
        >
          {text}
        </span>
        {hasSub && (
          <ul className="mt-1.5 space-y-1 pl-0.5">
            {(feat as { subItems: string[] }).subItems.map((sub) => (
              <li
                key={sub}
                className="text-[12.5px] md:text-[13px] text-smoke-2 leading-snug before:content-['—'] before:mr-2 before:text-smoke-2"
              >
                {sub}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

// Aurora-tinted filled check badge — matches screenshot's filled-circle check icons
const CheckBadge = () => (
  <span
    className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full"
    style={{
      background: 'rgba(178,152,255,0.16)',
      border: '1px solid rgba(178,152,255,0.40)',
    }}
  >
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5 L5.5 10.5 L11.5 4"
        stroke="#B298FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const PlusBadge = () => (
  <span
    className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full"
    style={{
      background: 'rgba(178,152,255,0.16)',
      border: '1px solid rgba(178,152,255,0.40)',
    }}
  >
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 2.5 V11.5 M2.5 7 H11.5"
        stroke="#B298FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

type Feature =
  | string
  | { text: string; bold?: true }
  | { text: string; plus: true };

type Tier = {
  name: string;
  price: number;
  popular?: boolean;
  // Per-tier accent — mirrors the pricing page so each card has its own identity.
  accent: string;       // hex used for tier name color + accent stripes
  accentRgb: string;    // rgb triplet for layered rgba() washes/glows
  features: Feature[];
};

type Audience = 'personal' | 'business';

// Compact home-page tier list — distilled to the 4 most distinctive points per tier.
// Accent colors mirror the /pricing page so the visual language is consistent
// across the two pricing surfaces.
const BUSINESS_TIERS: Tier[] = [
  {
    name: 'Silver',
    price: 149,
    accent: '#B0B5BD',
    accentRgb: '176,181,189',
    features: [
      { text: '500 premium image generations / month', bold: true },
      'Premium Studio AI',
      'Jeweler Dashboard CRM',
      'Full website integration',
    ],
  },
  {
    name: 'Gold',
    price: 349,
    popular: true,
    accent: '#E8C97F',
    accentRgb: '232,201,127',
    features: [
      { text: 'Everything in Silver, plus', plus: true },
      { text: '1,200 image generations / month', bold: true },
      'Email & SMS follow-up',
      'Dedicated success manager',
    ],
  },
  {
    name: 'Diamond',
    price: 849,
    accent: '#6DD5FA',
    accentRgb: '109,213,250',
    features: [
      { text: 'Everything in Silver & Gold, plus', plus: true },
      { text: '3,000 image generations / month', bold: true },
      'Design-deposit integration',
      'Full Jeweler Studio Suite Access',
    ],
  },
];

// Starter ≡ Pro on features; only the generation cap differs. Same condensed
// 4-feature list shows on both cards with the bold gen line varying.
const PERSONAL_TIERS: Tier[] = [
  {
    name: 'Starter',
    price: 39,
    accent: '#B0B5BD',
    accentRgb: '176,181,189',
    features: [
      { text: '100 premium image generations / month', bold: true },
      'Premium Studio AI',
      'Personal design library',
      'Customer quotes & design deposits',
    ],
  },
  {
    name: 'Pro',
    price: 99,
    accent: '#E8C97F',
    accentRgb: '232,201,127',
    features: [
      { text: '350 premium image generations / month', bold: true },
      'Premium Studio AI',
      'Personal design library',
      'Customer quotes & design deposits',
    ],
  },
];

export const PricingPreview = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.15);
  const [audience, setAudience] = useState<Audience>('business');
  const tiers = audience === 'personal' ? PERSONAL_TIERS : BUSINESS_TIERS;

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-28 md:py-36 px-5 sm:px-6 border-t border-rule bg-paper relative overflow-hidden"
    >
      {/* Card entry animation — runs on every mount, which means both
          first-reveal and every audience toggle (grid keyed on audience).
          Aurora-frame shift animates the popular card's hairline border. */}
      <style>{`
        @keyframes pricingCardEnter {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
            filter: blur(6px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .pricing-card-enter {
          animation: pricingCardEnter 720ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes pricingPreviewAuroraShift {
          0%   { background-position: 0% 50%;   }
          100% { background-position: 200% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pricing-card-enter {
            animation-duration: 1ms;
          }
        }
      `}</style>

      {/* BUSINESS BACKGROUND — diagonal aurora beam pattern.
          Each beam is a REPEATING gradient that animates background-position
          by exactly one tile-width per cycle, so the loop is mathematically
          seamless — no snap when the keyframe wraps. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: audience === 'business' ? 1 : 0,
          transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Beam 1 — violet, top half, tilted up */}
        <div
          className="absolute"
          style={{
            top: '-25%',
            left: '-25%',
            width: '150%',
            height: '80%',
            transform: 'rotate(-10deg)',
            transformOrigin: '50% 50%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(178,152,255,0.10) 25%, rgba(178,152,255,0.18) 50%, rgba(178,152,255,0.10) 75%, transparent 100%)',
            backgroundSize: '800px 100%',
            backgroundRepeat: 'repeat-x',
            filter: 'blur(70px)',
            animation: 'pricingBeamSweep1 24s linear infinite',
          }}
        />

        {/* Beam 2 — cyan, middle, tilted down */}
        <div
          className="absolute"
          style={{
            top: '15%',
            left: '-25%',
            width: '150%',
            height: '80%',
            transform: 'rotate(8deg)',
            transformOrigin: '50% 50%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(109,213,250,0.09) 25%, rgba(109,213,250,0.16) 50%, rgba(109,213,250,0.09) 75%, transparent 100%)',
            backgroundSize: '900px 100%',
            backgroundRepeat: 'repeat-x',
            filter: 'blur(80px)',
            animation: 'pricingBeamSweep2 30s linear infinite',
          }}
        />

        {/* Beam 3 — iris bicolor, bottom, slowest */}
        <div
          className="absolute"
          style={{
            bottom: '-25%',
            left: '-25%',
            width: '150%',
            height: '80%',
            transform: 'rotate(-14deg)',
            transformOrigin: '50% 50%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(178,152,255,0.08) 22%, rgba(109,213,250,0.11) 50%, rgba(178,152,255,0.08) 78%, transparent 100%)',
            backgroundSize: '1100px 100%',
            backgroundRepeat: 'repeat-x',
            filter: 'blur(90px)',
            animation: 'pricingBeamSweep3 38s linear infinite',
          }}
        />

        {/* Crisp diagonal grid lines — thin aurora-tinted hairlines layered on
            top of the beams. Adds a digital-stage quality. */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                115deg,
                transparent 0,
                transparent 78px,
                rgba(178,152,255,0.045) 78px,
                rgba(178,152,255,0.045) 79px
              ),
              repeating-linear-gradient(
                65deg,
                transparent 0,
                transparent 78px,
                rgba(109,213,250,0.045) 78px,
                rgba(109,213,250,0.045) 79px
              )
            `,
          }}
        />

        {/* Soft vignette so the beams fade gracefully into the section's
            light paper edges instead of clipping abruptly. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 40%, rgba(248,249,251,0.55) 85%, rgba(248,249,251,0.95) 100%)',
          }}
        />
      </div>

      {/* Seamless beam keyframes — each beam moves bg-position by exactly its
          own tile-width per cycle (= backgroundSize) so end-state matches
          start-state pixel-perfect. No visible loop seam. */}
      <style>{`
        @keyframes pricingBeamSweep1 {
          0%   { background-position: 0 50%;     }
          100% { background-position: 800px 50%; }
        }
        @keyframes pricingBeamSweep2 {
          0%   { background-position: 0 50%;     }
          100% { background-position: 900px 50%; }
        }
        @keyframes pricingBeamSweep3 {
          0%   { background-position: 0 50%;      }
          100% { background-position: 1100px 50%; }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))' }}
            />
            <div className="eyebrow">Pricing</div>
            <span
              className="h-px w-10"
              style={{ background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)' }}
            />
          </div>

          <h2 className="display-sans text-ink font-bold text-[36px] sm:text-[46px] md:text-[60px] lg:text-[72px] leading-[1.02] tracking-tight">
            Simple pricing. <em className="accent-italic">Built for Scale.</em>
          </h2>

          <p className="text-ink-mute text-[15.5px] md:text-[17px] leading-relaxed mt-5 max-w-[44ch] mx-auto">
            Select the tier built for your scale. Start your 7-day risk-free trial.
          </p>
        </div>

        {/* Audience toggle */}
        <div
          className="flex justify-center mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition:
              'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '120ms',
          }}
        >
          <AudienceToggle audience={audience} onChange={setAudience} />
        </div>

        {/* Compact tier cards.
            key={audience} forces a remount on toggle so the cascade replays
            (CSS keyframe animation reruns on every mount).
            Grid is gated behind isVisible so the initial scroll-trigger still
            controls first-reveal timing — without that, cards would play their
            entry animation before the section is on screen. */}
        <div
          key={audience}
          className={`grid gap-3 md:gap-4 items-stretch mx-auto ${
            audience === 'personal'
              ? 'sm:grid-cols-2 max-w-3xl'
              : 'sm:grid-cols-3 max-w-5xl'
          }`}
          style={{
            // Reserve roughly the card-block height so toggling between 2 and 3
            // tiers doesn't snap the CTA below up/down. minHeight = a Silver-ish
            // card height; the grid will overflow gracefully if content grows.
            minHeight: 320,
          }}
        >
          {isVisible &&
            tiers.map((tier, i) => (
              <PricingPreviewCard
                key={tier.name}
                tier={tier}
                delay={i * 90}
              />
            ))}
        </div>

        {/* Single shared CTA */}
        <div
          className="mt-10 md:mt-12 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition:
              'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '460ms',
          }}
        >
          <button onClick={onDemoClick} className="btn-aurora group">
            Start 7-day free trial
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// COMPACT CARD
// =============================================================================

const PricingPreviewCard = ({
  tier,
  delay,
}: {
  tier: Tier;
  delay: number;
}) => {
  const isPopular = !!tier.popular;

  return (
    <div
      className="relative h-full pricing-card-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient outline — every card gets one. Popular = animated aurora;
          non-popular = static tier-color diagonal. */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={
          isPopular
            ? {
                background:
                  'linear-gradient(90deg, #6DD5FA 0%, #B298FF 25%, #E0E7FF 50%, #B298FF 75%, #6DD5FA 100%)',
                backgroundSize: '200% 100%',
                animation: 'pricingPreviewAuroraShift 6s linear infinite',
              }
            : {
                background: `linear-gradient(135deg, rgba(${tier.accentRgb},0.85) 0%, rgba(${tier.accentRgb},0.25) 50%, rgba(${tier.accentRgb},0.65) 100%)`,
              }
        }
      />

      <div
        className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-paper-2"
        style={{
          border: '1px solid transparent',
          boxShadow: isPopular
            ? '0 22px 60px -20px rgba(178,152,255,0.30), 0 0 60px -24px rgba(109,213,250,0.22), 0 1px 0 rgba(10,11,20,0.02)'
            : '0 14px 36px -22px rgba(10,11,20,0.10), 0 1px 0 rgba(10,11,20,0.02)',
        }}
      >
        <div className="relative p-5 md:p-6 flex flex-col h-full">
          {/* Header — tier name + popular pill */}
          <div className="flex items-center justify-between mb-5">
            <h3
              className="font-sans text-[16px] md:text-[17px] font-semibold leading-none"
              style={{ color: tier.accent }}
            >
              {tier.name}
            </h3>
            {isPopular && (
              <span
                className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(178,152,255,0.10)',
                  border: '1px solid rgba(178,152,255,0.40)',
                  color: '#7C5BFF',
                }}
              >
                Most Popular
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-5">
            <span
              className="display-sans text-ink font-bold text-[34px] md:text-[40px] tabular leading-none tracking-tight"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              ${tier.price}
            </span>
            <span className="text-ink-mute text-[13px] md:text-[14px] font-medium">
              /mo
            </span>
          </div>

          <div className="h-px bg-rule mb-5" />

          <ul className="space-y-2.5 flex-1">
            {tier.features.map((feat, idx) => (
              <FeatureItem key={idx} feat={feat} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ feat }: { feat: Feature }) => {
  const isPlus = typeof feat === 'object' && 'plus' in feat;
  const isBold = typeof feat === 'object' && 'bold' in feat;
  const text = typeof feat === 'string' ? feat : feat.text;

  return (
    <li className="flex items-start gap-2.5">
      <span className="flex-shrink-0 mt-[2px]">
        {isPlus ? <PlusBadge /> : <CheckBadge />}
      </span>
      <span
        className={`text-[13px] md:text-[13.5px] leading-snug ${
          isBold || isPlus ? 'font-semibold text-ink' : 'font-normal text-ink-3'
        }`}
      >
        {text}
      </span>
    </li>
  );
};

// Aurora-tinted filled check badge — same style as the pricing page so
// the two surfaces speak the same visual language.
const CheckBadge = () => (
  <span
    className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full"
    style={{
      background: 'rgba(178,152,255,0.16)',
      border: '1px solid rgba(178,152,255,0.40)',
    }}
  >
    <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
    className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full"
    style={{
      background: 'rgba(178,152,255,0.16)',
      border: '1px solid rgba(178,152,255,0.40)',
    }}
  >
    <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 2.5 V11.5 M2.5 7 H11.5"
        stroke="#B298FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

// =============================================================================
// AUDIENCE TOGGLE — Personal / Business pill with sliding indicator
// =============================================================================

const AudienceToggle = ({
  audience,
  onChange,
}: {
  audience: Audience;
  onChange: (a: Audience) => void;
}) => {
  const isPersonal = audience === 'personal';
  return (
    <div
      className="relative inline-flex items-center p-1 rounded-full"
      style={{
        background: '#F2F3F7',
        border: '1px solid #E8EAEE',
        boxShadow: 'inset 0 1px 0 rgba(10,11,20,0.02)',
      }}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          left: isPersonal ? '4px' : '50%',
          width: 'calc(50% - 4px)',
          background: '#FFFFFF',
          boxShadow:
            '0 1px 2px rgba(10,11,20,0.06), 0 4px 12px -6px rgba(10,11,20,0.10)',
          transition: 'left 380ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <button
        type="button"
        onClick={() => onChange('personal')}
        className="relative z-10 px-5 md:px-6 py-2 rounded-full font-mono text-[11px] tracking-eyebrow uppercase font-bold transition-colors duration-300"
        style={{ color: isPersonal ? '#0A0B14' : '#6B7080' }}
      >
        Personal
      </button>
      <button
        type="button"
        onClick={() => onChange('business')}
        className="relative z-10 px-5 md:px-6 py-2 rounded-full font-mono text-[11px] tracking-eyebrow uppercase font-bold transition-colors duration-300"
        style={{ color: !isPersonal ? '#0A0B14' : '#6B7080' }}
      >
        Business
      </button>
    </div>
  );
};

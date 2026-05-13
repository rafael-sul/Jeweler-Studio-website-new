import { useState, useEffect } from 'react';
import {
  Wand2,
  Eye,
  ShieldCheck,
  Calculator,
  Mail,
  Lock,
  Check,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const CUSTOMER_BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Wand2,
    title: 'Interactive Design Studio',
    desc: 'They build their piece live, right on your site.',
  },
  {
    icon: Eye,
    title: 'Instant Visuals',
    desc: 'Photoreal renders the moment they finish describing.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust in your brand',
    desc: 'Your domain. Your branding. They never leave your studio.',
  },
];

export const FeatureBreakdown = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);

  return (
    <section
      ref={ref}
      className="py-28 px-6 border-t border-rule bg-paper-tinted relative overflow-hidden"
    >
      {/* Aurora atmosphere — softened for light surface */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(178,152,255,0.06), transparent 65%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(109,213,250,0.05), transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto">
        {/* Section header */}
        <div className="mb-20 md:mb-24 max-w-3xl">
          <div className="eyebrow mb-5">The Breakdown</div>
          <h2 className="display-sans text-ink text-[44px] md:text-[64px] lg:text-[76px] font-bold leading-[0.96] tracking-tight">
            Built for <em className="accent-italic">both sides.</em>
          </h2>
        </div>

        {/* ====== WHAT YOUR CUSTOMERS GET ====== */}
        <div className="mb-32 md:mb-40">
          <h3 className="display-sans text-ink text-[36px] md:text-[48px] lg:text-[56px] font-bold tracking-tight mb-10 text-left">
            What your customers get.
          </h3>
          <div className="grid lg:grid-cols-2 gap-5 items-stretch">
            {/* LEFT — Stacked benefits in one big card */}
            <CustomerBenefitsStack isVisible={isVisible} />
            {/* RIGHT — Mini design studio animation */}
            <MiniDesignStudio />
          </div>
        </div>

        {/* ====== WHAT YOU GET ====== */}
        <div>
          <h3 className="display-sans text-ink text-[36px] md:text-[48px] lg:text-[56px] font-bold tracking-tight mb-10 text-left">
            What you get.
          </h3>
          <div className="grid lg:grid-cols-[1.5fr_2fr] gap-3">
            {/* LEFT: big leads card */}
            <BigLeadsCard isVisible={isVisible} />

            {/* RIGHT: 4 cells inside one shared panel — no internal borders */}
            <div className="rounded-2xl border border-rule-2 bg-paper-2 grid grid-cols-1 sm:grid-cols-2 transition-colors duration-700 hover:border-aurora-violet/40">
              <CostBreakdownCard   isVisible={isVisible} delay={120} bare />
              <FollowUpCard        isVisible={isVisible} delay={200} bare />
              <DepositsCard        isVisible={isVisible} delay={280} bare />
              <LivesOnSiteCard     isVisible={isVisible} delay={360} bare />
            </div>
          </div>

          {/* Bottom stat strip — stacked numbers with mono captions */}
          <div
            className="mt-10 pt-7 border-t border-rule flex flex-wrap gap-x-16 gap-y-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : 'translateY(10px)',
              transitionDelay: '440ms',
            }}
          >
            <div>
              <div className="aurora-text font-bold text-[34px] md:text-[40px] tabular tracking-tight leading-none">
                1,000+
              </div>
              <div className="font-mono text-[10.5px] tracking-eyebrow uppercase font-bold mt-2 text-ink-mute">
                Hours saved every year
              </div>
            </div>
            <div>
              <div className="aurora-text font-bold text-[34px] md:text-[40px] tabular tracking-tight leading-none">
                $30K+
              </div>
              <div className="font-mono text-[10.5px] tracking-eyebrow uppercase font-bold mt-2 text-ink-mute">
                Render cost eliminated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// CUSTOMER BENEFITS STACK — single big card, 3 rows inside
// =============================================================================

const CustomerBenefitsStack = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className="rounded-2xl border border-rule-2 bg-paper-2 p-8 transition-all duration-700 hover:border-aurora-violet/40 h-full"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateY(14px)',
    }}
  >
    {CUSTOMER_BENEFITS.map((b, i) => {
      const isLast = i === CUSTOMER_BENEFITS.length - 1;
      const Icon = b.icon;
      return (
        <div key={b.title}>
          <div className="flex items-start gap-5 py-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-rule-2 bg-paper flex-shrink-0">
              <Icon size={20} className="text-aurora-violet" strokeWidth={1.7} />
            </div>
            <div className="flex-1">
              <h4 className="text-ink text-[18px] md:text-[20px] font-bold leading-snug mb-2">
                {b.title}
              </h4>
              <p className="text-ink-mute text-[14px] md:text-[15px] leading-relaxed">
                {b.desc}
              </p>
            </div>
          </div>
          {!isLast && <div className="h-px bg-rule" />}
        </div>
      );
    })}
  </div>
);

// =============================================================================
// MINI DESIGN STUDIO — animation showing a configurator on the right
// =============================================================================

const STUDIO_GEMS = ['Diamond', 'Sapphire', 'Ruby', 'Emerald'];
const STUDIO_METALS = [
  { label: 'White', color: '#E0E7FF' },
  { label: 'Yellow', color: '#D4B87A' },
  { label: 'Rose',   color: '#F8C8D4' },
];

const MiniDesignStudio = () => {
  const [gemIdx, setGemIdx] = useState(0);
  const [metalIdx, setMetalIdx] = useState(0);

  useEffect(() => {
    const t1 = window.setInterval(() => setGemIdx((p) => (p + 1) % STUDIO_GEMS.length), 2200);
    const t2 = window.setInterval(() => setMetalIdx((p) => (p + 1) % STUDIO_METALS.length), 2800);
    return () => {
      window.clearInterval(t1);
      window.clearInterval(t2);
    };
  }, []);

  const metal = STUDIO_METALS[metalIdx];

  return (
    <div className="rounded-2xl border border-hairline-2 bg-obsidian p-7 flex flex-col h-full transition-all duration-700 hover:border-aurora-violet/40 relative overflow-hidden">
      {/* Atmospheric backdrop */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,213,250,0.22), transparent 65%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(178,152,255,0.18), transparent 65%)', filter: 'blur(40px)' }}
      />

      {/* Top header */}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 14 14">
            <defs>
              <linearGradient id="mds-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6DD5FA" />
                <stop offset="0.5" stopColor="#B298FF" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>
            <polygon points="7,1 13,5 7,13 1,5" fill="url(#mds-grad)" />
          </svg>
          <span className="font-mono text-[10.5px] tracking-eyebrow uppercase text-ice/85">
            Studio AI · Live demo
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" style={{ boxShadow: '0 0 6px #6BD3A3' }} />
          <span className="font-mono text-[9.5px] tracking-eyebrow uppercase text-ok">Active</span>
        </span>
      </div>

      {/* Ring preview */}
      <div className="relative flex-1 flex items-center justify-center mb-5 min-h-[200px]">
        <div
          className="absolute w-44 h-44 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.30), transparent 70%)',
            filter: 'blur(28px)',
            animation: 'fbStudioPulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="relative w-32 h-32 rounded-full transition-all duration-700"
          style={{
            background: `linear-gradient(#13151C, #13151C) padding-box, conic-gradient(from 0deg, ${metal.color}, ${metal.color}, #6DD5FA, #B298FF, ${metal.color}) border-box`,
            border: '7px solid transparent',
            boxShadow: `0 0 28px rgba(178,152,255,0.4), inset 0 0 16px rgba(178,152,255,0.2)`,
            animation: 'fbStudioRotate 14s linear infinite',
          }}
        />
        {/* Diamond on top */}
        <div
          className="absolute top-1/2 left-1/2 w-5 h-5 rotate-45 transition-all duration-700"
          style={{
            transform: 'translate(-50%, calc(-50% - 64px)) rotate(45deg)',
            background: `linear-gradient(135deg, ${metal.color}, #6DD5FA)`,
            boxShadow: '0 0 16px rgba(109,213,250,0.9)',
          }}
        />
      </div>

      {/* Gem chips */}
      <div className="relative mb-3">
        <div className="font-mono text-[9px] tracking-eyebrow uppercase text-smoke-2 mb-2">
          Gem
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STUDIO_GEMS.map((g, i) => {
            const sel = i === gemIdx;
            return (
              <span
                key={g}
                className="px-3 py-1 rounded-full text-[12px] transition-all duration-500"
                style={{
                  background: sel ? 'rgba(178,152,255,0.14)' : 'rgba(20,22,30,0.7)',
                  border: `1.5px solid ${sel ? '#B298FF' : 'rgba(38,42,53,0.8)'}`,
                  color: sel ? '#F5F6F8' : '#8A8E98',
                  fontWeight: sel ? 600 : 400,
                  boxShadow: sel ? '0 0 10px rgba(178,152,255,0.25)' : 'none',
                  transform: sel ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {g}
              </span>
            );
          })}
        </div>
      </div>

      {/* Metal swatches */}
      <div className="relative">
        <div className="font-mono text-[9px] tracking-eyebrow uppercase text-smoke-2 mb-2">
          Metal · {metal.label}
        </div>
        <div className="flex gap-2">
          {STUDIO_METALS.map((m, i) => {
            const sel = i === metalIdx;
            return (
              <span
                key={m.label}
                className="w-7 h-7 rounded-full border transition-all duration-300"
                style={{
                  background: m.color,
                  borderColor: sel ? '#B298FF' : 'rgba(38,42,53,1)',
                  boxShadow: sel ? '0 0 0 2px rgba(178,152,255,0.25), 0 0 10px rgba(178,152,255,0.5)' : 'none',
                  transform: sel ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fbStudioPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes fbStudioRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// BIG LEADS CARD — inline stats + dramatic vertical bar comparison
// =============================================================================

const BigLeadsCard = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className="rounded-2xl border border-hairline-2 bg-obsidian p-7 md:p-8 h-full flex flex-col relative overflow-hidden transition-all duration-700 hover:border-aurora-violet/40"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(14px)',
      }}
    >
      {/* Atmospheric backdrop */}
      <div
        className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(178,152,255,0.22), transparent 65%)', filter: 'blur(50px)' }}
      />
      <div
        className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,213,250,0.14), transparent 65%)', filter: 'blur(50px)' }}
      />

      {/* TOP — Clean stat hierarchy (20x dominant, 2-5x smaller secondary) */}
      <div className="relative">
        <div className="flex items-baseline gap-3 md:gap-4 flex-wrap leading-[0.9]">
          <span
            className="aurora-text font-bold text-[88px] md:text-[120px] tabular tracking-tight"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            20x
          </span>
          <span className="display-sans text-ice text-[32px] md:text-[44px] font-bold tracking-tight leading-[1.05]">
            more leads.
          </span>
        </div>

        <div className="flex items-baseline gap-2.5 md:gap-3 flex-wrap mt-3 leading-[0.95]">
          <span
            className="aurora-text font-bold text-[44px] md:text-[60px] tabular tracking-tight"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            2-5x
          </span>
          <span className="display-sans text-smoke text-[20px] md:text-[26px] font-medium tracking-tight">
            more sales.
          </span>
        </div>

        <p className="text-smoke text-[14.5px] md:text-[15px] leading-relaxed max-w-[44ch] mt-6">
          Stop leaving money on the table. Capture every customer and design and turn your website into a sales machine.
        </p>
      </div>

      {/* BOTTOM — Big dual vertical-bar comparison fills remaining space */}
      <div className="relative mt-5 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-6 flex-1 min-h-[170px]">
          <BarPair
            beforePct={6}
            afterPct={100}
            isVisible={isVisible}
            delay={300}
          />
          <BarPair
            beforePct={14}
            afterPct={62}
            isVisible={isVisible}
            delay={500}
          />
        </div>
      </div>

      <style>{`
        @keyframes fbAfterBarPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(178,152,255,0.45), inset 0 0 8px rgba(255,255,255,0.06); }
          50%      { box-shadow: 0 0 28px rgba(178,152,255,0.75), inset 0 0 8px rgba(255,255,255,0.12); }
        }
      `}</style>
    </div>
  );
};

// Vertical bar pair — "Before" small + "After" tall side by side
const BarPair = ({
  beforePct,
  afterPct,
  isVisible,
  delay,
}: {
  beforePct: number;
  afterPct: number;
  isVisible: boolean;
  delay: number;
}) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 flex items-end gap-3 min-h-[140px]">
      {/* Before */}
      <div className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
        <div
          className="w-full rounded-t-lg"
          style={{
            height: isVisible ? `${beforePct}%` : '0%',
            minHeight: '4px',
            background: 'rgba(138,142,152,0.32)',
            transition: `height 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
        <span className="font-mono text-[9.5px] tracking-wide uppercase text-smoke-2">
          Before
        </span>
      </div>
      {/* After */}
      <div className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
        <div
          className="w-full rounded-t-lg"
          style={{
            height: isVisible ? `${afterPct}%` : '0%',
            background: 'linear-gradient(180deg, #6DD5FA, #B298FF)',
            boxShadow: '0 0 18px rgba(178,152,255,0.45)',
            transition: `height 1300ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 250}ms`,
            animation: isVisible ? `fbAfterBarPulse 2.8s ease-in-out ${(delay + 1500) / 1000}s infinite` : 'none',
          }}
        />
        <span className="font-mono text-[9.5px] tracking-wide uppercase text-aurora-violet font-bold">
          After
        </span>
      </div>
    </div>
  </div>
);

// =============================================================================
// FEATURE CARD WRAPPER — outlined card with icon header
// =============================================================================

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  isVisible,
  delay,
  children,
  bare = false,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  isVisible: boolean;
  delay: number;
  children?: React.ReactNode;
  bare?: boolean;
}) => (
  <div
    className={
      bare
        ? 'p-4 md:p-5 transition-all duration-700 h-full flex flex-col'
        : 'rounded-2xl border border-rule-2 bg-paper-2 p-4 transition-all duration-700 hover:border-aurora-violet/40 h-full flex flex-col'
    }
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateY(14px)',
      transitionDelay: `${delay}ms`,
    }}
  >
    <div className="flex items-start gap-2.5 mb-2.5">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-rule-2 bg-paper flex-shrink-0">
        <Icon size={14} className="text-aurora-violet" strokeWidth={1.7} />
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="text-ink text-[15px] md:text-[16px] font-bold leading-snug tracking-tight mb-0.5">{title}</h4>
        <p className="text-ink-mute text-[11.5px] leading-relaxed">{desc}</p>
      </div>
    </div>
    {children}
  </div>
);

// =============================================================================
// COST BREAKDOWN CARD — animated mini-bars per cost category
// =============================================================================

const COST_ROWS = [
  { label: 'Material', value: '$1,820' },
  { label: 'Labor',    value: '$640'   },
  { label: 'Setting',  value: '$280'   },
];

const CostBreakdownCard = ({ isVisible, delay, bare }: { isVisible: boolean; delay: number; bare?: boolean }) => (
  <FeatureCard
    icon={Calculator}
    title="Instant Cost Breakdown"
    desc="Materials, labor, margin. Calculated the moment a design is locked."
    isVisible={isVisible}
    delay={delay}
    bare={bare}
  >
    <div className="mt-3 rounded-md border border-rule overflow-hidden">
      {COST_ROWS.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between px-3 py-2 ${i !== 0 ? 'border-t border-rule' : ''}`}
        >
          <span className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-ink-mute">
            {row.label}
          </span>
          <span className="font-mono text-[11px] tabular font-bold text-ink">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </FeatureCard>
);

// =============================================================================
// FOLLOW-UP CARD — chat conversation between us and the customer
// =============================================================================

const CHAT_MESSAGES: { side: 'left' | 'right'; text: string }[] = [
  { side: 'left',  text: "Hi Sarah, here's your design. Any questions?" },
  { side: 'right', text: "I love it! How can I pay?" },
  { side: 'left',  text: "Here is your quote link to pay the deposit." },
];

const FollowUpCard = ({ isVisible, delay, bare }: { isVisible: boolean; delay: number; bare?: boolean }) => (
  <FeatureCard
    icon={Mail}
    title="Automated follow-up"
    desc="Keep your customers coming back. Increasing website traffic and conversion."
    isVisible={isVisible}
    delay={delay}
    bare={bare}
  >
    <div className="mt-3 space-y-1.5">
      {CHAT_MESSAGES.map((msg, i) => {
        const isLeft = msg.side === 'left';
        return (
          <div
            key={i}
            className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 500ms ease, transform 500ms ease',
              transitionDelay: `${delay + 400 + i * 360}ms`,
            }}
          >
            <span
              className="max-w-[82%] px-3 py-1.5 text-[11.5px] leading-snug rounded-2xl"
              style={
                isLeft
                  ? {
                      background: '#EEF1F6',
                      color: '#0A0B14',
                      border: '1.5px solid #6DA8DC',
                      borderBottomLeftRadius: 6,
                    }
                  : {
                      background: '#F2F4F8',
                      color: '#0A0B14',
                      border: '1px solid #E8EAEE',
                      borderBottomRightRadius: 6,
                    }
              }
            >
              {msg.text}
            </span>
          </div>
        );
      })}
    </div>
  </FeatureCard>
);

// =============================================================================
// DEPOSITS CARD — animated counter + check stamp
// =============================================================================

const DepositsCard = ({ isVisible, delay, bare }: { isVisible: boolean; delay: number; bare?: boolean }) => {
  return (
    <FeatureCard
      icon={Lock}
      title="Deposits captured"
      desc="Secured at peak excitement, before they ever leave your site."
      isVisible={isVisible}
      delay={delay}
      bare={bare}
    >
      <div
        className="mt-3 rounded-md px-3 py-1.5 flex items-center justify-between gap-3"
        style={{
          background: '#FAFBFD',
          border: '1px solid #E8EAEE',
          animation: isVisible ? 'fbDepositPulse 2.4s ease-in-out 1s infinite' : 'none',
        }}
      >
        <div className="flex items-baseline gap-2 leading-none">
          <span className="text-ink font-bold text-[14px] tabular tracking-tight">
            $500
          </span>
          <span className="font-mono text-[9px] tracking-eyebrow uppercase font-bold text-ink-mute">
            Design Deposit
          </span>
        </div>
        <span
          className="flex items-center gap-1 flex-shrink-0"
          style={{ color: '#1F8B5C' }}
        >
          <Check size={10} strokeWidth={3} />
          <span className="font-mono text-[9px] tracking-eyebrow uppercase font-bold">
            Secured
          </span>
        </span>
      </div>

      <style>{`
        @keyframes fbDepositPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(107,211,163,0); }
          50%      { box-shadow: 0 0 0 5px rgba(107,211,163,0.18); }
        }
      `}</style>
    </FeatureCard>
  );
};

// =============================================================================
// LIVES ON SITE CARD — browser frame mockup with embedded preview
// =============================================================================

const LivesOnSiteCard = ({ isVisible, delay, bare }: { isVisible: boolean; delay: number; bare?: boolean }) => (
  <FeatureCard
    icon={Globe}
    title="Lives on your site"
    desc="Embedded directly into your existing website. Your brand, your logo, your colors."
    isVisible={isVisible}
    delay={delay}
    bare={bare}
  >
    <div className="mt-3 space-y-1.5">
      {/* White-label tag — chip */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-md"
        style={{ background: '#FAFBFD', border: '1px solid #E8EAEE' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-ink-mute" />
        <span className="font-mono text-[9px] tracking-eyebrow uppercase text-ink-mute font-bold">
          100% White-labeled
        </span>
      </div>
    </div>
  </FeatureCard>
);


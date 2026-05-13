import { useState, useEffect } from 'react';
import { Check, Copy, Flame, MousePointer2 } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const STEPS = [
  {
    n: '01',
    title: 'Connect to your website',
    body: 'One snippet, one minute, any platform.',
    caption: 'Live in 1 minute',
  },
  {
    n: '02',
    title: 'Set up account',
    body: 'Match your colors, logo, and pricing.',
    caption: 'Branded in minutes',
  },
  {
    n: '03',
    title: 'Customers design live',
    body: 'Visual builder, step by step.',
    caption: "Live design, your customer's hands",
  },
  {
    n: '04',
    title: 'Lead capture, deposit secured',
    body: 'Hot leads land in your CRM with deposit attached.',
    caption: 'Pipeline armed and ready',
  },
] as const;

const STEP_DURATION = 4200;

export const HowItWorks = () => {
  const { ref, isVisible } = useScrollTrigger(0.2);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFill, setActiveFill] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const t = window.setTimeout(() => {
      setActiveStep((p) => (p + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => window.clearTimeout(t);
  }, [isVisible, activeStep]);

  useEffect(() => {
    setActiveFill(0);
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActiveFill(100));
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeStep]);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="pt-32 pb-48 md:pt-32 md:pb-56 px-6 bg-obsidian relative overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div
          className="absolute top-0 right-1/4 w-[800px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(178,152,255,0.14), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[800px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(109,213,250,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="eyebrow mb-5">How It Works</div>
          <h2 className="display-sans text-ice text-[44px] md:text-[64px] lg:text-[76px] font-bold leading-[0.96] tracking-tight">
            Live in 1 minute.{' '}
            <em className="accent-italic">Closing in seconds.</em>
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_440px] gap-6 items-stretch">
          <Canvas activeStep={activeStep} isVisible={isVisible} />
          <StepList activeStep={activeStep} onStepClick={setActiveStep} />
        </div>

        {/* Timeline bar */}
        <div className="mt-8 grid grid-cols-4 gap-1.5">
          {STEPS.map((_, i) => {
            const completed = i < activeStep;
            const active = i === activeStep;
            return (
              <div
                key={i}
                className="h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(38,42,53,0.7)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: completed
                      ? '100%'
                      : active
                      ? `${activeFill}%`
                      : '0%',
                    background: 'linear-gradient(90deg, #6DD5FA, #B298FF)',
                    boxShadow:
                      active || completed
                        ? '0 0 8px rgba(178,152,255,0.40)'
                        : 'none',
                    transition: active
                      ? `width ${STEP_DURATION}ms linear`
                      : 'width 0.3s',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// CANVAS — phase host on light off-white surface
// =============================================================================

const Canvas = ({
  activeStep,
  isVisible,
}: {
  activeStep: number;
  isVisible: boolean;
}) => (
  <div
    className="rounded-2xl p-6 md:p-7 flex flex-col relative overflow-hidden h-full"
    style={{
      background: '#F5F6FA',
      border: '1px solid #D6D9E0',
      boxShadow:
        '0 12px 40px rgba(0,0,0,0.35), 0 0 60px rgba(178,152,255,0.08)',
      minHeight: 500,
    }}
  >
    <div className="absolute top-0 left-0 right-0 accent-line" />
    <div
      className="absolute -inset-10 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(178,152,255,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(109,213,250,0.08), transparent 60%)',
        filter: 'blur(40px)',
      }}
    />

    {/* Brand header */}
    <div className="relative flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <svg width="14" height="14" viewBox="0 0 14 14">
          <defs>
            <linearGradient id="hiw-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6DD5FA" />
              <stop offset="0.5" stopColor="#B298FF" />
              <stop offset="1" stopColor="#7C5BFF" />
            </linearGradient>
          </defs>
          <polygon points="7,1 13,5 7,13 1,5" fill="url(#hiw-grad)" />
        </svg>
        <span
          className="font-mono text-[11px] tracking-eyebrow uppercase font-bold"
          style={{ color: '#1A1F2E' }}
        >
          Jeweler Studio
        </span>
      </div>
      <span className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full bg-ok"
          style={{ boxShadow: '0 0 6px #6BD3A3' }}
        />
        <span
          className="font-mono text-[10px] tracking-eyebrow uppercase font-bold"
          style={{ color: '#1F8B5C' }}
        >
          Live
        </span>
      </span>
    </div>

    {/* Phase content area */}
    <div className="relative flex-1 min-h-[340px]">
      {isVisible && (
        <>
          <PhaseEmbed visible={activeStep === 0} />
          <PhaseSetup visible={activeStep === 1} />
          <PhaseDesign visible={activeStep === 2} />
          <PhaseLead visible={activeStep === 3} />
        </>
      )}
    </div>

    {/* Caption (active step) */}
    <div className="relative mt-4 h-4">
      {STEPS.map((s, i) => (
        <span
          key={i}
          className="absolute inset-0 font-mono text-[10.5px] tracking-eyebrow uppercase font-bold transition-opacity duration-500"
          style={{
            color: '#7C5BFF',
            opacity: i === activeStep ? 1 : 0,
          }}
        >
          {s.caption}
        </span>
      ))}
    </div>
  </div>
);

// =============================================================================
// PHASE 01 — CONNECT (Jeweler Studio Dashboard → Copy app code click)
// =============================================================================

const BUILDERS = [
  { name: 'Shopify',     mark: 'S',  bg: '#95BF47' },
  { name: 'Wix',         mark: 'W',  bg: '#0E0E0E' },
  { name: 'Squarespace', mark: 'Sq', bg: '#1A1A1A' },
  { name: 'WordPress',   mark: 'W',  bg: '#21759B' },
  { name: 'Webflow',     mark: 'wf', bg: '#4353FF' },
];

const PhaseEmbed = ({ visible }: { visible: boolean }) => {
  const [showCursor, setShowCursor] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShowCursor(false);
      setPressed(false);
      setCopied(false);
      return;
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setShowCursor(true), 700));
    timers.push(window.setTimeout(() => setPressed(true), 1500));
    timers.push(window.setTimeout(() => setCopied(true), 1700));
    timers.push(window.setTimeout(() => setPressed(false), 1900));
    timers.push(window.setTimeout(() => setShowCursor(false), 2200));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [visible]);

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Dashboard mockup */}
      <div
        className="rounded-lg flex-1 flex flex-col overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #D6D9E0' }}
      >
        {/* Top bar — Jeweler Studio Dashboard */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid #E8EAEE' }}
        >
          <div className="flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 14 14">
              <defs>
                <linearGradient id="hiw-dash-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6DD5FA" />
                  <stop offset="0.5" stopColor="#B298FF" />
                  <stop offset="1" stopColor="#7C5BFF" />
                </linearGradient>
              </defs>
              <polygon points="7,1 13,5 7,13 1,5" fill="url(#hiw-dash-grad)" />
            </svg>
            <span
              className="text-[11.5px] font-bold"
              style={{ color: '#1A1F2E' }}
            >
              Jeweler Studio Dashboard
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#1F8B5C', boxShadow: '0 0 6px #6BD3A3' }}
            />
            <span
              className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold"
              style={{ color: '#1F8B5C' }}
            >
              Connected
            </span>
          </span>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center px-4 gap-5"
          style={{ borderBottom: '1px solid #E8EAEE' }}
        >
          <span
            className="py-2.5 text-[11px] font-bold relative"
            style={{ color: '#08090D' }}
          >
            Configuration
            <span
              className="absolute left-0 right-0 h-[2px] -bottom-px"
              style={{
                background: 'linear-gradient(90deg, #6DD5FA, #B298FF)',
              }}
            />
          </span>
          <span className="py-2.5 text-[11px]" style={{ color: '#9CA0AC' }}>
            Branding
          </span>
          <span className="py-2.5 text-[11px]" style={{ color: '#9CA0AC' }}>
            Domains
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-4 gap-3.5">
          <div
            className="font-mono text-[10px] tracking-eyebrow uppercase font-bold"
            style={{ color: '#6B7080' }}
          >
            Embed code
          </div>

          {/* Copy button + cursor */}
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-md py-3 text-[13.5px] font-bold transition-all duration-200"
              style={{
                background: '#1F8B5C',
                color: '#FFFFFF',
                boxShadow: copied
                  ? '0 0 18px rgba(31,139,92,0.45), 0 0 0 3px rgba(31,139,92,0.15)'
                  : '0 4px 12px rgba(31,139,92,0.25)',
                transform: pressed ? 'scale(0.97)' : 'scale(1)',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={3} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} strokeWidth={2.5} />
                  <span>Copy app code</span>
                </>
              )}
            </button>

            {/* Cursor */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: '24%',
                bottom: showCursor ? '-4px' : '-32px',
                opacity: showCursor ? 1 : 0,
                transition:
                  'opacity 350ms ease, bottom 700ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <MousePointer2
                size={16}
                strokeWidth={1.5}
                style={{
                  color: '#08090D',
                  fill: '#FFFFFF',
                  filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))',
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mt-auto" style={{ background: '#E8EAEE' }} />

          {/* Builder tiles — static */}
          <div className="flex items-center justify-between gap-1.5">
            {BUILDERS.map((b) => (
              <div
                key={b.name}
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: b.bg,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                }}
              >
                <span
                  className="font-bold text-[11px] tabular tracking-tight"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {b.mark}
                </span>
              </div>
            ))}
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
                boxShadow: '0 2px 6px rgba(178,152,255,0.35)',
              }}
            >
              <span
                className="font-bold text-[10px] tabular"
                style={{ color: '#0A0B10' }}
              >
                +5
              </span>
            </div>
          </div>

          {/* Caption — static */}
          <div
            className="text-center font-mono text-[10px] tracking-eyebrow uppercase font-bold"
            style={{ color: '#6B7080' }}
          >
            Connects with any website
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// PHASE 02 — CUSTOMER DESIGNS LIVE (cycling chips + swatches + ring)
// =============================================================================

const DESIGN_GEMS = ['Diamond', 'Sapphire', 'Ruby'];
const DESIGN_METALS = [
  { label: 'White', color: '#E0E7FF' },
  { label: 'Yellow', color: '#D4B87A' },
  { label: 'Rose', color: '#F8C8D4' },
];

const PhaseDesign = ({ visible }: { visible: boolean }) => {
  const [gemIdx, setGemIdx] = useState(0);
  const [metalIdx, setMetalIdx] = useState(0);

  useEffect(() => {
    if (!visible) {
      setGemIdx(0);
      setMetalIdx(0);
      return;
    }
    const t1 = window.setInterval(
      () => setGemIdx((p) => (p + 1) % DESIGN_GEMS.length),
      1100
    );
    const t2 = window.setInterval(
      () => setMetalIdx((p) => (p + 1) % DESIGN_METALS.length),
      1300
    );
    return () => {
      window.clearInterval(t1);
      window.clearInterval(t2);
    };
  }, [visible]);

  const metal = DESIGN_METALS[metalIdx];

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="grid grid-cols-[1fr_180px] gap-5 flex-1">
        {/* Left column: chips + swatches + style */}
        <div className="flex flex-col gap-4">
          <div>
            <div
              className="font-mono text-[10px] tracking-wide uppercase mb-2 font-bold"
              style={{ color: '#6B7080' }}
            >
              Gem
            </div>
            <div className="flex flex-wrap gap-2">
              {DESIGN_GEMS.map((g, i) => {
                const sel = i === gemIdx;
                return (
                  <span
                    key={g}
                    className="px-3 py-1.5 rounded-full text-[12px] transition-all duration-500"
                    style={{
                      background: sel ? 'rgba(178,152,255,0.14)' : '#FFFFFF',
                      border: `1.5px solid ${sel ? '#B298FF' : '#D6D9E0'}`,
                      color: sel ? '#08090D' : '#6B7080',
                      fontWeight: sel ? 700 : 500,
                      boxShadow: sel
                        ? '0 0 12px rgba(178,152,255,0.20)'
                        : 'none',
                      transform: sel ? 'scale(1.06)' : 'scale(1)',
                    }}
                  >
                    {g}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <div
              className="font-mono text-[10px] tracking-wide uppercase mb-2 font-bold"
              style={{ color: '#6B7080' }}
            >
              Metal · {metal.label}
            </div>
            <div className="flex gap-2.5">
              {DESIGN_METALS.map((m, i) => {
                const sel = i === metalIdx;
                return (
                  <span
                    key={m.label}
                    className="w-8 h-8 rounded-full transition-all duration-300"
                    style={{
                      background: m.color,
                      border: `2px solid ${sel ? '#B298FF' : '#D6D9E0'}`,
                      boxShadow: sel
                        ? '0 0 0 2px rgba(178,152,255,0.20), 0 0 12px rgba(178,152,255,0.45)'
                        : 'none',
                      transform: sel ? 'scale(1.12)' : 'scale(1)',
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-auto">
            <div
              className="font-mono text-[10px] tracking-wide uppercase mb-2 font-bold"
              style={{ color: '#6B7080' }}
            >
              Style
            </div>
            <div
              className="px-3 py-2 rounded-md text-[12px] flex items-center gap-2"
              style={{
                background: '#FFFFFF',
                border: '1px solid #D6D9E0',
                color: '#3A3F4D',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#B298FF', boxShadow: '0 0 6px #B298FF' }}
              />
              Halo pendant, engraved
            </div>
          </div>
        </div>

        {/* Right column: gem ring preview */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-36 h-36 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(178,152,255,0.30), transparent 70%)',
              filter: 'blur(28px)',
              animation: 'hiwPulse 3s ease-in-out infinite',
            }}
          />
          <div
            className="relative w-28 h-28 rounded-full transition-all duration-700"
            style={{
              background: `linear-gradient(#13151C, #13151C) padding-box, conic-gradient(from 0deg, ${metal.color}, ${metal.color}, #6DD5FA, #B298FF, ${metal.color}) border-box`,
              border: '6px solid transparent',
              boxShadow:
                '0 0 26px rgba(178,152,255,0.40), inset 0 0 14px rgba(178,152,255,0.20)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-4 h-4 rotate-45 transition-all duration-700"
            style={{
              transform: 'translate(-50%, calc(-50% - 56px)) rotate(45deg)',
              background: `linear-gradient(135deg, ${metal.color}, #6DD5FA)`,
              boxShadow: '0 0 14px rgba(109,213,250,0.85)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hiwPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// PHASE 02 — SETUP (Branding panel: brand color + checklist cascade)
// =============================================================================

const SETUP_ITEMS: { label: string; value: string }[] = [
  { label: 'Brand colors',  value: 'Aurora cyan + violet' },
  { label: 'Logo',          value: 'Uploaded' },
  { label: 'Pricing tier',  value: 'Premium' },
  { label: 'Domain',        value: 'yourstudio.com' },
];

const PhaseSetup = ({ visible }: { visible: boolean }) => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCompleted(0);
      return;
    }
    const timers: number[] = [];
    SETUP_ITEMS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setCompleted(i + 1), 500 + i * 450));
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [visible]);

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Branding tab mockup */}
      <div
        className="rounded-lg flex-1 flex flex-col overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #D6D9E0' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid #E8EAEE' }}
        >
          <span
            className="font-mono text-[10px] tracking-eyebrow uppercase font-bold"
            style={{ color: '#1A1F2E' }}
          >
            Branding
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#1F8B5C', boxShadow: '0 0 6px #6BD3A3' }}
            />
            <span
              className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold"
              style={{ color: '#1F8B5C' }}
            >
              Auto-saved
            </span>
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-4 gap-3.5">
          {/* Brand color row */}
          <div>
            <div
              className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold mb-2"
              style={{ color: '#6B7080' }}
            >
              Brand color
            </div>
            <div className="flex gap-2.5">
              {[
                { bg: 'linear-gradient(135deg, #6DD5FA, #B298FF)', selected: true },
                { bg: '#D4B87A', selected: false },
                { bg: '#08090D', selected: false },
                { bg: '#FFFFFF', selected: false },
              ].map((s, i) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-full transition-all duration-300"
                  style={{
                    background: s.bg,
                    border: s.selected ? '2px solid #B298FF' : '2px solid #D6D9E0',
                    boxShadow: s.selected
                      ? '0 0 0 2px rgba(178,152,255,0.20), 0 0 12px rgba(178,152,255,0.45)'
                      : 'none',
                    transform: s.selected ? 'scale(1.10)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Settings checklist — items check off in sequence */}
          <div className="space-y-1.5 mt-1">
            {SETUP_ITEMS.map((item, i) => {
              const done = completed > i;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md"
                  style={{
                    background: done ? 'rgba(31,139,92,0.06)' : '#F5F6FA',
                    border: `1px solid ${done ? 'rgba(31,139,92,0.30)' : '#E8EAEE'}`,
                    opacity: done ? 1 : 0.55,
                    transform: done ? 'translateX(0)' : 'translateX(-4px)',
                    transition:
                      'background 300ms ease, border-color 300ms ease, opacity 300ms ease, transform 300ms ease',
                  }}
                >
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: done ? '#1F8B5C' : 'transparent',
                      border: done ? '2px solid #1F8B5C' : '2px solid #D6D9E0',
                    }}
                  >
                    {done && (
                      <Check size={9} strokeWidth={3.5} style={{ color: '#FFFFFF' }} />
                    )}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-eyebrow uppercase font-bold flex-shrink-0"
                    style={{ color: '#6B7080' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="ml-auto text-[11.5px] truncate"
                    style={{ color: done ? '#08090D' : '#9CA0AC' }}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// PHASE 04 — LEAD CAPTURED (slide-in lead row + ghost rows)
// =============================================================================

const PhaseLead = ({ visible }: { visible: boolean }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShown(false);
      return;
    }
    const t = window.setTimeout(() => setShown(true), 200);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="font-mono text-[10px] tracking-eyebrow uppercase mb-3 font-bold"
        style={{ color: '#6B7080' }}
      >
        New leads · Today
      </div>

      {/* Hot lead row */}
      <div
        className="rounded-xl p-4 flex items-center gap-3.5 transition-all duration-500"
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #B298FF',
          boxShadow: '0 0 24px rgba(178,152,255,0.25)',
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-[12px] font-bold flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
            color: '#0A0B10',
          }}
        >
          SM
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[14px] font-bold"
              style={{ color: '#08090D' }}
            >
              Sarah M.
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: '#6B7080' }}
            >
              just now
            </span>
          </div>
          <div
            className="text-[12px] truncate"
            style={{ color: '#6B7080' }}
          >
            Halo pendant · Diamond · White Gold
          </div>
          {/* Deposit secured indicator */}
          <div className="mt-1 flex items-center gap-1.5">
            <Check size={9} strokeWidth={3} style={{ color: '#1F8B5C' }} />
            <span
              className="font-mono text-[10px] tracking-eyebrow uppercase font-bold"
              style={{ color: '#1F8B5C' }}
            >
              $4,890 deposit secured
            </span>
          </div>
        </div>

        {/* Design thumb */}
        <div
          className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center"
          style={{
            background:
              'linear-gradient(#0A0B10, #0A0B10) padding-box, conic-gradient(from 0deg, #6DD5FA, #B298FF, #E0E7FF, #6DD5FA) border-box',
            border: '2px solid transparent',
          }}
        >
          <div
            className="w-2 h-2 rotate-45"
            style={{
              background: 'linear-gradient(135deg, #E0E7FF, #6DD5FA)',
              boxShadow: '0 0 6px rgba(109,213,250,0.9)',
            }}
          />
        </div>

        {/* Hot lead pill */}
        <span
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md flex-shrink-0"
          style={{
            background: 'rgba(178,152,255,0.14)',
            border: '1px solid #B298FF',
            animation: shown
              ? 'hiwHotPulse 2s ease-in-out 0.4s infinite'
              : 'none',
          }}
        >
          <Flame size={10} strokeWidth={2.5} style={{ color: '#7C5BFF' }} />
          <span
            className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold"
            style={{ color: '#7C5BFF' }}
          >
            Hot lead
          </span>
        </span>
      </div>

      {/* Ghost queue rows */}
      <div className="mt-2 space-y-2">
        {[0.4, 0.22].map((op, i) => (
          <div
            key={i}
            className="rounded-xl p-3 flex items-center gap-3.5"
            style={{
              background: '#FFFFFF',
              border: '1px solid #D6D9E0',
              opacity: shown ? op : 0,
              transition: `opacity 600ms ease ${300 + i * 100}ms`,
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex-shrink-0"
              style={{ background: '#E8EAEE' }}
            />
            <div className="flex-1 space-y-1.5">
              <div
                className="h-2 rounded-full"
                style={{ background: '#E8EAEE', width: '40%' }}
              />
              <div
                className="h-2 rounded-full"
                style={{ background: '#E8EAEE', width: '70%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hiwHotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(178,152,255,0); }
          50%      { box-shadow: 0 0 0 6px rgba(178,152,255,0.20); }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// STEP LIST — clickable rows
// =============================================================================

const StepList = ({
  activeStep,
  onStepClick,
}: {
  activeStep: number;
  onStepClick: (i: number) => void;
}) => (
  <div className="flex flex-col gap-2 h-full">
    {STEPS.map((step, i) => {
      const active = i === activeStep;
      return (
        <button
          key={step.n}
          type="button"
          onClick={() => onStepClick(i)}
          className="text-left rounded-xl p-5 transition-all duration-500 flex items-start gap-4 flex-1"
          style={{
            background: active ? 'rgba(178,152,255,0.06)' : 'transparent',
            borderLeft: `2px solid ${active ? '#B298FF' : 'rgba(38,42,53,1)'}`,
            boxShadow: active ? '0 0 24px rgba(178,152,255,0.10)' : 'none',
          }}
        >
          <span
            className="font-mono text-[12px] tracking-eyebrow uppercase font-bold transition-colors duration-300 flex-shrink-0 pt-0.5"
            style={{ color: active ? '#B298FF' : '#6B7080' }}
          >
            {step.n}
          </span>
          <div className="flex-1">
            <h3
              className="display-sans text-[18px] md:text-[20px] font-bold tracking-tight leading-snug mb-1.5 transition-colors duration-300"
              style={{ color: active ? '#F5F6F8' : '#8A8E98' }}
            >
              {step.title}
            </h3>
            <p
              className="text-[13.5px] leading-relaxed transition-colors duration-300"
              style={{ color: active ? '#B0B4BE' : '#6B7080' }}
            >
              {step.body}
            </p>
          </div>
        </button>
      );
    })}
  </div>
);

import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const OLD_HEADLINE = 'Your current order form is';
const OLD_HEADLINE_ITALIC = 'losing money';
const NEW_HEADLINE = 'Jeweler Studio';

const OLD_CHIPS = ['No interaction', 'Back-and-forth', 'Cold leads'];
const NEW_CHIPS: Array<{ key: string; mobile: string; desktop: string }> = [
  { key: 'live',   mobile: 'Live design',   desktop: 'Live design'      },
  { key: 'quote',  mobile: 'Instant quote', desktop: 'Instant quote'    },
  { key: 'buyers', mobile: 'Hot buyers',    desktop: 'Qualified buyers' },
];

// Phases: lead-in 0-4%, wipe 4-62%, hold (settled new state) 62-100%
const WIPE_START = 0.04;
const WIPE_END = 0.62;


type AnimState = {
  progress: number;
  barY: number; // bar Y in sticky-div coords (px)
  oldClipBottom: number; // mockup OLD form clip-from-bottom %
  newClipTop: number; // mockup NEW form clip-from-top %
  headingNew: number; // 0..1 (0 = OLD, 1 = NEW)
  chipsNew: number;
  captionNew: number;
};

const INIT_STATE: AnimState = {
  progress: 0,
  barY: 99999,
  oldClipBottom: 0,
  newClipTop: 100,
  headingNew: 0,
  chipsNew: 0,
  captionNew: 0,
};

export const TheDifference = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [s, setS] = useState<AnimState>(INIT_STATE);

  useEffect(() => {
    let ticking = false;

    const newOpacityForElement = (
      bar: number,
      top: number,
      bottom: number,
      fade = 40
    ): number => {
      // 0 = element shows OLD (bar still below + fade), 1 = element shows NEW (bar above + fade)
      const start = bottom + fade; // newOp begins at 0 here
      const end = top - fade; // newOp reaches 1 here
      if (bar >= start) return 0;
      if (bar <= end) return 1;
      return Math.max(0, Math.min(1, (start - bar) / (start - end)));
    };

    const update = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) {
        ticking = false;
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = Math.max(1, sectionHeight - vh);
      const progress = Math.max(0, Math.min(1, -sectionRect.top / scrollable));

      const wipeRaw = (progress - WIPE_START) / (WIPE_END - WIPE_START);
      const wipeP = Math.max(0, Math.min(1, wipeRaw));

      // Bar travels from below viewport (overshoot) to above viewport (overshoot)
      const overshoot = 60;
      const stickyRect = sticky.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const barY =
        stickyHeight + overshoot - wipeP * (stickyHeight + 2 * overshoot);

      const boundsIn = (ref: React.RefObject<HTMLElement>) => {
        if (!ref.current) return null;
        const r = ref.current.getBoundingClientRect();
        return { top: r.top - stickyRect.top, bottom: r.bottom - stickyRect.top };
      };

      const heading = boundsIn(headingRef);
      const chips = boundsIn(chipsRef);
      const mockup = boundsIn(mockupRef);
      const caption = boundsIn(captionRef);

      const headingNew = heading
        ? newOpacityForElement(barY, heading.top, heading.bottom, 40)
        : 0;
      const chipsNew = chips
        ? newOpacityForElement(barY, chips.top, chips.bottom, 30)
        : 0;
      const captionNew = caption
        ? newOpacityForElement(barY, caption.top, caption.bottom, 20)
        : 0;

      let oldClipBottom = 0;
      let newClipTop = 100;
      if (mockup) {
        const rel = Math.max(
          0,
          Math.min(1, (barY - mockup.top) / Math.max(1, mockup.bottom - mockup.top))
        );
        oldClipBottom = (1 - rel) * 100;
        newClipTop = rel * 100;
      }

      setS({
        progress,
        barY,
        oldClipBottom,
        newClipTop,
        headingNew,
        chipsNew,
        captionNew,
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const showBar = s.progress > 0.02 && s.progress < 0.98;

  // Section bg darkens on a scroll-progress curve (starts midway up the wipe,
  // completes well before the bar finishes), so the dark mode lands earlier
  // than waiting for the bar to physically pass the heading.
  const DARK_START = 0.28;
  const DARK_END = 0.55;
  const darkP = Math.max(
    0,
    Math.min(1, (s.progress - DARK_START) / (DARK_END - DARK_START))
  );
  const bgR = Math.round(245 - 237 * darkP); // 245 → 8
  const bgG = Math.round(246 - 237 * darkP); // 246 → 9
  const bgB = Math.round(250 - 237 * darkP); // 250 → 13
  const sectionBg = `rgb(${bgR}, ${bgG}, ${bgB})`;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: '225vh',
        background: sectionBg,
        borderTop: '1px solid #E8EAEE',
      }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Atmosphere — base ambient (only visible once the section flips to the dark NEW state) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.5 * s.headingNew }}
        >
          <div
            className="absolute top-0 left-1/4 w-[800px] h-[700px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(232,122,109,0.08), transparent 65%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[800px] h-[700px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(178,152,255,0.10), transparent 65%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* NEW-state decorations — sweeping aurora light bands, fade in with the wipe */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: s.headingNew, transition: 'opacity 0.3s linear' }}
        >
          {/* Band 1 — violet, top, slow leftward sweep */}
          <div
            className="absolute"
            style={{
              top: '-20%',
              left: 0,
              width: '100%',
              height: '40%',
              transform: 'rotate(-12deg)',
              transformOrigin: '50% 50%',
            }}
          >
            <div
              className="w-[300%] h-full"
              style={{
                marginLeft: '-100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.22) 35%, rgba(178,152,255,0.30) 50%, rgba(168,100,255,0.22) 65%, transparent 100%)',
                filter: 'blur(50px)',
                animation: 'tdBandRight 16s linear infinite',
              }}
            />
          </div>

          {/* Band 2 — cyan, mid, opposite-direction sweep */}
          <div
            className="absolute"
            style={{
              top: '25%',
              left: 0,
              width: '100%',
              height: '35%',
              transform: 'rotate(8deg)',
              transformOrigin: '50% 50%',
            }}
          >
            <div
              className="w-[300%] h-full"
              style={{
                marginLeft: '-100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(80,220,255,0.22) 35%, rgba(109,213,250,0.28) 50%, rgba(80,220,255,0.22) 65%, transparent 100%)',
                filter: 'blur(60px)',
                animation: 'tdBandLeft 22s linear infinite',
                animationDelay: '-4s',
              }}
            />
          </div>

          {/* Band 3 — bicolor, bottom, slowest sweep */}
          <div
            className="absolute"
            style={{
              bottom: '-15%',
              left: 0,
              width: '100%',
              height: '45%',
              transform: 'rotate(-18deg)',
              transformOrigin: '50% 50%',
            }}
          >
            <div
              className="w-[300%] h-full"
              style={{
                marginLeft: '-100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.20) 30%, rgba(109,213,250,0.22) 50%, rgba(168,100,255,0.20) 70%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'tdBandRight 28s linear infinite',
                animationDelay: '-12s',
              }}
            />
          </div>

          <style>{`
            @keyframes tdBandRight {
              0%   { transform: translateX(0); }
              100% { transform: translateX(33.33%); }
            }
            @keyframes tdBandLeft {
              0%   { transform: translateX(33.33%); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-16 md:pt-20">
          <div className="relative max-w-7xl w-full flex flex-col items-center">
            <div
              className="eyebrow mb-5"
              style={{
                color: `rgb(${Math.round(92 + 153 * darkP)}, ${Math.round(96 + 150 * darkP)}, ${Math.round(104 + 144 * darkP)})`,
                transition: 'color 200ms linear',
              }}
            >
              The Difference
            </div>

            {/* Headline crossfade */}
            <div
              ref={headingRef}
              className="relative w-full max-w-[850px] h-[100px] md:h-[130px] lg:h-[150px] mb-6"
            >
              <h2
                className="absolute inset-0 flex items-center justify-center px-2"
                style={{ opacity: 1 - s.headingNew }}
              >
                <span className="display-sans text-[36px] md:text-[54px] lg:text-[64px] font-bold leading-[1.04] tracking-tight text-center" style={{ color: '#0A0B14' }}>
                  {OLD_HEADLINE} <em className="accent-italic-red">{OLD_HEADLINE_ITALIC}.</em>
                </span>
              </h2>
              <h2
                className="absolute inset-0 flex items-center justify-center px-2"
                style={{ opacity: s.headingNew }}
              >
                <span className="display-sans text-ice text-[36px] md:text-[54px] lg:text-[64px] font-bold leading-[1.04] tracking-tight text-center">
                  {NEW_HEADLINE}{' '}
                  <em className="accent-italic">
                    closes the{' '}
                    <span
                      className="relative"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        paddingBlock: '0.12em',
                        paddingInlineEnd: '0.08em',
                      }}
                    >
                      sale
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0"
                        style={{
                          bottom: '0.04em',
                          height: 4,
                          borderRadius: 2,
                          background: 'linear-gradient(90deg, #6DD5FA, #B298FF)',
                          transformOrigin: 'left center',
                          transform: s.headingNew > 0.55 ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 900ms cubic-bezier(0.2,0.8,0.2,1)',
                          boxShadow: '0 0 12px rgba(178,152,255,0.55)',
                          WebkitTextFillColor: 'initial',
                        }}
                      />
                    </span>
                    .
                  </em>
                </span>
              </h2>
            </div>

            {/* Chips crossfade — single-row layout on every breakpoint */}
            <div ref={chipsRef} className="relative mb-8 w-full h-[32px] sm:h-[42px]">
              <div
                className="absolute inset-0 flex flex-nowrap justify-center items-center gap-1.5 sm:gap-2.5"
                style={{ opacity: 1 - s.chipsNew }}
              >
                {OLD_CHIPS.map((c) => (
                  <ProblemChip key={c}>{c}</ProblemChip>
                ))}
              </div>
              <div
                className="absolute inset-0 flex flex-nowrap justify-center items-center gap-1.5 sm:gap-2.5"
                style={{ opacity: s.chipsNew }}
              >
                {NEW_CHIPS.map((c) => (
                  <SolutionChip key={c.key}>
                    <span className="sm:hidden">{c.mobile}</span>
                    <span className="hidden sm:inline">{c.desktop}</span>
                  </SolutionChip>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="relative w-full max-w-[680px]">
              <div
                ref={mockupRef}
                className="relative h-[600px] md:h-[700px] lg:h-[750px] rounded-2xl overflow-hidden"
              >
                {/* New site (back) */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(${s.newClipTop}% 0 0 0)`,
                    WebkitClipPath: `inset(${s.newClipTop}% 0 0 0)`,
                  }}
                >
                  <NewSiteWorkflow onDemoClick={onDemoClick} />
                </div>
                {/* Old form (front) */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 0 ${s.oldClipBottom}% 0)`,
                    WebkitClipPath: `inset(0 0 ${s.oldClipBottom}% 0)`,
                  }}
                >
                  <OldFormMockup />
                </div>
              </div>

              {/* Caption crossfade */}
              <div ref={captionRef} className="text-center mt-7 relative h-9">
                <span
                  className="absolute inset-0 flex items-center justify-center font-mono text-[15px] md:text-[16px] tracking-[0.18em] uppercase font-bold"
                  style={{ opacity: 1 - s.captionNew, color: '#3A3F4D' }}
                >
                  Your current setup
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center font-mono text-[15px] md:text-[16px] tracking-[0.18em] uppercase text-aurora-violet font-bold"
                  style={{
                    opacity: s.captionNew,
                    textShadow: '0 0 18px rgba(178,152,255,0.45)',
                  }}
                >
                  With Jeweler Studio
                </span>
              </div>

              {/* CTA — fades in alongside the NEW state */}
              <div
                className="mt-6 flex justify-center"
                style={{
                  opacity: s.captionNew,
                  transform: `translateY(${(1 - s.captionNew) * 8}px)`,
                  transition: 'opacity 0.3s linear, transform 0.3s linear',
                  pointerEvents: s.captionNew > 0.5 ? 'auto' : 'none',
                }}
              >
                <button onClick={onDemoClick} className="btn-aurora-outline">
                  See it on your site <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width bar */}
        {showBar && <SoftBar topPx={s.barY} />}

        {/* Bottom fade — blurs the section into obsidian before the boundary */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 220,
            background:
              'linear-gradient(to top, #08090D 0%, rgba(8,9,13,0.85) 30%, rgba(8,9,13,0.45) 60%, transparent 100%)',
            opacity: s.headingNew,
          }}
        />
      </div>
    </section>
  );
};

// =============================================================================
// CHIPS
// =============================================================================

const ProblemChip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-full font-mono text-[9.5px] sm:text-[11px] tracking-[0.06em] sm:tracking-eyebrow uppercase font-bold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0"
    style={{
      border: '1.5px solid #FF5252',
      background: 'rgba(255, 82, 82, 0.12)',
      color: '#0A0B14',
      boxShadow: '0 0 14px rgba(255, 82, 82, 0.20)',
    }}
  >
    <span
      className="hidden sm:inline-block w-1.5 h-1.5 rounded-full"
      style={{ background: '#7A0F0F', boxShadow: '0 0 4px rgba(122, 15, 15, 0.7)' }}
    />
    {children}
  </span>
);

const SolutionChip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-full font-mono text-[9.5px] sm:text-[11px] tracking-[0.06em] sm:tracking-eyebrow uppercase font-bold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 text-ice"
    style={{
      border: '1.5px solid #B298FF',
      background: 'rgba(178,152,255,0.10)',
      boxShadow: '0 0 14px rgba(178,152,255,0.20)',
    }}
  >
    <span
      className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-aurora-violet"
      style={{ boxShadow: '0 0 6px #B298FF' }}
    />
    {children}
  </span>
);

// =============================================================================
// SOFT FULL-WIDTH BAR
// =============================================================================

const SoftBar = ({ topPx }: { topPx: number }) => (
  <div
    className="absolute left-0 right-0 pointer-events-none z-20"
    style={{ top: `${topPx}px`, transform: 'translateY(-50%)' }}
  >
    {/* Wide ambient halo — vertical fade only, full width horizontally */}
    <div
      className="absolute -top-32 -bottom-32 left-0 right-0"
      style={{
        background:
          'linear-gradient(180deg, transparent 0%, rgba(178,152,255,0.06) 45%, rgba(178,152,255,0.12) 50%, rgba(178,152,255,0.06) 55%, transparent 100%)',
        filter: 'blur(24px)',
      }}
    />
    {/* Mid glow — solid horizontal cyan→violet→cyan, edge-to-edge */}
    <div
      className="absolute -top-6 -bottom-6 left-0 right-0"
      style={{
        background:
          'linear-gradient(90deg, rgba(109,213,250,0.28) 0%, rgba(178,152,255,0.40) 50%, rgba(109,213,250,0.28) 100%)',
        filter: 'blur(8px)',
      }}
    />
    {/* Soft centerline — solid edge-to-edge gradient */}
    <div
      className="relative h-[2px]"
      style={{
        background:
          'linear-gradient(90deg, rgba(109,213,250,0.60) 0%, rgba(178,152,255,0.80) 50%, rgba(109,213,250,0.60) 100%)',
        filter: 'blur(2px)',
      }}
    />
  </div>
);

// =============================================================================
// OLD FORM
// =============================================================================

const OldFormMockup = () => (
  <div
    className="w-full h-full rounded-2xl p-6 md:p-8 flex flex-col"
    style={{
      background: '#E8EAEE',
      border: '1px solid #C8CAD0',
      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
    }}
  >
    <div className="font-mono text-[11px] tracking-eyebrow uppercase mb-6" style={{ color: '#6B7080' }}>
      Custom Order Inquiry
    </div>
    <div className="space-y-3.5 mb-4">
      <FormField label="Full name" />
      <FormField label="Email" />
      <FormField label="Phone (optional)" />
    </div>
    <div className="flex-1 flex flex-col mb-5">
      <label className="font-mono text-[10px] tracking-wide uppercase mb-2" style={{ color: '#6B7080' }}>
        Tell us what you&apos;re looking for
      </label>
      <div
        className="flex-1 rounded-md p-3"
        style={{ background: '#FFFFFF', border: '1px solid #C8CAD0' }}
      >
        <span className="text-[13px]" style={{ color: '#9CA0AC' }}>
          Type your inquiry...
        </span>
      </div>
    </div>
    <button
      type="button"
      className="self-start px-5 py-2.5 rounded-md text-[13px] font-medium"
      style={{ background: '#D8DAE0', border: '1px solid #B8BAC2', color: '#5A6070' }}
    >
      Submit inquiry
    </button>
  </div>
);

const FormField = ({ label }: { label: string }) => (
  <div>
    <label
      className="font-mono text-[10px] tracking-wide uppercase block mb-1.5"
      style={{ color: '#6B7080' }}
    >
      {label}
    </label>
    <div
      className="h-9 rounded-md"
      style={{ background: '#FFFFFF', border: '1px solid #C8CAD0' }}
    />
  </div>
);

// =============================================================================
// NEW SITE — animated workflow (Type → Generate → Deposit)
// =============================================================================

const PROMPT_TARGET = "Heart pendant, diamond halo, engraved 'A'";
const PHASE_DURATION = 3200;

const NewSiteWorkflow = ({ onDemoClick: _ }: { onDemoClick: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = window.setInterval(
      () => setPhase((p) => (p + 1) % 3),
      PHASE_DURATION
    );
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className="w-full h-full rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid #D6D9E0',
        boxShadow: '0 18px 48px rgba(10,11,20,0.35), 0 0 80px rgba(178,152,255,0.30)',
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

      {/* Brand header (constant across phases) */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <defs>
              <linearGradient id="td-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6DD5FA" />
                <stop offset="0.5" stopColor="#B298FF" />
                <stop offset="1" stopColor="#7C5BFF" />
              </linearGradient>
            </defs>
            <polygon points="7,1 13,5 7,13 1,5" fill="url(#td-grad)" />
          </svg>
          <span className="font-mono text-[11px] tracking-eyebrow uppercase font-bold" style={{ color: '#1A1F2E' }}>
            Studio AI · Live
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-ok"
            style={{ boxShadow: '0 0 6px #6BD3A3' }}
          />
          <span className="font-mono text-[10px] tracking-eyebrow uppercase font-bold" style={{ color: '#1F8B5C' }}>
            Active
          </span>
        </span>
      </div>

      {/* Phase indicator dots */}
      <div className="relative flex items-center gap-2 mb-5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-[3px] rounded-full transition-all duration-500"
            style={{
              width: i === phase ? 28 : 14,
              background:
                i <= phase
                  ? 'linear-gradient(90deg, #6DD5FA, #B298FF)'
                  : 'rgba(26,31,46,0.12)',
            }}
          />
        ))}
      </div>

      {/* Phase content area — phases stack absolute */}
      <div className="relative flex-1 min-h-[240px]">
        <PhaseTyping visible={phase === 0} />
        <PhaseGenerating visible={phase === 1} />
        <PhaseSent visible={phase === 2} />
      </div>
    </div>
  );
};

// PHASE 0 — typing
const PhaseTyping = ({ visible }: { visible: boolean }) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!visible) {
      setTyped('');
      return;
    }
    let i = 0;
    setTyped('');
    const interval = window.setInterval(() => {
      i += 1;
      setTyped(PROMPT_TARGET.slice(0, i));
      if (i >= PROMPT_TARGET.length) window.clearInterval(interval);
    }, 55);
    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="font-mono text-[10px] tracking-eyebrow uppercase mb-2 font-bold" style={{ color: '#6B7080' }}>
        Step 1 · Describe
      </div>
      <h3
        className="display-sans text-[20px] md:text-[24px] font-bold tracking-tight leading-tight mb-4"
        style={{ color: '#08090D' }}
      >
        Tell us what you want.
      </h3>
      <div
        className="rounded-lg px-4 py-3 mb-4"
        style={{
          minHeight: 70,
          background: '#FFFFFF',
          border: '1px solid #D6D9E0',
        }}
      >
        <div className="font-mono text-[10px] tracking-wide uppercase mb-1.5" style={{ color: '#6B7080' }}>
          Your piece
        </div>
        <div className="text-[14px] leading-snug" style={{ color: '#08090D' }}>
          {typed}
          <span
            className="inline-block w-[2px] h-[14px] ml-[2px] align-middle"
            style={{
              background: '#B298FF',
              animation: 'tdBlink 1s step-end infinite',
            }}
          />
        </div>
      </div>
      <div className="mt-auto">
        <div
          className="rounded-lg px-4 py-3 text-center text-[14px] font-medium"
          style={{
            background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
            color: '#0A0B10',
            boxShadow: '0 8px 24px rgba(178,152,255,0.40)',
          }}
        >
          Generate render
        </div>
      </div>
      <style>{`@keyframes tdBlink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

// PHASE 1 — generating
const PhaseGenerating = ({ visible }: { visible: boolean }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!visible) {
      setPct(0);
      return;
    }
    setPct(0);
    const interval = window.setInterval(() => {
      setPct((p) => Math.min(96, p + 4));
    }, 80);
    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <div
      className="absolute inset-0 flex flex-col transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="font-mono text-[10px] tracking-eyebrow uppercase font-bold mb-2" style={{ color: '#7C5BFF' }}>
        Step 2 · Rendering
      </div>
      <h3
        className="display-sans text-[20px] md:text-[24px] font-bold tracking-tight leading-tight mb-4"
        style={{ color: '#08090D' }}
      >
        AI is rendering your piece.
      </h3>

      <div
        className="rounded-lg px-4 py-3 mb-4"
        style={{
          minHeight: 50,
          background: '#FFFFFF',
          border: '1px solid #D6D9E0',
          opacity: 0.7,
        }}
      >
        <div className="font-mono text-[10px] tracking-wide uppercase mb-1" style={{ color: '#6B7080' }}>
          Your piece
        </div>
        <div className="text-[13px] leading-snug truncate" style={{ color: '#3A3F4D' }}>
          {PROMPT_TARGET}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-2">
        <div
          className="w-12 h-12 rounded-full mb-4"
          style={{
            border: '3px solid rgba(26,31,46,0.10)',
            borderTopColor: '#B298FF',
            animation: 'tdSpin 1s linear infinite',
            boxShadow: '0 0 18px rgba(178,152,255,0.35)',
          }}
        />
        <div className="font-mono text-[10px] tracking-eyebrow uppercase font-bold" style={{ color: '#3A3F4D' }}>
          Generating
        </div>
      </div>

      <div className="mt-auto">
        <div
          className="h-[4px] rounded-full overflow-hidden"
          style={{ background: 'rgba(26,31,46,0.10)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #6DD5FA, #B298FF)',
              boxShadow: '0 0 10px rgba(178,152,255,0.5)',
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <span className="font-mono text-[10px] tabular font-bold" style={{ color: '#7C5BFF' }}>
            {pct}%
          </span>
        </div>
      </div>

      <style>{`@keyframes tdSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// PHASE 2 — deposit sent
const PhaseSent = ({ visible }: { visible: boolean }) => (
  <div
    className="absolute inset-0 flex flex-col transition-opacity duration-500"
    style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
  >
    <div className="font-mono text-[10px] tracking-eyebrow uppercase font-bold mb-2" style={{ color: '#1F8B5C' }}>
      Step 3 · Sale closed
    </div>
    <h3
      className="display-sans text-[20px] md:text-[24px] font-bold tracking-tight leading-tight mb-4"
      style={{ color: '#08090D' }}
    >
      Deposit sent.
    </h3>

    {/* Render preview — dark inset frame on the light app surface */}
    <div
      className="relative flex-1 rounded-xl flex items-center justify-center mb-4 min-h-[150px] overflow-hidden"
      style={{
        background: '#0A0B10',
        border: '1px solid #D6D9E0',
        boxShadow: 'inset 0 0 0 1px rgba(178,152,255,0.18)',
      }}
    >
      <div
        className="absolute -inset-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(178,152,255,0.30), transparent 60%), radial-gradient(circle at 80% 80%, rgba(109,213,250,0.22), transparent 60%)',
          filter: 'blur(28px)',
        }}
      />
      <div className="relative">
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background:
              'linear-gradient(#13151C, #13151C) padding-box, conic-gradient(from 0deg, #6DD5FA, #B298FF, #E0E7FF, #6DD5FA) border-box',
            border: '6px solid transparent',
            boxShadow:
              '0 0 26px rgba(178,152,255,0.45), inset 0 0 14px rgba(178,152,255,0.2)',
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-3.5 h-3.5"
          style={{
            transform: 'translate(-50%, -50%) rotate(45deg)',
            background: 'linear-gradient(135deg, #E0E7FF, #6DD5FA)',
            boxShadow: '0 0 12px rgba(109,213,250,0.9)',
          }}
        />
      </div>
    </div>

    {/* Confirmation row */}
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="font-mono text-[10px] tracking-eyebrow uppercase mb-1" style={{ color: '#6B7080' }}>
          Deposit
        </div>
        <div className="display-sans aurora-text font-bold text-[24px] md:text-[28px] tabular leading-none">
          $4,890
        </div>
      </div>
      <span
        className="flex items-center gap-2 px-3 py-2 rounded-lg"
        style={{
          background: 'rgba(31,139,92,0.12)',
          border: '1px solid #1F8B5C',
          animation: 'tdSentPulse 2s ease-in-out infinite',
        }}
      >
        <Check size={14} strokeWidth={3} style={{ color: '#1F8B5C' }} />
        <span className="font-mono text-[10px] tracking-eyebrow uppercase font-bold" style={{ color: '#1F8B5C' }}>
          Sent
        </span>
      </span>
    </div>

    <style>{`
      @keyframes tdSentPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(31,139,92,0); }
        50%      { box-shadow: 0 0 0 8px rgba(31,139,92,0.20); }
      }
    `}</style>
  </div>
);

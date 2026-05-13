import { useEffect, useState } from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

// Reveal cascade — each tier fades+rises after its delay (in ms).
const TIER = {
  eyebrow:    0,
  headlineA:  150,
  headlineB:  350,
  subheading: 800,
  paragraph:  1100,
  chart:      1300,
};

const COUNTER_START_DELAY = TIER.headlineB + 50;
const COUNTER_DURATION    = 1400;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (target: number, start: number, isVisible: boolean) => {
  const [n, setN] = useState(start);
  useEffect(() => {
    if (!isVisible) return;
    const t0 = performance.now() + COUNTER_START_DELAY;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - t0;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / COUNTER_DURATION, 1);
      const eased = easeOutExpo(p);
      const value = Math.round(start + (target - start) * eased);
      setN(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target, start]);
  return n;
};

const reveal = (delay: number, isVisible: boolean): React.CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
  transition:
    'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
  transitionDelay: `${delay}ms`,
});

// =============================================================================
// LEAD CONVERSION RATE — paired bar chart
// =============================================================================

type BarTone = 'muted' | 'aurora';

const BarRow = ({
  label,
  pct,
  delay,
  isVisible,
  tone,
}: {
  label: string;
  pct: number;
  delay: number;
  isVisible: boolean;
  tone: BarTone;
}) => {
  const isAurora = tone === 'aurora';
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4 md:mb-5">
        <span
          className="font-mono text-[11px] sm:text-[12px] md:text-[13px] tracking-eyebrow uppercase font-bold"
          style={{ color: isAurora ? '#7C5BFF' : '#6B7080' }}
        >
          {label}
        </span>
        <span
          className="display italic tabular text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-none"
          style={{ color: '#0A0B14', fontVariantNumeric: 'tabular-nums' }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="h-3 md:h-3.5 rounded-full overflow-hidden"
        style={{ background: '#E8EAEE' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: isVisible ? `${pct}%` : '0%',
            background: isAurora
              ? 'linear-gradient(90deg, #6DD5FA, #B298FF)'
              : 'linear-gradient(90deg, #C8CDD5, #9CA0AC)',
            transition: `width 1400ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            boxShadow: isAurora ? '0 0 18px rgba(178,152,255,0.50)' : 'none',
          }}
        />
      </div>
    </div>
  );
};

const LeadConversionChart = ({ isVisible }: { isVisible: boolean }) => (
  <div className="w-full max-w-2xl lg:max-w-none">
    <div
      className="font-mono text-[11px] md:text-[12px] tracking-eyebrow uppercase font-bold mb-8 md:mb-10"
      style={{ color: '#9CA0AC' }}
    >
      Lead Conversion Rate
    </div>
    <div className="space-y-8 md:space-y-10">
      <BarRow label="Without" pct={10} delay={1500} isVisible={isVisible} tone="muted" />
      <BarRow
        label="With Jeweler Studio"
        pct={50}
        delay={1750}
        isVisible={isVisible}
        tone="aurora"
      />
    </div>
  </div>
);

// =============================================================================
// GHOSTED THREAD — chat-thread mockup animating on a 10s loop
// =============================================================================

const GhostedThread = () => {
  // Gate the animations to the thread's own visibility so they start from beat 1
  // when the chat actually enters the viewport — not when the parent section trips.
  // The chat content is gated behind React state so the messages literally don't
  // render until we're ready to play the animation from t=0.
  const { ref, isVisible } = useScrollTrigger(0.35);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const t = window.setTimeout(() => setPlaying(true), 1200);
    return () => window.clearTimeout(t);
  }, [isVisible]);

  return (
  <div ref={ref} className={`w-full max-w-[380px] mx-auto ${playing ? 'gt-active' : ''}`}>
    <div
      className="relative rounded-2xl bg-paper-2 overflow-hidden"
      style={{
        border: '1px solid #E8EAEE',
        boxShadow:
          '0 1px 0 rgba(10,11,20,0.02), 0 12px 32px -16px rgba(10,11,20,0.08), 0 24px 48px -24px rgba(10,11,20,0.05)',
      }}
    >
      {/* iMessage-style header — back chevron + 12 badge, centered avatar + name, FaceTime icon */}
      <div
        className="relative flex flex-col items-center px-5 pt-2 pb-2"
        style={{
          borderBottom: '1px solid #E8EAEE',
          background: 'rgba(247,247,249,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Back chevron + unread "12" badge — left */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <svg
            aria-hidden="true"
            width="11"
            height="18"
            viewBox="0 0 11 18"
            fill="none"
            stroke="#007AFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 1.5 L2 9 L9 16.5" />
          </svg>
          <span
            className="px-2 py-0.5 rounded-full font-sans text-[11px] font-semibold text-white leading-none"
            style={{ background: '#007AFF' }}
          >
            12
          </span>
        </div>

        {/* FaceTime camera — right */}
        <svg
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#007AFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="14" height="12" rx="2.5" />
          <path d="M22 8 L16 12 L22 16 Z" />
        </svg>

        {/* Centered avatar + name */}
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center font-sans text-[10px] font-bold mb-0.5"
          style={{
            background: '#F5C842',
            color: '#8B6914',
          }}
        >
          FS
        </span>
        <div className="flex items-center gap-0.5 text-ink text-[11.5px] font-medium leading-tight">
          Frank S.
          <svg
            aria-hidden="true"
            className="ml-0.5"
            width="8"
            height="11"
            viewBox="0 0 8 11"
            fill="none"
            stroke="#9CA0AC"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1.5 1 L6.5 5.5 L1.5 10" />
          </svg>
        </div>
      </div>

      {/* Messages — each fades in on its own % of the loop */}
      <div className="px-4 py-4 space-y-2.5">
        {/* msg1 — customer */}
        <ThreadMessage side="left" delay={0}>
          Looking for a custom oval ring — got a pic?
        </ThreadMessage>

        {/* msg2 — jeweler clarifying */}
        <ThreadMessage side="right" delay={10}>
          4-prong or 6-prong?
        </ThreadMessage>

        {/* msg3 — jeweler */}
        <ThreadMessage side="right" delay={20} status="Sent · Mon">
          Give me 2–3 days to sketch.
        </ThreadMessage>

        {/* msg4 — jeweler check-in */}
        <ThreadMessage side="right" delay={32} status="Sent · Wed">
          Sound good?
        </ThreadMessage>

        {/* msg5 — jeweler final */}
        <ThreadMessage side="right" delay={46} status="Read · Fri">
          Still there?
        </ThreadMessage>

        {/* Typing indicator — briefly appears, then disappears */}
        <div className="gt-typing flex items-center gap-1.5">
          <span className="gt-dot" />
          <span className="gt-dot" style={{ animationDelay: '0.2s' }} />
          <span className="gt-dot" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Ghost label — italic, left-aligned, subtle */}
        <div className="gt-ghost pt-2">
          <span className="italic text-[12px] text-ink-mute">
            no reply
          </span>
        </div>
      </div>
    </div>

    {/* SALE LOST — red outlined pill BELOW the card */}
    <div className="gt-sale-lost flex justify-center mt-5">
      <div
        className="rounded-md px-5 py-2"
        style={{ border: '2.5px solid #E53935' }}
      >
        <span
          className="font-sans text-[13px] md:text-[15px] tracking-[0.22em]"
          style={{ color: '#E53935', fontWeight: 900 }}
        >
          SALE LOST
        </span>
      </div>
    </div>

    <style>{`
      /* Initial state — every animated slot is fully hidden (opacity + visibility)
         until the parent wrapper goes active. visibility: hidden guarantees the
         element renders nothing even if some other rule were to bump opacity. */
      .gt-msg-1, .gt-msg-2, .gt-msg-3, .gt-msg-4, .gt-msg-5,
      .gt-typing,
      .gt-ghost,
      .gt-sale-lost {
        opacity: 0;
        visibility: hidden;
      }
      .gt-typing { max-height: 0; overflow: hidden; }

      /* React state holds .gt-active off until the play window starts —
         no animation-delay needed; animations begin from beat 1 the instant
         the class flips on. */
      .gt-active .gt-msg-1,
      .gt-active .gt-msg-2,
      .gt-active .gt-msg-3,
      .gt-active .gt-msg-4,
      .gt-active .gt-msg-5 {
        animation-duration: 9.5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(.4, 0, .2, 1);
      }
      .gt-active .gt-msg-1 { animation-name: gtMsg1; }
      .gt-active .gt-msg-2 { animation-name: gtMsg2; }
      .gt-active .gt-msg-3 { animation-name: gtMsg3; }
      .gt-active .gt-msg-4 { animation-name: gtMsg4; }
      .gt-active .gt-msg-5 { animation-name: gtMsg5; }

      .gt-active .gt-typing {
        animation: gtTyping 9.5s cubic-bezier(.4,0,.2,1) 1 forwards;
      }
      .gt-active .gt-ghost {
        animation: gtGhost 9.5s cubic-bezier(.4,0,.2,1) 1 forwards;
      }
      .gt-active .gt-sale-lost {
        animation: gtSaleLost 9.5s cubic-bezier(.4,0,.2,1) 1 forwards;
      }

      @keyframes gtMsg1 {
        0%      { opacity: 0; visibility: visible; transform: translateY(8px); }
        4%, 100%{ opacity: 1; visibility: visible; transform: translateY(0); }
      }
      @keyframes gtMsg2 {
        0%, 10%  { opacity: 0; visibility: visible; transform: translateY(8px); }
        14%, 100%{ opacity: 1; visibility: visible; transform: translateY(0); }
      }
      @keyframes gtMsg3 {
        0%, 20%  { opacity: 0; visibility: visible; transform: translateY(8px); }
        24%, 100%{ opacity: 1; visibility: visible; transform: translateY(0); }
      }
      @keyframes gtMsg4 {
        0%, 32%  { opacity: 0; visibility: visible; transform: translateY(8px); }
        36%, 100%{ opacity: 1; visibility: visible; transform: translateY(0); }
      }
      @keyframes gtMsg5 {
        0%, 44%  { opacity: 0; visibility: visible; transform: translateY(8px); }
        48%, 100%{ opacity: 1; visibility: visible; transform: translateY(0); }
      }

      @keyframes gtTyping {
        0%, 54%   { opacity: 0; visibility: visible; max-height: 0; }
        58%, 70%  { opacity: 1; visibility: visible; max-height: 40px; }
        74%, 100% { opacity: 0; visibility: visible; max-height: 0; }
      }

      .gt-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #B0B5BD;
        display: inline-block;
        animation: gtDot 1.2s ease-in-out infinite;
      }
      @keyframes gtDot {
        0%, 30%, 70%, 100% { transform: translateY(0); opacity: 0.5; }
        50% { transform: translateY(-3px); opacity: 1; }
      }

      @keyframes gtGhost {
        0%, 75%   { opacity: 0; visibility: visible; transform: translateY(4px); }
        79%, 100% { opacity: 1; visibility: visible; transform: translateY(0); }
      }

      @keyframes gtSaleLost {
        0%, 90%   { opacity: 0; visibility: visible; transform: translateY(4px); }
        95%, 100% { opacity: 1; visibility: visible; transform: translateY(0); }
      }

    `}</style>
  </div>
  );
};

const ThreadMessage = ({
  side,
  delay,
  status,
  children,
}: {
  side: 'left' | 'right';
  delay: 0 | 10 | 20 | 32 | 46;
  status?: string;
  children: React.ReactNode;
}) => {
  const classMap: Record<number, string> = {
    0: 'gt-msg-1',
    10: 'gt-msg-2',
    20: 'gt-msg-3',
    32: 'gt-msg-4',
    46: 'gt-msg-5',
  };
  const isLeft = side === 'left';
  return (
    <div className={`${classMap[delay]} flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[78%] ${isLeft ? '' : 'flex flex-col items-end'}`}>
        <span
          className="inline-block px-3.5 py-2 text-[13px] font-medium leading-snug rounded-[20px]"
          style={
            isLeft
              ? {
                  background: '#E5E5EA',
                  color: '#0A0B14',
                }
              : {
                  background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px -4px rgba(178,152,255,0.45)',
                }
          }
        >
          {children}
        </span>
        {status && (
          <span className="mt-1 text-[10px] text-ink-faint">
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN
// =============================================================================

export const SocialProof = () => {
  const { ref, isVisible } = useScrollTrigger(0.25);
  const counter = useCountUp(9, 1, isVisible);

  return (
    <div ref={ref} className="bg-paper relative">
      <div className="pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-32 lg:pb-40 px-5 sm:px-6 relative overflow-hidden border-t border-rule">
        {/* MORPHING ATMOSPHERE — coral (problem) cross-fades to aurora (resolution) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-[8%] w-[820px] h-[560px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(232,122,109,0.55), transparent 65%)',
              filter: 'blur(60px)',
              opacity: isVisible ? 0.08 : 0.22,
              transition: 'opacity 1800ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '1500ms',
            }}
          />
          <div
            className="absolute top-[12%] right-[6%] w-[720px] h-[520px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(178,152,255,0.55), transparent 65%)',
              filter: 'blur(60px)',
              opacity: isVisible ? 0.26 : 0,
              transition: 'opacity 1800ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '1500ms',
            }}
          />
          <div
            className="absolute bottom-[6%] right-[18%] w-[600px] h-[440px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(109,213,250,0.45), transparent 65%)',
              filter: 'blur(60px)',
              opacity: isVisible ? 0.22 : 0,
              transition: 'opacity 1800ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '1700ms',
            }}
          />
        </div>

        {/* Content — text on left, chart on right at lg+. Stacks on smaller viewports. */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[60fr_40fr] gap-14 lg:gap-20 items-center">
            <div>
              <div className="eyebrow mb-8 md:mb-10" style={reveal(TIER.eyebrow, isVisible)}>
                The Problem
              </div>

              <h1 className="display-sans text-ink font-bold tracking-tight leading-[1.02] mb-8 md:mb-10">
                <span
                  className="block whitespace-nowrap text-[34px] sm:text-[42px] md:text-[54px] lg:text-[56px] xl:text-[68px]"
                  style={reveal(TIER.headlineA, isVisible)}
                >
                  Stop doing free work.
                </span>
                <span
                  className="block text-[34px] sm:text-[42px] md:text-[54px] lg:text-[56px] xl:text-[68px] mt-2 md:mt-3"
                  style={reveal(TIER.headlineB, isVisible)}
                >
                  <span
                    className="aurora-text tabular align-baseline"
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {counter}/10
                  </span>{' '}
                  custom orders die for one reason.
                </span>
              </h1>

              <p
                className="display-sans text-ink font-medium text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] xl:text-[34px] leading-[1.25] tracking-tight mb-8 md:mb-10 max-w-[42ch]"
                style={reveal(TIER.subheading, isVisible)}
              >
                If they can't see it,{' '}
                <span
                  className="underline decoration-2 underline-offset-[6px]"
                  style={{ color: '#B298FF', textDecorationColor: '#B298FF' }}
                >
                  they won't buy it.
                </span>
              </p>

              <p
                className="text-ink-mute text-[15px] md:text-[16px] leading-relaxed max-w-xl"
                style={reveal(TIER.paragraph, isVisible)}
              >
                Jeweler Studio changes that. Customers design directly on your website. You capture the lead and get the deposit — without any back and forth.
              </p>
            </div>

            {/* Right column — ghosted-thread mockup, shifted lower on lg+.
                Outer div handles the reveal animation; inner div applies the
                vertical offset so it doesn't fight the reveal's transform. */}
            <div
              className="mt-12 lg:mt-0 w-full lg:self-center"
              style={reveal(TIER.chart, isVisible)}
            >
              <div className="lg:translate-y-[10%]">
                <GhostedThread />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

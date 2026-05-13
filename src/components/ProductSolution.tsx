import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Circle,
  Gem,
  Heart,
  Sparkles,
  Star,
  Tag,
  Watch,
  ImageIcon,
  type LucideIcon,
} from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

// =============================================================================
// PHASE TIMING
// =============================================================================

const PHASES = [
  { id: 'type',      ms: 2600 },
  { id: 'configure', ms: 5400 },
  { id: 'generate',  ms: 2200 },
  { id: 'result',    ms: 3200 },
  { id: 'confirm',   ms: 3600 },
] as const;
const PHASE_COUNT = PHASES.length;

// =============================================================================
// CONTENT DATA
// =============================================================================

const JEWELRY_TYPES: { name: string; icon: LucideIcon }[] = [
  { name: 'Ring',     icon: Circle },
  { name: 'Pendant',  icon: Gem },
  { name: 'Necklace', icon: Heart },
  { name: 'Earrings', icon: Sparkles },
  { name: 'Bracelet', icon: Watch },
  { name: 'Brooch',   icon: Star },
];
const SELECTED_TYPE = 1; // Pendant

const GEMS = ['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'Pearl'];
const SELECTED_GEM = 0;

const METALS = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'];
const SELECTED_METAL = 0;

const STYLES = ['Nameplate', 'Logo', 'Picture'];
const SELECTED_STYLE = 0;

const PROMPT_TEXT = 'Iced out script double layer nameplate of the word Jeweler Studio';

// =============================================================================
// MAIN
// =============================================================================

export const ProductSolution = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.2);
  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setPhaseIdx(0);
      return;
    }
    let timeoutId: number | undefined;
    const advance = (next: number) => {
      setPhaseIdx(next);
      timeoutId = window.setTimeout(() => advance((next + 1) % PHASE_COUNT), PHASES[next].ms);
    };
    const startTimer = window.setTimeout(() => advance(0), 1700);
    return () => {
      window.clearTimeout(startTimer);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [isVisible]);

  const lidAngle = isVisible ? -2 : -92;

  return (
    <section
      id="products"
      ref={ref}
      className="py-24 md:py-28 px-6 border-t border-rule bg-relief-light relative overflow-hidden"
    >
      {/* Aurora atmosphere — softened for light surface */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[1000px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(178,152,255,0.10), transparent 65%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(109,213,250,0.10), transparent 65%)', filter: 'blur(90px)' }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto">
        {/* TOP — Centered headline */}
        <div className="text-center mb-12 md:mb-14">
          <div className="eyebrow font-bold text-[13px] md:text-[14px] mb-5">Jeweler Studio</div>
          <h2 className="display-sans text-ink text-[44px] md:text-[72px] lg:text-[96px] font-bold leading-[0.95] tracking-tight mb-5">
            Ideas to renders. <em className="accent-italic">In seconds.</em>
          </h2>
          <p className="display-sans text-ink-3 text-[18px] md:text-[22px] lg:text-[24px] leading-[1.4] max-w-[60ch] mx-auto">
            Customers describe their piece. Our AI generates a hyper-realistic image instantly.
            <br />
            You collect the leads and deposits. All on your website.
          </p>
        </div>

        {/* MIDDLE — Phone on mobile / Laptop on desktop */}
        <div className="flex justify-center mb-12 md:mb-14">
          {/* Phone (< lg) */}
          <div className="block lg:hidden w-full">
            <Phone phaseIdx={phaseIdx} isOpen={isVisible} />
          </div>
          {/* Laptop (lg and up) */}
          <div className="hidden lg:block w-full">
            <Laptop lidAngle={lidAngle} phaseIdx={phaseIdx} isOpen={isVisible} />
          </div>
        </div>

        {/* BOTTOM — Editorial stat strip + CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="relative grid grid-cols-3">
            {/* Subtle top + bottom hairlines bracketing the strip */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'rgba(10,11,20,0.10)' }}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'rgba(10,11,20,0.10)' }}
            />

            {[
              { num: '20',   unit: 'x',  label: 'More leads' },
              { num: '60',   unit: '%',  label: 'More website traffic' },
              { num: '<25', unit: 'sec', label: 'Idea to render' },
            ].map((b, i) => (
              <div key={b.label} className="relative px-3 py-7 sm:py-8 text-center">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[20%] bottom-[20%] w-px"
                    style={{ background: 'rgba(10,11,20,0.10)' }}
                  />
                )}

                <div className="flex items-baseline justify-center gap-0.5">
                  <span
                    className="display-sans font-medium text-[34px] sm:text-[44px] md:text-[56px] tabular tracking-tight leading-none"
                    style={{ color: '#0A0B14' }}
                  >
                    {b.num}
                  </span>
                  {b.unit && (
                    <span
                      className="display-sans font-medium text-[18px] sm:text-[22px] md:text-[28px] tabular tracking-tight leading-none"
                      style={{ color: '#0A0B14' }}
                    >
                      {b.unit}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[10px] sm:text-[10.5px] md:text-[11px] tracking-eyebrow uppercase font-bold text-ink-mute mt-2.5 md:mt-3">
                  {b.label}
                </div>
              </div>
            ))}
          </div>

          <div className="eyebrow-accent text-center mt-4 md:mt-5">
            The world's first AI Jewelry Designer
          </div>

          <div className="text-center mt-10 md:mt-12">
            <button onClick={onDemoClick} className="btn-aurora-outline">
              See it on your site <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// PHONE — Mobile-only iPhone-style frame
// =============================================================================

const Phone = ({ phaseIdx, isOpen }: { phaseIdx: number; isOpen: boolean }) => {
  return (
    <div className="w-full max-w-[340px] sm:max-w-[320px] mx-auto">
      <div
        className="relative w-full transition-all duration-1000 ease-out"
        style={{
          aspectRatio: '9 / 19.5',
          background: 'linear-gradient(180deg, #1a1a1c 0%, #0e0e10 100%)',
          borderRadius: 50,
          border: '3px solid #2a2a2d',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.05) inset, 0 0 50px rgba(178,152,255,0.18)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.94)',
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            top: 12,
            width: 90,
            height: 24,
            background: '#000',
            borderRadius: 12,
          }}
        />

        {/* Screen — starts below the dynamic island */}
        <div
          className="absolute"
          style={{
            top: 48,
            left: 8,
            right: 8,
            bottom: 8,
            background: '#FFFFFF',
            borderRadius: '6px 6px 38px 38px',
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 500ms ease-out',
            transitionDelay: isOpen ? '700ms' : '0ms',
          }}
        >
          <ScreenContent phaseIdx={phaseIdx} isOpen={isOpen} />
        </div>

        {/* Home indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            bottom: 6,
            width: 110,
            height: 4,
            background: 'rgba(255,255,255,0.4)',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

// =============================================================================
// LAPTOP — Bigger, more dramatic
// =============================================================================

const Laptop = ({ lidAngle, phaseIdx, isOpen }: { lidAngle: number; phaseIdx: number; isOpen: boolean }) => {
  return (
    <div className="w-full max-w-[1180px] mx-auto" style={{ perspective: '3200px', perspectiveOrigin: '50% 60%' }}>
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* LID */}
        <div
          className="relative"
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            transform: `rotateX(${lidAngle}deg)`,
            transformOrigin: '50% 100%',
            transition: 'transform 1.7s cubic-bezier(0.5, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #1a1a1c 0%, #0e0e10 100%)',
            borderRadius: '18px 18px 4px 4px',
            border: '2px solid #2a2a2d',
            borderBottom: 'none',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset',
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 130,
              height: 18,
              background: '#000',
              borderRadius: '0 0 12px 12px',
              zIndex: 2,
            }}
          />

          {/* Screen content area — fades in after lid opens */}
          <div
            className="absolute"
            style={{
              top: 18,
              left: 18,
              right: 18,
              bottom: 18,
              background: '#FFFFFF',
              borderRadius: '6px',
              overflow: 'hidden',
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 500ms ease-out',
              transitionDelay: isOpen ? '1100ms' : '0ms',
            }}
          >
            <ScreenContent phaseIdx={phaseIdx} isOpen={isOpen} />
          </div>
        </div>

        {/* HINGE */}
        <div
          style={{
            width: '102%',
            marginLeft: '-1%',
            height: 16,
            background: 'linear-gradient(180deg, #2a2a2d 0%, #1a1a1c 100%)',
            borderRadius: '0 0 4px 4px',
            position: 'relative',
            zIndex: 0,
          }}
        />

        {/* BASE — slightly wider with perspective */}
        <div
          className="relative"
          style={{
            width: '109%',
            marginLeft: '-4.5%',
            height: 28,
            background: 'linear-gradient(180deg, #3a3a3d 0%, #1f1f22 100%)',
            borderRadius: '0 0 22px 22px',
            boxShadow: '0 -2px 0 rgba(255,255,255,0.03) inset',
            transform: 'perspective(1000px) rotateX(22deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Keyboard slot reflection */}
          <div
            className="absolute inset-x-16 top-2 h-[1.5px]"
            style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 1 }}
          />
        </div>

        {/* Contact shadow — wide soft ellipse beneath the laptop, makes it look placed on a surface */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: -38,
            width: '120%',
            height: 70,
            background:
              'radial-gradient(ellipse at center, rgba(10,11,20,0.55) 0%, rgba(10,11,20,0.32) 30%, rgba(10,11,20,0.15) 55%, transparent 75%)',
            filter: 'blur(16px)',
          }}
        />
      </div>
    </div>
  );
};

// =============================================================================
// SCREEN — top bar + phase content
// =============================================================================

const ScreenContent = ({ phaseIdx, isOpen }: { phaseIdx: number; isOpen: boolean }) => {
  return (
    <div className="relative w-full h-full">
      {/* Aurora ambient — softened for light surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(178,152,255,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(109,213,250,0.08), transparent 60%)',
        }}
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-4 z-20"
        style={{ borderBottom: '1px solid #E8EAEE', background: 'rgba(248,249,252,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <defs>
              <linearGradient id="laptop-brand-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6DD5FA" />
                <stop offset="0.5" stopColor="#B298FF" />
                <stop offset="1" stopColor="#7C5BFF" />
              </linearGradient>
            </defs>
            <polygon points="7,1 13,5 7,13 1,5" fill="url(#laptop-brand-g)" />
          </svg>
          <span className="hidden sm:inline font-mono text-[11px] tracking-eyebrow uppercase font-bold" style={{ color: '#1A1F2E' }}>
            Jeweler Studio
          </span>
        </div>

        {/* Phase progress dots */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {PHASES.map((_, i) => (
            <span
              key={i}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-500"
              style={{
                background: i <= phaseIdx ? '#B298FF' : 'rgba(10,11,20,0.12)',
                boxShadow: i === phaseIdx ? '0 0 8px #B298FF' : 'none',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ok"
            style={{ boxShadow: '0 0 8px #6BD3A3', animation: 'jsLivePulse 2s ease-in-out infinite' }}
          />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-eyebrow uppercase font-bold" style={{ color: '#1F8B5C' }}>Live</span>
        </div>
      </div>

      {/* Phase content */}
      {isOpen && (
        <>
          <PhaseType visible={phaseIdx === 0} />
          <PhaseConfigure visible={phaseIdx === 1} />
          <PhaseGenerate visible={phaseIdx === 2} />
          <PhaseResult visible={phaseIdx === 3} />
          <PhaseConfirm visible={phaseIdx === 4} />
        </>
      )}

      <style>{`
        @keyframes jsLivePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// PHASE WRAPPER — handles fade in/out
// =============================================================================

const PhaseShell = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => (
  <div
    className="absolute inset-0 pt-[52px] px-4 pb-4 sm:pt-[60px] sm:px-7 sm:pb-6 flex flex-col transition-opacity duration-500"
    style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
  >
    {children}
  </div>
);

// =============================================================================
// PHASE 1 — Jewelry type selection
// =============================================================================

const PhaseType = ({ visible }: { visible: boolean }) => {
  return (
    <PhaseShell visible={visible}>
      <div className="font-mono text-[10px] sm:text-[11px] tracking-eyebrow uppercase font-bold mb-3 sm:mb-5" style={{ color: '#7C5BFF' }}>
        Step 01 · What are we making?
      </div>
      <h3 className="display-sans text-[20px] sm:text-[26px] leading-tight mb-4 sm:mb-6 font-bold" style={{ color: '#0A0B14' }}>
        Pick a piece.
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-1">
        {JEWELRY_TYPES.map((type, i) => {
          const isSelected = i === SELECTED_TYPE;
          return (
            <div
              key={type.name}
              className="relative rounded-xl flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-2 transition-all duration-500"
              style={{
                background: isSelected ? 'rgba(178,152,255,0.10)' : '#F5F6FA',
                border: `1.5px solid ${isSelected ? '#B298FF' : '#D6D9E0'}`,
                boxShadow: isSelected ? '0 0 24px rgba(178,152,255,0.20), inset 0 0 14px rgba(178,152,255,0.06)' : 'none',
                transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <type.icon
                size={22}
                strokeWidth={1.6}
                style={{ color: isSelected ? '#7C5BFF' : '#6B7080' }}
              />
              <span
                className="text-[11px] sm:text-[14px] font-medium"
                style={{ color: isSelected ? '#0A0B14' : '#6B7080', fontWeight: isSelected ? 700 : 500 }}
              >
                {type.name}
              </span>
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 sm:top-2 sm:right-2 sm:w-4 sm:h-4 rounded-full flex items-center justify-center bg-aurora-violet">
                  <Check size={8} className="text-obsidian" strokeWidth={3} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </PhaseShell>
  );
};

// =============================================================================
// PHASE 2 — Configure (gem + metal + prompt)
// =============================================================================

const PhaseConfigure = ({ visible }: { visible: boolean }) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!visible) {
      setTyped('');
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i++;
        setTyped(PROMPT_TEXT.slice(0, i));
        if (i >= PROMPT_TEXT.length && interval !== undefined) {
          window.clearInterval(interval);
          interval = undefined;
        }
      }, 50);
    }, 800);
    return () => {
      window.clearTimeout(startDelay);
      if (interval !== undefined) {
        window.clearInterval(interval);
        interval = undefined;
      }
    };
  }, [visible]);

  return (
    <PhaseShell visible={visible}>
      <div className="font-mono text-[10px] sm:text-[11px] tracking-eyebrow uppercase font-bold mb-2.5 sm:mb-4" style={{ color: '#7C5BFF' }}>
        Step 02 · Configure your pendant
      </div>

      {/* Gem row */}
      <div className="mb-2.5 sm:mb-4">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-eyebrow uppercase font-bold mb-1.5 sm:mb-2" style={{ color: '#6B7080' }}>
          Gem
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {GEMS.map((g, i) => {
            const isSel = i === SELECTED_GEM;
            return (
              <span
                key={g}
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-[13px] transition-all duration-300"
                style={{
                  background: isSel ? 'rgba(178,152,255,0.14)' : '#F5F6FA',
                  border: `1.5px solid ${isSel ? '#B298FF' : '#D6D9E0'}`,
                  color: isSel ? '#0A0B14' : '#6B7080',
                  fontWeight: isSel ? 700 : 500,
                  transform: isSel ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSel ? '0 0 12px rgba(178,152,255,0.20)' : 'none',
                }}
              >
                {g}
              </span>
            );
          })}
        </div>
      </div>

      {/* Metal row */}
      <div className="mb-2.5 sm:mb-4">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-eyebrow uppercase font-bold mb-1.5 sm:mb-2" style={{ color: '#6B7080' }}>
          Metal
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {METALS.map((m, i) => {
            const isSel = i === SELECTED_METAL;
            return (
              <span
                key={m}
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-[13px] transition-all duration-300"
                style={{
                  background: isSel ? 'rgba(109,213,250,0.14)' : '#F5F6FA',
                  border: `1.5px solid ${isSel ? '#6DD5FA' : '#D6D9E0'}`,
                  color: isSel ? '#0A0B14' : '#6B7080',
                  fontWeight: isSel ? 700 : 500,
                  transform: isSel ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSel ? '0 0 12px rgba(109,213,250,0.25)' : 'none',
                }}
              >
                {m}
              </span>
            );
          })}
        </div>
      </div>

      {/* Style row — compact inline blocks */}
      <div className="mb-2.5 sm:mb-4">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-eyebrow uppercase font-bold mb-1.5 sm:mb-2" style={{ color: '#6B7080' }}>
          Style
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {STYLES.map((s, i) => {
            const isSel = i === SELECTED_STYLE;
            const Icon = i === 0 ? Tag : i === 1 ? Star : ImageIcon;
            return (
              <div
                key={s}
                className="relative rounded-lg flex items-center gap-1.5 sm:gap-2.5 px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-300"
                style={{
                  background: isSel ? 'rgba(178,152,255,0.10)' : '#F5F6FA',
                  border: `1.5px solid ${isSel ? '#B298FF' : '#D6D9E0'}`,
                  boxShadow: isSel ? '0 0 14px rgba(178,152,255,0.18)' : 'none',
                  transform: isSel ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isSel
                      ? 'radial-gradient(circle at 30% 30%, rgba(178,152,255,0.45), rgba(178,152,255,0.12) 60%, #FFFFFF)'
                      : 'radial-gradient(circle at 30% 30%, rgba(178,152,255,0.10), #F5F6FA 70%)',
                    border: `1px solid ${isSel ? '#B298FF' : '#D6D9E0'}`,
                  }}
                >
                  <Icon size={11} strokeWidth={2} style={{ color: isSel ? '#7C5BFF' : '#6B7080' }} />
                </div>
                <span className="text-[10.5px] sm:text-[12.5px] font-medium" style={{ color: isSel ? '#0A0B14' : '#6B7080', fontWeight: isSel ? 700 : 500 }}>
                  {s}
                </span>
                {isSel && (
                  <span className="hidden sm:flex absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full items-center justify-center bg-aurora-violet">
                    <Check size={8} className="text-obsidian" strokeWidth={3} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prompt input */}
      <div>
        <div className="font-mono text-[9px] sm:text-[10px] tracking-eyebrow uppercase font-bold mb-1.5 sm:mb-2" style={{ color: '#6B7080' }}>
          Describe your piece
        </div>
        <div
          className="rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-[11.5px] sm:text-[13.5px] leading-relaxed"
          style={{ minHeight: 50, background: '#F5F6FA', border: '1px solid #D6D9E0', color: '#0A0B14' }}
        >
          {typed || <span style={{ color: '#9CA0AC' }}>Type a description...</span>}
          <span
            className="inline-block w-[2px] ml-0.5 align-middle"
            style={{
              height: 14,
              background: '#B298FF',
              animation: 'jsBlink 1s step-start infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes jsBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </PhaseShell>
  );
};

// =============================================================================
// PHASE 3 — Generating
// =============================================================================

const PhaseGenerate = ({ visible }: { visible: boolean }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!visible) {
      setPct(0);
      return;
    }
    let p = 0;
    const interval = window.setInterval(() => {
      p = Math.min(p + 5, 96);
      setPct(p);
    }, 80);
    return () => window.clearInterval(interval);
  }, [visible]);

  const status =
    pct < 28 ? 'Analyzing prompt'
    : pct < 60 ? 'Generating nameplate'
    : pct < 85 ? 'Icing the diamonds'
    : 'Polishing finish';

  return (
    <PhaseShell visible={visible}>
      <div className="font-mono text-[10px] sm:text-[11px] tracking-eyebrow uppercase font-bold mb-3 sm:mb-5" style={{ color: '#7C5BFF' }}>
        Step 03 · Generating
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Spinner ring */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(178,152,255,0.20), transparent 65%)',
              filter: 'blur(12px)',
            }}
          />
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full"
            style={{
              border: '4px solid rgba(10,11,20,0.08)',
              borderTopColor: '#B298FF',
              borderRightColor: 'rgba(109,213,250,0.6)',
              animation: 'jsSpin 0.9s linear infinite',
              boxShadow: '0 0 24px rgba(178,152,255,0.25)',
            }}
          />
        </div>

        {/* Cycling AI status */}
        <div
          className="font-mono text-[11px] tracking-eyebrow uppercase font-bold mb-4 transition-opacity duration-200"
          style={{ color: '#3A3F4D', minHeight: 14 }}
        >
          {status}…
        </div>

        {/* Progress bar */}
        <div className="w-[64%] h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(10,11,20,0.10)' }}>
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6DD5FA, #B298FF)' }}
          />
        </div>
        <div className="mt-3 font-mono text-[12px] tabular font-bold" style={{ color: '#7C5BFF' }}>
          {pct}%
        </div>
      </div>

      <style>{`@keyframes jsSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </PhaseShell>
  );
};

// =============================================================================
// PHASE 4 — Result + Request quote button
// =============================================================================

const PhaseResult = ({ visible }: { visible: boolean }) => {
  // Click ripple animation: triggers near end of phase to "preview" the click
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (!visible) {
      setPressed(false);
      return;
    }
    const t = window.setTimeout(() => setPressed(true), 2400);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <PhaseShell visible={visible}>
      <div className="max-w-[460px] w-full mx-auto flex flex-col">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-3">
          <h3 className="aurora-text font-bold text-[16px] sm:text-[20px] leading-tight tracking-tight mb-1">
            Your Personal Custom Pendant
          </h3>
          <p className="text-[10.5px] sm:text-[11.5px] leading-snug" style={{ color: '#3A3F4D' }}>
            Here's your personalized pendant design. Review and proceed to get your quote.
          </p>
        </div>

        {/* Centered pendant image card */}
        <div
          className="relative rounded-xl overflow-hidden mb-2.5 sm:mb-3"
          style={{
            background: '#FFFFFF',
            border: '1px solid #D6D9E0',
            boxShadow: '0 8px 24px rgba(10,11,20,0.06)',
          }}
        >
          {/* Aurora top accent line */}
          <div className="accent-line" />
          <div className="relative flex items-center justify-center px-4 py-4 sm:py-5 min-h-[200px] sm:min-h-[280px]">
            <img
              src="/pendant-nameplate.jpg"
              alt="Iced out Jeweler Studio nameplate pendant"
              className="max-h-[180px] sm:max-h-[260px] w-auto object-contain"
              style={{ filter: 'drop-shadow(0 6px 18px rgba(10,11,20,0.18))' }}
            />
          </div>
        </div>

        {/* Get an Instant Quote button */}
        <div className="relative mb-2">
          <button
            className="w-full py-2 sm:py-2.5 rounded-md font-bold text-[12px] sm:text-[13.5px] flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6DD5FA, #B298FF)',
              color: '#0A0B10',
              boxShadow: pressed ? '0 4px 14px rgba(178,152,255,0.5)' : '0 6px 18px rgba(178,152,255,0.40)',
              transform: pressed ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <Sparkles size={13} strokeWidth={2.5} />
            Get an Instant Quote
          </button>

          {/* Click ripple */}
          {pressed && (
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 0,
                height: 0,
                animation: 'jsRipple 0.7s ease-out forwards',
              }}
            />
          )}
        </div>

        {/* Attributes row */}
        <div
          className="grid grid-cols-3 gap-3 pt-3"
          style={{ borderTop: '1px solid #E8EAEE' }}
        >
          {[
            { label: 'Gem',   value: 'Diamond'    },
            { label: 'Metal', value: 'White Gold' },
            { label: 'Style', value: 'Nameplate'  },
          ].map((a) => (
            <div key={a.label}>
              <div className="font-mono text-[9px] tracking-eyebrow uppercase font-bold" style={{ color: '#6B7080' }}>
                {a.label}
              </div>
              <div className="text-[12.5px] font-bold mt-0.5" style={{ color: '#0A0B14' }}>
                {a.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes jsRipple {
          0%   { width: 0;     height: 0;     opacity: 0.7; border: 3px solid #B298FF; }
          100% { width: 320px; height: 320px; opacity: 0;   border: 3px solid #B298FF; }
        }
      `}</style>
    </PhaseShell>
  );
};

// =============================================================================
// PHASE 5 — Confirmation
// =============================================================================

const PhaseConfirm = ({ visible }: { visible: boolean }) => {
  return (
    <PhaseShell visible={visible}>
      <div className="font-mono text-[10px] sm:text-[11px] tracking-eyebrow uppercase font-bold mb-3 sm:mb-5" style={{ color: '#1F8B5C' }}>
        Step 05 · Lead secured
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Success badge */}
        <div
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-8"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(107,211,163,0.30), rgba(107,211,163,0.08) 60%, #FFFFFF)',
            border: '2px solid #6BD3A3',
            boxShadow: '0 0 30px rgba(107,211,163,0.40), inset 0 0 16px rgba(107,211,163,0.20)',
          }}
        >
          <Check size={26} strokeWidth={3} style={{ color: '#1F8B5C' }} />
        </div>

        <h3
          className="display-sans text-[20px] sm:text-[28px] leading-tight mb-3 sm:mb-4 max-w-[28ch] font-bold"
          style={{ color: '#0A0B14' }}
        >
          Here's your{' '}
          <em className="accent-italic">generated pendant.</em>
        </h3>

        <p className="text-[12px] sm:text-[14px] leading-relaxed max-w-[32ch] mb-5 sm:mb-7" style={{ color: '#3A3F4D' }}>
          From idea to deposit in seconds. The lead lives in your CRM with full follow-up queued.
        </p>

        {/* Mini KPI strip */}
        <div className="flex items-center gap-4 sm:gap-7 pt-4 sm:pt-5" style={{ borderTop: '1px solid #E8EAEE' }}>
          <div className="text-center">
            <div className="display-sans text-[16px] sm:text-[20px] tabular font-bold" style={{ color: '#0A0B14' }}>$4,890</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-eyebrow uppercase font-bold mt-0.5" style={{ color: '#6B7080' }}>
              quoted
            </div>
          </div>
          <div className="text-center">
            <div className="display-sans aurora-text text-[16px] sm:text-[20px] tabular font-bold">$978</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-eyebrow uppercase font-bold mt-0.5" style={{ color: '#6B7080' }}>
              deposit
            </div>
          </div>
          <div className="text-center">
            <div className="display-sans text-[16px] sm:text-[20px] tabular font-bold" style={{ color: '#1F8B5C' }}>24h</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-eyebrow uppercase font-bold mt-0.5" style={{ color: '#6B7080' }}>
              follow-up
            </div>
          </div>
        </div>
      </div>
    </PhaseShell>
  );
};

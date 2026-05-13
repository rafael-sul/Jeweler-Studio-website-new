import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Layers,
  RotateCw,
  Gem,
  ImagePlus,
  Globe,
  CreditCard,
  FileText,
  Palette,
  Zap,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

// =============================================================================
// MAIN
// =============================================================================

export const ProductsPage = ({ onDemoClick }: { onDemoClick: () => void }) => {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <ProductsHero />
      <StudioAiSection onDemoClick={onDemoClick} />
      <RingProSection onDemoClick={onDemoClick} />
      <ProductsCta onDemoClick={onDemoClick} />

      {/* Shared keyframes used by the animated product demos */}
      <style>{`
        @keyframes pp-pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes pp-gem-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pp-dot-blink {
          0%, 80%, 100% { opacity: 0.25; }
          40%           { opacity: 1; }
        }
        @keyframes pp-chip-pop {
          0%, 100% { opacity: 0.40; transform: translateY(2px) scale(0.96); }
          50%      { opacity: 1;    transform: translateY(0)   scale(1);    }
        }
        @keyframes pp-swatch-bob {
          0%, 100% { transform: translateY(0)   scale(1);    }
          50%      { transform: translateY(-2px) scale(1.10); }
        }
        @keyframes pp-typing {
          0%, 8%  { width: 0%;   }
          40%     { width: 100%; }
          70%     { width: 100%; }
          100%    { width: 0%;   }
        }
        @keyframes pp-cursor-blink {
          0%, 50%  { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes pp-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0;  }
        }
        @keyframes pp-price-tick {
          0%, 20%  { content: '$2,840'; }
          21%, 50% { content: '$3,120'; }
          51%, 80% { content: '$4,560'; }
          81%, 100%{ content: '$3,890'; }
        }
        @keyframes pp-sweep {
          0%   { transform: translateX(-100%) rotate(-12deg); }
          100% { transform: translateX(200%)  rotate(-12deg); }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// HERO
// =============================================================================

const ProductsHero = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-5 sm:px-6 border-t border-rule overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[18%] left-[8%] w-[760px] h-[540px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.12), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[8%] right-[10%] w-[760px] h-[540px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(109,213,250,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div
          className="flex items-center justify-center gap-3 mb-6"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 700ms ease' }}
        >
          <span
            className="h-px"
            style={{
              width: isVisible ? '48px' : '0px',
              background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))',
              transition: 'width 900ms cubic-bezier(0.16,1,0.3,1) 100ms',
            }}
          />
          <div className="eyebrow">Our products</div>
          <span
            className="h-px"
            style={{
              width: isVisible ? '48px' : '0px',
              background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)',
              transition: 'width 900ms cubic-bezier(0.16,1,0.3,1) 100ms',
            }}
          />
        </div>

        <h1
          className="display-sans text-ink font-bold text-[44px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-[1.0] tracking-tight"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 800ms ease 200ms, transform 800ms ease 200ms',
          }}
        >
          Two tools. <em className="accent-italic">One studio.</em>
        </h1>
        <p
          className="text-ink-mute text-[17px] md:text-[19px] leading-relaxed mt-7 max-w-[58ch] mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 800ms ease 380ms, transform 800ms ease 380ms',
          }}
        >
          Jeweler Studio ships as two products that work side-by-side. Studio AI handles open-ended custom design. Ring Pro handles the most-asked piece in your store — the engagement ring.
        </p>
      </div>
    </section>
  );
};

// =============================================================================
// STUDIO AI SECTION
// =============================================================================

const STUDIO_AI_FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wand2,
    title: 'Natural-language design',
    body: 'Customers describe what they want in plain words — "iced-out vintage halo, rose gold, 1.2ct oval" — and the model takes it from there.',
  },
  {
    icon: Zap,
    title: 'Renders in under 25 seconds',
    body: 'Photorealistic visuals generated in the browser. No CAD file, no designer in the loop, no waiting days for a draft.',
  },
  {
    icon: Layers,
    title: 'Every material, every stone',
    body: 'White / yellow / rose gold and platinum. Diamond, sapphire, ruby, emerald, pearl. Pendants, rings, necklaces, earrings, bracelets, brooches.',
  },
  {
    icon: ImagePlus,
    title: 'Reference-image upload',
    body: 'Customers can upload a photo from Pinterest or Instagram and we generate variations that match their reference — on Gold and Diamond plans.',
  },
  {
    icon: Activity,
    title: 'Intent-qualified leads',
    body: 'Every render becomes a lead in your dashboard with the full prompt history. You know exactly what they want before you reply.',
  },
  {
    icon: Globe,
    title: 'White-labeled on your domain',
    body: 'Your logo, your colors, your domain. Customers never see Jeweler Studio — Studio AI runs invisibly under your brand.',
  },
];

const StudioAiSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.12);
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-5 sm:px-6 border-t border-rule overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FAFBFD 0%, #F5F6FA 50%, #FAFBFD 100%)',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-[5%] w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.10), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 700ms ease, transform 700ms ease',
              }}
            >
              <span
                className="font-mono text-[11px] tracking-eyebrow uppercase font-bold"
                style={{ color: '#B298FF' }}
              >
                Product 01 · Studio AI
              </span>
              <span
                className="font-mono text-[10px] tracking-eyebrow uppercase font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(107,211,163,0.10)',
                  border: '1px solid rgba(107,211,163,0.45)',
                  color: '#6BD3A3',
                }}
              >
                Now Live
              </span>
            </div>

            <h2
              className="display-sans text-ink font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] tracking-tight mb-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 800ms ease 120ms, transform 800ms ease 120ms',
              }}
            >
              Studio <em className="accent-italic">AI.</em>
            </h2>

            <p
              className="display text-aurora-violet text-[22px] md:text-[26px] lg:text-[30px] italic leading-snug mb-7 max-w-[20ch]"
              style={{
                fontFamily: 'Instrument Serif',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 800ms ease 250ms, transform 800ms ease 250ms',
              }}
            >
              Imagination, rendered in seconds.
            </p>

            <p
              className="text-ink-mute text-[15.5px] md:text-[16.5px] leading-relaxed mb-10 max-w-[52ch]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 800ms ease 380ms, transform 800ms ease 380ms',
              }}
            >
              Studio AI turns a customer's description into a photorealistic jewelry render — instantly. No CAD back-and-forth, no revision fees. Just a design they can see, feel, and commit to before they close the tab.
            </p>

            {/* Feature breakdown — 2-column grid */}
            <div className="grid sm:grid-cols-2 gap-3 md:gap-3.5">
              {STUDIO_AI_FEATURES.map((feat, i) => (
                <FeatureCard key={feat.title} feature={feat} accent="#B298FF" isVisible={isVisible} delay={500 + i * 80} />
              ))}
            </div>

            <button
              onClick={onDemoClick}
              className="group inline-flex items-center gap-2 mt-9 font-mono text-[11px] tracking-eyebrow uppercase font-bold text-aurora-violet hover:text-ink transition-colors"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 800ms ease 1100ms, transform 800ms ease 1100ms, color 200ms ease',
              }}
            >
              See Studio AI in action
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Animation column */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 900ms ease 250ms, transform 900ms ease 250ms',
            }}
          >
            <StudioAiDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// STUDIO AI DEMO — typing prompt + generating + render reveal, looping
// =============================================================================

const PROMPTS = [
  'iced-out vintage halo · 1.2ct oval · rose gold',
  'three-stone emerald · platinum · cathedral',
  'art-deco pendant · sapphire · yellow gold',
];

const StudioAiDemo = () => {
  const [promptIdx, setPromptIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'generating' | 'result'>('typing');

  useEffect(() => {
    const cycle = () => {
      setPhase('typing');
      const t1 = window.setTimeout(() => setPhase('generating'), 2200);
      const t2 = window.setTimeout(() => setPhase('result'), 4200);
      const t3 = window.setTimeout(() => {
        setPromptIdx((p) => (p + 1) % PROMPTS.length);
      }, 7000);
      return [t1, t2, t3];
    };
    const timers = cycle();
    const interval = window.setInterval(() => {
      timers.forEach((t) => window.clearTimeout(t));
      const newTimers = cycle();
      timers.length = 0;
      timers.push(...newTimers);
    }, 7000);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0F1117 0%, #08090D 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          '0 24px 60px -16px rgba(0,0,0,0.55), 0 0 60px -20px rgba(178,152,255,0.30), 0 0 0 1px rgba(255,255,255,0.04) inset',
      }}
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 40% at 30% 25%, rgba(178,152,255,0.30), transparent 65%), radial-gradient(50% 40% at 75% 75%, rgba(109,213,250,0.22), transparent 65%)',
        }}
      />
      {/* Sweeping aurora beam */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[60%] h-full pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(178,152,255,0.10), transparent)',
          animation: 'pp-sweep 6s linear infinite',
        }}
      />

      {/* Top toolbar */}
      <div
        className="relative flex items-center justify-between px-5 py-3.5 z-10"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(8,9,13,0.65)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
            <defs>
              <linearGradient id="pp-studio-brand" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6DD5FA" />
                <stop offset="0.5" stopColor="#B298FF" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>
            <polygon points="7,1 13,5 7,13 1,5" fill="url(#pp-studio-brand)" />
          </svg>
          <span className="font-mono text-[10.5px] tracking-eyebrow uppercase font-bold text-ice/80">
            Studio AI
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#6BD3A3', boxShadow: '0 0 6px #6BD3A3' }}
          />
          <span className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-ok">
            Live
          </span>
        </span>
      </div>

      {/* Prompt input */}
      <div className="relative px-5 pt-5 z-10">
        <div className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-smoke-2 mb-2">
          Prompt
        </div>
        <div
          className="rounded-lg px-3.5 py-3 text-[13px] leading-relaxed min-h-[68px]"
          style={{
            background: 'rgba(20,22,30,0.65)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: '#F5F6F8',
          }}
        >
          <TypingPrompt key={promptIdx} text={PROMPTS[promptIdx]} />
        </div>
      </div>

      {/* Render canvas */}
      <div className="relative flex-1 flex items-center justify-center px-5 pt-6 pb-6 z-10">
        <RenderCanvas phase={phase} promptIdx={promptIdx} />
      </div>

      {/* Bottom status */}
      <div className="relative flex items-center justify-between px-5 pb-4 z-10">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-eyebrow uppercase font-bold text-smoke-2">
          <Wand2 size={11} className="text-aurora-violet" />
          {phase === 'typing'
            ? 'Reading prompt'
            : phase === 'generating'
            ? 'Generating render'
            : 'Render complete'}
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-aurora-violet"
              style={{
                animation: 'pp-dot-blink 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TypingPrompt = ({ text }: { text: string }) => (
  <span className="inline-flex items-baseline">
    <span
      className="inline-block whitespace-nowrap overflow-hidden align-bottom"
      style={{
        animation: 'pp-typing 7s steps(60, end) infinite',
        animationIterationCount: 1,
      }}
    >
      {text}
    </span>
    <span
      className="inline-block w-[2px] h-[14px] bg-aurora-violet ml-0.5 align-middle"
      style={{ animation: 'pp-cursor-blink 1s step-start infinite' }}
    />
  </span>
);

const RenderCanvas = ({ phase, promptIdx }: { phase: string; promptIdx: number }) => {
  // Each prompt gets its own gem palette
  const palettes = [
    { ring: 'linear-gradient(135deg, #F8C8D4, #D4A574)', stone: '#E0E7FF', glow: 'rgba(212,165,116,0.55)' },
    { ring: 'linear-gradient(135deg, #E0E7FF, #B5C5D6)', stone: '#6BD3A3', glow: 'rgba(176,213,178,0.55)' },
    { ring: 'linear-gradient(135deg, #D4B87A, #C19A4F)', stone: '#6DD5FA', glow: 'rgba(109,213,250,0.55)' },
  ];
  const p = palettes[promptIdx];

  const isRevealed = phase === 'result';
  const isGenerating = phase === 'generating';

  return (
    <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center">
      {/* Atmospheric glow under the render */}
      <div
        aria-hidden="true"
        className="absolute w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${p.glow}, transparent 70%)`,
          filter: 'blur(28px)',
          opacity: isRevealed ? 1 : 0.4,
          transform: isRevealed ? 'scale(1)' : 'scale(0.85)',
          transition: 'opacity 700ms ease, transform 700ms ease',
          animation: isRevealed ? 'pp-pulse-glow 3.4s ease-in-out infinite' : undefined,
        }}
      />

      {/* Render shape — a stylized ring */}
      <div
        className="relative"
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'scale(1)' : 'scale(0.88)',
          transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          className="w-44 h-44 rounded-full border-[10px]"
          style={{
            borderColor: 'transparent',
            background: `linear-gradient(#0B0D14, #0B0D14) padding-box, ${p.ring} border-box`,
            boxShadow: `0 0 36px ${p.glow}, inset 0 0 22px rgba(255,255,255,0.10)`,
          }}
        />
        {/* Stone on top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rotate-45"
          style={{
            background: `linear-gradient(135deg, ${p.stone}, #FFFFFF)`,
            boxShadow: `0 0 22px ${p.glow}`,
          }}
        />
      </div>

      {/* Generating overlay — shimmering placeholder */}
      {!isRevealed && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(178,152,255,0.18), transparent)',
            backgroundSize: '200% 100%',
            animation: 'pp-shimmer 1.4s linear infinite',
            opacity: isGenerating ? 1 : 0.4,
          }}
        />
      )}
    </div>
  );
};

// =============================================================================
// RING PRO SECTION
// =============================================================================

const RING_PRO_FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: RotateCw,
    title: 'Real-time 3D configurator',
    body: 'A 360° interactive engagement ring builder embedded directly on your site. Customers spin, zoom, and tune.',
  },
  {
    icon: Palette,
    title: 'Every metal & finish',
    body: 'White, yellow, and rose gold. Platinum. Polished and matte finishes. Live preview as the customer toggles.',
  },
  {
    icon: Gem,
    title: 'Every stone & cut',
    body: 'Round, princess, oval, cushion, emerald, pear, marquise. Diamond, sapphire, ruby, emerald, pearl. Carat sizes from 0.3 to 4.0.',
  },
  {
    icon: Layers,
    title: 'Setting selector',
    body: 'Solitaire, halo, three-stone, cathedral, bezel, pavé. Every classic engagement-ring archetype, configurable in seconds.',
  },
  {
    icon: Sparkles,
    title: 'Live pricing',
    body: 'The price updates in real time as customers tune the configuration — no quote request, no waiting.',
  },
  {
    icon: CreditCard,
    title: 'Deposit at checkout',
    body: 'Customers lock in their ring with a deposit right there in the configurator. The lead is qualified, paid, and yours.',
  },
];

const RingProSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.12);
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-5 sm:px-6 border-t border-rule overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FAFBFD 0%, #F5F6FA 50%, #FAFBFD 100%)',
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-[5%] w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(109,213,250,0.12), transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Reversed layout: animation left, text right on lg+ */}
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
          {/* Animation column */}
          <div
            className="lg:order-1 order-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 900ms ease 250ms, transform 900ms ease 250ms',
            }}
          >
            <RingProDemo />
          </div>

          {/* Text column */}
          <div className="lg:order-2 order-1">
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 700ms ease, transform 700ms ease',
              }}
            >
              <span
                className="font-mono text-[11px] tracking-eyebrow uppercase font-bold"
                style={{ color: '#6DD5FA' }}
              >
                Product 02 · Ring Pro
              </span>
              <span
                className="font-mono text-[10px] tracking-eyebrow uppercase font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(107,211,163,0.10)',
                  border: '1px solid rgba(107,211,163,0.45)',
                  color: '#6BD3A3',
                }}
              >
                Now Live
              </span>
            </div>

            <h2
              className="display-sans text-ink font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] tracking-tight mb-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 800ms ease 120ms, transform 800ms ease 120ms',
              }}
            >
              Ring <em className="accent-italic">Pro.</em>
            </h2>

            <p
              className="display text-aurora-cyan text-[22px] md:text-[26px] lg:text-[30px] italic leading-snug mb-7 max-w-[20ch]"
              style={{
                fontFamily: 'Instrument Serif',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 800ms ease 250ms, transform 800ms ease 250ms',
              }}
            >
              A 3D ring configurator built to convert.
            </p>

            <p
              className="text-ink-mute text-[15.5px] md:text-[16.5px] leading-relaxed mb-10 max-w-[52ch]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 800ms ease 380ms, transform 800ms ease 380ms',
              }}
            >
              Ring Pro embeds a fully interactive 3D ring builder directly on your site. Metal, stone, setting, band — customers tune every detail and see the exact ring spin in real time. Live pricing. Deposit at checkout.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-3.5">
              {RING_PRO_FEATURES.map((feat, i) => (
                <FeatureCard key={feat.title} feature={feat} accent="#6DD5FA" isVisible={isVisible} delay={500 + i * 80} />
              ))}
            </div>

            <button
              onClick={onDemoClick}
              className="group inline-flex items-center gap-2 mt-9 font-mono text-[11px] tracking-eyebrow uppercase font-bold text-aurora-cyan hover:text-ink transition-colors"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 800ms ease 1100ms, transform 800ms ease 1100ms, color 200ms ease',
              }}
            >
              See Ring Pro in action
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// RING PRO DEMO — rotating ring with metal/stone cycle + live spec
// =============================================================================

// `color`     → the swatch dot tint in the configurator UI (kept soft/pastel
//                so it reads on the dark card surface)
// `bandColor` → the actual color passed to the 3D PBR material; tuned to
//                physically-plausible metal values so MeshPhysicalMaterial
//                with metalness=1 renders correctly
const METALS = [
  { name: '18K Yellow Gold', color: '#D4B87A', bandColor: '#E5C46B' },
  { name: '18K White Gold',  color: '#E0E7FF', bandColor: '#E5E4E2' },
  { name: '18K Rose Gold',   color: '#F8C8D4', bandColor: '#E8B6A1' },
];

// Gemstone color choices. All three diamonds on the ring are always visible;
// changing the selection live-tints the shared diamond material so every
// stone repaints in sync. `color` is the UI swatch tint; `gem` is the hex
// fed to MeshPhysicalMaterial's color + attenuationColor.
const STONES = [
  { label: 'Diamond',  color: '#E0E7FF', gem: '#FFFFFF' },
  { label: 'Sapphire', color: '#5B7FFF', gem: '#3454CC' },
  { label: 'Emerald',  color: '#3FB373', gem: '#1F8551' },
  { label: 'Ruby',     color: '#E83B66', gem: '#C42452' },
];


const RingProDemo = () => {
  // Default to Yellow Gold — the demo opens with a gold band as the user
  // intended. Swatch clicks below override.
  const [metalIdx, setMetalIdx] = useState(0);
  const [stoneIdx, setStoneIdx] = useState(0);
  const [price, setPrice] = useState(3120);

  useEffect(() => {
    // Price stays on a slow auto-cycle to keep the "Live" feel.
    // Metal + stone are both click-driven now (swatches below).
    const priceT = window.setInterval(() => {
      setPrice((p) => {
        const targets = [2840, 3120, 4560, 3890, 5240];
        const i = (targets.indexOf(p) + 1) % targets.length;
        return targets[i];
      });
    }, 2400);
    return () => {
      window.clearInterval(priceT);
    };
  }, []);

  const metal = METALS[metalIdx];
  const stone = STONES[stoneIdx];   // { label, color, gem }

  return (
    <div
      // `flex flex-col` activates the inner ring container's `flex-1` so the
      // viewer fills the box between the toolbar above and the spec/swatches
      // below — without it the ring container collapses to its padding (~48px).
      // `select-none` prevents the browser from triggering native text-drag
      // when the user starts an OrbitControls drag from anywhere over the
      // card's text/swatch UI.
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex flex-col select-none"
      style={{
        background:
          'linear-gradient(180deg, #0F1117 0%, #08090D 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          '0 24px 60px -16px rgba(0,0,0,0.55), 0 0 60px -20px rgba(109,213,250,0.30), 0 0 0 1px rgba(255,255,255,0.04) inset',
      }}
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 35%, rgba(109,213,250,0.24), transparent 65%)',
        }}
      />

      {/* Perspective grid floor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none opacity-35"
        style={{
          background:
            'linear-gradient(to top, rgba(109,213,250,0.10) 0%, transparent 100%), repeating-linear-gradient(90deg, rgba(109,213,250,0.20) 0 1px, transparent 1px 56px), repeating-linear-gradient(0deg, rgba(109,213,250,0.14) 0 1px, transparent 1px 56px)',
          transform: 'perspective(700px) rotateX(62deg)',
          transformOrigin: 'bottom',
        }}
      />

      {/* Top spec strip */}
      <div
        className="relative flex items-center justify-between px-5 py-3.5 z-10"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(8,9,13,0.65)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-aurora-cyan" />
          <span className="font-mono text-[10.5px] tracking-eyebrow uppercase font-bold text-ice/80">
            Ring Pro · Configurator
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#6BD3A3', boxShadow: '0 0 6px #6BD3A3' }}
          />
          <span className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-ok">
            Live
          </span>
        </span>
      </div>

      {/* Stylized ring visual — CSS only. A pulsing halo in the currently-
          selected metal colour, a slowly-rotating conic-gradient band, and a
          domed stone centred over the band. Swapping swatches live-updates
          colours via CSS custom properties. */}
      <div className="relative flex-1 flex items-center justify-center pt-8 pb-4 z-10">
        <div
          aria-hidden="true"
          className="absolute w-56 h-56 rounded-full"
          style={{
            background: `radial-gradient(circle, ${metal.color}55, transparent 70%)`,
            filter: 'blur(32px)',
            animation: 'pp-pulse-glow 3.2s ease-in-out infinite',
          }}
        />
        {/* Spinning ring band */}
        <div
          className="relative w-44 h-44 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${metal.color}, #FFFFFF, ${metal.color}, ${metal.color}88, ${metal.color})`,
            padding: 12,
            animation: 'pp-gem-rotate 14s linear infinite',
            boxShadow: `0 24px 60px -16px ${metal.color}66, inset 0 0 20px rgba(255,255,255,0.25)`,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: '#0B0D14' }}
          />
        </div>
        {/* Center stone — sits above the spinning band, not rotating */}
        <div
          aria-hidden="true"
          className="absolute w-12 h-12 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${stone.gem} 55%, ${stone.gem}DD 100%)`,
            boxShadow: `0 0 24px ${stone.color}AA, inset 0 -4px 8px rgba(0,0,0,0.25), inset 0 4px 6px rgba(255,255,255,0.5)`,
          }}
        />
      </div>

      {/* Live spec readout */}
      <div className="relative z-10 px-5 pb-3">
        <div
          className="grid grid-cols-2 gap-3 rounded-xl p-4"
          style={{
            background: 'rgba(20,22,30,0.65)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div>
            <div className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-smoke-2 mb-1">
              Metal
            </div>
            <div className="text-ice text-[12.5px] font-medium leading-tight transition-colors duration-300">
              {metal.name}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-smoke-2 mb-1">
              Stone
            </div>
            <div className="text-ice text-[12.5px] font-medium leading-tight transition-colors duration-300">
              {stone.label} · 1.30ct
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — metal + stone swatches on the left, live price on the right.
          Metal and stone groups are separated by a thin vertical divider so
          the two configurator dimensions read as distinct controls. */}
      <div className="relative flex items-center justify-between px-5 pb-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {METALS.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setMetalIdx(i)}
                aria-label={`Switch to ${m.name}`}
                aria-pressed={i === metalIdx}
                className="w-5 h-5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: m.color,
                  border: `1.5px solid ${i === metalIdx ? '#FFFFFF' : 'rgba(255,255,255,0.20)'}`,
                  transform: i === metalIdx ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: i === metalIdx ? `0 0 12px ${m.color}99` : 'none',
                }}
              />
            ))}
          </div>
          <span
            aria-hidden="true"
            className="h-4 w-px"
            style={{ background: 'rgba(255,255,255,0.18)' }}
          />
          <div className="flex items-center gap-2">
            {STONES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setStoneIdx(i)}
                aria-label={`Set stone color to ${s.label}`}
                aria-pressed={i === stoneIdx}
                className="w-5 h-5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: s.color,
                  border: `1.5px solid ${i === stoneIdx ? '#FFFFFF' : 'rgba(255,255,255,0.20)'}`,
                  transform: i === stoneIdx ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: i === stoneIdx ? `0 0 12px ${s.color}99` : 'none',
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="display-sans tabular font-bold text-[18px] text-ice transition-all duration-300"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            ${price.toLocaleString()}
          </span>
          <span className="font-mono text-[9.5px] tracking-eyebrow uppercase font-bold text-smoke-2 ml-1">
            Live
          </span>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// FEATURE CARD — shared between both product sections
// =============================================================================

const FeatureCard = ({
  feature,
  accent,
  isVisible,
  delay,
}: {
  feature: { icon: LucideIcon; title: string; body: string };
  accent: string;
  isVisible: boolean;
  delay: number;
}) => {
  const Icon = feature.icon;
  return (
    <div
      className="rounded-xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: '#FFFFFF',
        border: `1px solid ${accent}33`,
        boxShadow: `0 1px 0 rgba(10,11,20,0.02) inset, 0 4px 14px -8px ${accent}30, 0 6px 16px -8px rgba(10,11,20,0.06)`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
          style={{
            background: `${accent}14`,
            border: `1px solid ${accent}55`,
          }}
        >
          <Icon size={14} strokeWidth={1.8} style={{ color: accent }} />
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-ink text-[13.5px] md:text-[14.5px] font-semibold leading-tight mb-1.5">
            {feature.title}
          </h4>
          <p className="text-ink-mute text-[12.5px] md:text-[13px] leading-relaxed">
            {feature.body}
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// FINAL CTA
// =============================================================================

const ProductsCta = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  return (
    <section
      ref={ref}
      className="relative border-t border-rule overflow-hidden bg-paper-tinted"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.14), rgba(109,213,250,0.08) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center py-28 md:py-36 px-6">
        <div
          className="flex items-center justify-center gap-3 mb-7"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 700ms ease' }}
        >
          <span
            className="h-px w-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(178,152,255,0.55))' }}
          />
          <div className="eyebrow">Try them on your site</div>
          <span
            className="h-px w-10"
            style={{ background: 'linear-gradient(90deg, rgba(178,152,255,0.55), transparent)' }}
          />
        </div>

        <h2
          className="display-sans text-ink font-bold text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tight text-balance mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 800ms ease 150ms, transform 800ms ease 150ms',
          }}
        >
          See both tools<br />
          <em className="accent-italic">live on your domain.</em>
        </h2>

        <p
          className="text-ink-mute text-[16px] md:text-[18px] font-normal mb-11 max-w-xl mx-auto leading-relaxed"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 800ms ease 300ms, transform 800ms ease 300ms',
          }}
        >
          Book a 20-minute demo and we'll plug Studio AI and Ring Pro into your site live — you'll see the first render and the first 3D ring under your own brand before the call ends.
        </p>

        <button onClick={onDemoClick} className="btn-aurora group">
          Book a demo
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

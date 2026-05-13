import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const WORDS = ['designer', 'quoter', 'closer', 'renderer', 'manager', 'accelerator', 'visualizer', 'organizer', 'converter', 'curator'];

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2500;
const PAUSE_AFTER_DELETE = 400;

function useTypingCycle(words: string[]) {
  const [displayed, setDisplayed] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('pausing');

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length === 0) {
        const next = (wordIndex + 1) % words.length;
        setWordIndex(next);
        setPhase('waiting');
        return;
      }
      const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), DELETE_SPEED);
      return () => clearTimeout(t);
    }

    if (phase === 'waiting') {
      const t = setTimeout(() => setPhase('typing'), PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }

    if (phase === 'typing') {
      const target = words[wordIndex];
      if (displayed.length === target.length) {
        setPhase('pausing');
        return;
      }
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
      return () => clearTimeout(t);
    }
  }, [phase, displayed, wordIndex, words]);

  return displayed;
}

export const Hero = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const typedWord = useTypingCycle(WORDS);

  return (
    <section className="relative h-screen min-h-[720px] flex flex-col items-center justify-center overflow-hidden bg-obsidian">

      {/* ---------- SWEEPING AURORA BACKGROUND ---------- */}
      <div className="pointer-events-none absolute inset-0">

        {/* Base gradient — deep obsidian with subtle hue */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0B0D14 0%, #08090D 60%, #0A0B12 100%)' }}
        />

        {/* Large conic sweep #1 — violet, top-left, slow rotation */}
        <div
          className="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] animate-sweep"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(168,100,255,0.28) 60deg, rgba(100,200,255,0.20) 120deg, transparent 200deg, rgba(168,100,255,0.16) 280deg, transparent 360deg)',
            filter: 'blur(60px)',
          }}
        />

        {/* Large conic sweep #2 — cyan, bottom-right, counter rotation */}
        <div
          className="absolute -bottom-[30%] -right-[20%] w-[120%] h-[120%] animate-sweep-2"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(80,220,255,0.32) 80deg, rgba(168,100,255,0.24) 140deg, transparent 220deg, rgba(200,230,255,0.12) 300deg, transparent 360deg)',
            filter: 'blur(70px)',
          }}
        />

        {/* Radial bleed — top-right violet */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full animate-ambient"
          style={{
            background: 'radial-gradient(circle, rgba(168,100,255,0.40) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Radial bleed — bottom-left cyan */}
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[650px] h-[650px] rounded-full animate-ambient"
          style={{
            background: 'radial-gradient(circle, rgba(80,220,255,0.38) 0%, transparent 60%)',
            filter: 'blur(80px)',
            animationDelay: '-14s',
          }}
        />

        {/* Noise/grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Bottom fade into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, #08090D, transparent)' }}
        />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="eyebrow-accent">
            Built By Jewelers · For Jewelers
          </span>
        </div>

        {/* Headline — serif + italic aurora accent */}
        <h1
          className="display text-ice text-5xl md:text-7xl lg:text-[88px] text-balance animate-rise"
          style={{ animationDelay: '0.35s' }}
        >
          The world's <span className="underline-sweep">first</span>
          <br />
          <em className="accent-italic">AI custom jewelry</em>
          <br className="md:hidden" />{' '}
          <span className="inline-flex items-baseline">
            <span>{typedWord}</span>
            <span
              className="ml-[2px] inline-block w-[3px] self-stretch"
              style={{
                background: 'linear-gradient(180deg, #B298FF, #6DD5FA)',
                animation: 'blink 1s step-start infinite',
                borderRadius: '1px',
              }}
            />
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-smoke text-lg md:text-xl max-w-2xl leading-relaxed font-normal animate-rise"
          style={{ animationDelay: '0.5s' }}
        >
          Instant visuals. 20x more leads. 2-5x more custom orders.<br />
          <span className="text-ice">Effortlessly.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 animate-rise" style={{ animationDelay: '0.65s' }}>
          <button onClick={onDemoClick} className="btn-aurora text-[15px] px-7 py-3.5">
            Book a Free Demo <ArrowRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost text-[15px] px-7 py-3.5"
          >
            See It In Action
          </button>
        </div>

        {/* Trust line */}
        <p
          className="font-mono text-[11px] tracking-eyebrow uppercase text-smoke-2 animate-fade-in pt-2"
          style={{ animationDelay: '1.1s' }}
        >
          Trusted by 200+ jewelry retailers worldwide
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '1.4s' }}
      >
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, transparent, rgba(178,152,255,0.4))' }} />
        <span className="font-mono text-[10px] tracking-eyebrow uppercase text-smoke-2">Scroll</span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

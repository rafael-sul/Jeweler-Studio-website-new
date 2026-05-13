import { ArrowRight } from 'lucide-react';

export const FinalCTA = ({ onDemoClick, onWaitlistClick }: { onDemoClick: () => void; onWaitlistClick: () => void }) => {
  return (
    <section className="relative border-t border-hairline overflow-hidden bg-obsidian">
      {/* Sweeping aurora curtains — blurred gradient bands moving left → right */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Curtain 1 — violet, top */}
        <div
          className="absolute"
          style={{
            top: '-15%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: 'rotate(-8deg)',
            transformOrigin: '50% 50%',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.28) 35%, rgba(178,152,255,0.38) 50%, rgba(168,100,255,0.28) 65%, transparent 100%)',
              filter: 'blur(70px)',
              animation: 'finalCurtain 18s linear infinite',
            }}
          />
        </div>

        {/* Curtain 2 — cyan, middle */}
        <div
          className="absolute"
          style={{
            top: '25%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: 'rotate(6deg)',
            transformOrigin: '50% 50%',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(80,220,255,0.24) 35%, rgba(109,213,250,0.34) 50%, rgba(80,220,255,0.24) 65%, transparent 100%)',
              filter: 'blur(80px)',
              animation: 'finalCurtain 24s linear infinite',
              animationDelay: '-6s',
            }}
          />
        </div>

        {/* Curtain 3 — bicolor, bottom, slowest */}
        <div
          className="absolute"
          style={{
            bottom: '-10%',
            left: 0,
            width: '100%',
            height: '55%',
            transform: 'rotate(-12deg)',
            transformOrigin: '50% 50%',
          }}
        >
          <div
            className="w-[300%] h-full"
            style={{
              marginLeft: '-100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168,100,255,0.22) 30%, rgba(109,213,250,0.26) 50%, rgba(168,100,255,0.22) 70%, transparent 100%)',
              filter: 'blur(90px)',
              animation: 'finalCurtain 30s linear infinite',
              animationDelay: '-14s',
            }}
          />
        </div>
      </div>

      {/* Vignette so edges fade to pure obsidian */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(8,9,13,0.55) 75%, rgba(8,9,13,0.85) 100%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center py-32 px-6">
        <h2 className="display text-ice text-5xl md:text-[68px] mb-8 text-balance leading-[1.04]">
          Still reading?<br />
          You're leaving <em className="accent-italic">money on the table.</em>
        </h2>

        <p className="text-smoke text-xl font-normal mb-12 max-w-lg mx-auto leading-relaxed">
          Join jewelers already using Jeweler Studio to 20x their leads and 5x their close rate.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={onDemoClick} className="btn-aurora text-[15px] px-8 py-3.5">
            Book your free demo <ArrowRight size={15} />
          </button>
          <button onClick={onWaitlistClick} className="btn-ghost text-[15px] px-8 py-3.5">
            Join the waitlist
          </button>
        </div>

        <p className="text-smoke-2 text-[13px] mt-8 font-mono tracking-wide">
          No commitment. Results from the first conversation.
        </p>

        {/* Brand promise — handbook §1.5, the closing signature */}
        <div className="mt-24 max-w-2xl mx-auto">
          <div
            className="h-px mb-10"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(178,152,255,0.55) 25%, rgba(109,213,250,0.55) 75%, transparent 100%)',
            }}
          />
          <p className="display text-ice text-xl md:text-2xl leading-snug">
            The custom order, finished <em className="accent-italic">before the conversation starts.</em>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes finalCurtain {
          0%   { transform: translateX(0); }
          100% { transform: translateX(33.33%); }
        }
      `}</style>
    </section>
  );
};

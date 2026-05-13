import { ArrowRight, Sparkles, Gem, RotateCw, Wand2, Layers } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const StudioAIAnimation = () => (
  <div className="relative w-full aspect-[5/4] rounded-xl overflow-hidden border border-hairline-2 bg-obsidian">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(60% 50% at 30% 30%, rgba(178,152,255,0.22), transparent 60%), radial-gradient(50% 45% at 80% 80%, rgba(109,213,250,0.18), transparent 60%), linear-gradient(180deg, #0B0D14, #08090D)',
      }}
    />

    {/* Sweeping aurora beam */}
    <div
      className="absolute -inset-x-10 top-1/2 h-[180%] -translate-y-1/2 animate-sweep opacity-70"
      style={{
        background:
          'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(178,152,255,0.2) 60deg, rgba(109,213,250,0.14) 140deg, transparent 220deg, rgba(178,152,255,0.12) 320deg, transparent 360deg)',
        filter: 'blur(40px)',
      }}
    />

    {/* Prompt chips morphing into render */}
    <div className="relative z-10 h-full w-full flex flex-col justify-between p-6">
      <div className="flex flex-wrap gap-2">
        {[
          { t: 'vintage halo', d: '0s' },
          { t: '1.2ct oval', d: '0.6s' },
          { t: 'rose gold', d: '1.2s' },
        ].map((c) => (
          <span
            key={c.t}
            className="px-3 py-1 rounded-full font-mono text-[10.5px] tracking-eyebrow uppercase text-ice/90 border border-hairline-2 bg-graphite/70 backdrop-blur-sm"
            style={{ animation: 'chip-pop 4.8s ease-in-out infinite', animationDelay: c.d }}
          >
            {c.t}
          </span>
        ))}
      </div>

      {/* Central gem render */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178,152,255,0.35), transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse-glow 3.2s ease-in-out infinite',
          }}
        />
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center border border-hairline-2"
          style={{
            background:
              'conic-gradient(from 180deg, rgba(109,213,250,0.25), rgba(178,152,255,0.3), rgba(109,213,250,0.25))',
            boxShadow: '0 0 40px rgba(178,152,255,0.35), inset 0 0 24px rgba(255,255,255,0.08)',
            animation: 'gem-rotate 14s linear infinite',
          }}
        >
          <Gem size={48} style={{ color: '#E0E7FF', filter: 'drop-shadow(0 0 10px rgba(178,152,255,0.8))' }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-eyebrow uppercase text-smoke-2">
          <Wand2 size={11} className="text-aurora-violet" />
          <span>Generating render</span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-aurora-violet"
              style={{ animation: 'dot-blink 1.4s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RingProAnimation = () => (
  <div className="relative w-full aspect-[5/4] rounded-xl overflow-hidden border border-hairline-2 bg-obsidian">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(55% 45% at 50% 40%, rgba(109,213,250,0.2), transparent 65%), linear-gradient(180deg, #0B0D14, #08090D)',
      }}
    />

    {/* Grid floor */}
    <div
      className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
      style={{
        background:
          'linear-gradient(to top, rgba(109,213,250,0.08) 0%, transparent 100%), repeating-linear-gradient(90deg, rgba(109,213,250,0.18) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, rgba(109,213,250,0.12) 0 1px, transparent 1px 48px)',
        transform: 'perspective(600px) rotateX(60deg)',
        transformOrigin: 'bottom',
      }}
    />

    <div className="relative z-10 h-full w-full flex flex-col justify-between p-6">
      {/* Top spec strip */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-eyebrow uppercase text-smoke-2 flex items-center gap-1.5">
          <Layers size={11} className="text-aurora-cyan" />
          18K · Oval · 6-Prong
        </span>
        <span className="font-mono text-[10px] tracking-eyebrow uppercase text-ok">Live</span>
      </div>

      {/* Rotating ring */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className="absolute w-44 h-44 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(109,213,250,0.3), transparent 70%)',
            filter: 'blur(28px)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />
        <div
          className="relative"
          style={{ animation: 'ring-spin 8s linear infinite', transformStyle: 'preserve-3d' }}
        >
          <div
            className="w-28 h-28 rounded-full border-[6px]"
            style={{
              borderColor: 'transparent',
              background:
                'linear-gradient(#0B0D14, #0B0D14) padding-box, conic-gradient(from 0deg, #6DD5FA, #B298FF, #E0E7FF, #6DD5FA) border-box',
              boxShadow: '0 0 24px rgba(109,213,250,0.4), inset 0 0 20px rgba(178,152,255,0.2)',
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-45"
            style={{
              background: 'linear-gradient(135deg, #E0E7FF, #6DD5FA)',
              boxShadow: '0 0 18px rgba(109,213,250,0.9)',
            }}
          />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {['#E0E7FF', '#D4B87A', '#F8C8D4'].map((c, i) => (
            <span
              key={c}
              className="w-4 h-4 rounded-full border border-hairline-2"
              style={{
                background: c,
                animation: 'swatch-bob 2.6s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-eyebrow uppercase text-smoke-2">
          <RotateCw size={11} className="text-aurora-cyan" /> 360°
        </span>
      </div>
    </div>
  </div>
);

export const ProductsShowcase = () => {
  const { ref, isVisible } = useScrollTrigger(0.15);

  const products = [
    {
      id: 'studio-ai',
      name: 'Studio AI',
      heading: 'Imagination, rendered in seconds.',
      eyebrow: 'AI Customization Platform',
      badge: 'Now Live',
      badgeClass: 'text-ok',
      accent: '#B298FF',
      description:
        "Studio AI turns a customer's description into a photorealistic jewelry render — instantly. No CAD back-and-forth. No revision fees. Just a design they can see, feel, and commit to before they close the tab.",
      features: [
        { label: 'Natural-language design', icon: Wand2 },
        { label: 'Photoreal renders in seconds', icon: Sparkles },
        { label: 'Unlimited iterations', icon: Layers },
        { label: 'Intent-qualified leads', icon: Gem },
      ],
      Animation: StudioAIAnimation,
      reverse: false,
    },
    {
      id: 'ring-pro',
      name: 'Ring Pro',
      heading: 'A 3D ring configurator, built to convert.',
      eyebrow: 'Interactive Ring Builder',
      badge: 'Now Live',
      badgeClass: 'text-ok',
      accent: '#6DD5FA',
      description:
        "Ring Pro embeds a fully interactive 3D ring builder directly on your site. Metal, stone, setting, band — customers tune every detail and see the exact ring spin in real time. Live pricing. Deposit at checkout.",
      features: [
        { label: 'Real-time 3D configuration', icon: RotateCw },
        { label: 'Every metal, stone & setting', icon: Layers },
        { label: 'Instant pricing', icon: Sparkles },
        { label: 'Deposit at checkout', icon: Gem },
      ],
      Animation: RingProAnimation,
      reverse: true,
    },
  ];

  return (
    <section id="products" ref={ref} className="py-32 px-6 border-t border-hairline bg-relief relative">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="eyebrow mb-4">Our Platform</div>
          <h2 className="display-sans text-ice text-4xl md:text-[56px] leading-[1.05]">
            One complete design system <br />
            <em className="accent-italic">Dual-Faceted Approach</em>
          </h2>
        </div>

        <div className="space-y-32">
          {products.map((p, i) => {
            const Anim = p.Animation;
            return (
              <div
                key={p.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  p.reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'none' : 'translateY(24px)',
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 180}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 180}ms`,
                }}
              >
                {/* Copy */}
                <div className="space-y-7">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-[10.5px] tracking-eyebrow uppercase"
                      style={{ color: p.accent }}
                    >
                      {p.eyebrow}
                    </span>
                    <span className={`px-2.5 py-0.5 font-mono text-[10px] tracking-eyebrow uppercase rounded-md border border-hairline-2 ${p.badgeClass}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="display-sans text-ice text-3xl md:text-[40px] leading-[1.1] mb-2">
                      {p.name}
                    </h3>
                    <p
                      className="text-[22px] md:text-[26px] leading-snug"
                      style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', color: p.accent }}
                    >
                      {p.heading}
                    </p>
                  </div>

                  <p className="text-smoke text-[15.5px] leading-relaxed max-w-xl">
                    {p.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {p.features.map((f) => {
                      const Icon = f.icon;
                      return (
                        <li
                          key={f.label}
                          className="flex items-center gap-2.5 text-[13.5px] text-ice/85 py-2.5 px-3 rounded-lg border border-hairline bg-graphite/40"
                        >
                          <Icon size={14} style={{ color: p.accent }} />
                          {f.label}
                        </li>
                      );
                    })}
                  </ul>

                  <button className="group/btn inline-flex items-center gap-2 pt-2 font-mono text-[11px] tracking-eyebrow uppercase text-ice hover:text-aurora-violet transition-colors">
                    See it in action
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Animation panel */}
                <div className="relative">
                  <div
                    className="absolute -inset-6 rounded-3xl opacity-60 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${p.accent}33, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <Anim />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

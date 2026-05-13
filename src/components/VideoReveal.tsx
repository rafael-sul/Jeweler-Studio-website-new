import { useEffect, useRef, useState } from 'react';

type AnimState = {
  /** -1 (above viewport) ... 0 (centered) ... +1 (below viewport) */
  signed: number;
  /** 0 (off-screen far) ... 1 (perfectly centered) */
  intensity: number;
};

const INIT: AnimState = { signed: 1, intensity: 0 };

export const VideoReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [s, setS] = useState<AnimState>(INIT);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = vh / 2;
        const span = vh / 2 + rect.height / 2;
        const signed = Math.max(-1, Math.min(1, (sectionCenter - viewportCenter) / span));
        const intensity = Math.max(0, 1 - Math.abs(signed));
        setS({ signed, intensity });
      }
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

  // Derived motion values — bigger ranges so the effect is unmistakable
  const tiltX = s.signed * 14;                       // ±14°, mobile included
  const tiltY = s.signed * -2;                       // tiny Y tilt for parallax
  const translateY = s.signed * 24;                  // px of vertical drift
  const scale = 0.92 + s.intensity * 0.10;           // 0.92 → 1.02 at center
  const specularX = -s.signed * 60 + 50;             // % position; "light source" moves opposite to scroll
  const cornerStrength = 0.35 + s.intensity * 0.65;  // corner blooms intensify at center
  const rimAlpha = 0.30 + s.intensity * 0.55;        // gold rim glows brighter at center
  const innerGlow = s.intensity * 0.30;

  return (
    <section
      ref={sectionRef}
      className="py-36 md:py-48 px-6 bg-obsidian relative overflow-hidden"
    >
      {/* Aurora atmospheric bloom — responds to scroll */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(178,152,255,0.18), transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.5 + s.intensity * 0.5,
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Refraction Crystal Card */}
        <div
          className="mx-auto"
          style={{
            perspective: '1600px',
            perspectiveOrigin: '50% 50%',
            maxWidth: 920,
          }}
        >
          <div
            className="relative rounded-[18px]"
            style={{
              transform: `translateY(${translateY}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              transformStyle: 'preserve-3d',
              aspectRatio: '16 / 9',
              boxShadow: `
                0 ${30 + s.intensity * 30}px ${80 + s.intensity * 40}px rgba(10,11,20,${0.18 + s.intensity * 0.18}),
                0 8px 24px rgba(178,152,255,${0.10 + s.intensity * 0.10})
              `,
            }}
          >
            {/* Aurora prism dispersion at the four corners — intensify with proximity */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                top: -55, left: -55,
                width: 260, height: 260,
                background: `radial-gradient(circle at 80% 80%, rgba(109,213,250,${0.55 * cornerStrength}), transparent 60%)`,
                filter: 'blur(26px)',
                transform: `translate(${s.signed * -8}px, ${s.signed * -8}px)`,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                top: -55, right: -55,
                width: 260, height: 260,
                background: `radial-gradient(circle at 20% 80%, rgba(178,152,255,${0.60 * cornerStrength}), transparent 60%)`,
                filter: 'blur(26px)',
                transform: `translate(${s.signed * 8}px, ${s.signed * -8}px)`,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                bottom: -55, left: -55,
                width: 260, height: 260,
                background: `radial-gradient(circle at 80% 20%, rgba(178,152,255,${0.55 * cornerStrength}), transparent 60%)`,
                filter: 'blur(26px)',
                transform: `translate(${s.signed * -8}px, ${s.signed * 8}px)`,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                bottom: -55, right: -55,
                width: 260, height: 260,
                background: `radial-gradient(circle at 20% 20%, rgba(109,213,250,${0.60 * cornerStrength}), transparent 60%)`,
                filter: 'blur(26px)',
                transform: `translate(${s.signed * 8}px, ${s.signed * 8}px)`,
              }}
            />

            {/* Card body — dark crystal interior + champagne rim that brightens on approach */}
            <div
              className="relative w-full h-full rounded-[18px] overflow-hidden"
              style={{
                background: '#0A0B14',
                border: `1.5px solid rgba(212,184,122,${rimAlpha})`,
                boxShadow: `
                  0 0 0 0.5px rgba(212,184,122,${0.15 + s.intensity * 0.30}) inset,
                  0 0 60px rgba(178,152,255,${innerGlow}) inset
                `,
              }}
            >
              {/* Scroll-driven specular sweep — the "light source" position tracks scroll */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(${110 + s.signed * 15}deg,
                    transparent ${specularX - 25}%,
                    rgba(255,255,255,${0.04 + s.intensity * 0.04}) ${specularX - 8}%,
                    rgba(255,255,255,${0.10 + s.intensity * 0.10}) ${specularX}%,
                    rgba(255,255,255,${0.04 + s.intensity * 0.04}) ${specularX + 8}%,
                    transparent ${specularX + 25}%
                  )`,
                  mixBlendMode: 'overlay',
                  transition: 'background 120ms linear',
                }}
              />

              {/* Inner aurora vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(178,152,255,0.10), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(109,213,250,0.08), transparent 60%)',
                }}
              />

              {/* Video */}
              <video
                src="/explainer.mp4"
                poster="/explainer-poster.jpg"
                controls
                playsInline
                preload="metadata"
                className="relative w-full h-full object-cover"
                style={{ background: '#0A0B14' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// PLACEHOLDER customer wordmarks — swap with real partner SVG logos before launch.
const LOGOS = ['TRAXNYC', 'Johnny Dang & Co', 'Frost NYC', 'Diamond Rush NYC'];

export const TrustedBy = () => {
  // Duplicate once so the marquee can translate -50% and seamlessly loop.
  const TRACK = [...LOGOS, ...LOGOS];

  return (
    <section className="py-16 md:py-20 px-6 bg-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center font-mono text-[11px] tracking-eyebrow uppercase text-smoke-2 mb-12">
          Trusted by leading brands
        </p>

        <div className="relative">
          {/* Soft edge fades — narrower + lighter so the marquee shows through more */}
          <div
            className="absolute inset-y-0 left-0 w-28 md:w-40 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #08090D 0%, rgba(8,9,13,0.65) 30%, rgba(8,9,13,0.25) 65%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-28 md:w-40 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to left, #08090D 0%, rgba(8,9,13,0.65) 30%, rgba(8,9,13,0.25) 65%, transparent 100%)',
            }}
          />

          {/* Marquee track */}
          <div className="overflow-hidden">
            <div
              className="flex items-center gap-20 md:gap-28 whitespace-nowrap"
              style={{
                width: 'max-content',
                animation: 'logo-marquee 43s linear infinite',
              }}
            >
              {TRACK.map((name, i) => (
                <span
                  key={i}
                  className="text-ice/40 text-[26px] md:text-[36px] whitespace-nowrap shrink-0 select-none"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

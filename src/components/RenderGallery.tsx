const RENDERS = [
  { url: 'https://images.pexels.com/photos/1191537/pexels-photo-1191537.jpeg?auto=compress&cs=tinysrgb&w=600', label: '18k Gold Solitaire' },
  { url: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Diamond Tennis Bracelet' },
  { url: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Sapphire Halo Ring' },
  { url: 'https://images.pexels.com/photos/1413511/pexels-photo-1413511.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Pearl Drop Earrings' },
  { url: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Rose Gold Pendant' },
  { url: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Yellow Diamond Emerald Cut' },
  { url: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Ruby Eternity Band' },
  { url: 'https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Gold Stacking Rings' },
  { url: 'https://images.pexels.com/photos/2735971/pexels-photo-2735971.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Aquamarine Three-Stone' },
  { url: 'https://images.pexels.com/photos/1458862/pexels-photo-1458862.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Diamond Chandelier Earrings' },
  { url: 'https://images.pexels.com/photos/1438318/pexels-photo-1438318.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'White Gold Oval Solitaire' },
  { url: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Vintage Cushion Cut Halo' },
];

const ROW_TOP    = RENDERS.slice(0, 6);
const ROW_BOTTOM = RENDERS.slice(6, 12);

const RenderRow = ({
  items,
  direction,
  duration,
}: {
  items: typeof RENDERS;
  direction: 'left-to-right' | 'right-to-left';
  duration: number;
}) => {
  const TRACK = [...items, ...items];
  const animationName = direction === 'left-to-right' ? 'render-marquee-right' : 'render-marquee-left';

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades — soft dissolve into the section bg */}
      <div
        className="absolute inset-y-0 left-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #EEF0F4 0%, rgba(238,240,244,0.65) 35%, rgba(238,240,244,0.20) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, #EEF0F4 0%, rgba(238,240,244,0.65) 35%, rgba(238,240,244,0.20) 70%, transparent 100%)',
        }}
      />

      <div
        className="flex"
        style={{
          width: 'max-content',
          animation: `${animationName} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {TRACK.map((r, i) => (
          <div
            key={i}
            className="group relative shrink-0 rounded-xl overflow-hidden border border-rule-2"
            style={{ width: 240, aspectRatio: '1 / 1', marginRight: 16 }}
          >
            <img
              src={r.url}
              alt={r.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(8,9,13,0.9), transparent)' }}
            >
              <p className="text-ice text-[12.5px] font-medium">{r.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RenderGallery = () => {
  return (
    <section className="pt-28 pb-14 md:pb-16 px-6 border-t border-rule bg-paper-tinted overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-4 pl-1">Created by customers</div>
            <h2 className="display-sans text-ink text-4xl md:text-[56px]">
              Real ideas. <em className="accent-italic">Real designs.</em>
            </h2>
          </div>
          <p className="text-ink-3 text-[14px] max-w-xs leading-relaxed md:text-right">
            No CAD fees. No delays. Just instant accurate visuals. Limited only by your imagination.
          </p>
        </div>
      </div>

      {/* Marquees break out of max-w-7xl so the rows feel infinite */}
      <div className="space-y-3 md:space-y-4">
        <RenderRow items={ROW_TOP}    direction="left-to-right" duration={55} />
        <RenderRow items={ROW_BOTTOM} direction="right-to-left" duration={48} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center mt-16 md:mt-20">
        <p className="text-ink-mute font-mono text-[11px] tracking-eyebrow uppercase font-bold">
          Designed in Jeweler Studio
        </p>
        <img
          src="/icon_logo_bubble.png"
          alt="Jeweler Studio"
          className="h-8 md:h-9 w-auto mt-1 opacity-80"
        />
      </div>

      <style>{`
        @keyframes render-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes render-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

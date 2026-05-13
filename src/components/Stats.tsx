import { useScrollTrigger } from '../hooks/useScrollTrigger';

// PLACEHOLDER position — Stats lives at bottom of page for now per user direction.

const Stat = ({ value, label, suffix = '', isVisible, delay = 0 }: {
  value: number; label: string; suffix?: string; isVisible: boolean; delay?: number;
}) => {
  return (
    <div
      className="text-center transition-all duration-700"
      style={{ transitionDelay: `${delay}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(16px)' }}
    >
      <div className="display text-ink text-6xl md:text-[80px] tabular">
        {value}<span className="aurora-text">{suffix}</span>
      </div>
      <div className="eyebrow mt-3">{label}</div>
    </div>
  );
};

export const Stats = () => {
  const { ref, isVisible } = useScrollTrigger(0.3);

  return (
    <section ref={ref} className="py-24 px-6 border-t border-rule bg-paper">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <Stat value={20}  suffix="x" label="More Leads"      isVisible={isVisible} delay={0}   />
        <Stat value={5}   suffix="x" label="More Sales"      isVisible={isVisible} delay={80}  />
        <Stat value={0}   suffix=""  label="Extra Effort"    isVisible={isVisible} delay={160} />
        <Stat value={100} suffix="%" label="Instant Renders" isVisible={isVisible} delay={240} />
      </div>
    </section>
  );
};

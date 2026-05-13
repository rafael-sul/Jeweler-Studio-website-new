import { useScrollTrigger } from '../hooks/useScrollTrigger';

const ROWS = [
  { metric: 'Conversion Rate',   without: '2–3%',         with: '12–18%' },
  { metric: 'Time Per Order',    without: '3–7 days',      with: '24–48 hours' },
  { metric: 'Cost Per Render',   without: '$200–500',      with: '$0 (AI)' },
  { metric: 'Leads Captured',    without: 'Variable',      with: '20x more' },
  { metric: 'Follow-up Effort',  without: '4–6 hrs/order', with: 'Fully automated' },
  { metric: 'Close Rate',        without: '5–10%',         with: '40–60%' },
];

export const Comparison = () => {
  const { ref, isVisible } = useScrollTrigger(0.2);

  return (
    <section ref={ref} className="py-28 px-6 border-t border-rule bg-paper">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-20">
          <div className="eyebrow mb-4">Before & After</div>
          <h2 className="display-sans text-ink text-4xl md:text-[56px]">
            The numbers <em className="accent-italic">don't lie.</em>
          </h2>
        </div>

        <div
          className="rounded-2xl border border-rule-2 bg-paper-2 overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(18px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="grid grid-cols-3 border-b border-rule bg-paper">
            <div className="px-6 py-4 eyebrow">Metric</div>
            <div className="px-6 py-4 border-l border-rule eyebrow">Without</div>
            <div className="px-6 py-4 bg-obsidian font-mono text-[10.5px] tracking-eyebrow uppercase text-aurora-violet font-bold">With JewelerStudio</div>
          </div>

          {ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-rule last:border-0">
              <div className="px-6 py-4 text-ink text-[14px] font-medium">{row.metric}</div>
              <div className="px-6 py-4 border-l border-rule text-ink-mute text-[14px] line-through decoration-ink-mute/40">{row.without}</div>
              <div className="px-6 py-4 bg-obsidian text-[14px] font-medium aurora-text">{row.with}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-ink-3 text-[14px] mb-6">Ready to see these results in your store?</p>
          <button className="btn-aurora">Start your free trial</button>
        </div>
      </div>
    </section>
  );
};

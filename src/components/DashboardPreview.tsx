import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Users, FileText, Sparkles, ArrowUpRight } from 'lucide-react';

const HUE_BG: Record<'violet' | 'cyan' | 'gold', string> = {
  violet: 'linear-gradient(135deg, #B298FF, #6DD5FA)',
  cyan:   'linear-gradient(135deg, #6DD5FA, #E0E7FF)',
  gold:   'linear-gradient(135deg, #D4B87A, #B298FF)',
};

// =============================================================================
// MAIN
// =============================================================================

export const DashboardPreview = () => {
  const { ref, isVisible } = useScrollTrigger(0.25);

  return (
    <section ref={ref} className="py-28 px-6 border-t border-rule bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-6 md:mb-8">
          <div className="eyebrow mb-4">Jeweler Dashboard</div>
          <h2 className="display-sans text-ink text-4xl md:text-[56px] leading-[1.18]">
            Zero guesswork.<br /><em className="accent-italic">Total visibility.</em>
          </h2>
          <p className="text-ink-3 text-lg font-normal mt-5 leading-relaxed">
            Every lead, every design, every deposit, tracked in real-time. One dashboard to rule the pipeline.
          </p>
        </div>

        <ClassicDashboard isVisible={isVisible} />
      </div>
    </section>
  );
};

// =============================================================================
// CLASSIC DASHBOARD — KPIs + Recent Activity lead cards (dark theme)
// =============================================================================

type ClassicLeadStatus = 'deposit' | 'sent' | 'active';

const CLASSIC_STATUS: Record<ClassicLeadStatus, { label: string; color: string; bg: string; border: string }> = {
  deposit: { label: 'Deposit Secured', color: '#6BD3A3', bg: 'rgba(107,211,163,0.14)', border: 'rgba(107,211,163,0.50)' },
  sent:    { label: 'Quote Sent',      color: '#D4B87A', bg: 'rgba(212,184,122,0.14)', border: 'rgba(212,184,122,0.50)' },
  active:  { label: 'Active',          color: '#6DD5FA', bg: 'rgba(109,213,250,0.14)', border: 'rgba(109,213,250,0.50)' },
};

const RECENT_LEADS: {
  initials: string;
  name: string;
  detail: string;
  amount: string;
  status: ClassicLeadStatus;
  date: string;
  thumbHue: 'violet' | 'cyan' | 'gold';
}[] = [
  { initials: 'SM', name: 'Sarah M.',   detail: 'Halo pendant',    amount: '$4,500',  status: 'deposit', date: '2m ago',  thumbHue: 'violet' },
  { initials: 'MT', name: 'Marcus T.',  detail: 'Tennis bracelet', amount: '$12,000', status: 'sent',    date: '12m ago', thumbHue: 'cyan'   },
  { initials: 'JL', name: 'Jenna L.',   detail: 'Custom ring',     amount: '$3,200',  status: 'active',  date: '1h ago',  thumbHue: 'gold'   },
  { initials: 'DK', name: 'Devon K.',   detail: 'Engagement set',  amount: '$8,400',  status: 'deposit', date: '3h ago',  thumbHue: 'cyan'   },
];

const ClassicDashboard = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className="panel overflow-hidden relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Aurora top accent line */}
      <div className="accent-line" />

      {/* Atmospheric aurora glow inside panel for depth */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          background: 'radial-gradient(circle, rgba(178,152,255,0.18), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: -120,
          left: -120,
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(109,213,250,0.14), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Toolbar — centered Jeweler Studio brand mark */}
      <div className="relative flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border-b border-hairline-2 bg-graphite-2/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <defs>
              <linearGradient id="dp-classic-brand-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6DD5FA" />
                <stop offset="0.5" stopColor="#B298FF" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>
            <polygon points="7,1 13,5 7,13 1,5" fill="url(#dp-classic-brand-g)" />
          </svg>
          <span className="font-sans text-[12.5px] sm:text-[13.5px] font-bold tracking-tight text-ice">
            Jeweler Studio
          </span>
        </div>
      </div>

      <div className="relative p-3 sm:p-6 md:p-8 space-y-5 sm:space-y-8">
        {/* KPIs — horizontal always, lifted with aurora-tinted bg + violet rim glow */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { icon: Sparkles, label: 'Designs Generated', value: 245, delta: '+24%' },
            { icon: Users,    label: 'Leads',             value: 84,  delta: '+12%' },
            { icon: FileText, label: 'Quotes',            value: 43,  delta: '+18%' },
          ].map((kpi, i) => (
            <div
              key={i}
              className="rounded-xl border border-hairline-2 p-3 sm:p-5 relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, rgba(178,152,255,0.08) 0%, rgba(20,22,30,0.85) 50%, rgba(20,22,30,0.95) 100%)',
                boxShadow: '0 0 0 1px rgba(178,152,255,0.10) inset, 0 8px 24px rgba(0,0,0,0.25)',
              }}
            >
              <div className="flex justify-between items-start mb-2 sm:mb-4 gap-2 relative">
                <p className="font-mono text-[9.5px] sm:text-[11px] tracking-eyebrow uppercase text-smoke leading-tight">
                  {kpi.label}
                </p>
                <span
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(178,152,255,0.14)',
                    border: '1px solid rgba(178,152,255,0.30)',
                  }}
                >
                  <kpi.icon size={11} className="text-aurora-violet" />
                </span>
              </div>
              <p className="display-sans aurora-text text-[26px] sm:text-[44px] tabular leading-none font-bold relative">
                {kpi.value}
              </p>
              <div className="flex items-center gap-1 mt-2 sm:mt-3 pt-2 sm:pt-3 relative" style={{ borderTop: '1px solid rgba(178,152,255,0.15)' }}>
                <ArrowUpRight size={10} className="text-ok flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11.5px] text-ok font-bold">{kpi.delta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity — lead cards with status pills */}
        <div>
          <div className="flex items-baseline justify-between mb-3 sm:mb-4">
            <p className="eyebrow-accent">Recent Activity</p>
            <span className="font-mono text-[10px] tracking-eyebrow uppercase font-bold text-aurora-violet">
              View all
            </span>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            {RECENT_LEADS.map((lead, i) => {
              const s = CLASSIC_STATUS[lead.status];
              return (
                <div
                  key={i}
                  className="rounded-lg border border-hairline-2 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, rgba(178,152,255,0.05) 0%, rgba(20,22,30,0.70) 100%)',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                    transitionDelay: `${300 + i * 90}ms`,
                  }}
                >
                  <span
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
                    style={{ background: HUE_BG[lead.thumbHue], color: '#0A0B10' }}
                  >
                    {lead.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-ice text-[12.5px] sm:text-[13px] font-bold truncate">
                      {lead.name}
                    </div>
                    <div className="text-smoke text-[10.5px] sm:text-[11.5px] truncate">
                      {lead.detail} <span className="text-smoke-2">·</span>{' '}
                      <span className="aurora-text font-bold tabular">{lead.amount}</span>
                    </div>
                  </div>
                  <span
                    className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[9.5px] tracking-eyebrow uppercase font-bold whitespace-nowrap"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                  >
                    {s.label}
                  </span>
                  {/* Mobile-only compact dot pill */}
                  <span
                    className="sm:hidden inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[8.5px] tracking-eyebrow uppercase font-bold whitespace-nowrap flex-shrink-0"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: s.color }} />
                    {lead.status === 'deposit' ? 'Paid' : lead.status === 'sent' ? 'Sent' : 'Active'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

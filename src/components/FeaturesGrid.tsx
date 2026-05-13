import { Globe, Zap, TrendingUp, Mail, Paintbrush, DollarSign, Image, Lock, type LucideIcon } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

interface Feature { icon: LucideIcon; title: string; value: string; body: string; }

const FEATURES: Feature[] = [
  { icon: Globe,      title: 'Embeds on your site',    value: 'Your store. Your rules.',          body: 'Works with any website builder. Customers never leave your domain.' },
  { icon: Zap,        title: 'Instant AI renders',      value: 'No more "I need to see it."',     body: 'Photorealistic renders in seconds from any design choice.' },
  { icon: TrendingUp, title: 'Lead tracking & ranking', value: '20x more qualified leads.',        body: 'Every design becomes a ranked lead. Serious buyers surface automatically.' },
  { icon: Mail,       title: 'Automated email & SMS',   value: 'Close more without more effort.',  body: 'AI-powered nurture sequences follow up on every lead for you.' },
  { icon: Paintbrush, title: 'White-label branding',    value: 'Complete brand control.',          body: 'Your logo, your colors. Customers never know JewelerStudio exists.' },
  { icon: DollarSign, title: 'Cost estimation',         value: 'Accurate quotes, instantly.',      body: 'AI calculates material and labor costs in real-time for any design.' },
  { icon: Image,      title: 'Internal design studio',  value: 'Marketing assets in minutes.',     body: 'Generate product photography in-house. No freelancers, no delays.' },
  { icon: Lock,       title: 'Deposit collection',      value: 'Secure the sale on the spot.',     body: 'Capture deposits at maximum buyer excitement, before they leave.' },
];

export const FeaturesGrid = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);

  return (
    <section id="features" ref={ref} className="py-28 px-6 border-t border-rule bg-paper">
      <div className="max-w-7xl mx-auto">

        <div className="max-w-2xl mb-20">
          <div className="eyebrow mb-4">Features</div>
          <h2 className="display-sans text-ink text-4xl md:text-[56px]">
            A complete system. <em className="accent-italic">Eight capabilities,</em> one platform.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-rule-2 bg-paper-2 p-7 hover:border-aurora-violet/40 transition-colors duration-300 cursor-default"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateY(14px)',
                transition: `opacity 0.6s ease ${i * 45}ms, transform 0.6s ease ${i * 45}ms, border-color 0.3s`,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-rule-2 bg-paper">
                <f.icon size={17} className="text-ink-mute group-hover:text-aurora-violet transition-colors duration-300" />
              </div>
              <p className="font-mono text-[10.5px] tracking-eyebrow uppercase text-aurora-violet font-bold mb-2">{f.value}</p>
              <h3 className="text-ink font-bold text-[14.5px] mb-2 leading-snug">{f.title}</h3>
              <p className="text-ink-3 text-[13px] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

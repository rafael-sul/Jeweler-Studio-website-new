import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType: 'demo' | 'waitlist';
}

export const LeadModal = ({ isOpen, onClose, inquiryType }: LeadModalProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', store_name: '', website_url: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from('leads').insert([{ ...form, inquiry_type: inquiryType, status: 'new' }]);
    setLoading(false);
    if (err) {
      setError(err.code === '23505' ? 'That email is already registered.' : 'Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); setForm({ name: '', email: '', store_name: '', website_url: '' }); }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,9,13,0.8)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative max-w-md w-full rounded-2xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #D6D9E0',
          boxShadow: '0 40px 80px rgba(10,11,20,0.45), 0 0 60px rgba(178,152,255,0.15)',
        }}
      >
        {/* Aurora top line */}
        <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent, #6DD5FA, #B298FF, transparent)' }} />

        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-ink-mute hover:text-ink transition-colors">
            <X size={18} />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 size={40} className="mx-auto text-aurora-violet" />
              <h3 className="display-sans text-ink text-2xl">You're <em className="accent-italic">confirmed.</em></h3>
              <p className="text-ink-3 text-[14px]">Our team will reach out within 24 hours to schedule your demo.</p>
            </div>
          ) : (
            <>
              <h2 className="display-sans text-ink text-[32px]">
                {inquiryType === 'demo' ? <>Book your <em className="accent-italic">free demo</em></> : <>Join the <em className="accent-italic">waitlist</em></>}
              </h2>
              <p className="text-ink-3 text-[14px] mt-1 mb-7">
                {inquiryType === 'demo' ? 'See JewelerStudio live. No credit card. No pressure.' : 'Be first in line when we open new spots.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { key: 'name',        type: 'text',  ph: 'Your name',             req: true  },
                  { key: 'email',       type: 'email', ph: 'Email address',          req: true  },
                  { key: 'store_name',  type: 'text',  ph: 'Store name',             req: false },
                  { key: 'website_url', type: 'url',   ph: 'Website URL (optional)', req: false },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.ph}
                    required={f.req}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-paper border border-rule-2 text-ink text-[14.5px] placeholder-ink-mute focus:outline-none focus:border-aurora-violet transition-colors"
                  />
                ))}

                {error && <p className="text-bad text-[13px]">{error}</p>}

                <button type="submit" disabled={loading} className="btn-aurora w-full justify-center py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Submitting…' : inquiryType === 'demo' ? 'Book my demo' : 'Join waitlist'}
                </button>

                <p className="text-ink-mute text-[11.5px] text-center pt-1 font-mono tracking-wide">We respect your privacy. No spam, ever.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

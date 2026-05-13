import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

const LINKS: Record<string, string[]> = {
  Products: ['Studio AI', 'Ring Pro', 'CRM Dashboard', 'Deposit Collection'],
  Company:  ['About', 'Blog', 'Careers', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Security'],
};

export const Footer = () => {
  return (
    <footer className="border-t border-rule pt-16 pb-10 px-6 bg-paper-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-rule">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 14 14">
                <defs>
                  <linearGradient id="ftg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#6DD5FA" />
                    <stop offset="0.5" stopColor="#B298FF" />
                    <stop offset="1" stopColor="#7C5BFF" />
                  </linearGradient>
                </defs>
                <polygon points="7,1 13,5 7,13 1,5" fill="url(#ftg)" />
              </svg>
              <span className="font-sans font-medium text-ink text-[15px]">JewelerStudio</span>
            </div>
            <p className="text-ink-3 text-[13.5px] leading-relaxed max-w-xs">
              Bridging the gap between conception and creation for jewelers and their clients.
            </p>
            <div className="flex gap-4 pt-1">
              {[Mail, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-ink-mute hover:text-ink transition-colors duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section} className="space-y-4">
              <h4 className="eyebrow">{section}</h4>
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <a key={item} href="#" className="text-ink-3 text-[13.5px] hover:text-ink transition-colors duration-200">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-ink-mute text-[12px] font-mono tracking-wide flex items-center gap-2">
            <svg width="9" height="9" viewBox="0 0 14 14" aria-hidden="true">
              <polygon points="7,1 13,5 7,13 1,5" fill="url(#ftg)" />
            </svg>
            &copy; {new Date().getFullYear()} JewelerStudio · All rights reserved.
          </p>
          <p className="text-ink-mute text-[11px] font-mono tracking-grp uppercase">
            The operating system for modern jewelers
          </p>
        </div>
      </div>
    </footer>
  );
};

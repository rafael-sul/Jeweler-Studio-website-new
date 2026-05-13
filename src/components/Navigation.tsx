import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const Navigation = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const items: { label: string; to: string }[] = [
    { label: 'Products', to: '/products' },
    { label: 'Pricing',  to: '/pricing'  },
    { label: 'Contact',  to: '/contact'  },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div
        className="mx-auto pointer-events-auto"
        style={{
          maxWidth: scrolled ? '80rem' : '100%',
          paddingLeft:  scrolled ? '24px' : '0px',
          paddingRight: scrolled ? '24px' : '0px',
          paddingTop:   scrolled ? '16px' : '0px',
          transition: 'max-width 600ms cubic-bezier(0.4,0,0.2,1), padding 600ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div className="relative">
          {/* GLASS BAR — full width at top, morphs into a pill when scrolled */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: scrolled ? '9999px' : '0px',
              background: scrolled
                ? 'linear-gradient(180deg, rgba(10,11,16,0.62), rgba(10,11,16,0.62))'
                : 'linear-gradient(180deg, rgba(10,11,16,0.70), rgba(10,11,16,0.70))',
              backdropFilter: 'blur(14px) saturate(180%) brightness(1.05)',
              WebkitBackdropFilter: 'blur(14px) saturate(180%) brightness(1.05)',
              border: scrolled ? '1px solid rgba(255,255,255,0.14)' : '1px solid transparent',
              borderBottom: scrolled
                ? '1px solid rgba(255,255,255,0.14)'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: scrolled
                ? [
                    '0 1px 0 rgba(255,255,255,0.32) inset',
                    '0 -1px 0 rgba(255,255,255,0.04) inset',
                    '0 0 0 0.5px rgba(255,255,255,0.06) inset',
                    '0 12px 40px rgba(0,0,0,0.45)',
                    '0 0 0 0.5px rgba(0,0,0,0.55)',
                  ].join(', ')
                : '0 1px 0 rgba(255,255,255,0.06) inset',
              transition:
                'border-radius 600ms cubic-bezier(0.4,0,0.2,1), background 500ms ease, border 500ms ease, box-shadow 500ms ease',
            }}
          >
            {/* Top specular line — only when in pill form */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px pointer-events-none transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
                opacity: scrolled ? 1 : 0,
              }}
            />
            {/* Inner edge highlight ring — pill only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
              style={{
                boxShadow:
                  'inset 1px 1px 1px rgba(255,255,255,0.18), inset -1px -1px 1px rgba(255,255,255,0.06)',
                opacity: scrolled ? 1 : 0,
              }}
            />

            <div
              className="relative flex items-center justify-between gap-4 mx-auto py-2.5"
              style={{
                maxWidth: scrolled ? 'none' : '80rem',
                paddingLeft:  scrolled ? '20px' : '24px',
                paddingRight: scrolled ? '20px' : '24px',
                transition: 'max-width 600ms cubic-bezier(0.4,0,0.2,1), padding 500ms ease',
              }}
            >
              {/* Logo — routes home */}
              <Link
                to="/"
                className="flex items-center gap-2.5 group flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 14 14">
                  <defs>
                    <linearGradient id="brand-g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0"   stopColor="#6DD5FA" />
                      <stop offset="0.5" stopColor="#B298FF" />
                      <stop offset="1"   stopColor="#E0E7FF" />
                    </linearGradient>
                  </defs>
                  <polygon points="7,1 13,5 7,13 1,5" fill="url(#brand-g)" />
                </svg>
                <span className="font-sans font-medium text-ice text-[14.5px] tracking-tight">JewelerStudio</span>
              </Link>

              {/* Desktop nav — routed links */}
              <nav className="hidden md:flex items-center gap-7">
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `transition-colors duration-200 text-[14px] font-medium ${
                        isActive ? 'text-ice' : 'text-ice/85 hover:text-ice'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* CTA */}
              <div className="hidden md:block">
                <button
                  onClick={onDemoClick}
                  className="text-[13px] font-semibold text-ice px-3.5 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(109,213,250,0.28), rgba(178,152,255,0.28))',
                    border: '1px solid rgba(255,255,255,0.20)',
                    boxShadow:
                      '0 1px 0 rgba(255,255,255,0.30) inset, 0 0 18px rgba(178,152,255,0.30)',
                  }}
                >
                  Book a Demo
                </button>
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-ice/85 hover:text-ice transition-colors p-1 flex-shrink-0"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer — same glass treatment */}
          {mobileOpen && (
            <div
              className="md:hidden mt-2 rounded-2xl overflow-hidden pointer-events-auto relative"
              style={{
                background: 'linear-gradient(180deg, rgba(20,22,30,0.32), rgba(10,11,16,0.32))',
                backdropFilter: 'blur(14px) saturate(180%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(14px) saturate(180%) brightness(1.05)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.32) inset, 0 12px 40px rgba(0,0,0,0.45)',
              }}
            >
              <div className="relative px-5 py-5 space-y-4">
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block text-[14.5px] font-medium text-left transition-colors w-full ${
                        isActive ? 'text-ice' : 'text-ice/85 hover:text-ice'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); onDemoClick(); }}
                  className="w-full mt-2 text-[13.5px] font-semibold text-ice px-4 py-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(109,213,250,0.28), rgba(178,152,255,0.28))',
                    border: '1px solid rgba(255,255,255,0.20)',
                    boxShadow:
                      '0 1px 0 rgba(255,255,255,0.30) inset, 0 0 18px rgba(178,152,255,0.30)',
                  }}
                >
                  Book a Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

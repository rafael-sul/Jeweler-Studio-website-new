import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { Home } from './pages/Home';
import { PricingPage } from './pages/PricingPage';
import { ProductsPage } from './pages/ProductsPage';
import { ContactPage } from './pages/ContactPage';

// Scroll-to-top on route change — without it React Router preserves scroll position
// between routes, which feels broken when the page is taller than the viewport.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<'demo' | 'waitlist'>('demo');
  const [showVideoReveal, setShowVideoReveal] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('jsd-video-reveal') !== 'off';
  });

  const openDemo = () => { setInquiryType('demo'); setModalOpen(true); };
  const openWaitlist = () => { setInquiryType('waitlist'); setModalOpen(true); };

  const toggleVideoReveal = () => {
    setShowVideoReveal((prev) => {
      const next = !prev;
      try { localStorage.setItem('jsd-video-reveal', next ? 'on' : 'off'); } catch {}
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-obsidian text-ice [overflow-x:clip]">
        <Navigation onDemoClick={openDemo} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                onDemoClick={openDemo}
                onWaitlistClick={openWaitlist}
                showVideoReveal={showVideoReveal}
              />
            }
          />
          <Route path="/pricing" element={<PricingPage onDemoClick={openDemo} />} />
          <Route path="/products" element={<ProductsPage onDemoClick={openDemo} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />

        <LeadModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          inquiryType={inquiryType}
        />

        {/* Dev toggle — bottom-right floating, click to flip on/off */}
        <button
          type="button"
          onClick={toggleVideoReveal}
          className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-md font-mono text-[10px] tracking-[0.14em] uppercase font-bold border backdrop-blur-md transition-colors"
          style={{
            background: 'rgba(8,9,13,0.85)',
            color: showVideoReveal ? '#6BD3A3' : '#E87A6D',
            borderColor: showVideoReveal ? 'rgba(107,211,163,0.5)' : 'rgba(232,122,109,0.5)',
          }}
          aria-label="Toggle video reveal section"
        >
          Video {showVideoReveal ? 'ON' : 'OFF'}
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;

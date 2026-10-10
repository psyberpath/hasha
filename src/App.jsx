import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import CulturalStories from './components/CulturalStories';
import CreatorDashboard from './components/CreatorDashboard';
import ItemDetailModal from './components/ItemDetailModal';
import UploadWizardModal from './components/UploadWizardModal';
import CheckoutModal from './components/CheckoutModal';
import BespokeDesignModal from './components/BespokeDesignModal';
import OnboardingModal from './components/OnboardingModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

function ToastContainer() {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto p-4 rounded-2xl glass-panel border border-white/10 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 text-left"
        >
          {n.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : n.type === 'info' ? (
            <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#C85A32] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-grow">
            <h5 className="text-xs font-bold text-white mb-0.5">{n.title}</h5>
            <p className="text-[11px] text-[#C5BFB5] leading-relaxed">{n.message}</p>
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="text-white/40 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function MainContent() {
  const { userRole, activeModal } = useApp();
  const [currentTab, setCurrentTab] = useState('marketplace'); // 'marketplace' | 'cultural-stories' | 'creator-dashboard'
  const [activeCategory, setActiveCategory] = useState('all');

  const scrollToMarketplace = () => {
    setCurrentTab('marketplace');
    const elem = document.getElementById('marketplace-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromHero = (catId) => {
    setCurrentTab('marketplace');
    setActiveCategory(catId);
    const elem = document.getElementById('marketplace-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F9F6F0] flex flex-col justify-between selection:bg-[#C85A32] selection:text-white">
      
      {/* Background Decorative Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 adire-grid-bg opacity-70"></div>

      <div>
        {/* Floating Glassmorphic Navigation */}
        <Navbar onNavigate={setCurrentTab} currentTab={currentTab} />

        {/* Tab Switch Routing */}
        {currentTab === 'marketplace' && (
          <main>
            <Hero 
              onExplore={scrollToMarketplace} 
              onSelectCategory={handleSelectCategoryFromHero} 
            />
            <Marketplace 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </main>
        )}

        {currentTab === 'cultural-stories' && (
          <main>
            <CulturalStories />
          </main>
        )}

        {currentTab === 'creator-dashboard' && (
          <main>
            <CreatorDashboard />
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={setCurrentTab} />

      {/* Modals & Slide-outs */}
      {activeModal === 'itemDetail' && <ItemDetailModal />}
      {activeModal === 'uploadWizard' && <UploadWizardModal />}
      {activeModal === 'checkout' && <CheckoutModal />}
      {activeModal === 'bespoke' && <BespokeDesignModal />}
      {activeModal === 'onboarding' && <OnboardingModal />}
      {activeModal === 'cart' && <CartDrawer />}

      {/* Live Toast Notifications */}
      <ToastContainer />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

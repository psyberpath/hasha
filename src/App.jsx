import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Marketplace from './components/Marketplace';
import CulturalStories from './components/CulturalStories';
import CreatorDashboard from './components/CreatorDashboard';
import ItemDetailModal from './components/ItemDetailModal';
import UploadWizardModal from './components/UploadWizardModal';
import CheckoutModal from './components/CheckoutModal';
import BespokeDesignModal from './components/BespokeDesignModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X
} from 'lucide-react';

function ToastContainer() {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto p-4 rounded-2xl bg-white border border-[#E8E3DA] shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 text-left"
        >
          {n.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-[#C85A32] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-grow">
            <h5 className="text-xs font-bold text-[#18181B] mb-0.5">{n.title}</h5>
            <p className="text-[11px] text-[#57534E] leading-relaxed">{n.message}</p>
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="text-[#78716C] hover:text-[#18181B] p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function MainContent() {
  const { currentView, activeModal } = useApp();
  const [currentTab, setCurrentTab] = useState('marketplace'); // 'marketplace' | 'cultural-stories' | 'creator-dashboard'
  const [activeCategory, setActiveCategory] = useState('all');
  const [authRoleToOpen, setAuthRoleToOpen] = useState(null);

  // If on standalone Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#18181B]">
        <LandingPage 
          onOpenAuth={(role) => setAuthRoleToOpen(role)} 
        />

        {authRoleToOpen && (
          <AuthModal 
            initialRole={authRoleToOpen} 
            onClose={() => setAuthRoleToOpen(null)} 
          />
        )}

        {/* Dynamic Modals even from landing preview clicks */}
        {activeModal === 'itemDetail' && <ItemDetailModal />}
        {activeModal === 'checkout' && <CheckoutModal />}
        {activeModal === 'bespoke' && <BespokeDesignModal />}

        <ToastContainer />
      </div>
    );
  }

  // Inside the main app ecosystem
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B] flex flex-col justify-between selection:bg-[#C85A32] selection:text-white">
      
      <div>
        {/* Floating Light Mode Navigation */}
        <Navbar onNavigate={setCurrentTab} currentTab={currentTab} />

        {/* Tab Switch Routing */}
        {currentTab === 'marketplace' && (
          <main>
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

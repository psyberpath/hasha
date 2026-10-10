import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ITEMS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // User profile & role: 'collector' | 'creator'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('hasha_user_role') || 'collector';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('hasha_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Adewale Balogun',
      email: 'adewale.balogun@hasha.ng',
      role: 'collector',
      location: 'Victoria Island, Lagos State',
      heritage: 'Yoruba',
      bio: 'African contemporary art connoisseur and indigenous heritage patron.'
    };
  });

  // Items in the ecosystem
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('hasha_custom_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_ITEMS];
      } catch (e) { /* ignore */ }
    }
    return INITIAL_ITEMS;
  });

  // Collections & interactions
  const [savedItemIds, setSavedItemIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hasha_saved_items')) || ['hsh-001', 'hsh-003'];
    } catch { return ['hsh-001', 'hsh-003']; }
  });

  const [activeBids, setActiveBids] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hasha_user_bids')) || [
        {
          id: 'bid-1',
          itemId: 'hsh-001',
          itemTitle: 'Commemorative Head of Queen Idia (Iyoba)',
          bidAmount: 4200000,
          timestamp: '2 hours ago',
          status: 'Leading Bidder',
          image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80'
        }
      ];
    } catch { return []; }
  });

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hasha_user_orders')) || [
        {
          id: 'HSH-TX-984210',
          itemId: 'hsh-003',
          itemTitle: 'Smoked Ayamase & Stone-Ground Ofada Feast',
          amount: 15000,
          type: 'Recipe Access Unlocked',
          date: 'Yesterday, 4:30 PM',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
        }
      ];
    } catch { return []; }
  });

  const [customRequests, setCustomRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hasha_user_custom_requests')) || [];
    } catch { return []; }
  });

  // Creator Payout Balance & Stats
  const [creatorBalance, setCreatorBalance] = useState(() => {
    const saved = localStorage.getItem('hasha_creator_balance');
    return saved ? Number(saved) : 8450000;
  });

  // Toast notifications
  const [notifications, setNotifications] = useState([]);

  // Current top-level view: 'landing' | 'app'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('hasha_current_view') || 'landing';
  });

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'onboarding' | 'signupCollector' | 'signupCreator' | 'uploadWizard' | 'itemDetail' | 'checkout' | 'bespoke' | 'folklore' | 'cart' | 'payout'
  const [selectedItem, setSelectedItem] = useState(null);

  // Sync view
  useEffect(() => {
    localStorage.setItem('hasha_current_view', currentView);
  }, [currentView]);

  const enterApp = (role = 'collector', profileData = null) => {
    if (role) {
      setUserRole(role);
    }
    if (profileData) {
      setUserProfile((prev) => ({
        ...prev,
        ...profileData,
        role: role || prev.role,
      }));
    }
    setCurrentView('app');
    notify('Access Granted', `Welcome to hasha as a verified ${role === 'creator' ? 'Indigenous Creator' : 'Connoisseur'}.`, 'info');
  };

  const returnToLanding = () => {
    setCurrentView('landing');
  };

  useEffect(() => {
    localStorage.setItem('hasha_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('hasha_saved_items', JSON.stringify(savedItemIds));
  }, [savedItemIds]);

  useEffect(() => {
    localStorage.setItem('hasha_user_bids', JSON.stringify(activeBids));
  }, [activeBids]);

  useEffect(() => {
    localStorage.setItem('hasha_user_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hasha_user_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('hasha_creator_balance', creatorBalance.toString());
  }, [creatorBalance]);

  // Notifications helper
  const notify = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Switch role seamlessly
  const switchRole = (newRole) => {
    setUserRole(newRole);
    if (newRole === 'creator') {
      setUserProfile((prev) => ({
        ...prev,
        role: 'creator',
        name: prev.name === 'Adewale Balogun' ? 'Osahenrumwen Orobator' : prev.name,
        heritage: prev.heritage || 'Edo (Bini)',
        location: prev.location.includes('Benin') ? prev.location : 'Igun Bronze Casters Guild, Benin City, Edo State',
        bio: 'Preserving lost-wax bronze casting traditions under the patronage of the ancient Benin kingdom.'
      }));
      notify('Switched to Creator Suite', 'You are now viewing hasha from an artist & guild perspective.', 'info');
    } else {
      setUserProfile((prev) => ({
        ...prev,
        role: 'collector',
        name: prev.name === 'Osahenrumwen Orobator' ? 'Adewale Balogun' : prev.name,
        bio: 'African contemporary art connoisseur and indigenous heritage patron.'
      }));
      notify('Switched to Collector Mode', 'Explore cultural treasures, place bids, and commission bespoke works.', 'info');
    }
  };

  // Toggle favorite
  const toggleSaveItem = (itemId) => {
    setSavedItemIds((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        notify('Removed from Heritage Vault', 'Item removed from saved bookmarks.', 'info');
        return prev.filter((id) => id !== itemId);
      } else {
        notify('Saved to Heritage Vault', 'Treasure bookmarked in your private collection.', 'success');
        return [...prev, itemId];
      }
    });
  };

  // Add new piece from Upload Wizard
  const addArtPiece = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    // Save to local storage custom items
    try {
      const existing = JSON.parse(localStorage.getItem('hasha_custom_items')) || [];
      localStorage.setItem('hasha_custom_items', JSON.stringify([newItem, ...existing]));
    } catch (e) { /* ignore */ }

    notify('Masterpiece Published!', `"${newItem.title}" is now live on hasha marketplace.`, 'success');
  };

  // Place a bid
  const submitBid = (itemId, amount) => {
    const targetItem = items.find((i) => i.id === itemId);
    if (!targetItem) return;

    // Update item current bid
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            currentBid: amount,
            totalBids: (item.totalBids || 0) + 1,
          };
        }
        return item;
      })
    );

    // Record user bid
    const newBid = {
      id: `bid-${Date.now()}`,
      itemId,
      itemTitle: targetItem.title,
      bidAmount: amount,
      timestamp: 'Just now',
      status: 'Leading Bidder',
      image: targetItem.image,
    };

    setActiveBids((prev) => [newBid, ...prev.filter((b) => b.itemId !== itemId)]);
    notify('Bid Placed Successfully', `You are leading with ₦${Number(amount).toLocaleString()}`, 'success');
  };

  // Process purchase
  const completePurchase = (item, amount, paymentMethod = 'Card') => {
    const newOrder = {
      id: `HSH-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      itemId: item.id,
      itemTitle: item.title,
      amount,
      type: item.pricingMode === 'recipe' ? 'Recipe Access Unlocked' : 'Permanent Acquisition',
      date: 'Just now',
      image: item.image,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    notify('Transaction Settled!', `Acquisition of "${item.title}" confirmed with cryptographic provenance receipt.`, 'success');
  };

  // Add bespoke custom request
  const submitBespokeRequest = (requestData) => {
    const newReq = {
      id: `BESPOKE-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...requestData,
      status: 'Commission Under Review by Guild Master'
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    notify('Commission Dispatched', 'The master artisan will review your dimensions and contact you.', 'success');
  };

  // Process creator payout
  const executePayout = (amount, bankInfo) => {
    setCreatorBalance((prev) => Math.max(0, prev - amount));
    notify('Payout Dispatched', `₦${Number(amount).toLocaleString()} sent to ${bankInfo.bankName} (${bankInfo.accountNumber}).`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        switchRole,
        userProfile,
        setUserProfile,
        items,
        addArtPiece,
        savedItemIds,
        toggleSaveItem,
        activeBids,
        submitBid,
        orders,
        completePurchase,
        customRequests,
        submitBespokeRequest,
        creatorBalance,
        executePayout,
        notifications,
        notify,
        removeNotification,
        currentView,
        setCurrentView,
        enterApp,
        returnToLanding,
        activeModal,
        setActiveModal,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

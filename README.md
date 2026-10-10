# hasha — Nigerian Indigenous Heritage & Contemporary Art Ecosystem

> **Silicon Valley Startup meets High-End African Contemporary Art Gallery** (Lagos's Nike Art Gallery meets a sleek Web3/Fintech aesthetic, inspired by Melius.app).

`hasha` is a production-ready digital ecosystem celebrating Nigerian indigenous art, bronze metallurgy, lost-wax sculptures, heirloom culinary gastronomy, Aso-Oke & Akwete couture, and oral cosmologies across every nation: **Yoruba, Igbo, Hausa, Edo (Bini), Efik & Ibibio, Tiv, Fulani, and Ijaw**.

---

## 🎨 Visual Design Philosophy & Aesthetic
- **Color Palette:**
  - **Obsidian / Charcoal Black** (`#0A0A0C`): Base depth and dark-mode luxury.
  - **Warm Terracotta / Clay** (`#C85A32`): Primary accent honoring Nigerian river clay and Nok pottery.
  - **Burnished Gold / Ochre** (`#D4AF37`): Highlights, auction bids, badges, and royal insignia.
  - **Deep Indigo / Adire Blue** (`#1E2038`): Secondary elements reflecting Yoruba Adire and Kano Kofar Mata indigo pits.
  - **Ivory / Warm Cream** (`#F9F6F0`): High-contrast typography and readability.
- **Typography:**
  - Display Serifs: *Playfair Display* for headers, historical lineages, and royal quotes.
  - Geometric Sans: *Outfit* & *Plus Jakarta Sans* for UI, metrics, and metadata.
- **Melius-Style Micro-Interactions:**
  - Glassmorphic floating navbars (`glass-nav`, `backdrop-blur-md`).
  - Subtle hover zoom and card elevation.
  - Glowing terracotta and gold borders (`glow-terracotta`, `glow-gold`).
  - Confetti fireworks on successful masterpiece publication.

---

## 👥 Dual User Roles & Experiences

### 1. Connoisseurs & Collectors
- **Multifaceted Discovery:** Filter by category (*Paintings & Sculptures*, *Indigenous Fashion*, *Heritage Cuisine & Recipes*, *Folklore & Oral History*) or by ethnic heritage (*Yoruba, Igbo, Hausa, Edo, Efik, Tiv, Fulani, Ijaw*).
- **Interactive Provenance Inspection:** Zoomable high-definition view with verified museum provenance badges.
- **Dynamic Action Flows:**
  - **Live Guild Auctions:** Real-time bidding tracker, minimum increment validation, and bid history.
  - **Direct Acquisitions:** Escrow checkout simulation with Card, Bank Transfer, and USSD modalities.
  - **Bespoke Couture Orders:** Custom tailoring forms for chest, waist, shoulder, height, and fabric choices (e.g. *Aso-Oke Alari*, *Akwete*, *Kano Indigo Damask*).
  - **Culinary Recipe Unlocks:** Full ancestral recipes (e.g., *Smoked Ayamase & Ofada*, *Old Calabar Edikang Ikong*) with sourcing notes and step-by-step guidance.
  - **Sacred Oral Lore Player:** Audio narration player simulation with waveform visualization and traditional chant transcripts.
- **Private Heritage Vault:** Bookmarking, live bid tracking, and cryptographic provenance receipts.

### 2. Indigenous Creators (Guild Masters, Weavers, Chefs, Sculptors)
- **Creator Studio Analytics:**
  - Total Global Impressions (28,490 views)
  - Active Bidding Volume (₦14.2M)
  - Orders & Commissions (12 orders)
  - Available Escrow Balance (₦8,450,000) with **Instant Bank Payout** simulation.
- **7-Step Master Upload Wizard:**
  1. **Media Upload:** High-res image upload with instant preview and preloaded Nigerian cultural presets.
  2. **Metadata & Region:** Title, category, ethnic lineage, and exact Nigerian geographical coordinates (e.g., *Igun Street Bronze Guild, Benin City*).
  3. **Gemma AI Description Enhancer:** Input raw brief notes -> Click *"Enhance with Gemma AI (Strict Fact Preservation)"* -> Backend inference expansion with material details and ceremonial lineage without hallucination -> Side-by-side editable diff review.
  4. **Monetization Mode:** *Showcase Only*, *Fixed Price Sale (₦)*, or *Live Bidding Auction*.
  5. **Authenticity & IP Sign-off:** Mandatory toggle (`100% Human-Crafted & Indigenous` vs `AI-Assisted`) and mandatory IP indemnification sign-off.
  6. **Direct Settlement:** Nigerian NUBAN account number and bank selector (GTBank, Access, Zenith, etc.) with verified name lookup.
  7. **Instant Publication:** Confetti celebration and instant catalog listing in active marketplace feed.

---

## 📂 Modular Architecture

```
hasha/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Floating glassmorphic navigation & role switch pill
│   │   ├── Hero.jsx                 # High-fashion magazine hero with live statistics
│   │   ├── Marketplace.jsx          # Multifaceted filter suite (categories, ethnicities, modes)
│   │   ├── ItemCard.jsx             # Glassmorphism artifact cards with hover effects
│   │   ├── ItemDetailModal.jsx      # High-res zoom, bidding, recipe unlock & oral audio player
│   │   ├── UploadWizardModal.jsx    # 7-step creator wizard with Gemma AI enhancer & diff view
│   │   ├── CreatorDashboard.jsx     # Analytics, balance, payouts & catalog management
│   │   ├── CheckoutModal.jsx        # Simulated Nigerian escrow gateway & provenance certificate
│   │   ├── BespokeDesignModal.jsx   # Custom tailoring measurements & fabric choices
│   │   ├── OnboardingModal.jsx      # Instant role & Nigerian geographical location switch
│   │   ├── CartDrawer.jsx           # Slide-out vault for saved bookmarks, bids, and acquisitions
│   │   ├── CulturalStories.jsx      # Living chronicles of Nigerian metallurgical & textile lore
│   │   └── Footer.jsx               # Cultural directory by ethnicity, newsletter, NCMM homage
│   ├── context/
│   │   └── AppContext.jsx           # Global state manager (roles, catalog, bids, vault, payouts)
│   ├── data/
│   │   └── mockData.js              # Rich authentic Nigerian datasets spanning 8+ ethnicities
│   ├── services/
│   │   └── api.js                   # Dedicated asynchronous backend stubs (Gemma AI, uploads, payments)
│   ├── App.jsx                      # App root with toast notifications and modal orchestration
│   ├── index.css                    # Design system tokens, glassmorphism, and custom animations
│   └── main.jsx                     # Vite entry point
├── package.json
└── vite.config.js
```

---

## 🔌 Backend Integration Readiness (`/src/services/api.js`)

All asynchronous backend operations are centralized in `/src/services/api.js`:
- `geminiEnhanceDescription(rawText, context)`: Stubs the Gemma AI contextual expansion endpoint.
- `uploadArtPiece(formData)`: Stubs cloud asset upload & provenance verification.
- `processPayment(paymentData)`: Stubs payment gateway processing (Paystack / Flutterwave / NIP transfer).
- `placeBid(itemId, bidAmount, bidder)`: Stubs live auction bidding socket / endpoint.
- `requestCustomDesign(requestData)`: Stubs bespoke fashion artisan messaging endpoint.
- `requestPayout(amount, bankDetails)`: Stubs instant bank payout settlement.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser to experience hasha.

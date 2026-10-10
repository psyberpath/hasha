/**
 * hasha Authentic Indigenous Nigerian Mock Dataset
 * Spanning Yoruba, Igbo, Hausa, Edo, Efik, Tiv, Fulani, Ijaw cultures.
 */

export const NIGERIAN_ETHNICITIES = [
  'All Heritages',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Edo (Bini)',
  'Efik & Ibibio',
  'Tiv',
  'Fulani',
  'Ijaw'
];

export const CATEGORIES = [
  { id: 'all', label: 'All Treasures', icon: 'Compass' },
  { id: 'sculptures', label: 'Paintings & Sculptures', icon: 'Palette' },
  { id: 'fashion', label: 'Indigenous Fashion', icon: 'Shirt' },
  { id: 'food', label: 'Heritage Cuisine & Recipes', icon: 'Utensils' },
  { id: 'folklore', label: 'Folklore & Oral History', icon: 'BookOpen' },
];

export const GUILD_PARTNERS = [
  { name: 'Iseyin Aso Ofi Weavers', region: 'Oyo State', specialty: 'Royal Silk-Cotton Looms' },
  { name: 'Benin Bronze Guild', region: 'Edo State', specialty: '14th-Century Lost-Wax Metallurgy' },
  { name: 'Abeokuta Adire Collective', region: 'Ogun State', specialty: 'Elu Leaf Indigo Resistance Dyeing' },
  { name: 'Kano Leather Crafters', region: 'Kano State', specialty: 'Ancient Tanning & Morocco Leather' },
];

export const REVIEWS = [
  {
    quote: "Hasha gave my family's handwoven Aso-Ofi business a digital reach we never thought possible. Orders come in directly, and payments are settled instantly.",
    author: "Pa Gabriel",
    role: "Master Weaver, Oyo State",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Finding authentic Benin bronze replicas with verified cultural history used to be impossible online. Hasha made discovery effortless and genuine.",
    author: "Dr. Amina B.",
    role: "Collector, Lagos",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "I booked an Adire tie-and-dye workshop through Hasha during my visit to Lagos. Learning directly from a master artisan was the highlight of my trip.",
    author: "Tariq E.",
    role: "Cultural Tourist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "It’s refreshing to see a platform that doesn't just sell art, but actively protects the oral stories and heritage behind every piece.",
    author: "Nkechi O.",
    role: "Art Historian, Abuja",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  }
];

export const FAQS = [
  {
    question: "How does Hasha ensure the cultural information is accurate?",
    answer: "Hasha combines artisan-approved knowledge with smart cultural verification models that cross-reference verified heritage archives, ensuring zero fabricated information or misattributed histories."
  },
  {
    question: "How do artisans receive payments for their crafts?",
    answer: "All purchases, auction bids, and tips are processed through our integrated payment system, instantly crediting the artisan’s local bank account safely and directly."
  },
  {
    question: "Can I book live experiences or just physical art?",
    answer: "Both! Hasha allows you to buy original artworks, bid on rare heritage items, or book hands-on craft workshops and virtual cultural tours led directly by master creators."
  },
  {
    question: "Who can sell on Hasha?",
    answer: "Any indigenous artisan, traditional guild, woodcarver, weaver, painter, or storyteller across Nigeria can set up a storefront and start sharing their work with the world."
  }
];

export const INITIAL_ITEMS = [
  {
    id: 'hsh-001',
    title: 'Commemorative Head of Queen Idia (Iyoba)',
    category: 'sculptures',
    ethnicity: 'Edo (Bini)',
    origin: 'Igun Street Bronze Casters Guild, Benin City, Edo State',
    creator: {
      name: 'Osahenrumwen Orobator',
      title: '7th-Generation Master Bronze Caster',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      heritage: 'Edo (Kingdom of Benin)',
      bio: 'Direct descendant of the royal Ine n’Igun bronze casters guild patronized by the Oba of Benin since the 14th century.'
    },
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    description: 'A museum-grade ceremonial bronze head sculpted using the ancient lost-wax (cire-perdue) technique. Portrays Queen Idia, the famed warrior-queen mother of Oba Esigie, adorned with the iconic conical beaded coral headdress (ukpe-okhue) and scarification markings (khalo). Finished with natural beeswax and river clay patination.',
    price: 3850000,
    pricingMode: 'auction',
    currentBid: 4200000,
    startingBid: 3500000,
    bidEndsIn: '14h 22m 10s',
    totalBids: 18,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Benin Bronze', 'Lost-Wax Casting', 'Royal Regalia', '16th Century Lineage'],
    material: 'Bronze, Natural Ochre Patina, River Clay, Beeswax',
    dimensions: '48cm x 26cm x 24cm (11.4kg)',
    viewsCount: 4890,
  },
  {
    id: 'hsh-002',
    title: 'Aso-Oke Alari Monarch Royal Agbada Regalia',
    category: 'fashion',
    ethnicity: 'Yoruba',
    origin: 'Iseyin Master Looms, Oyo State',
    creator: {
      name: 'Morounfolu Alabi & Daughters',
      title: 'Heritage Textile Preservationist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      heritage: 'Yoruba (Oyo Kingdom)',
      bio: 'Dedicated to reviving pre-colonial silk-cotton weaving looms in the historic weaving heartland of Iseyin.'
    },
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-woven Alari (crimson) Aso-Oke crafted from wild cocoon raw silk (Sanyan) and hand-spun organic cotton. Features intricate open-work eyelets (Oniho) and dense gold metallic thread embroidery along the neck and breastplate. Includes the four-piece ensemble: Agbada, Awotele, Sokoto, and matching Fila.',
    price: 680000,
    pricingMode: 'fixed',
    bespokeAvailable: true,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Aso-Oke', 'Iseyin Silk', 'Agbada', 'Yoruba Couture'],
    material: '100% Wild Raw Silk, Hand-Spun Cotton, Gold Filigree Thread',
    dimensions: 'Custom Tailored to Measurements (Bespoke)',
    viewsCount: 3120,
  },
  {
    id: 'hsh-003',
    title: 'Smoked Ayamase & Stone-Ground Ofada Feast',
    category: 'food',
    ethnicity: 'Yoruba',
    origin: 'Ofada Rice Valleys & Abeokuta, Ogun State',
    creator: {
      name: 'Chef Iyabo Adeleke',
      title: 'Indigenous Gastronomy Scholar & Master Cook',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      heritage: 'Yoruba (Egba)',
      bio: 'Documenting centuries-old culinary preservation techniques, wild forest aromatics, and heirloom Nigerian grains.'
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    description: 'The definitive royal preparation of fermented Ofada short-grain rice accompanied by dark green Ayamase (Designer Stew). Prepared with slow-bleached red palm oil, charred green scotch bonnets, fermented locust beans (Iru Woro), smoked catfish, assorted slow-braised offal, and dry crayfish.',
    price: 15000,
    pricingMode: 'recipe',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Heritage Recipe', 'Fermented Locust Beans', 'Ofada Rice', 'Ogun Gastronomy'],
    viewsCount: 6240,
    recipe: {
      prepTime: '45 mins',
      cookTime: '1 hr 30 mins',
      servings: '6 People',
      originStory: 'Ofada rice cultivation dates back to mid-19th century Egba farmers who developed this distinctive unpolished brown grain with high nutritional mineral density. Ayamase stew was traditionally reserved for communal celebratory gatherings in Abeokuta.',
      ingredients: [
        '4 cups authentic unpolished unwashed Ofada Rice from Ogun state',
        '25 fresh Green Scotch Bonnets (Rodo) & 10 Green Bell Peppers',
        '2 large White Onions (finely sliced)',
        '1.5 cups Pure Red Palm Oil (bleached gently until amber clear)',
        '4 tbsp Fermented Locust Beans (Iru Pete / Woro) washed',
        '500g Assorted Meats (Shaki, Abodi, Beef Tendon, Kpomo) boiled tender',
        '200g Smoked Dried Catfish from Niger Delta (deboned)',
        '4 tbsp Sun-dried Crayfish powder from Oron, Akwa Ibom',
        '6 Hard-boiled eggs (deep-fried in the bleached palm oil)',
        'Thaumatococcus daniellii (Ewe Eran) leaves for traditional wrapping'
      ],
      steps: [
        '1. Carefully pick and sort the Ofada rice to remove natural chaff. Wash thoroughly in salted warm water, parboil for 12 minutes, rinse under cold water, and steam gently until tender with its signature earthy perfume.',
        '2. Coarsely pulse the green scotch bonnets, bell peppers, and half the onions in a stone mortar or blender without water. Strain excess vegetable liquid to ensure quick fry reduction.',
        '3. In a heavy-bottom cast iron pot, gently bleach the palm oil on medium-low heat for 12 minutes with the pot covered until translucent. Allow to cool slightly before opening to prevent fumes.',
        '4. Reheat the oil, toss in sliced onions and fermented Iru until the aromatic oils release their rich pungent fragrance.',
        '5. Pour in the coarse pepper blend and fry on medium heat for 25 minutes until the oil floats on top and water evaporates.',
        '6. Add the precooked assorted meats, deboned smoked catfish, crayfish powder, and sea salt. Simmer for 20 minutes so flavors deeply infuse.',
        '7. Gently fold in the fried boiled eggs. Serve piping hot nestled inside fragrant Ewe Eran leaves alongside hot Ofada rice.'
      ],
      sourcingNotes: 'Use authentic brown unpolished Ofada rice from Ogun/Oyo and fresh pungent Iru from local smallholders rather than processed stock cubes.'
    }
  },
  {
    id: 'hsh-004',
    title: 'The Legend of the Seven Odinala Spirits (Chi & Ala)',
    category: 'folklore',
    ethnicity: 'Igbo',
    origin: 'Sacred Oji River Sanctuary, Enugu State',
    creator: {
      name: 'Nze Emeka Okafor',
      title: 'Custodians of Oral Lore (Onye Ozi)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      heritage: 'Igbo (Nri Ancestry)',
      bio: 'Ozo titled elder and archivist of pre-colonial Igbo cosmology, Uli sacred symbology, and oral chants.'
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'An immersive oral and visual chronicle revealing the cosmological balance between Ala (the sacred Earth goddess, mother of moral law) and Chi (the personal divine spark). Featuring ancient Nsibidi ideographic translations and audio chant recordings.',
    price: 0,
    pricingMode: 'showcase',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Odinala Cosmology', 'Oral Heritage', 'Nsibidi Script', 'Sacred Lore'],
    viewsCount: 5120,
    folkloreDetails: {
      narrator: 'Nze Emeka Okafor (Ozo Chinyelugo)',
      duration: '18 mins recorded audio',
      moralCanon: 'Onye kwe, Chi ya ekwe (When a person agrees with their destiny, their divine self consents)',
      transcript: 'In the primordial dawn when Chukwu Abiama breathed light into the cosmos, the earth was not a mere physical soil, but Ala—the living womb of life and judge of human righteousness. Every mortal is endowed with Chi, a unique divine spark entrusted to guide them through the earthly market. This chronicle recounts how a young hunter from Nri sought the counsel of the forest spirits when greed threatened his village river.',
      audioTrackUrl: 'simulated_sacred_flute_and_udu_drum'
    }
  },
  {
    id: 'hsh-005',
    title: 'Nsukka Uli Earth & Indigo Mural on Stretched Linen',
    category: 'sculptures',
    ethnicity: 'Igbo',
    origin: 'Nsukka School of Art, Enugu State',
    creator: {
      name: 'Dr. Chidinma Nwachukwu',
      title: 'Contemporary Uli Revivalist Painter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      heritage: 'Igbo (Nsukka)',
      bio: 'PhD in Indigenous African Art Systems; pioneered the contemporary translation of traditional Igbo wall and body murals onto fine canvas.'
    },
    image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
    description: 'A monumentally scaled painting employing the lyrical, minimalist Uli visual language. Created with natural earth ochre, charcoal soot, and wild Uri fruit extract. The geometric rhythms express Igbo idioms of balance, feminine resilience, and cyclic rebirth.',
    price: 2450000,
    pricingMode: 'fixed',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Uli Art', 'Nsukka School', 'Indigenous Painting', 'Earth Pigments'],
    material: 'Natural Uli Extract, Clay Ochre, Crushed River Charcoal on Heavy Belgian Linen',
    dimensions: '160cm x 120cm (Framed in seasoned Iroko hardwood)',
    viewsCount: 2890,
  },
  {
    id: 'hsh-006',
    title: 'Kano Kofar Mata Indigo-Dyed Babanriga Robe',
    category: 'fashion',
    ethnicity: 'Hausa',
    origin: 'Kofar Mata Dye Pits (Est. 1498), Kano State',
    creator: {
      name: 'Malam Sanusi Danbaba',
      title: 'Doyen of the Kano Indigo Guild',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      heritage: 'Hausa (Kano Emirate)',
      bio: 'Operating the world-famous 500-year-old Kofar Mata indigo dye pits using ash lye and indigenous indigofera tinctoria.'
    },
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    description: 'A grand ceremonial three-piece Babanriga robe, repeatedly hand-dipped 48 times in ancient earthen dye pits for an iridescent metallic deep midnight-blue sheen. Adorned with hand-stitched Aska Biyu (Two Knives) and Tambarin Kano architectural embroidery patterns across the chest.',
    price: 850000,
    pricingMode: 'auction',
    currentBid: 920000,
    startingBid: 780000,
    bidEndsIn: '08h 45m 12s',
    totalBids: 11,
    bespokeAvailable: true,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Kano Indigo', 'Kofar Mata', 'Babanriga', 'Hausa Heritage'],
    material: 'Handwoven Damask dipped in Fermented Indigo Pit, Silk Thread Embroidery',
    dimensions: 'Tailored Grand Silhouette (Floor length)',
    viewsCount: 3950,
  },
  {
    id: 'hsh-007',
    title: 'Ancient Nok Terracotta Head Sculpture (Faithful Guild Cast)',
    category: 'sculptures',
    ethnicity: 'Tiv / Ham',
    origin: 'Kafanchan & Jos Plateau Valley, Kaduna / Plateau State',
    creator: {
      name: 'Terungwa Tyav',
      title: 'Indigenous Ceramic Historian',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      heritage: 'Tiv / Middle Belt',
      bio: 'Specialist in ancient thermal kiln firings, recreating Nigeria’s 500 BC Nok ceramic traditions with local quartz clays.'
    },
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80',
    description: 'A reverent reproduction conforming strictly to Nok archaeological artifacts (circa 500 BCE - 200 CE). Showcases the iconic pierced pupils and nostrils, triangular eyes, stepped elaborate hairdress, and burnished iron-rich red slip. Fired in an open-pit wood-burning kiln.',
    price: 1650000,
    pricingMode: 'fixed',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Nok Culture', 'Terracotta', 'Ancient Nigeria', 'Middle Belt'],
    material: 'Iron-rich River Quartz Clay, Low-fire Pit Wood Fired, Plant Resin Polish',
    dimensions: '38cm x 22cm x 20cm (6.8kg)',
    viewsCount: 4100,
  },
  {
    id: 'hsh-008',
    title: 'Authentic Calabar Edikang Ikong & Periwinkle Pot',
    category: 'food',
    ethnicity: 'Efik & Ibibio',
    origin: 'Marina Road & Henshaw Town, Calabar, Cross River State',
    creator: {
      name: 'Obonganwan Grace Bassey',
      title: 'Matriarch of Efik Royal Culinary Arts',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
      heritage: 'Efik (Kingdom of Calabar)',
      bio: 'Keeper of authentic Efik festive feasts and ceremonial banquets served to the Obong of Calabar.'
    },
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    description: 'The prized sovereign vegetable soup of Old Calabar, celebrated for its rich medicinal and aromatic qualities. Cooked with freshly chopped Waterleaf (Mmeme) and wild fluted pumpkin leaves (Ugwu), loaded with unshelled river periwinkles, smoked bushmeat, cow skin (Kpomo), and dried stockfish.',
    price: 18000,
    pricingMode: 'recipe',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Efik Royalty', 'Edikang Ikong', 'Calabar Heritage', 'Medicinal Cuisine'],
    viewsCount: 4720,
    recipe: {
      prepTime: '40 mins',
      cookTime: '50 mins',
      servings: '8 People',
      originStory: 'Edikang Ikong is a nutrient-dense luxury delicacy originating from Efik nobility. Traditionally prepared during major coronation ceremonies, fattening room (Se gbo) graduations, and wedding festivities in ancient Calabar.',
      ingredients: [
        '6 cups finely shredded fresh Ugwu (Fluted Pumpkin) leaves (air-dried for 1 hr)',
        '3 cups finely chopped Waterleaf (fresh, thoroughly drained)',
        '1.5kg Assorted Meats (Beef, Tripe, Cow leg, Kpomo)',
        '400g Deboned Stockfish (Cod head) soaked in boiling water',
        '250g Dried Smoked Catfish from Calabar River',
        '2 cups Cleaned Periwinkles (cut at tail ends or deshelled)',
        '1.5 cups Oron Crayfish coarsely ground',
        '3 tbsp Yellow Cameroon Pepper ground',
        '1.5 cups Grade-A Pure Cold-Pressed Red Palm Oil',
        'Sea salt to taste (Never use water: the waterleaf produces its own succulent broth)'
      ],
      steps: [
        '1. Season the assorted meats and stockfish with minced shallots, yellow pepper, and sea salt. Simmer in their own natural juices until exceptionally tender and gelatinous.',
        '2. Add the washed dried fish, river periwinkles, and half the ground crayfish into the rich meat reduction. Simmer for 8 minutes.',
        '3. Introduce the chopped waterleaf into the pot. Stir gently and allow to cook for exactly 3 minutes on medium-high heat until it wilts and releases its sweet moisture.',
        '4. Pour in the generous cup of pure red palm oil, remaining ground crayfish, and yellow pepper. Stir well.',
        '5. Immediately fold in the dry shredded Ugwu leaves. Turn off the heat after 2 minutes so the leaves retain their vibrant emerald color and crisp vitamins.',
        '6. Serve hot with pounded yam, Usi (starch), or fufu.'
      ],
      sourcingNotes: 'Authentic Efik Edikang Ikong requires an exact 3:1 ratio of Ugwu to Waterleaf and MUST NOT be cooked with excessive water or artificial flavor enhancers.'
    }
  },
  {
    id: 'hsh-009',
    title: 'The Ekpe Secret Society & Sacred Nsibidi Script',
    category: 'folklore',
    ethnicity: 'Efik & Ibibio',
    origin: 'Creek Town & Arochukwu, Cross River / Abia State',
    creator: {
      name: 'Chief Etim Asuquo',
      title: 'Grand Initiate of the Leopard Society',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      heritage: 'Efik (Ekpe Guild)',
      bio: 'Elder authorized to elucidate the judicial, artistic, and philosophical codes of the ancient indigenous Nsibidi ideographic system.'
    },
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    description: 'An illuminating oral record uncovering the mystical masquerade rites of Ekpe (The Leopard), who maintained civil justice, trade stability, and environmental laws across southeastern Nigeria for centuries before European contact. Includes animated interpretations of sacred Nsibidi signs.',
    price: 0,
    pricingMode: 'showcase',
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Ekpe Society', 'Nsibidi Script', 'Indigenous Writing', 'Leopard Clan'],
    viewsCount: 3880,
    folkloreDetails: {
      narrator: 'Chief Etim Asuquo',
      duration: '15 mins narrated chronicle',
      moralCanon: 'Truth cannot be drowned in the river of deceit; the Leopard sees in total darkness.',
      transcript: 'Long before colonial borders, the Ekpe brotherhood united diverse clans across the Cross River basin through a sacred indigenous hieroglyphic script known as Nsibidi. Inscribed onto calabashes, secret society robes (Ukara), and carved staffs, Nsibidi conveyed judicial sentences, love letters, and sacred treaties through symbols understood only by initiates.',
      audioTrackUrl: 'simulated_ekpe_bell_and_slit_drum'
    }
  },
  {
    id: 'hsh-010',
    title: 'Akwete Hand-Loomed Sacred Diamond Cloth',
    category: 'fashion',
    ethnicity: 'Igbo',
    origin: 'Akwete Weaving Enclave, Ukwa East, Abia State',
    creator: {
      name: 'Madam Ugochi Nwosu',
      title: 'Grand Master of the Akwete Weavers Union',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      heritage: 'Igbo (Ndoki)',
      bio: 'Preserving the matrilineal vertical loom techniques invented by legendary 19th-century weaver Dada Nwakata.'
    },
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    description: 'An authentic Akwete ceremonial textile woven on traditional indigenous vertical wooden frames. Features Dada Nwakata’s signature geometric diamond (Ikaki - Tortoise) motif symbolizing resilience, longevity, and wisdom. Double-faced weave allowing it to be worn interchangeably on either side.',
    price: 520000,
    pricingMode: 'fixed',
    bespokeAvailable: true,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Akwete Cloth', 'Igbo Weaving', 'Dada Nwakata', 'Ndoki Heritage'],
    material: 'Natural Mercerized Cotton, Sisal Fiber Accents, Natural Plant Dyes',
    dimensions: 'Two 2.5-yard wrappers with fringed borders',
    viewsCount: 2740,
  },
  {
    id: 'hsh-011',
    title: 'Tiv A’anger Traditional Striped Black & White Regalia',
    category: 'fashion',
    ethnicity: 'Tiv',
    origin: 'Gboko, Benue State',
    creator: {
      name: 'Aondona Iorbee',
      title: 'Tiv Cultural Heritage Weaver',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
      heritage: 'Tiv (Benue Valley)',
      bio: 'Weaving the sacred black and white identity cloth of the Tiv people in the historical capital of Gboko.'
    },
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    description: 'The iconic A’anger handwoven textile composed of alternating stark black and white woven bands. The black represents the somber trials and history of the Tiv nation, while the white symbolizes peace, goodwill, and moral clarity. Can be worn as a traditional shoulder drape or fashioned into bespoke modern suiting.',
    price: 340000,
    pricingMode: 'fixed',
    bespokeAvailable: true,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['A’anger', 'Tiv Nation', 'Benue Valley', 'Striped Weave'],
    material: '100% Hand-Grown Benue Organic Cotton, Carbon Black & Bleached White Yarns',
    dimensions: '3-piece Ceremonial Toga Ensemble',
    viewsCount: 2210,
  },
  {
    id: 'hsh-012',
    title: 'Ijaw Water Goddess (Mami Wata) Festival Headdress',
    category: 'sculptures',
    ethnicity: 'Ijaw',
    origin: 'Nembe & Brass Creek, Bayelsa State',
    creator: {
      name: 'Tariere Diete-Spiff',
      title: 'Master Riverine Wood Sculptor',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      heritage: 'Ijaw (Niger Delta)',
      bio: 'Carving sacred masquerades and water spirit headdresses for annual Ijaw river regattas and water spirit festivals.'
    },
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-carved from seasoned sacred Obeche river wood and polychromed with mineral chalk and natural ochres. Represents Owu-Aru-Sun, the guardian water deities of the Niger Delta who control river navigation, abundant fish harvests, and tidal prosperity.',
    price: 1980000,
    pricingMode: 'auction',
    currentBid: 2150000,
    startingBid: 1800000,
    bidEndsIn: '22h 10m 05s',
    totalBids: 14,
    isAiGenerated: false,
    verificationStatus: '100% Indigenous Human-Crafted',
    verifiedProvenance: true,
    tags: ['Ijaw Masquerade', 'River Spirit', 'Owu-Aru-Sun', 'Niger Delta'],
    material: 'Seasoned Obeche Wood, River Kaolin Chalk, Cowrie Shell Inlays',
    dimensions: '62cm x 30cm x 28cm (4.2kg)',
    viewsCount: 3340,
  }
];

export const HERO_STATS = [
  { value: '1,240+', label: 'Indigenous Masters & Guilds' },
  { value: '₦48.6M', label: 'Direct Creator Payouts' },
  { value: '36', label: 'Ethnic Cultures Documented' },
  { value: '99.4%', label: 'Provenance Verified' },
];

export const CULTURAL_STORIES = [
  {
    title: 'The Lost-Wax Secrets of Benin',
    subtitle: '600 Years of Royal Guild Metallurgy',
    culture: 'Edo (Bini)',
    snippet: 'How the Igun Street bronze casters perfected alloy ratios centuries ahead of Renaissance Europe.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Kofar Mata: World’s Oldest Dye Pits',
    subtitle: 'Continuous Fermentation Since 1498',
    culture: 'Hausa',
    snippet: 'Discover the natural chemistry behind Kano’s legendary metallic blue fabrics coveted across the Sahara.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Nsibidi: The Unspoken Hieroglyphs',
    subtitle: 'Pre-Colonial Indigenous Writing',
    culture: 'Efik / Igbo',
    snippet: 'The secret symbols carved on masks and textiles used by the Ekpe judicial society.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  }
];

export const NIGERIAN_BANKS = [
  'Access Bank Nigeria',
  'Zenith Bank Plc',
  'Guaranty Trust Bank (GTCO)',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Fidelity Bank',
  'Stanbic IBTC Bank',
  'Kuda Microfinance Bank',
  'Moniepoint Microfinance Bank',
  'OPay Digital Services'
];

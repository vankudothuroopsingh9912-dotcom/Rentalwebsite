export interface SeedProduct {
  _id: string;
  name: string;
  category: 'Furniture' | 'Home Appliances' | 'Electronics' | 'Office Equipment' | 'Kitchen Appliances';
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  images: string[];
  availability: boolean;
  stock: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  specs: Record<string, string>;
  brand: string;
  createdAt?: string;
}

export const initialProducts: SeedProduct[] = [
  // --- FURNITURE ---
  {
    _id: "prod-f-001",
    name: "Nordic Haven L-Shaped Sectional Sofa",
    category: "Furniture",
    description: "Ultra-plush 4-seater modular sectional sofa wrapped in stain-resistant performance linen. Engineered with high-resilience foam and a reinforced solid kiln-dried eucalyptus frame for unparalleled lounging comfort.",
    pricePerMonth: 45,
    securityDeposit: 90,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 8,
    rating: 4.9,
    reviewsCount: 42,
    features: [
      "Water-repellent stain-resistant linen fabric",
      "Reversible chaise configuration (Left or Right)",
      "Deep 38\" seats with high-density memory cushions",
      "Solid beech wood tapered legs in natural finish"
    ],
    specs: {
      "Dimensions": "104\" W x 65\" D x 34\" H",
      "Seating Capacity": "4 Persons",
      "Color": "Slate Oatmeal",
      "Assembly": "Complimentary doorstep setup included"
    },
    brand: "Nordic Living"
  },
  {
    _id: "prod-f-002",
    name: "Aura King Size Solid Teak Bed with Ortho-Mattress",
    category: "Furniture",
    description: "Premium king-sized platform bed crafted from sustainably harvested solid teak wood. Includes a complimentary 8-inch dual-comfort orthopedic memory foam mattress with hypoallergenic bamboo cover.",
    pricePerMonth: 55,
    securityDeposit: 110,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 5,
    rating: 4.8,
    reviewsCount: 38,
    features: [
      "Solid plantation teak with matte natural grain sealer",
      "No-squeak engineered slat support system",
      "Includes 8\" orthopedic memory foam mattress",
      "Integrated recessed headboard shelf"
    ],
    specs: {
      "Bed Dimensions": "78\" W x 84\" L x 42\" H",
      "Mattress Size": "Standard King (76\" x 80\")",
      "Weight Capacity": "850 lbs",
      "Care": "Sanitized and deep-cleaned prior to every dispatch"
    },
    brand: "TimberCraft"
  },
  {
    _id: "prod-f-003",
    name: "Kyoto Minimalist 6-Seater Oak Dining Table Set",
    category: "Furniture",
    description: "Japandi-inspired dining ensemble featuring a 72-inch solid white oak dining table accompanied by 4 sculpted dining chairs and a matching upholstered companion bench.",
    pricePerMonth: 38,
    securityDeposit: 75,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 6,
    rating: 4.7,
    reviewsCount: 29,
    features: [
      "Solid European white oak construction",
      "Curved ergonomic backrests on all chairs",
      "Scratch and heat-resistant matte polyurethane finish",
      "Includes 1 Table, 4 Chairs, and 1 Bench"
    ],
    specs: {
      "Table Size": "72\" L x 36\" W x 30\" H",
      "Seating": "Seats 6 comfortably",
      "Finish": "Natural White Oak",
      "Maintenance": "Wipe clean with damp cloth"
    },
    brand: "Kyoto Living"
  },
  {
    _id: "prod-f-004",
    name: "Mid-Century Modern Velvet Accent Swivel Armchair",
    category: "Furniture",
    description: "Iconic architectural accent armchair finished in rich peacock velvet with 360-degree silent brass swivel mechanism. Ideal for reading nooks, executive lounges, and modern living rooms.",
    pricePerMonth: 22,
    securityDeposit: 45,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 12,
    rating: 4.9,
    reviewsCount: 19,
    features: [
      "Ultra-soft jewel-toned velvet upholstery",
      "High-density injection-molded foam core",
      "Heavy-gauge brushed brass steel swivel base",
      "Ergonomic barrel backrest contour"
    ],
    specs: {
      "Dimensions": "31\" W x 32\" D x 31\" H",
      "Weight Capacity": "300 lbs",
      "Swivel": "Full 360-degree smooth bearing rotation"
    },
    brand: "LuxeAtelier"
  },

  // --- HOME APPLIANCES ---
  {
    _id: "prod-ha-001",
    name: "Samsung 415L Double Door Frost-Free Refrigerator",
    category: "Home Appliances",
    description: "Spacious inverter double-door refrigerator featuring Twin Cooling Plus technology, digital inverter compressor with 5 conversion modes, and deodorizing air filter for prolonged food freshness.",
    pricePerMonth: 32,
    securityDeposit: 65,
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 10,
    rating: 4.8,
    reviewsCount: 54,
    features: [
      "Twin Cooling Plus independent evaporator coils",
      "5-in-1 convertible smart freezer modes",
      "Energy Star 5-Star high efficiency rating",
      "Toughened glass shelves rated up to 175 kg"
    ],
    specs: {
      "Capacity": "415 Liters (105L Freezer, 310L Fresh)",
      "Energy Consumption": "Low Noise (<38dB)",
      "Finish": "Refined Inox Metallic Silver",
      "Warranty & Service": "Full coverage & on-site repair included"
    },
    brand: "Samsung"
  },
  {
    _id: "prod-ha-002",
    name: "LG 8.0 kg AI Direct Drive Front Load Washing Machine",
    category: "Home Appliances",
    description: "Next-generation front load washer equipped with AI DD fabric sensory intelligence, steam allergy-care cycle, and TurboWash 360 for high-efficiency laundry with minimum water consumption.",
    pricePerMonth: 29,
    securityDeposit: 60,
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 9,
    rating: 4.9,
    reviewsCount: 61,
    features: [
      "AI DD fabric sensor optimizes wash motion",
      "Steam cycle removes 99.9% of allergens and mites",
      "1400 RPM spin speed for fast drying",
      "SmartThinQ Wi-Fi mobile control"
    ],
    specs: {
      "Capacity": "8.0 kg Wash Load",
      "Drum": "Stainless Steel embossed drum",
      "Energy Rating": "5-Star A+++ Energy Efficient",
      "Inclusions": "Inlet and drain pipes + tap adapters included"
    },
    brand: "LG Electronics"
  },
  {
    _id: "prod-ha-003",
    name: "Daikin 1.5 Ton 5-Star Inverter Split Air Conditioner",
    category: "Home Appliances",
    description: "Whisper-quiet inverter AC engineered with 3D airflow, PM 2.5 air purification filter, and Coanda airflow technology for rapid, uniform cooling without direct harsh drafts.",
    pricePerMonth: 36,
    securityDeposit: 70,
    images: [
      "https://images.unsplash.com/photo-1614633833026-0e20557e0c46?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 7,
    rating: 4.7,
    reviewsCount: 47,
    features: [
      "100% Copper condenser with anti-corrosion coating",
      "Coanda airflow avoids harsh direct blast on occupants",
      "Econo mode & quiet sleep mode at just 19 dB",
      "Complimentary standard installation & copper piping"
    ],
    specs: {
      "Cooling Capacity": "5280 Watts (Suitable for up to 180 sq.ft)",
      "Refrigerant": "Eco-friendly R32",
      "Energy Rating": "5-Star ISEER 5.2",
      "Service": "Seasonal filter servicing included"
    },
    brand: "Daikin"
  },
  {
    _id: "prod-ha-004",
    name: "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    category: "Home Appliances",
    description: "Ultra-lightweight cordless stick vacuum engineered with illuminated laser dust reveal head, piezo sensor particle counter, and whole-machine HEPA filtration capturing 99.99% of microscopic particles.",
    pricePerMonth: 25,
    securityDeposit: 50,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 14,
    rating: 4.9,
    reviewsCount: 33,
    features: [
      "Laser precisely highlights invisible dust on hard floors",
      "Up to 60 minutes fade-free suction runtime",
      "Piezo sensor calculates particle count on LCD screen",
      "Hair screw tool cleans pet hair without tangles"
    ],
    specs: {
      "Weight": "2.2 kg ultra-light",
      "Suction Power": "150 Air Watts",
      "Bin Volume": "0.35 Liters hygienic one-touch ejection",
      "Batteries": "Quick-click swappable battery pack"
    },
    brand: "Dyson"
  },

  // --- ELECTRONICS ---
  {
    _id: "prod-el-001",
    name: "LG C3 55-Inch 4K OLED evo Smart Cinema TV",
    category: "Electronics",
    description: "The gold standard in home cinema and next-gen gaming. Features α9 AI Processor Gen6, infinite contrast, Dolby Vision IQ, Dolby Atmos, and native 120Hz refresh rate with 0.1ms response time.",
    pricePerMonth: 49,
    securityDeposit: 100,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 6,
    rating: 5.0,
    reviewsCount: 78,
    features: [
      "Self-lit OLED evo pixels with 100% color fidelity",
      "4x HDMI 2.1 ports supporting 4K 120Hz & VRR / G-Sync",
      "Dolby Vision IQ + Dolby Atmos immersive audio",
      "Includes table stand & optional low-profile wall bracket"
    ],
    specs: {
      "Screen Size": "55-inch Diagonal",
      "Resolution": "3840 x 2160 UHD",
      "Audio": "40W 2.2 Channel Down-firing",
      "Smart OS": "webOS 23 with Apple AirPlay & Chromecast"
    },
    brand: "LG Electronics"
  },
  {
    _id: "prod-el-002",
    name: "Apple MacBook Pro 16\" (M3 Pro, 36GB, 512GB)",
    category: "Electronics",
    description: "Powerhouse workstation laptop built for software engineers, designers, and video editors. Features Liquid Retina XDR display, up to 22 hours battery life, and blazing fast Apple Silicon performance.",
    pricePerMonth: 89,
    securityDeposit: 180,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 8,
    rating: 4.9,
    reviewsCount: 52,
    features: [
      "Apple M3 Pro chip with 12-core CPU & 18-core GPU",
      "36GB unified memory for heavy multitasking",
      "16.2\" Liquid Retina XDR (1000 nits sustained, 120Hz ProMotion)",
      "Six-speaker sound system with force-cancelling woofers"
    ],
    specs: {
      "Processor": "Apple M3 Pro",
      "Memory & Storage": "36GB RAM / 512GB High-speed NVMe SSD",
      "Battery": "Up to 22 hours video playback",
      "Accessories": "Original MagSafe 140W fast charger included"
    },
    brand: "Apple"
  },
  {
    _id: "prod-el-003",
    name: "Sony PlayStation 5 Console with DualSense Extra Controller",
    category: "Electronics",
    description: "Next-generation gaming console featuring ultra-high speed SSD, ray tracing, haptic feedback triggers, and 3D audio. Includes two wireless DualSense controllers and pre-installed Astro's Playroom.",
    pricePerMonth: 38,
    securityDeposit: 80,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 11,
    rating: 4.9,
    reviewsCount: 89,
    features: [
      "825GB ultra-high speed custom SSD",
      "Includes 2x DualSense Wireless Controllers",
      "Supports 4K 120Hz gaming and 8K output",
      "Tempest 3D AudioTech support"
    ],
    specs: {
      "Model": "Disc Edition PS5",
      "Cables Included": "High-Speed HDMI 2.1, Power, USB-C",
      "Support": "Immediate replacement for hardware issues"
    },
    brand: "Sony"
  },
  {
    _id: "prod-el-004",
    name: "Dell UltraSharp 34\" Curved USB-C Hub Monitor (U3423WE)",
    category: "Electronics",
    description: "Productivity beast with IPS Black technology delivering 2000:1 contrast ratio, integrated 90W USB-C power delivery, built-in KVM switch, and RJ45 Ethernet hub for single-cable desk connectivity.",
    pricePerMonth: 34,
    securityDeposit: 70,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 7,
    rating: 4.8,
    reviewsCount: 26,
    features: [
      "WQHD 3440 x 1440 immersive 1900R curvature",
      "IPS Black technology with 2000:1 deep contrast",
      "90W USB-C charging for laptops while transmitting video",
      "Picture-by-Picture (PBP) and Picture-in-Picture (PIP)"
    ],
    specs: {
      "Screen Aspect": "21:9 Ultrawide",
      "Color Accuracy": "98% DCI-P3 & Delta E < 2",
      "Connectivity": "USB-C, 2x DP 1.4, 2x HDMI 2.1, 4x USB 3.2, LAN",
      "Ergonomics": "Height, tilt, and swivel adjustable"
    },
    brand: "Dell"
  },

  // --- OFFICE EQUIPMENT ---
  {
    _id: "prod-oe-001",
    name: "ErgoPro Dual-Motor Motorized Standing Desk (60\" x 30\")",
    category: "Office Equipment",
    description: "Heavy-duty electric height-adjustable sit-stand desk equipped with dual German-engineered motors, 4 programmable memory presets, anti-collision sensor, and a solid walnut bevelled desktop.",
    pricePerMonth: 28,
    securityDeposit: 55,
    images: [
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 15,
    rating: 4.9,
    reviewsCount: 64,
    features: [
      "Quiet dual-motor lift mechanism (<45 dB)",
      "Height adjustment range: 25.5\" to 51.2\"",
      "4-key LED memory preset control pad",
      "Under-desk cable management tray and dual grommets"
    ],
    specs: {
      "Desktop Surface": "60\" Length x 30\" Depth (1\" Solid Walnut)",
      "Lifting Capacity": "300 lbs (136 kg)",
      "Frame Material": "Industrial-grade reinforced rolled steel",
      "Setup": "Free white-glove on-site assembly"
    },
    brand: "ErgoDesk"
  },
  {
    _id: "prod-oe-002",
    name: "Herman Miller Aeron Ergonomic Task Chair (Size B)",
    category: "Office Equipment",
    description: "The world's most acclaimed ergonomic office chair. Featuring breathable 8Z Pellicle suspension mesh, adjustable PostureFit SL sacral-lumbar support, and fully articulated 4D armrests.",
    pricePerMonth: 42,
    securityDeposit: 85,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 12,
    rating: 5.0,
    reviewsCount: 110,
    features: [
      "PostureFit SL stabilizes the base of the spine",
      "Harmonic 2 tilt provides natural, balanced movement",
      "Breathable 8Z Pellicle elastomeric mesh relieves pressure",
      "Fully adjustable 4D armrests (height, angle, depth)"
    ],
    specs: {
      "Size": "Medium (Size B fits 92% of users)",
      "Weight Capacity": "350 lbs",
      "Color": "Mineral / Polished Aluminum Chassis",
      "Certification": "BIFMA Level 3 & Cradle to Cradle Silver"
    },
    brand: "Herman Miller"
  },
  {
    _id: "prod-oe-003",
    name: "HP LaserJet Pro Dual-Band Wireless Multifunction Printer",
    category: "Office Equipment",
    description: "High-volume office workhorse capable of automatic two-sided printing, ultra-crisp monochrome laser documents at 40 ppm, 50-sheet auto document feeder (ADF), and instant mobile Wi-Fi printing.",
    pricePerMonth: 20,
    securityDeposit: 40,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 8,
    rating: 4.6,
    reviewsCount: 22,
    features: [
      "Blazing print speed up to 40 pages per minute",
      "Auto 2-sided duplex printing, scanning, and copying",
      "Dual-band Wi-Fi with self-healing reconnection",
      "Comes preloaded with high-yield original toner"
    ],
    specs: {
      "Paper Tray Capacity": "250-Sheet standard tray + 100-sheet multipurpose",
      "Resolution": "Fine Lines (1200 x 1200 dpi)",
      "Duty Cycle": "Up to 80,000 pages monthly",
      "Cartridge Support": "Free cartridge replacement after 3 months rental"
    },
    brand: "HP"
  },

  // --- KITCHEN APPLIANCES ---
  {
    _id: "prod-ka-001",
    name: "Breville Barista Touch Impress Espresso Machine",
    category: "Kitchen Appliances",
    description: "Cafe-quality espresso in your kitchen. Automated touchscreen guide with real-time feedback, assisted tamp lever with 10kg calibrated pressure, and ThermoJet 3-second rapid heating system.",
    pricePerMonth: 38,
    securityDeposit: 80,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebd02ae4a43?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534687941688-6a1ea67c53be?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 6,
    rating: 4.9,
    reviewsCount: 37,
    features: [
      "Color intuitive touchscreen with pre-programmed cafe favorites",
      "Assisted tamping delivers 10kg impression with a 7º barista twist",
      "Auto MilQ hands-free microfoam texturing with oat & dairy presets",
      "ThermoJet heating achieves optimal extraction in 3 seconds"
    ],
    specs: {
      "Water Tank": "2.0 Liter removable reservoir",
      "Bean Hopper": "340g airtight hopper with hardened steel burrs",
      "Pressure": "15 Bar Italian pump with 9 bar pre-infusion",
      "Included Accessories": "54mm stainless portafilter, 480ml milk jug, cleaning kit"
    },
    brand: "Breville"
  },
  {
    _id: "prod-ka-002",
    name: "LG 32L Charcoal Smart Convection Microwave Oven",
    category: "Kitchen Appliances",
    description: "Versatile culinary powerhouse featuring Charcoal Lighting Heater for authentic tandoori and BBQ cooking, diet fry mode, Indian roti basket, and pasteurized milk boiling capability.",
    pricePerMonth: 18,
    securityDeposit: 35,
    images: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 10,
    rating: 4.7,
    reviewsCount: 45,
    features: [
      "Charcoal Lighting Heater maintains juicy interior with crisp crust",
      "Diet Fry feature requires up to 88% less oil",
      "Stainless steel anti-bacterial cavity for effortless wiping",
      "Over 401 auto-cook menus included"
    ],
    specs: {
      "Cavity Volume": "32 Liters",
      "Power": "Convection 2500W / Grill 1200W / Micro 900W",
      "Rotisserie": "Motorized 360-degree skewer rack included"
    },
    brand: "LG Electronics"
  },
  {
    _id: "prod-ka-003",
    name: "Ninja Foodi 8-in-1 DualZone 10-Quart Air Fryer XL",
    category: "Kitchen Appliances",
    description: "The 2-basket air fryer that lets you cook 2 foods, 2 different ways, finishing at the exact same time. Features Smart Finish, Match Cook, and 8 versatile cooking functions.",
    pricePerMonth: 16,
    securityDeposit: 30,
    images: [
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80"
    ],
    availability: true,
    stock: 14,
    rating: 4.8,
    reviewsCount: 50,
    features: [
      "DualZone technology with 2 independent 5-quart cooking baskets",
      "Smart Finish syncs disparate cook times for simultaneous completion",
      "8 Functions: Air Fry, Broil, Roast, Bake, Reheat, Dehydrate & more",
      "Dishwasher-safe nonstick crisper plates"
    ],
    specs: {
      "Total Capacity": "10 Quarts (Fits 2 whole 5-lb chickens)",
      "Temperature Range": "105°F to 450°F",
      "Power": "1690 Watts",
      "Finish": "Brushed Stainless Steel & Matte Black"
    },
    brand: "Ninja"
  }
];

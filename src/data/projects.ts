import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'sayba-orchid',
    name: 'Sayba Orchid',
    slug: 'sayba-orchid',
    location: 'Kurla West, Mumbai',
    city: 'Mumbai',
    address: 'Near LBS Marg, Kurla West, Mumbai, Maharashtra 400070',
    status: 'Ongoing',
    configuration: '2 & 3 BHK Residences',
    carpetAreaRange: '750 sq.ft. - 1180 sq.ft.',
    priceRange: '₹ 1.65 Cr - ₹ 2.45 Cr',
    possessionDate: 'December 2025',
    reraNumber: 'P51800034982',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Orchid - Grand Elevation at Twilight' },
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', caption: 'Dramatic Architectural Facade with Green Landscaping' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Expansive Living & Dining Hall with Imported Marble' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', caption: 'Master Bedroom Suite with City Balcony' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80', caption: 'Temperature-Controlled Infinity Swimming Pool' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', caption: 'Modern Technogym Fitness Studio' },
      { category: 'Lifestyle', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80', caption: 'Zen Podium Walking Trails and Manicured Lawns' },
      { category: 'Lifestyle', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Double-Height Grand Entrance Lobby' }
    ],
    tagline: 'Elegance Redefined in the Heart of the City',
    description: 'Sayba Orchid is a premium residential project designed for modern urban living. With thoughtfully planned homes, world-class amenities and excellent connectivity, it offers the perfect blend of comfort, convenience and elegance.',
    highlights: [
      'Premium 2 & 3 BHK Residences',
      'Modern Lifestyle Amenities',
      'Excellent Connectivity to BKC & Airport',
      'Trusted by 1000+ Happy Families',
      'Vastu Compliant Architectural Layouts',
      'High-Speed Elevators & Grand Entrance Lobby'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: "Children's Play Area", icon: 'Smile' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '2 BHK Premium',
        bhk: '2 BHK',
        carpetArea: '750 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Spacious 2 BHK home with optimized layout, master bedroom with en-suite bath, modern kitchen, and scenic city balcony.'
      },
      {
        type: '3 BHK Royale',
        bhk: '3 BHK',
        carpetArea: '1,120 sq.ft.',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        description: 'Expansive 3 BHK residence with lavish living-dining area, panoramic private deck, modular kitchen, and luxury fittings.'
      }
    ],
    locationPoints: [
      { name: 'Bandra Kurla Complex (BKC)', distance: '10 Mins', category: 'Business Hub' },
      { name: 'Chhatrapati Shivaji Maharaj Airport', distance: '15 Mins', category: 'Transit' },
      { name: 'Phoenix Marketcity Mall', distance: '5 Mins', category: 'Shopping' },
      { name: 'Dhirubhai Ambani International School', distance: '12 Mins', category: 'Education' },
      { name: 'Asian Heart Institute', distance: '12 Mins', category: 'Healthcare' }
    ]
  },
  {
    id: 'sayba-heights',
    name: 'Sayba Heights',
    slug: 'sayba-heights',
    location: 'Bandra East, Mumbai',
    city: 'Mumbai',
    address: 'Near Kalanagar, Bandra East, Mumbai, Maharashtra 400051',
    status: 'Completed',
    configuration: '1, 2 & 3 BHK Residences',
    carpetAreaRange: '520 sq.ft. - 1050 sq.ft.',
    priceRange: '₹ 1.25 Cr - ₹ 2.85 Cr',
    possessionDate: 'Ready to Move',
    reraNumber: 'P51800028714',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Heights - High-Rise Architectural Landmark' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', caption: 'Luxury Living Area with Full Height Glass' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', caption: 'Modular Chef Kitchen with Quartz Counters' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', caption: 'Sky Lounge with 360° Skyline Views' }
    ],
    tagline: 'High-Rise Luxury Near Mumbai’s Financial Core',
    description: 'Sayba Heights stands as an iconic 22-storey architectural landmark in Bandra East, offering residents seamless access to BKC, fine dining, and international business hubs with unmatched rooftop amenities.',
    highlights: [
      '1, 2 & 3 BHK Smartly Designed Residences',
      'Sky Lounge with 360° Skyline Views',
      'Ready to Move with Full OC Received',
      'Double Height Air-Conditioned Entrance Lobby',
      'Eco-Friendly Solar Lighting & Rainwater Harvesting'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: 'Indoor Games', icon: 'Gamepad2' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '1 BHK Smart',
        bhk: '1 BHK',
        carpetArea: '520 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Intelligently designed 1 BHK with separate living and dining zones, powder room, and full-length picture windows.'
      },
      {
        type: '2 BHK Deluxe',
        bhk: '2 BHK',
        carpetArea: '780 sq.ft.',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        description: 'Bright and airy 2 BHK with cross-ventilation, master suite, utility balcony, and premium Italian marble flooring.'
      }
    ],
    locationPoints: [
      { name: 'BKC Financial District', distance: '3 Mins', category: 'Business Hub' },
      { name: 'Western Express Highway', distance: '2 Mins', category: 'Transit' },
      { name: 'Bandra Railway Station', distance: '8 Mins', category: 'Transit' },
      { name: 'Lilavati Hospital', distance: '10 Mins', category: 'Healthcare' }
    ]
  },
  {
    id: 'sayba-residency',
    name: 'Sayba Residency',
    slug: 'sayba-residency',
    location: 'Chembur, Mumbai',
    city: 'Mumbai',
    address: 'Central Avenue Road, Chembur, Mumbai, Maharashtra 400071',
    status: 'Upcoming',
    configuration: '2 BHK Residences',
    carpetAreaRange: '680 sq.ft. - 820 sq.ft.',
    priceRange: '₹ 1.40 Cr - ₹ 1.95 Cr',
    possessionDate: 'June 2026',
    reraNumber: 'P51800041209',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Residency - Contemporary Elevation' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80', caption: 'Airy Living Space with Timber Accents' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', caption: 'Community Leisure Courtyard' }
    ],
    tagline: 'Serene Green Living with Flawless Connectivity',
    description: 'Nestled in the lush, leafy avenues of Chembur, Sayba Residency brings you calm, tranquil living just moments away from the Eastern Freeway and Santa Cruz-Chembur Link Road.',
    highlights: [
      'Exclusively Crafted 2 BHK Residences',
      'Lush Central Courtyard & Reflexology Path',
      'Electric Vehicle Charging Stations',
      'Pre-certified IGBC Green Building',
      'State-of-the-Art Multi-Tier Security'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: "Children's Play Area", icon: 'Smile' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '2 BHK Comfort',
        bhk: '2 BHK',
        carpetArea: '680 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Ergonomic 2 BHK layout designed to maximize natural lighting, with smart storage alcoves and dedicated laundry space.'
      }
    ],
    locationPoints: [
      { name: 'Eastern Freeway', distance: '4 Mins', category: 'Transit' },
      { name: 'SCLR Junction', distance: '6 Mins', category: 'Transit' },
      { name: 'Bombay Presidency Golf Club', distance: '5 Mins', category: 'Recreation' },
      { name: 'Surana Sethia Hospital', distance: '7 Mins', category: 'Healthcare' }
    ]
  },
  {
    id: 'sayba-enclave',
    name: 'Sayba Enclave',
    slug: 'sayba-enclave',
    location: 'Ghatkopar East, Mumbai',
    city: 'Mumbai',
    address: 'Near Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075',
    status: 'Ongoing',
    configuration: '2 & 3 BHK Residences',
    carpetAreaRange: '720 sq.ft. - 1150 sq.ft.',
    priceRange: '₹ 1.55 Cr - ₹ 2.30 Cr',
    possessionDate: 'March 2026',
    reraNumber: 'P51800039845',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Enclave - Grand Modern Elevation' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80', caption: 'Master Suite with Acoustic Glass' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Grand Clubhouse Reception Lounge' }
    ],
    tagline: 'Modern Community Living with Unmatched Connectivity',
    description: 'Sayba Enclave is a gated residential sanctuary in Ghatkopar East, offering spacious multi-bedroom apartments complemented by high-tech security and premium family-centric amenities.',
    highlights: [
      'Luxurious 2 & 3 BHK Gated Enclave',
      'Walking Distance to Metro & Railway Stations',
      'Designer Podium Garden & Kids Zone',
      'Equipped Gymnasium and Indoor Badminton Court',
      'Covered Multi-Level Automated Parking'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: 'Indoor Games', icon: 'Gamepad2' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '2 BHK Grande',
        bhk: '2 BHK',
        carpetArea: '720 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Contemporary 2 BHK home featuring double-glazed acoustic windows and imported sanitary ware.'
      },
      {
        type: '3 BHK Elite',
        bhk: '3 BHK',
        carpetArea: '1,150 sq.ft.',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        description: 'Prestige 3 BHK with 3 luxury bathrooms, expansive dining room, and unobstructed eastern sunrise vistas.'
      }
    ],
    locationPoints: [
      { name: 'Ghatkopar Metro Station', distance: '3 Mins', category: 'Transit' },
      { name: 'R City Mall', distance: '8 Mins', category: 'Shopping' },
      { name: 'Eastern Express Highway', distance: '2 Mins', category: 'Transit' },
      { name: 'Somaiya Vidyavihar Campus', distance: '5 Mins', category: 'Education' }
    ]
  },
  {
    id: 'sayba-greens',
    name: 'Sayba Greens',
    slug: 'sayba-greens',
    location: 'Panvel, Navi Mumbai',
    city: 'Mumbai',
    address: 'Near Old Mumbai-Pune Highway, Panvel, Navi Mumbai 410206',
    status: 'Ongoing',
    configuration: 'Premium Villas',
    carpetAreaRange: '1,800 sq.ft. - 3,200 sq.ft.',
    priceRange: '₹ 2.80 Cr - ₹ 4.50 Cr',
    possessionDate: 'October 2026',
    reraNumber: 'P52000051280',
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Greens - Private Villa Sunset Elevation' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', caption: 'Lavish High-Ceiling Villa Living Pavilion' },
      { category: 'Lifestyle', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Private Sundeck and Manicured Lawn' }
    ],
    tagline: 'Exclusive Villa Living Surrounded by Pristine Nature',
    description: 'Sayba Greens presents ultra-luxury independent and semi-detached villas surrounded by the Sahyadri hills, private lawns, infinity plunge pools, and private terrace gazebos.',
    highlights: [
      'Exclusive 3 & 4 BHK Private Garden Villas',
      'Private Splash Pool & Sundeck Options',
      'Close proximity to Navi Mumbai International Airport',
      'Over 60% Dedicated Open Green Spaces',
      'Private Clubhouse with Tennis & Squash Courts'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: 'Tennis Court', icon: 'Trophy' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '3 BHK Villa Grande',
        bhk: '3 BHK Villa',
        carpetArea: '1,850 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Triplex villa with private ground garden, spacious bedrooms, and upper family entertainment lounge.'
      },
      {
        type: '4 BHK Imperial Villa',
        bhk: '4 BHK Villa',
        carpetArea: '3,100 sq.ft.',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        description: 'Custom estate villa featuring double-height ceiling, private elevator shaft, plunge pool, and rooftop cabana.'
      }
    ],
    locationPoints: [
      { name: 'Navi Mumbai International Airport (NMIA)', distance: '15 Mins', category: 'Transit' },
      { name: 'Mumbai-Pune Expressway', distance: '5 Mins', category: 'Transit' },
      { name: 'Orion Mall', distance: '10 Mins', category: 'Shopping' },
      { name: 'MGM Hospital', distance: '8 Mins', category: 'Healthcare' }
    ]
  },
  {
    id: 'sayba-towers',
    name: 'Sayba Towers',
    slug: 'sayba-towers',
    location: 'Worli, Mumbai',
    city: 'Mumbai',
    address: 'Near Worli Naka, Worli, Mumbai, Maharashtra 400018',
    status: 'Upcoming',
    configuration: '1, 2 & 3 BHK Residences',
    carpetAreaRange: '620 sq.ft. - 1450 sq.ft.',
    priceRange: '₹ 2.10 Cr - ₹ 4.90 Cr',
    possessionDate: 'December 2027',
    reraNumber: 'P51800049103',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryCategories: [
      { category: 'Exteriors', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Sayba Towers - Aerodynamic Glass Tower' },
      { category: 'Interiors', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', caption: 'Sky Penthouse Living Overlooking the Sea' },
      { category: 'Amenities', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Infinity Rooftop Edge Pool' }
    ],
    tagline: 'Futuristic Architecture Overlooking the Arabian Sea',
    description: 'Sayba Towers introduces ultra-modern high-rise living with aerodynamic architecture, glass facades, and breath-taking views of the Bandra-Worli Sea Link and city skyline.',
    highlights: [
      '1, 2 & 3 BHK High-Tech Smart Residences',
      'Infinity Edge Rooftop Swimming Pool',
      'Breathtaking Arabian Sea Views',
      'Automated Valet Parking & EV Superchargers',
      'Private Screening Theatre & Banquet Hall'
    ],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves' },
      { name: 'Gymnasium', icon: 'Dumbbell' },
      { name: 'Club House', icon: 'Building2' },
      { name: 'Landscaped Garden', icon: 'Trees' },
      { name: 'Indoor Games', icon: 'Gamepad2' },
      { name: '24/7 Security', icon: 'ShieldCheck' }
    ],
    floorPlans: [
      {
        type: '2 BHK Horizon',
        bhk: '2 BHK',
        carpetArea: '850 sq.ft.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
        description: 'Corner residence with panoramic corner windows, smart home automation, and Italian marble finishes.'
      },
      {
        type: '3 BHK Sea Vista',
        bhk: '3 BHK',
        carpetArea: '1,450 sq.ft.',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        description: 'Penthouse-grade 3 BHK with expansive sea-view deck, master suite with walk-in wardrobe, and chef kitchen.'
      }
    ],
    locationPoints: [
      { name: 'Bandra-Worli Sea Link', distance: '4 Mins', category: 'Transit' },
      { name: 'Worli Sea Face', distance: '6 Mins', category: 'Recreation' },
      { name: 'Palladium Mall Lower Parel', distance: '10 Mins', category: 'Shopping' },
      { name: 'Podar International School', distance: '8 Mins', category: 'Education' }
    ]
  }
];

import { JobOpening } from '../types';

export const jobOpenings: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Real Estate Sales Manager',
    department: 'Sales & Business Development',
    location: 'Mumbai (Kurla / Bandra Office)',
    type: 'Full-time',
    experience: '4 - 7 Years',
    description: 'Lead high-value client acquisitions, conduct VIP site visits, and coordinate customized booking structures for premium residential developments.',
    requirements: [
      'Proven track record in luxury residential sales in Mumbai MMR region',
      'Excellent verbal and written communication in English and Hindi',
      'Strong negotiation and relationship management capabilities',
      'Bachelor’s or Master’s degree in Business or related disciplines'
    ]
  },
  {
    id: 'job-2',
    title: 'Senior Civil Project Engineer',
    department: 'Engineering & Construction',
    location: 'On-site (Mumbai Projects)',
    type: 'Full-time',
    experience: '5 - 8 Years',
    description: 'Oversee structural RCC execution, contractor safety protocols, vendor quality audits, and timely milestone progress for high-rise towers.',
    requirements: [
      'B.Tech / B.E. in Civil Engineering from a recognized university',
      'In-depth knowledge of IS building codes, concrete tech, and safety regulations',
      'Experience managing high-rise building projects exceeding 20 storeys',
      'Proficiency with MS Project and AutoCAD'
    ]
  },
  {
    id: 'job-3',
    title: 'Client Relationship & CRM Executive',
    department: 'Customer Delight',
    location: 'Mumbai Head Office',
    type: 'Full-time',
    experience: '2 - 4 Years',
    description: 'Manage post-sales customer journeys, demand letters, home loan documentation, registry assistance, and keys handover protocols.',
    requirements: [
      'Experience in real estate customer relationship management',
      'Customer-first empathetic approach with swift problem-solving skills',
      'Familiarity with Salesforce or Real Estate CRM portals',
      'Graduate degree in any discipline'
    ]
  },
  {
    id: 'job-4',
    title: 'Interior Architectural Designer',
    department: 'Design & Architecture',
    location: 'Mumbai Head Office',
    type: 'Full-time',
    experience: '3 - 6 Years',
    description: 'Design breathtaking sample apartments, grand double-height entrance lobbies, rooftop lounge spaces, and landscape coordination.',
    requirements: [
      'Bachelor’s in Architecture (B.Arch) or Interior Design',
      'Proficiency in 3ds Max, SketchUp, V-Ray/Lumion, and Revit',
      'Strong eye for premium materials, lighting fixtures, and textures',
      'Portfolio demonstrating completed residential and clubhouse interiors'
    ]
  }
];

export const careerPerks = [
  {
    title: 'Performance Incentives',
    desc: 'Uncapped quarterly performance bonuses, project completion rewards, and sales commissions.',
    icon: 'Trophy'
  },
  {
    title: 'Comprehensive Health Cover',
    desc: 'Top-tier family mediclaim, personal accident protection, and wellness checkups.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Rapid Career Progression',
    desc: 'Structured leadership development, sponsor-backed certifications, and fast-track promotions.',
    icon: 'TrendingUp'
  },
  {
    title: 'Inspiring Culture',
    desc: 'Work alongside award-winning architects, master engineers, and visionary leaders.',
    icon: 'Users'
  }
];

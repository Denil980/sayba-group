export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming';

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string;
  city: string;
  status: ProjectStatus;
  configuration: string;
  carpetAreaRange: string;
  priceRange?: string;
  heroImage: string;
  images: string[];
  galleryCategories?: {
    category: 'Exteriors' | 'Interiors' | 'Amenities' | 'Lifestyle';
    url: string;
    caption: string;
  }[];
  description: string;
  tagline: string;
  highlights: string[];
  amenities: {
    name: string;
    icon: string;
  }[];
  floorPlans: {
    type: string;
    bhk: string;
    carpetArea: string;
    image: string;
    description: string;
  }[];
  specifications?: {
    category: string;
    items: string[];
  }[];
  locationPoints: {
    name: string;
    distance: string;
    category: string;
  }[];
  possessionDate?: string;
  reraNumber?: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: 'Wellness & Fitness' | 'Recreation' | 'Community' | 'Safety & Security';
  description: string;
  iconName: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  projectName: string;
  unit: string;
  rating?: number;
  avatar?: string;
  quote?: string;
  duration?: string;
  location?: string;
  tag?: string;
  storyTitle?: string;
  videoThumbnail?: string;
  videoUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Exteriors' | 'Interiors' | 'Amenities' | 'Lifestyle';
  image: string;
  project?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Real Estate Updates' | 'Company News' | 'Home Buying Guides' | 'Architecture & Design';
  excerpt: string;
  content: string[];
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

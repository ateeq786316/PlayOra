/**
 * PlayOra App - TypeScript Type Definitions
 * All shared types for the PlayOra marketing site
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  date: string; // ISO date string
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  cover?: string; // Cover image URL
}

export interface FetchParams {
  page?: number;
  limit?: number;
  q?: string; // search query
  tag?: string; // filter by tag
}

export interface BlogApiResponse {
  data: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  avatar?: string;
}

export interface Screenshot {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Theme {
  name: string;
  displayName: string;
}
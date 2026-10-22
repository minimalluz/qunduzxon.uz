export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  instagramUrl?: string;
  duration: string;
  category: 'tv' | 'radio' | 'food' | 'lifestyle';
  views: number;
  createdAt: Date;
}

export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  category: 'portrait' | 'event' | 'food' | 'lifestyle';
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  ownerName: string;
  ownerTitle: string;
  ownerBio: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    telegram?: string;
    facebook?: string;
  };
}

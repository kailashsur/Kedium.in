export interface ProfileType {
  profile_img: string;
  profile_color: string;
  bio: string;
  cover_img: string;
}

export interface Activity {
  total_reads: number;
  total_likes: number;
  total_comments: number;
}

export interface Author {
  username: string;
  fullname: string;
  verified: boolean;
  email: string;
  _id: string;
  profile: ProfileType;

  blogs: Blog[];
  role: string;
  interested_in: string;
  following: User[];
  followers: User[];
  reading_list: Blog[];
  total_posts: number;
  followers_count: number;
  following_count: number;
  social_links: SocialLinks;
  google_auth: boolean;
  joinedAt: string;
  updatedAt: string;
}

export interface BlogPostProps {
  getBlog: {
    title: string;
    updatedAt: string;
    thambnail: string; // Corrected typo
    tags: string[];
    publishedAt: string;
    draft: boolean;
    description: string;
    content: string;
    blog_id: string;
    author: Author;
    activity: Activity;
  };
  _id: string;
}

export interface Blog {
  blog_id: string;
  title: string;
  description: string;
  thambnail: string; // Corrected typo
  updatedAt: string;
  author: Author;
  activity: Activity;
}

export interface Profile {
  cover_img: string;
  profile_img: string;
  bio: string;
  profile_color: string;
}

export interface SocialLinks {
  youtube: string;
  instagram: string;
  facebook: string;
  twitter: string;
  github: string;
  website: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  profile: Profile;
  verified: boolean;
  role: string;
  interested_in: string;
  following: User[];
  followers: User[];
  reading_list: Blog[];
  blogs: Blog[];
  total_posts: number;
  followers_count: number;
  following_count: number;
  social_links: SocialLinks;
  google_auth: boolean;
  joinedAt: string;
  updatedAt: string;
}

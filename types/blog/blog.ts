type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
} | null;

type Article = {
  featuredArticle: boolean;
  imagesGallery: string[];
  _id: string;
  title: string;
  content: string;
  author: Author;
  tags: string[];
  category: string;
  status: "pending" | "published" | "draft";
  featuredImage: string;
  excerpt: string;
  likes: number;
  Team: string | null;
  saison: string;
  highlightsVideo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Articles = Article[];

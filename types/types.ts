export interface NewsItem {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

export type RootStackParamList = {
  Home: undefined;
  News: { category?: string };
  Categories: undefined;
  Profile: undefined;
  SavedNews: undefined;
  NewsDetail: { newsItem: NewsItem };
};
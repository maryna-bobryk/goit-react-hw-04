export interface SearchParams {
  query: string;
  per_page: number;
  page: number;
}

export interface UnsplashImage {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    small: string;
    full: string;
  };
  user: {
    name: string;
  };
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total_pages: number;
}

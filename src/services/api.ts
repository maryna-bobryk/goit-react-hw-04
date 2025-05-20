import axios from 'axios';
import { SearchParams, UnsplashResponse } from './api.types';

const BASE_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'xKVC0BScZ4sS_BSkussmJx6Plk_JCfdA5L8ssu6X3rI';
const HEADERS = {
  'Accept-Version': 'v1',
  Authorization: `Client-ID ${API_KEY}`,
};

export const fetchImages = async (query: string, page: number): Promise<UnsplashResponse> => {
  const params: SearchParams = {
    query: query || '',
    per_page: 20,
    page: page,
  };

  const response = await axios.get<UnsplashResponse>(BASE_URL, { headers: HEADERS, params });

  return { results: response.data.results, total_pages: response.data.total_pages };
};

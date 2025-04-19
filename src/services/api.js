import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'xKVC0BScZ4sS_BSkussmJx6Plk_JCfdA5L8ssu6X3rI';
const HEADERS = {
  'Accept-Version': 'v1',
  Authorization: `Client-ID ${API_KEY}`,
};

export const fetchImages = async (query, page) => {
  const params = {
    query: query || '',
    per_page: 20,
    page: page,
  };

  const response = await axios.get(BASE_URL, { headers: HEADERS, params });
  return { results: response.data.results, totalPages: response.data.total_pages };
};

// export const fetchImages = async query => {
//   const response = await axios.get(`https://api.unsplash.com/photos/client_id=xKVC0BScZ4sS_BSkussmJx6Plk_JCfdA5L8ssu6X3rI?query=${query}&page=${page}`);
//   return response.data.results;
// };

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams();

  for (const key in params) {
    qs.append(key, params[key]);
  }

  return `${baseUrl}${endpoint}?api_key=${key}&${qs.toString()}`;
};


export default { getUrl };
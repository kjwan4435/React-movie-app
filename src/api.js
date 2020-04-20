import axios from "axios";

// fetch를 사용하는 것 보다 axios를 사용하면 훨씬 깔끔하게 정리된다?

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = "617d6b670ee08411485222b8841ba0ce";
  config.params["language"] = "en-US";
  return config;
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export default api;

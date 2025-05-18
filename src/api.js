import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmU0NTU1OTk0YmM2ODBlZWYxNjJiYThhZjFkM2NhMSIsIm5iZiI6MTc0NzMzMDc1My4xNDcsInN1YiI6IjY4MjYyNmMxZjYwM2UyOTg0MTc2N2YwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cMGa6mrGk-ooEIWqCHa8qj_HZX9mMkuCHHEID2fCuOM';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export const fetchTrending = () => axiosInstance.get('/trending/movie/day');
export const searchMovies = (query) =>
  axiosInstance.get(`/search/movie`, { params: { query } });
export const fetchMovieDetails = (id) => axiosInstance.get(`/movie/${id}`);
export const fetchMovieCast = (id) => axiosInstance.get(`/movie/${id}/credits`);
export const fetchMovieReviews = (id) =>
  axiosInstance.get(`/movie/${id}/reviews`);

export { IMAGE_BASE_URL };

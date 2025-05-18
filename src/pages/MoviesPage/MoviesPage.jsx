import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputQuery = form.elements.query.value.trim();

    if (inputQuery) {
      setSearchParams({ query: inputQuery });
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

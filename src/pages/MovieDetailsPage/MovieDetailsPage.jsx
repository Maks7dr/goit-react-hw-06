import { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../../api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  if (!movie) return <div>Loading...</div>;

  const { title, overview, poster_path, vote_average, release_date, genres } =
    movie;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <div style={{ display: 'flex', gap: '20px' }}>
        <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} width="300" />
        <div>
          <h1>
            {title} ({release_date?.slice(0, 4)})
          </h1>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLinkRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkRef.current }}>
            Reviews
          </Link>
        </li>
      </ul>

      <hr />
      <Outlet />
    </div>
  );
}

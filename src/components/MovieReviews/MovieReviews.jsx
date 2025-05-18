import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p>
            <strong>{author}</strong>
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}

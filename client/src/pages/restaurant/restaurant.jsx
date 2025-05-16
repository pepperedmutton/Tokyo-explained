import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './restaurant.css';

export default function Restaurant() {
  const { id: placeId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const [restaurantRes, commentsRes] = await Promise.all([
          fetch(`/api/restaurants/${placeId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `${token}` : undefined,
            },
            body: JSON.stringify({})
          }),
          fetch(`/api/comment/${placeId}`, {
            headers: {
              Authorization: token ? `${token}` : undefined,
            }
          })
        ]);
        const restaurantData = await restaurantRes.json();
        const commentsData = await commentsRes.json();
        setRestaurant(restaurantData);
        setComments(commentsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [placeId, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    const trimmed = newComment.trim();
    if (!trimmed) return;


      const response = await fetch(`/api/comment/${placeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ content: trimmed })
      });


      const savedComment = await response.json();
      setComments([...comments, savedComment]);
      setNewComment('');
      setCommentError(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>No data found</p>;

  return (
    <div className="restaurant-page">
      <h1>{restaurant.displayName?.text || 'Unnamed Restaurant'}</h1>
      <p className="rating">Rating: {restaurant.rating ?? 'N/A'} ⭐</p>
      <p className="address">{restaurant.formattedAddress || restaurant.shortFormattedAddress}</p>
      <p className="phone">{restaurant.nationalPhoneNumber || restaurant.internationalPhoneNumber}</p>
      <p className="types">{restaurant.types?.join(', ')}</p>

      {restaurant.websiteUri && (
        <p><a href={restaurant.websiteUri} target="_blank" rel="noreferrer"> Visit Website</a></p>
      )}
      {restaurant.googleMapsUri && (
        <p><a href={restaurant.googleMapsUri} target="_blank" rel="noreferrer"> View on Google Maps</a></p>
      )}
      {restaurant.editorialSummary?.text && (
        <blockquote className="summary">{restaurant.editorialSummary.text}</blockquote>
      )}

      <hr />
      <h2>Comments</h2>

      {comments.length > 0 ? (
        <div className="comments-section">
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment">
                <span>
                  {typeof comment === 'string' ? comment : comment.content}
                </span>
                <button className="deletebutton" onClick={async ()=>{
                  console.log(comment);
                  await fetch(`/api/comment/${placeId}/${comment.id}`,{
                    method:"DELETE",
                    headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${token}`
                            }})
                  let commentsRes = await fetch(`/api/comment/${placeId}`, {
                            headers: {
                            Authorization: token ? `${token}` : undefined,
                                      }
                             }).then(res=>res.json());
                             setComments(commentsRes);
                    
                }
                }>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No comments yet. Be the first!</p>
      )}

      <h3>Leave a Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
        />
        <button type="submit">Post Comment</button>
        {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
      </form>
    </div>
  );
}

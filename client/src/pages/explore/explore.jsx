import './explore.css';
import { useEffect, useState } from 'react';
import getDistanceFromLatLonInMeters from '../../tool/Haversine.js'
import { useNavigate } from 'react-router-dom';
export default function Explore() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location,setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation( { latitude, longitude });

      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          includedTypes: ['restaurant'],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude,
                longitude
              },
              radius: 1500.0
            }
          }
        })
      }).then(res=>res.json());
      
      const data = await response;
      setRestaurants(data);
      
      
      setLoading(false);
    });
  }, []);
function formatDistance(m) {
  return m > 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}
function renderStars(rating) {
  const filled = Math.round(rating);
  const total = 5;
  return (
    [...Array(total)].map((_, i) => (
      <span key={i}>{i < filled ? '★' : '☆'}</span>
    ))
  );
}




  return (
    <div id="explore">
      {loading && <p>Loading...</p>}
      <div id="restaurantList">
        {restaurants.map((place, idx) => {
          const distance = (location.latitude && location.longitude && place.location)
            ? getDistanceFromLatLonInMeters(
                location.latitude,
                location.longitude,
                place.location.latitude,
                place.location.longitude
              )
            : null;

          return (
            <div className="restaurantCard" key={idx} onClick = {()=>{navigate(`/restaurant/${place.id}`)}}>
              <p className="restaurantName">{place.displayName?.text || "Unnamed Place"}</p>
              {distance && (
                <p className="restaurantDistance">{formatDistance(distance)} away</p>
              )}
                <div className="restaurantRating">
                {renderStars(place.rating || 0)}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

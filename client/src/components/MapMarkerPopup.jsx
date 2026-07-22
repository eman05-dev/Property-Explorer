import { useNavigate } from 'react-router-dom';

export default function MapMarkerPopup({ property }) {
  const navigate = useNavigate();

  return (
    <div className="popup-card">
      <div className="popup-card__title">{property.title}</div>
      <div className="popup-card__price">${Number(property.price).toLocaleString()}</div>
      <button
        className="popup-card__link"
        onClick={() => navigate(`/properties/${property._id}`)}
      >
        View details →
      </button>
    </div>
  );
}

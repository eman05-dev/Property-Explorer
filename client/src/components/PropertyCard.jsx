import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function PropertyCard({ property }) {
  return (
    <Link to={`/properties/${property._id}`} className="property-card">
      <img
        className="property-card__image"
        src={property.imageUrl || 'https://placehold.co/400x300/e9ddcd/45403a?text=NovaSol'}
        alt={property.title}
      />
      <div className="property-card__body">
        <div className="property-card__title">{property.title}</div>
        <div className="property-card__price">${Number(property.price).toLocaleString()}</div>
        <div className="property-card__meta">
          <MapPin size={14} />
          <span>
            {property.latitude.toFixed(3)}, {property.longitude.toFixed(3)}
          </span>
        </div>
      </div>
    </Link>
  );
}

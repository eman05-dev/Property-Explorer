import { useEffect, useState } from 'react';
import UploadForm from '../components/UploadForm';
import PropertyCard from '../components/PropertyCard';
import api from '../api/client';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await api.getProperties();
        if (!ignore) setProperties(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreated = (property) => {
    setProperties((prev) => [property, ...prev]);
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <div>
          <div className="home-hero__eyebrow">Property Explorer</div>
          <h1 className="home-hero__title">
            Find ground worth <em>settling</em> on.
          </h1>
          <p className="home-hero__copy">
            NovaSol connects independent hosts and buyers directly — no
            middlemen, no clutter. Publish a listing below, or head to the
            map to see what's already live near you.
          </p>
        </div>
        <UploadForm onCreated={handleCreated} />
      </div>

      <div className="section-heading">
        <h3>Recently Listed</h3>
      </div>

      {loading && (
        <div className="listing-grid">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="error-state">Couldn't load listings: {error}</div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="empty-state">
          No listings yet. Be the first to put a place on the map.
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="listing-grid">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

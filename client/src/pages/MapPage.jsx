import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import MapMarkerPopup from '../components/MapMarkerPopup';
import Loader from '../components/Loader';
import api from '../api/client';

// Custom clay-colored marker icon so we don't ship Leaflet's default blue pin
const clayIcon = new L.DivIcon({
  className: 'novasol-marker',
  html: `<div style="
    width: 22px; height: 22px; border-radius: 50% 50% 50% 0;
    background: #c17a4e; border: 2px solid #2b2622;
    transform: rotate(-45deg);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -22],
});

const DEFAULT_CENTER = [20, 0];
const DEFAULT_ZOOM = 2;

export default function MapPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const center =
    properties.length > 0
      ? [properties[0].latitude, properties[0].longitude]
      : DEFAULT_CENTER;
  const zoom = properties.length > 0 ? 5 : DEFAULT_ZOOM;

  if (loading) {
    return (
      <div className="map-page">
        <Loader label="Plotting listings on the map…" />
      </div>
    );
  }

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <h3>Live Listings</h3>
        <div className="map-sidebar__sub">
          {error
            ? `Couldn't load listings: ${error}`
            : `${properties.length} propert${properties.length === 1 ? 'y' : 'ies'} on the map`}
        </div>
        {properties.map((p) => (
          <div
            key={p._id}
            className="map-listing-item"
            onClick={() => navigate(`/properties/${p._id}`)}
          >
            <img src={p.imageUrl || 'https://placehold.co/80/504a42/f4ede4?text=NS'} alt="" />
            <div>
              <div className="map-listing-item__title">{p.title}</div>
              <div className="map-listing-item__price">
                ${Number(p.price).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MapContainer center={center} zoom={zoom} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property._id}
            position={[property.latitude, property.longitude]}
            icon={clayIcon}
          >
            <Popup>
              <MapMarkerPopup property={property} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, CalendarCheck, CheckCircle2 } from 'lucide-react';
import Loader from '../components/Loader';
import api from '../api/client';

export default function DetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      try {
        const data = await api.getProperty(id);
        if (!ignore) {
          setProperty(data);
          setBooked(Boolean(data.booked));
        }
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
  }, [id]);

  const handleBook = async () => {
    setBooking(true);
    try {
      await api.bookProperty(id);
      setBooked(true);
      toast.success('Booking confirmed — the host has been notified.');
    } catch (err) {
      toast.error('Could not complete the booking. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <Loader label="Fetching property details…" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="details-page">
        <div className="error-state">
          {error || 'Property not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/map" className="details-back">
        <ArrowLeft size={15} /> Back to map
      </Link>

      <img
        className="details-image"
        src={property.imageUrl || 'https://placehold.co/800x400/e9ddcd/45403a?text=NovaSol'}
        alt={property.title}
      />

      <div className="details-header">
        <h1 className="details-title">{property.title}</h1>
        <div className="details-price">${Number(property.price).toLocaleString()}</div>
      </div>

      <div className="details-meta">
        <MapPin size={16} />
        <span>
          {property.latitude.toFixed(4)}, {property.longitude.toFixed(4)}
        </span>
      </div>

      <button
        className={`book-btn ${booked ? 'book-btn--booked' : ''}`}
        onClick={handleBook}
        disabled={booking || booked}
      >
        {booked ? (
          <>
            <CheckCircle2 size={18} /> Booking Confirmed
          </>
        ) : (
          <>
            <CalendarCheck size={18} /> {booking ? 'Booking…' : 'Book Property'}
          </>
        )}
      </button>
    </div>
  );
}

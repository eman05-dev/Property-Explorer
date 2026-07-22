import { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadCloud, Tag, DollarSign, Locate } from 'lucide-react';
import { uploadPropertyImage } from '../firebase';
import api from '../api/client';

const initialForm = { title: '', price: '', latitude: '', longitude: '' };

export default function UploadForm({ onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.title || !form.price || !form.latitude || !form.longitude) {
      setStatus({ type: 'error', message: 'Please fill in every field before publishing.' });
      return;
    }

    setSubmitting(true);
    setProgress(0);

    try {
      let imageUrl = '';
      if (file) {
        imageUrl = await uploadPropertyImage(file, setProgress);
      }

      const property = await api.createProperty({
        title: form.title,
        price: Number(form.price),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        imageUrl,
      });

      setStatus({ type: 'success', message: 'Listing published — it now appears on the map.' });
      toast.success('Property listed successfully');
      setForm(initialForm);
      setFile(null);
      setProgress(0);
      if (onCreated) onCreated(property);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Try again.' });
      toast.error('Could not publish listing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="upload-card" onSubmit={handleSubmit}>
      <h2>List Your Property</h2>
      <p className="upload-card__sub">
        A few details and a photo are all it takes to go live on the map.
      </p>

      <div className="field">
        <label>
          <Tag size={13} /> Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Sunlit hillside cottage"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label>
          <DollarSign size={13} /> Price
        </label>
        <input
          type="number"
          name="price"
          placeholder="185000"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>
            <Locate size={13} /> Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            placeholder="34.0522"
            value={form.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>
            <Locate size={13} /> Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            placeholder="-118.2437"
            value={form.longitude}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label>
          <UploadCloud size={13} /> Photo
        </label>
        <label className="file-drop">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file ? file.name : 'Click to choose an image'}
        </label>
        {submitting && file && (
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Publishing…' : 'Publish Listing'}
      </button>

      {status && (
        <div className={`form-status form-status--${status.type}`}>{status.message}</div>
      )}
    </form>
  );
}

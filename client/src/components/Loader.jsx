export default function Loader({ label = 'Loading listings…' }) {
  return (
    <div className="centered-loader">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
}

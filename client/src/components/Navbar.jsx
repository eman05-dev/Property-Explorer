import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        Nova<span>Sol</span>
      </div>
      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          List a Place
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Explore Map
        </NavLink>
      </div>
    </nav>
  );
}

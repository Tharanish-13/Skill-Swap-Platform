import React from 'react';
import './Navbar.css';
import { FaUserCircle, FaSearch, FaHome, FaBell, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ search, setSearch, isLoggedIn, toggleLogin }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo" onClick={() => navigate('/')}>SkillConnect</h2>
      </div>

      <div className="navbar-center">
        <div className="glass-search">
          <FaSearch className="glass-icon" />
          <input
            type="text"
            placeholder="Search skills, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        {/* Home Button */}
        <button className="nav-btn home-btn" onClick={() => navigate('/')}>
          <FaHome style={{ marginRight: '5px' }} /> Home
        </button>

        {/* Admin Button */}
        <button className="nav-btn admin-btn" onClick={() => navigate('/AdminDashboard')}>
          <FaTools style={{ marginRight: '5px' }} /> Admin
        </button>

        {/* Notifications */}
        <FaBell
          className="profile-icon"
          onClick={() => navigate('/notifications')}
          style={{ cursor: 'pointer' }}
        />

        {/* Profile */}
        <FaUserCircle
          className="profile-icon"
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
        />

        {toggleLogin ? (
          <button className="nav-btn login-btn" onClick={toggleLogin}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        ) : (
          <>
            <button className="nav-btn login-btn" onClick={() => navigate('/login')}>Login</button>
            <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

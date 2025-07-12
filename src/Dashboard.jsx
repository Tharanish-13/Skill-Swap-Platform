import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaMapMarkerAlt, FaUserTie, FaHandshake, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RequestModal from './RequestPage';

const BACKEND_URL = "http://localhost:8000";

const Dashboard = ({ search = "", isLoggedIn }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 4;
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      let url = `${BACKEND_URL}/user/profiles`;
      if (search && search.trim() !== "") {
        url = `${BACKEND_URL}/user/search?skill=${encodeURIComponent(search)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setTotalPages(Math.ceil(data.length / usersPerPage));
      const start = (page - 1) * usersPerPage;
      setUsers(data.slice(start, start + usersPerPage));
    };
    fetchUsers();
  }, [search, page]);

  const handleRequestClick = (user) => {
    if (!isLoggedIn) {
      alert("❌ Please login to send a request.");
      return;
    }
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      <h2>Skill Swap</h2>
      <div className="user-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-card" key={user.id || user._id}>
              <img
                src={
                  user.profile_photo
                    ? `${BACKEND_URL}${user.profile_photo}`
                    : '/default-avatar.png'
                }
                alt="Profile"
                className="avatar"
              />
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p><FaMapMarkerAlt /> {user.location}</p>
              <p><FaUserTie /> <strong>Offered:</strong> {(user.skills_offered || []).join(', ')}</p>
              <p><FaHandshake /> <strong>Wanted:</strong> {(user.skills_wanted || []).join(', ')}</p>
              <p><FaClock /> <strong>Availability:</strong> {(user.availability || []).join(', ')}</p>
              <div className="card-footer">
                <button className="request-btn" onClick={() => handleRequestClick(user)}>
                  Request
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ⬅ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next ➡
        </button>
      </div>
      {/* Request Modal */}
      {showModal && selectedUser && (
        <RequestModal
          user={{ id: selectedUser.id || selectedUser._id, name: selectedUser.name }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaMapMarkerAlt, FaUserTie, FaHandshake, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RequestModal from './RequestPage';
import Profile from './Profile';

const Dashboard = ({ search, isLoggedIn }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 4;
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const dummyUsers = [
      {
        _id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        location: 'New York',
        profile_photo: '',
        skills_offered: ['React', 'Node.js'],
        skills_wanted: ['Python', 'Docker'],
        availability: ['weekdays'],
        req_status: false,
      },
      {
        _id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        location: 'San Francisco',
        profile_photo: '',
        skills_offered: ['Java', 'Spring Boot'],
        skills_wanted: ['Go', 'Rust'],
        availability: ['weekend'],
        req_status: false,
      },
      {
        _id: '3',
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        location: 'Chicago',
        profile_photo: '',
        skills_offered: ['Angular', 'Firebase'],
        skills_wanted: ['Vue', 'Next.js'],
        availability: ['weekdays'],
        req_status: false,
      },
      {
        _id: '4',
        name: 'Dana Lee',
        email: 'dana@example.com',
        location: 'Austin',
        profile_photo: '',
        skills_offered: ['Python', 'Flask'],
        skills_wanted: ['React Native'],
        availability: ['weekend'],
        req_status: false,
      },
      {
        _id: '5',
        name: 'Ethan Green',
        email: 'ethan@example.com',
        location: 'Seattle',
        profile_photo: '',
        skills_offered: ['C++', 'GameDev'],
        skills_wanted: ['Unity'],
        availability: ['weekdays'],
        req_status: false,
      },
    ];

    const filtered = dummyUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.skills_offered.join(',').toLowerCase().includes(search.toLowerCase()) ||
        user.skills_wanted.join(',').toLowerCase().includes(search.toLowerCase())
    );

    const start = (page - 1) * usersPerPage;
    const paginated = filtered.slice(start, start + usersPerPage);

    setUsers(paginated);
    setTotalPages(Math.ceil(filtered.length / usersPerPage));
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
            <div className="user-card" key={user._id}>
              <img
                src={user.profile_photo || '/default-avatar.png'}
                alt="Profile"
                className="avatar"
              />
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p><FaMapMarkerAlt /> {user.location}</p>
              <p><FaUserTie /> <strong>Offered:</strong> {user.skills_offered.join(', ')}</p>
              <p><FaHandshake /> <strong>Wanted:</strong> {user.skills_wanted.join(', ')}</p>
              <p><FaClock /> <strong>Availability:</strong> {user.availability.join(', ')}</p>

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
          user={{ id: selectedUser._id, name: selectedUser.name }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

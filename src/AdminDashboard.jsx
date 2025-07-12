import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaMapMarkerAlt, FaUserTie, FaHandshake, FaClock, FaBan } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const Admin_Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const adminUsers = [
      {
        _id: '1', name: 'Alice Johnson', email: 'alice@example.com',
        location: 'New York', profile_photo: '', skills_offered: ['React', 'Node.js'],
        skills_wanted: ['Python'], availability: ['weekdays'], accepted: 3, rejected: 1, banned: false
      },
      {
        _id: '2', name: 'Bob Smith', email: 'bob@example.com',
        location: 'San Francisco', profile_photo: '', skills_offered: ['Java'],
        skills_wanted: ['Rust'], availability: ['weekend'], accepted: 1, rejected: 2, banned: false
      },
      {
        _id: '3', name: 'Dana Lee', email: 'dana@example.com',
        location: 'Austin', profile_photo: '', skills_offered: ['Python'],
        skills_wanted: ['React Native'], availability: ['weekend'], accepted: 0, rejected: 4, banned: false
      },
      {
        _id: '4', name: 'Ethan Green', email: 'ethan@example.com',
        location: 'Seattle', profile_photo: '', skills_offered: ['C++'],
        skills_wanted: ['Unity'], availability: ['weekdays'], accepted: 5, rejected: 2, banned: false
      },
      {
        _id: '5', name: 'Fiona White', email: 'fiona@example.com',
        location: 'Miami', profile_photo: '', skills_offered: ['Go'],
        skills_wanted: ['TypeScript'], availability: ['weekdays'], accepted: 2, rejected: 3, banned: false
      },
      {
        _id: '6', name: 'George Black', email: 'george@example.com',
        location: 'Boston', profile_photo: '', skills_offered: ['Vue'],
        skills_wanted: ['Angular'], availability: ['weekend'], accepted: 4, rejected: 0, banned: false
      },
      {
        _id: '7', name: 'Hannah Grey', email: 'hannah@example.com',
        location: 'Denver', profile_photo: '', skills_offered: ['Laravel'],
        skills_wanted: ['Django'], availability: ['weekdays'], accepted: 3, rejected: 1, banned: false
      },
      {
        _id: '8', name: 'Ian Red', email: 'ian@example.com',
        location: 'Dallas', profile_photo: '', skills_offered: ['Kotlin'],
        skills_wanted: ['Swift'], availability: ['weekend'], accepted: 1, rejected: 2, banned: false
      },
      {
        _id: '9', name: 'Jack Blue', email: 'jack@example.com',
        location: 'Atlanta', profile_photo: '', skills_offered: ['PHP'],
        skills_wanted: ['Perl'], availability: ['weekdays'], accepted: 2, rejected: 1, banned: false
      },
    ];

    setUsers(adminUsers);
  }, []);

  const totalUsers = users.length;
  const totalAccepted = users.reduce((acc, u) => acc + u.accepted, 0);
  const totalRejected = users.reduce((acc, u) => acc + u.rejected, 0);

  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIdx = (page - 1) * usersPerPage;
  const currentUsers = users.slice(startIdx, startIdx + usersPerPage);

  const handleBanToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, banned: !user.banned } : user
      )
    );
  };

  const handleSendNotification = () => {
    if (!notificationMessage.trim()) {
      alert('Please enter a notification message.');
      return;
    }
    alert(`✅ Notification sent to all users: "${notificationMessage}"`);
    setNotificationMessage('');
  };

  const handleDownloadReport = () => {
  const reportLines = [
    `Total Users: ${totalUsers}`,
    `Accepted Requests: ${totalAccepted}`,
    `Rejected Requests: ${totalRejected}`,
    '',
    'User-wise Report:',
    ...users.map(user =>
      `${user.name} (${user.email}) | Accepted: ${user.accepted} | Rejected: ${user.rejected} | Banned: ${user.banned ? 'Yes' : 'No'}`
    )
  ];

  const blob = new Blob([reportLines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'admin_user_report.txt';
  a.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>
      <div className="admin-header">
          <h2>Admin Panel</h2>
          <button className="download-btn" onClick={handleDownloadReport}>⬇ Download Report</button>
      </div>

      <div className="admin-stats">
        <div className="stat-box">👥 Total Users: <strong>{totalUsers}</strong></div>
        <div className="stat-box">✅ Accepted: <strong>{totalAccepted}</strong></div>
        <div className="stat-box">❌ Rejected: <strong>{totalRejected}</strong></div>
      </div>

      <div className="notification-panel">
        <div className="glass-search">
          <input
            type="text"
            placeholder="Type notification to broadcast to all users..."
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="glass-input"
          />
        </div>

        <button onClick={handleSendNotification}>📢 Send Notification</button>
      </div>

      <div className="admin-grid">
        {currentUsers.map((user) => (
          <div className="admin-card" key={user._id}>
            <img
              src={user.profile_photo || '/default-avatar.png'}
              alt="Profile"
              className="admin-avatar"
            />
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p><FaMapMarkerAlt /> {user.location}</p>
            <p><FaUserTie /> <strong>Offered:</strong> {user.skills_offered.join(', ')}</p>
            <p><FaHandshake /> <strong>Wanted:</strong> {user.skills_wanted.join(', ')}</p>
            <p><FaClock /> <strong>Availability:</strong> {user.availability.join(', ')}</p>
            <p className="status-report">
              ✅ Accepted: {user.accepted} | ❌ Rejected: {user.rejected}
            </p>
            <div className="admin-footer">
              <button
                className={`ban-btn${user.banned ? ' unban' : ''}`}
                onClick={() => handleBanToggle(user._id)}
              >
                <FaBan /> {user.banned ? 'Unban User' : 'Ban User'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ⬅ Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin_Dashboard;
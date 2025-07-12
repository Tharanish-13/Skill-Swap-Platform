import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [requests, setRequests] = useState([]);
  const [approvedList, setApprovedList] = useState({}); // Track approved users

  useEffect(() => {
    const mockRequests = [
      {
        fromUserId: 'u123',
        fromUserName: 'Alice Johnson',
        skillsHave: ['JavaScript', 'React'],
        skillsWant: ['Python'],
        message: 'Hey, would love to connect and learn Python from you!',
      },
      {
        fromUserId: 'u456',
        fromUserName: 'Bob Smith',
        skillsHave: ['Java', 'Spring Boot'],
        skillsWant: ['Go'],
        message: 'I can help with Java. Interested in learning Go together?',
      },
    ];

    const loggedIn = localStorage.getItem('token');
    if (loggedIn) {
      setRequests(mockRequests);
    }
  }, []);

  const handleApprove = (id) => {
    setApprovedList((prev) => ({ ...prev, [id]: 'approved' }));
    // Simulate backend update or notify logic here
    alert(`✅ You approved the request from ${requests.find(r => r.fromUserId === id).fromUserName}`);
  };

  const handleReject = (id) => {
    setApprovedList((prev) => ({ ...prev, [id]: 'rejected' }));
    // Optionally simulate backend update
  };

  return (
    <div className="notification-page">
      <h2>Requests You've Received</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="request-list">
          {requests.map((req, index) => (
            <div className="request-card" key={index}>
              <h4>{req.fromUserName}</h4>
              <p><strong>Skills They Have:</strong> {req.skillsHave.join(', ')}</p>
              <p><strong>Skills They Want:</strong> {req.skillsWant.join(', ')}</p>
              <p><strong>Message:</strong> {req.message}</p>

              <div className="actions">
                {approvedList[req.fromUserId] === 'approved' ? (
                  <p className="approved-msg">✅ Request Approved</p>
                ) : approvedList[req.fromUserId] === 'rejected' ? (
                  <p className="rejected-msg">❌ Request Rejected</p>
                ) : (
                  <>
                    <button className="approve-btn" onClick={() => handleApprove(req.fromUserId)}>Approve</button>
                    <button className="reject-btn" onClick={() => handleReject(req.fromUserId)}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;

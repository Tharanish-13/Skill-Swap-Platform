import React, { useState } from "react";
import "./RequestPage.css";

function RequestModal({ user, onClose }) {
  const [skillsHave, setSkillsHave] = useState("");
  const [skillsWant, setSkillsWant] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skillsHave.trim() && !skillsWant.trim() && !message.trim()) {
      alert("Please fill at least one field before submitting.");
      return;
    }

    // Simulated API delay
    setTimeout(() => {
      console.log("Mock Request Submitted:", {
        toUserId: user.id,
        toUserName: user.name,
        skillsHave: skillsHave.split(",").map(s => s.trim()).filter(Boolean),
        skillsWant: skillsWant.split(",").map(s => s.trim()).filter(Boolean),
        message,
        token: localStorage.getItem("token") || "no-token",
      });

      alert("✅ Request sent (simulated)!");
      onClose();
    }, 1000);
  };

  return (
    <div className="modal">
      <h3>Send Request to {user.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Skills You Have (comma separated):
          <input
            type="text"
            value={skillsHave}
            onChange={(e) => setSkillsHave(e.target.value)}
            placeholder="e.g. JavaScript, React"
          />
        </label>
        <label>
          Skills Wanted (comma separated):
          <input
            type="text"
            value={skillsWant}
            onChange={(e) => setSkillsWant(e.target.value)}
            placeholder="e.g. Python, Django"
          />
        </label>
        <label>
          Your message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
        </label>
        <div className="modal-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RequestModal;

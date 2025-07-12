import React, { useState } from "react";
import "./RequestPage.css";

function RequestModal({ user, onClose }) {
  const [skillsHave, setSkillsHave] = useState("");
  const [skillsWant, setSkillsWant] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!skillsHave.trim() && !skillsWant.trim() && !message.trim()) {
    alert("Please fill at least one field before submitting.");
    return;
  }

  try {
    const token = localStorage.getItem("token") || "no-token";

    const response = await fetch("http://localhost:8000/swap-request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        from_user: token, // assuming token holds from_user ID
        to_user: user.id,
        offered_skills: skillsHave.split(",").map(s => s.trim()).filter(Boolean),
        requested_skills: skillsWant.split(",").map(s => s.trim()).filter(Boolean),
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send request");
    }

    const data = await response.json();
    console.log("✅ Request created:", data);

    alert("✅ Request sent!");
    onClose();

  } catch (err) {
    console.error(err);
    alert("❌ Error sending request");
  }
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

import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    icon: null,
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    visibility: "public",
  });

  const [iconPreview, setIconPreview] = useState(null);

  // New state variables for adding skills
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showWantedSkillInput, setShowWantedSkillInput] = useState(false);
  const [newWantedSkill, setNewWantedSkill] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProfile({ ...profile, [name]: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  useEffect(() => {
    if (profile.icon) {
      const objectUrl = URL.createObjectURL(profile.icon);
      setIconPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setIconPreview(null);
    }
  }, [profile.icon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for save logic
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Profile Icon:
          <input type="file" name="icon" accept="image/*" onChange={handleChange} />
        </label>
        {iconPreview && (
          <div className="icon-preview">
            <img src={iconPreview} alt="Profile Icon Preview" width={100} height={100} />
          </div>
        )}

        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </label>

        <label>
          Location:
          <input type="text" name="location" value={profile.location} onChange={handleChange} />
        </label>

        {/* Skills Offered with plus option */}
        <label>
          Skills Offered:
          <div>
            {profile.skillsOffered.length > 0 ? (
              <ul>
                {profile.skillsOffered.map((skill, index) => (
                  <li key={index}>
                    {skill}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = profile.skillsOffered.filter((_, i) => i !== index);
                        setProfile({ ...profile, skillsOffered: newSkills });
                      }}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills added</p>
            )}
            {showSkillInput ? (
              <div>
                <input
                  type="text"
                  placeholder="Type a skill"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSkill.trim()) {
                      setProfile({
                        ...profile,
                        skillsOffered: [...profile.skillsOffered, newSkill.trim()],
                      });
                      setShowSkillInput(false);
                      setNewSkill("");
                    }
                  }}
                >
                  Add
                </button>
                <button type="button" onClick={() => setShowSkillInput(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSkillInput(true)}
                style={{ marginTop: "8px" }}
              >
                + Add Skill
              </button>
            )}
          </div>
        </label>

        {/* Skills Wanted with plus option */}
        <label>
          Skills Wanted:
          <div>
            {profile.skillsWanted.length > 0 ? (
              <ul>
                {profile.skillsWanted.map((skill, index) => (
                  <li key={index}>
                    {skill}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = profile.skillsWanted.filter((_, i) => i !== index);
                        setProfile({ ...profile, skillsWanted: newSkills });
                      }}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills added</p>
            )}
            {showWantedSkillInput ? (
              <div>
                <input
                  type="text"
                  placeholder="Type a skill"
                  value={newWantedSkill}
                  onChange={e => setNewWantedSkill(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newWantedSkill.trim()) {
                      setProfile({
                        ...profile,
                        skillsWanted: [...profile.skillsWanted, newWantedSkill.trim()],
                      });
                      setShowWantedSkillInput(false);
                      setNewWantedSkill("");
                    }
                  }}
                >
                  Add
                </button>
                <button type="button" onClick={() => setShowWantedSkillInput(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowWantedSkillInput(true)}
                style={{ marginTop: "8px" }}
              >
                + Add Skill
              </button>
            )}
          </div>
        </label>

        <fieldset>
          <legend>Availability:</legend>
          <label>
            <input
              type="radio"
              name="availability"
              value="weekdays"
              checked={profile.availability === "weekdays"}
              onChange={handleChange}
            />
            Weekdays
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="weekend"
              checked={profile.availability === "weekend"}
              onChange={handleChange}
            />
            Weekend
          </label>
        </fieldset>

        <label>
          Profile Visibility:
          <select name="visibility" value={profile.visibility} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
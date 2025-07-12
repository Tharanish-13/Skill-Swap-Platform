import React, { useState, useEffect } from "react";
import "./Profile.css";

const BACKEND_URL = "http://localhost:8000";

const Profile = () => {
  const [profile, setProfile] = useState({
    icon: null,
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    visibility: "public",
    profile_photo: "",
  });

  const [iconPreview, setIconPreview] = useState(null);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showWantedSkillInput, setShowWantedSkillInput] = useState(false);
  const [newWantedSkill, setNewWantedSkill] = useState("");

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User not logged in.");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile((prev) => ({
          ...prev,
          name: data.name || "",
          location: data.location || "",
          skillsOffered: data.skills_offered || [],
          skillsWanted: data.skills_wanted || [],
          availability: Array.isArray(data.availability)
            ? data.availability[0] || ""
            : data.availability || "",
          visibility: data.is_public ? "public" : "private",
          profile_photo: data.profile_photo || "",
          icon: null,
        }));
        if (data.profile_photo) {
          setIconPreview(`${BACKEND_URL}${data.profile_photo}`);
        }
      } else {
        console.error("Failed to fetch profile:", await res.text());
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.icon) {
      const objectUrl = URL.createObjectURL(profile.icon);
      setIconPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (profile.profile_photo) {
      setIconPreview(`${BACKEND_URL}${profile.profile_photo}`);
    } else {
      setIconPreview(null);
    }
  }, [profile.icon, profile.profile_photo]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProfile({ ...profile, icon: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User not logged in.");
    return;
  }

  const formData = new FormData();
  formData.append("name", profile.name);
  formData.append("location", profile.location);
  formData.append("availability", profile.availability);
  formData.append("is_public", profile.visibility === "public");

  // 🔥 Important fix: append each skill separately
  profile.skillsOffered.forEach(skill => {
    if (skill.trim()) formData.append("skills_offered", skill);
  });

  profile.skillsWanted.forEach(skill => {
    if (skill.trim()) formData.append("skills_wanted", skill);
  });

  if (profile.icon) {
    formData.append("profile_photo", profile.icon);
  }

  try {
    const res = await fetch(`${BACKEND_URL}/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("Profile saved successfully!");
      await fetchProfile();
    } else {
      const errorText = await res.text();
      console.error("Failed to save profile:", errorText);
      alert(`Failed to save profile: ${errorText}`);
    }
  } catch (error) {
    console.error("Error submitting profile:", error);
    alert("Error submitting profile. Check console for details.");
  }
};

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Profile Icon:
          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        {iconPreview && (
          <div className="icon-preview">
            <img
              src={iconPreview}
              alt="Profile Icon Preview"
              width={100}
              height={100}
            />
          </div>
        )}

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />
        </label>

        {/* Skills Offered */}
<label>
  Skills Offered:
  <input
    type="text"
    placeholder="Type a skill and press Enter"
    value={newSkill}
    onChange={(e) => setNewSkill(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (newSkill.trim()) {
          const updatedSkills = [...profile.skillsOffered, newSkill.trim()];
          setProfile((prev) => ({ ...prev, skillsOffered: updatedSkills }));
          setNewSkill("");
        }
      }
    }}
  />
  {profile.skillsOffered.length > 0 ? (
    <ul>
      {profile.skillsOffered.map((skill, index) => (
        <li key={index}>
          {skill}{" "}
          <button
            type="button"
            onClick={() => {
              const updatedSkills = profile.skillsOffered.filter(
                (_, i) => i !== index
              );
              setProfile((prev) => ({ ...prev, skillsOffered: updatedSkills }));
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p style={{ color: "#888", fontSize: "0.9em" }}>No skills added yet</p>
  )}
</label>

{/* Skills Wanted */}
<label>
  Skills Wanted:
  <input
    type="text"
    placeholder="Type a skill and press Enter"
    value={newWantedSkill}
    onChange={(e) => setNewWantedSkill(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (newWantedSkill.trim()) {
          const updatedSkills = [...profile.skillsWanted, newWantedSkill.trim()];
          setProfile((prev) => ({ ...prev, skillsWanted: updatedSkills }));
          setNewWantedSkill("");
        }
      }
    }}
  />
  {profile.skillsWanted.length > 0 ? (
    <ul>
      {profile.skillsWanted.map((skill, index) => (
        <li key={index}>
          {skill}{" "}
          <button
            type="button"
            onClick={() => {
              const updatedSkills = profile.skillsWanted.filter(
                (_, i) => i !== index
              );
              setProfile((prev) => ({ ...prev, skillsWanted: updatedSkills }));
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p style={{ color: "#888", fontSize: "0.9em" }}>No skills added yet</p>
  )}
</label>

        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <select
            id="availability"
            name="availability"
            value={profile.availability}
            onChange={handleChange}
          >
            <option value="">-- Select Availability --</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekend">Weekend</option>
            <option value="evenings">Evenings</option>
            <option value="mornings">Mornings</option>
          </select>
        </div>

        <label>
          Profile Visibility:
          <select
            name="visibility"
            value={profile.visibility}
            onChange={handleChange}
          >
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

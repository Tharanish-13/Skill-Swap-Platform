# 🤝 Skill Swap Platform

A mini web application that empowers users to exchange skills by offering what they know and requesting what they want to learn — building a collaborative, peer-to-peer learning community.

![Skill Swap Banner](https://your-banner-image-url-if-any.com)

---

## 🚀 Features

### 👤 User Functionality
- Create a profile with name, location (optional), and profile photo
- Add **skills offered** and **skills wanted**
- Set availability: evenings, weekends, etc.
- Make your profile **public or private**
- **Search and browse** other users by skill (e.g., "Excel", "Video Editing")
- Send and manage **swap requests**
- Accept or reject swap offers
- View **current**, **pending**, and **cancelled** swaps
- Rate and give **feedback** after each swap
- Delete unaccepted swap requests

### 🛡️ Admin Capabilities
- Reject spammy or inappropriate skill descriptions
- Ban users who violate policies
- Monitor pending, accepted, and cancelled swaps
- Send platform-wide announcements (e.g., feature updates, downtime)
- Download logs: user activity, feedback, and swap reports

---

## 🛠 Tech Stack

| Frontend       | Backend       | Database | Authentication |
|----------------|----------------|----------|-----------------|
| React + Vite | FastAPI / Flask | MongoDB  | JWT / OAuth     |

---

## 🖼 UI Mockup
📐 [View Wireframe on Excalidraw](https://link.excalidraw.com/l/65VNwvy7c4X/8bM86GXnnUN)

---

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Tharanish-13/Skill-Swap-Platform.git
cd Skill-Swap-Platform
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

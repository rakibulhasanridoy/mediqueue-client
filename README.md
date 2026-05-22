# 🎓 MediQueue – Tutor Booking System

# 🌐 Live Demo
### 🔗 Visit Now:
👉 https://mediqueue-live-link.vercel.app

---

## 📚 Project Overview

**MediQueue** is a modern tutor booking web application built with **Next.js**.  
Students can register, log in, browse available tutors, and book online learning sessions based on subject and time availability.

The platform generates digital session tokens for each booking and allows students to manage their scheduled classes efficiently.

---

## 🎯 Purpose

The goal of this project is to simplify the tutor booking process by eliminating manual scheduling, preventing time slot conflicts, and ensuring a smooth and organized learning experience for students.

---

## ✨ Key Features

### 🧭 Navbar & Layout
- Logo + navigation links (Home, Tutors, My Sessions)
- Conditional UI based on authentication:
  - Logged in → Avatar + Logout button
  - Logged out → Login / Register buttons

---

### 🏠 Home Page
- 🎓 Hero section with educational banners
- ⭐ Featured Tutors section
- 📘 Popular Subjects showcase
- 💬 Student reviews/testimonials

---

### 👨‍🏫 Tutor System
- JSON/Database-based tutor data
- Dynamic tutor rendering
- Tutor Details page with:
  - Subject
  - Experience
  - Availability
  - Session Fee
  - Booking option

---

### 📅 Session Booking System
- Students can book tutor sessions
- Time slot availability checking
- Digital session token generation
- Booking confirmation system

---

# 🔐 Authentication System

## Login Page
- Email & Password login
- Google Social Login
- Redirect to Home after login
- Error handling with toast notifications
- Link to Register page

## Register Page
- Name, Email, Photo URL, Password form
- Google Social Login
- Redirect to Login after registration
- Error handling with toast notifications
- Link to Login page

---

## 👤 Student Dashboard
- Displays user information:
  - Name
  - Email
  - Profile photo
- Shows booked tutoring sessions
- Session token details
- Booking management options

---

## ✏️ Update Profile Feature
- Separate update profile page
- Update Name
- Update Profile Image
- Saves updated profile instantly

---

## 📱 Fully Responsive Design
- Mobile 📱
- Tablet 📟
- Desktop 💻

---

## ⚙️ Extra Features
- Protected Routes
- Environment variables for secure config
- Smooth navigation with Next.js App Router
- Toast notifications for feedback
- Loading skeletons/spinners
- Dynamic routing system

---

## 📁 Project File Structure

```bash
mediqueue/
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── public/
│   ├── tutors.json
│   └── assets/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.jsx
│   │   ├── page.js
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── register/
│   │   │   └── page.jsx
│   │   ├── tutors/
│   │   │   ├── page.jsx
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   ├── page.jsx
│   │   │   └── update-profile/
│   │   │       └── page.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Tutors.jsx
│   │   ├── Reviews.jsx
│   │   ├── Footer.jsx
│   │   └── Toastify.jsx
│   └── lib/
│       ├── auth-client.js
│       ├── auth.js
│       └── db.js
```

---

## 📝 File Descriptions

### 🔧 Root Configuration Files
- `next.config.mjs` – Next.js configuration
- `eslint.config.mjs` – ESLint rules
- `jsconfig.json` – JavaScript/Path aliases
- `postcss.config.mjs` – CSS processing
- `package.json` – Project dependencies

### 📂 Public Directory
- `tutors.json` – Tutor data
- `assets/` – Static images and media files

### 🎨 App Directory (`src/app/`)
- `layout.js` – Root layout wrapper
- `page.js` – Home page
- `globals.css` – Global styles
- `loading.jsx` – Loading spinner/skeleton
- **API Routes** (`api/auth/[...all]/`) – Authentication endpoints

### 📄 Pages
- `login/` – Login page
- `register/` – Register page
- `tutors/` – Tutors listing page
- `tutors/[id]/` – Tutor details page
- `dashboard/` – Student dashboard
- `update-profile/` – Profile update page

### 🧩 Components (`src/components/`)
- `Navbar.jsx` – Header navigation
- `Hero.jsx` – Banner/hero section
- `Tutors.jsx` – Tutor cards/grid
- `Reviews.jsx` – Student testimonials
- `Footer.jsx` – Footer component
- `Toastify.jsx` – Toast notification setup

### 📚 Library (`src/lib/`)
- `auth.js` – Authentication configuration
- `auth-client.js` – Client-side auth setup
- `db.js` – Database configuration

---

## 🧰 Tech Stack

- ⚛️ Next.js (App Router)
- 🎨 Tailwind CSS
- 🧩 DaisyUI
- 🔐 BetterAuth / Firebase Auth
- 💡 JavaScript (ES6+)
- 🔔 React Toastify
- 📦 JSON / MongoDB Database
- 🎨 Framer Motion / Animated.CSS

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=your_app_url
AUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_database_url
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/mediqueue.git
cd mediqueue
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Run Development Server
```bash
npm run dev
```

## 4️⃣ Open in Browser
```bash
http://localhost:3000
```

---

# 👨‍💻 Author

**Rakibul Hasan Ridoy**  
MediQueue Tutor Booking System  
Built with ❤️ using Next.js
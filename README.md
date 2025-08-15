# 🚀 Team Portfolio Management Dashboard – Frontend

This is the frontend of the **Team Portfolio Management Dashboard**, built using **React + Vite** with Sass for styling, and ESLint for code linting.

## ⚙️ Tech Stack

- **React 19**
- **Vite** (bundler)
- **React Router v7**
- **Sass** (CSS preprocessor)
- **ESLint** (linting)
- **JavaScript** (ESM, no TypeScript for now)

---

## 🧱 Project Structure

```bash
├── public/                   # Static assets
├── src/
│   ├── api/                   # API service calls (Axios)
│   ├── assets/                # Images, icons, and static resources
│   ├── auth/                  # Authentication-related components & logic
│   ├── components/            # Reusable UI components
│   ├── constants/             # Static values (labels, configs, etc.)
│   ├── data/                  # Mock data or static JSON files
│   ├── pages/                 # Page-level views (Login, Dashboard, etc.)
│   ├── store/                 # Redux store, slices, and state management
│   ├── styles/                # SCSS styles
│   ├── App.jsx                 # Main application component
│   ├── AppRoutes.jsx           # Application routes
│   └── main.jsx                # Application entry point
├── .gitignore                  # Files Git should ignore
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🌿 Branching Strategy

We follow a simple Git branching model to ensure clean, manageable code collaboration.

- `dev` – ✅ Main development branch (default)
- `feature/<feature-name>` – 🔧 New features or enhancements

---

## 🏗️ Overview of Architecture & Design Choices

The application follows a **modular architecture** with clear separation of concerns:

- **Frontend Framework:** React 19 for UI rendering, using functional components with hooks.
- **State Management:** Redux Toolkit for predictable and scalable state handling.
- **Routing:** React Router v7 for client-side navigation.
- **Styling:** SCSS for component-level styling with variables and mixins for maintainability.
- **API Communication:** Axios for HTTP requests to the backend.
- **Authentication:** Role-based access (Admin & Viewer) handled via JWT tokens (or similar).
- **Code Quality:** ESLint for linting, ensuring a consistent coding style.
- **Performance:** Vite for fast development and optimized production builds.

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/srimali12345/Team-Portfolio-Management-Dashboard-Frontend.git
cd Team-Portfolio-Management-Dashboard-Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev


```

## 📋 Features Implemented

- Simple User Login (Admins & Viewers)
- Team Member Management (Search, Filter, Bench View)
- Project Management (Working & Upcoming Projects)
- Portfolio View (Member Project History)
- Assign & Manage People (Add/Remove from Projects)
- Role-based Access Control
- API integration with a real backend (No mock data)
  

Visit `http://localhost:5173` to view the app in the browser.

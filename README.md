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

The application follows a **modular frontend architecture** to ensure maintainability, scalability, and clear separation of concerns. While the project is deployed as a single codebase (monolithic in deployment), it is **structured into independent, reusable modules**, which makes development and testing easier.

### Key Design Decisions

- **Frontend Framework:**  
  Built with **React 19**, using functional components and hooks for clean, modern UI development.

- **Modular Structure:**  
  The codebase is organized into self-contained modules:

  - `auth/` → authentication logic and components
  - `components/` → reusable UI elements
  - `pages/` → page-level views (Dashboard, Login, etc.)
  - `store/` → feature-based Redux slices for predictable state management

- **State Management:**  
  **Redux Toolkit** is used for centralized, predictable, and scalable state handling.

- **Routing:**  
  **React Router v7** enables client-side navigation between pages.

- **Styling:**  
  **SCSS** is used for component-level styling, with variables and mixins for maintainability.

- **API Communication:**  
  **Axios** handles HTTP requests to the backend for dynamic data operations.

- **Authentication & Authorization:**  
  Role-based access (Admin & Viewer) is enforced using JWT tokens  mechanism.

- **Code Quality:**  
  **ESLint** ensures a consistent coding style and avoids common errors.

- **Performance & Build:**  
  **Vite** provides fast development builds and optimized production bundles.

### Why Modular Architecture?

Even though the frontend is deployed as a single application (monolithic), modular architecture helps:

- Keep code organized and easy to understand
- Develop and test features independently
- Reuse components across multiple pages
- Scale the application without creating tightly coupled code

This structure ensures that as the application grows, it remains maintainable, readable, and extendable.

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

<div align="center">

# 🏗️ Architecture Platform 🏗️

### *Professional architecture and interior design platform with project management, cost calculator, and consultation services*

[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC.svg?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8.svg?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

![React Router](https://img.shields.io/badge/-React_Router_7.8-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer_Motion_12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide React](https://img.shields.io/badge/-Lucide_React_0.54-000000?style=for-the-badge&logo=lucide&logoColor=white)
![Workbox](https://img.shields.io/badge/-Workbox_7.3-4285F4?style=for-the-badge&logo=google&logoColor=white)
![DaisyUI](https://img.shields.io/badge/-DaisyUI_5.0-5A0FC8?style=for-the-badge&logo=daisyui&logoColor=white)
![React Toastify](https://img.shields.io/badge/-React_Toastify_11.0-FF6B6B?style=for-the-badge&logo=react&logoColor=white)

---

</div>

## 🚀 Features

**Project Management & Portfolio**
- Featured projects showcase with detailed galleries
- Project categorization (residential, commercial, interior, consulting)
- Interactive project details with image galleries

**Cost Calculator & Estimation**
- Advanced project cost calculator with multiple parameters
- Configurable project types, areas, and floor counts
- Finish level multipliers and location-based pricing

**Consultation & Services**
- Professional consultation booking system
- Service selection with detailed descriptions
- Consultant profiles and specializations

**E-commerce & Shopping**
- Product catalog with categories and filtering
- Shopping cart with persistent storage
- User favorites and order management

**User Management & Authentication**
- User registration and login system
- Profile management with avatar upload
- Persistent user sessions

**Advanced UI/UX Features**
- Responsive design with mobile-first approach
- Smooth animations using Framer Motion
- Floating elements and particle effects
- Progressive Web App (PWA) capabilities

## 📁 Project Structure

```
architectureplatform/
├── public/                          # Static assets (images, fonts)
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # Core UI components (Button, Input, Modal, etc.)
│   │   ├── featuredProject.tsx      # Featured projects showcase
│   │   ├── service.tsx              # Services display
│   │   ├── slider.tsx               # Hero slider component
│   │   ├── floatingElements.tsx     # Animated background elements
│   │   └── ...                      # Other feature components
│   ├── pages/                       # Application pages (Home, Calculator, Shop, etc.)
│   ├── redux/                       # State management (User, Cart, Profile slices)
│   ├── types/                       # TypeScript type definitions
│   ├── lib/                         # Utility functions
│   ├── App.tsx                      # Main application component
│   └── main.tsx                     # Application entry point
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🏗️ Architecture & Implementation

**State Management**: Redux Toolkit with three main slices (User, Cart, Profile) and localStorage persistence  
**Component Architecture**: Reusable UI components, page components with file-based routing, and feature components  
**Data Flow**: User actions → Redux slices → state updates → localStorage persistence → hydration  
**Performance**: Code splitting, lazy loading, memoization, and bundle optimization  

# 🌍 Voyara Travels — Next-Gen Bespoke Travel & Hospitality Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-0D9488?style=for-the-badge&logo=render&logoColor=white)](https://voyara-reema-2534.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-1E293B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bagraoyash8-sys/reema)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

> **Voyara Travels** is an enterprise-grade travel reservation platform and 5-step bespoke itinerary studio inspired by Agoda, engineered with pure responsive UI, real-time dynamic pricing calculation, cross-device cloud booking synchronization, and scannable digital QR passes.

---

## 🌟 Key Features

- 🔍 **Hero Search Engine**: Real-time auto-suggest across 8 global hubs (Bali, Tokyo, Paris, Goa, Dubai, Santorini, Maldives, Singapore) with dynamic stay night calculations.
- 🎨 **Agoda-Standard Room Matrix**: Side-by-side room specifications (m², bed configurations, inclusions like Free Breakfast & Free Cancellation).
- ✨ **Bespoke 5-Step Custom Trip Planner**: Interactive itinerary builder with dynamic math calculation and an automatic **15% Custom Bundle Discount**.
- 💳 **2-Step Frictionless Checkout**: Flexible payment flows (Credit Card, Pay at Hotel, Instant UPI) and live coupon discount engine (`VOYARA20`).
- 🎫 **Official Digital QR Travel Pass**: Scannable QR vouchers generated on-the-fly (`QRCode.js`) with dedicated `@media print` layout for crisp 1-page paper printing.
- 📱 ⇄ 💻 **Cross-Device Cloud Synchronization**: User authentication linking bookings by email, allowing instant real-time sync across mobile phones, laptops, and tablets.
- 🌐 **Global Multi-Currency Engine**: Live real-time currency conversion across **INR (₹), USD ($), EUR (€), GBP (£), and JPY (¥)**.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            VOYARA TRAVELS ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ CLIENT LAYER ]                                                           │
│  React 18 • TypeScript • Tailwind CSS • Lucide Icons • Canvas-Confetti       │
│                                │                                            │
│                                ▼                                            │
│  [ STATE & CONTEXT ENGINE ]                                                 │
│  AuthContext (Sessions) • BookingContext (Cart/Pass) • CurrencyContext (FX) │
│                                │                                            │
│                                ▼                                            │
│  [ PERSISTENCE & CLOUD SYNC LAYER ]                                         │
│  StorageService • Cloud Database Saver (JSON) • REST API Middleware         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite | Fast Single Page Application (SPA) component architecture |
| **Styling** | Tailwind CSS, PostCSS, Autoprefixer | Luxury dark/light glassmorphism UI & responsive mobile grid |
| **Icons & Media** | Lucide React, Google Fonts (Outfit & Inter) | Visual iconography & typography |
| **QR & Animation** | QRCode.js, Canvas-Confetti | Scannable check-in passes & payment celebration effects |
| **Backend & API** | Node.js, Express.js | REST API routing, coupon validation & CORS management |
| **Data Storage** | JSON Database Saver (`db.js`) & Cloud Sync | Atomic file reads/writes with cross-device user sync |

---

## 📂 Project Structure

```
voyara-travels/
├── public/                  # Static assets, icons, and presentation slides
├── src/
│   ├── components/          # Reusable UI components (Navbar, HeroSearch, RoomMatrix, BookingVoucher)
│   ├── context/             # React Contexts (AuthContext, BookingContext, CurrencyContext, WishlistContext)
│   ├── data/                # Mock hotel data, destinations, curated activities, and coupon rules
│   ├── pages/               # Application views (HomePage, SearchResults, HotelDetail, Checkout, MyTrips)
│   ├── types/               # TypeScript data models and interface definitions
│   └── utils/               # StorageService, date formatters, and calculation helpers
├── data/                    # JSON database storage files (bookings.json, custom_trips.json)
├── package.json             # Dependencies and build scripts
├── tailwind.config.js       # Custom color palette and UI extension rules
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite build pipeline and development server config
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/bagraoyash8-sys/reema.git
cd reema
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your web browser.

---

## 👨‍💻 Project Information

* **Candidate / Lead Developer:** Rajesh B
* **Project Type:** Final Internship Capstone Project
* **Live Deployment:** [https://voyara-reema-2534.onrender.com](https://voyara-reema-2534.onrender.com)

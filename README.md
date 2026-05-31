# SmishGuard: AI-Powered SMS Phishing Detection Prototype

SmishGuard is a Progressive Web App (PWA) prototype designed to demonstrate an advanced, user-friendly interface for detecting SMS phishing (smishing) attacks.

## Live Demo
[https://nikuafreak.github.io/Smishing-ML-Prototype/](https://nikuafreak.github.io/Smishing-ML-Prototype/)

## Development Methodology

The development of this prototype focused on creating a high-fidelity, interactive, and premium user experience while simulating complex backend machine learning and threat intelligence processes.

### 1. Technology Stack
* **Core Framework**: React (with Vite for fast bundling and HMR).
* **Styling**: Vanilla CSS utilizing custom properties (CSS variables) to enforce a strict, harmonious design system (dark mode, glassmorphism).
* **Icons**: `lucide-react` for clean, modern, and consistent iconography.
* **PWA Integration**: Configured with a web manifest, service worker (network-first caching), and responsive viewport constraints to provide a native app feel on mobile devices.

### 2. Design Aesthetics & UX
* **Premium UI**: Implemented a "glassmorphism" aesthetic with semi-transparent panels, background blurs, and subtle animated glows.
* **Tri-State Threat Classification**: 
  * **Safe** (Green): URLs that pass all checks.
  * **Suspicious** (Amber/Orange): URLs with ambiguous patterns requiring human-in-the-loop verification.
  * **Malicious** (Red): URLs confidently flagged as threats by simulated AI or VirusTotal vendors.
* **Micro-interactions**: Hover effects, smooth transitions, and animated scanning spinners keep the interface feeling responsive and alive.

### 3. Simulation & Mock Data
To function as a standalone frontend prototype without requiring a complex backend:
* **Mock Inbox**: Generates a variety of text messages (safe, suspicious, and malicious) with varying URLs and threat levels.
* **Simulated Scans**: Uses asynchronous JavaScript (`setTimeout`) to mimic the delay of analyzing a URL against machine learning models and threat intelligence APIs (like VirusTotal).
* **Analytics**: Provides a dashboard populated with realistic metrics (e.g., AI Accuracy, URLs Scanned) and a live feed of recent mock scans.

### 4. Component Architecture
* **`App.jsx`**: Manages global state, routing between tabs (Home, Messages, Analytics), and the simulated inbox dataset.
* **`Inbox.jsx`**: Renders the message list with dynamic visual indicators (badges, colored borders) based on the scan status of each message.
* **`MessageDetail.jsx`**: Handles the individual message view, the auto-scan visualization, and presents the detailed threat report or user input prompt.
* **`AnalyticsPage.jsx`**: Displays aggregated threat data and recent scan logs using responsive CSS Grid layouts.

### 5. Deployment
* The app is bundled as a static site and deployed to GitHub Pages.
* Because it is a PWA, it can be installed directly to the home screen of iOS and Android devices for a native-like full-screen experience.

## Running Locally

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`

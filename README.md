# User Management System

A modern, responsive User Management Dashboard built with React, TypeScript, and Vite. This application interfaces with the DummyJSON API to provide comprehensive user management features including viewing, creating, editing, and deleting users.

## Features

**Core Capabilities**
- **User Listing**: View users in a paginated, responsive data table with skeleton loading states.
- **Advanced Search & Filtering**: 
  - Search by name or email.
  - Filter users by Role and Gender.
  - Sort by Name (A-Z/Z-A) and Age (Low-High/High-Low).
- **CRUD Operations**: 
  - Add new users via a comprehensive modal form.
  - Edit existing user profiles with pre-filled data.
  - Delete users with a confirmation safeguard.
- **Detailed User Profiles**: Navigate to dedicated user detail pages displaying Basic Info, Address, Company Details, and Additional Information.
- **Form Validation**: robust client-side validation using Formik and Yup for all create/edit fields.

**UI / UX Enhancements**
- **Dark Mode**: Fully supported dark/light theme toggle.
- **Toast Notifications**: Context-aware success and error alerts for user interactions.
- **Sticky Header**: Seamless navigation and theme toggling accessible from anywhere on the page.
- **Responsive Design**: Carefully crafted layout using Tailwind CSS ensuring a seamless experience on both mobile and desktop devices.
- **Custom Components**: Manually built UI components.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup Instructions

1. **Clone or Download the Repository:**
   git clone <repository-url>
   Navigate to development branch

2. **Install Dependencies:**
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

## Run Instructions

1. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server, typically accessible at `http://localhost:5173`.

2. **Build for Production:**
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The built assets will be located in the `dist` directory.

3. **Preview the Production Build:**
   After building, you can locally preview the production version:
   ```bash
   npm run preview
   ```

## Project Structure

```text
src/
├── api/             # API integration using Axios (DummyJSON)
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── common/      # Generic components (Buttons, Inputs, Modals, Tables, Toast)
│   ├── layout/      # App layout components (Header)
│   └── users/       # User-feature specific components (Forms, Filters)
├── pages/           # Application pages (List, Details)
├── types/           # TypeScript interfaces and types
├── utils/           # Utility functions (Toast subscribers)
├── App.tsx          # Main application component & Routing setup
└── main.tsx         # React entry point
```

## Technologies Used
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Formik & Yup
- Phosphor Icons

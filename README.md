# Product Detail Page

A modern product detail page built with React, TypeScript, and Vite — featuring TanStack Query for data fetching, TanStack Router for type-safe routing, and Sass for styling.

## 🔗 Live Demo

👉 [https://product-detail-page-wv6d.vercel.app/product/1](https://product-detail-page-wv6d.vercel.app/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone and Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/product-detail-page.git

# 2. Navigate into the project directory
cd product-detail-page

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Lint the code
npm run lint

# Format the code
npm run format

# Check formatting without writing
npm run format:check
```

---

## 🛠 Tech Stack

| Tool                                           | Purpose                       |
| ---------------------------------------------- | ----------------------------- |
| [React 19](https://react.dev/)                 | UI library                    |
| [TypeScript](https://www.typescriptlang.org/)  | Type safety                   |
| [Vite](https://vitejs.dev/)                    | Build tool & dev server       |
| [TanStack Query](https://tanstack.com/query)   | Server state & data fetching  |
| [TanStack Router](https://tanstack.com/router) | File-based, type-safe routing |
| [Axios](https://axios-http.com/)               | HTTP client                   |
| [Zod](https://zod.dev/)                        | Schema validation             |
| [Sass](https://sass-lang.com/)                 | CSS preprocessing             |
| [Lucide React](https://lucide.dev/)            | Icon library                  |
| [Prettier](https://prettier.io/)               | Code formatting               |
| [ESLint](https://eslint.org/)                  | Code linting                  |

---

## 📁 Project Structure

```
product-detail-page/
├── src/
│   ├── routes/          # TanStack Router file-based routes
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API/Axios service functions
│   ├── types/           # TypeScript types & Zod schemas
│   └── main.tsx         # App entry point
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.app.json
└── tsconfig.node.json
```

---

## 📦 Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Push your code to GitHub
2. Import the repo on Vercel
3. Vercel auto-detects Vite — no extra config needed
4. Click **Deploy**

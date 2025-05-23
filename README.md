# 🎥 GosuVision

GosuVision is a modern anime discovery and tracking web app, inspired by platforms like MyAnimeList. Built using **React**, **Vite**, and the **AniList 

GraphQL API**, it lets users:

- 🔍 Search for any anime title

- 🎴 View trending anime on load

- 📄 Browse detailed info for each anime

- ✨ Styled with custom CSS for a clean, responsive UI

---

## 🚀 Tech Stack

- ⚛️ React (Functional components + Hooks)

- ⚡ Vite (lightning-fast bundler)

- 🎯 GraphQL via [AniList API](https://anilist.gitbook.io/)

- 🧠 Manual CSS styling (`/styles` directory)

---

## 📸 Preview

![Preview](preview.png)

---

## 🛠️ Project Structure

gosuvision-client/

├── src/

│ ├── pages/

│ │ ├── Home.jsx

│ │ ├── AnimeDetails.jsx

│ │ └── Search.jsx

│ ├── styles/

│ │ ├── Home.css

│ │ └── AnimeDetails.css

│ └── main.jsx

├── public/

├── vite.config.js

├── package.json

└── README.md


---

## 📦 Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Ianloschins/gosuvision.git

cd gosuvision/client/gosuvision-client

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

Open http://localhost:5173 in your browser.

🔍 Powered By

AniList GraphQL API

React Router DOM

Vite

✅ To-Do Next
 Add watchlist feature via localStorage

 Pagination or infinite scroll

 Filter by genre/status

 User auth (optional)

 Deployment to Vercel or Netlify

📜 License
MIT © 2025 Ian Loschinskey


---

Let me know if you want to add deployment instructions (Netlify/Vercel), or turn this into a polished public GitHub

🚀 Blogify

A full-stack blog platform built with the MERN stack, designed to provide a seamless and rich user experience for creating, managing, and engaging with blog content.

Blogify enables users to:
✅ Authenticate securely (JWT + Google OAuth)
✅ Create and edit blogs with rich text support
✅ Organize posts by categories
✅ Interact through likes and comments
✅ Discover content with advanced search

🔧 Tech Stack
Frontend

⚛️ React 19 with Vite – Modern, fast, and efficient frontend setup

🎨 Tailwind CSS + shadcn/ui – Responsive, accessible, and elegant UI

📦 Redux Toolkit + Redux Persist – State management with persistence

📝 CKEditor – Rich text blog editor

🔐 Firebase – Google OAuth authentication

🌐 React Router DOM – Client-side routing

✅ React Hook Form – Form validation

🔔 React Toastify – Notifications

🖼️ Lucide React – Icon system

⚡ Custom useFetch Hook – Simplified API calls

Backend

🖥️ Express.js – Scalable Node.js framework

🗄️ MongoDB + Mongoose – NoSQL database & ODM

🔑 JWT – Secure token-based authentication

🔒 Bcryptjs – Password hashing

☁️ Cloudinary – Media storage & optimization

📂 Multer – File uploads

🌍 CORS – API security

⏱️ Express Rate Limit – API rate limiting

Deployment

☁️ Vercel – Frontend + serverless backend hosting

📌 Key Features
🔐 User Authentication

JWT-based authentication

Google OAuth via Firebase

Secure registration, login, and session persistence

📝 Blog Management

Create, update, delete blogs

Rich-text editor (CKEditor)

Media uploads (Cloudinary)

Draft & publish options

🏷️ Categories

Create & manage categories

Filter blogs by category

Role-based (admin) category control

❤️ Likes & Engagement

Like/unlike system

Real-time updates

💬 Comments

Nested comment threads

Add, view, and manage comments

🔍 Search

Search by title, content, or author

Instant results with filters

👑 Admin Tools

User management

Content moderation dashboard

📱 Responsive Design

Mobile-first UI

Works across devices

🎥 Demo

📺 Demo Video: https://vimeo.com/1124575698?share=copy

🌐 Live Demo: https://blogify-pzaq.vercel.app


⚙️ Installation & Setup
Prerequisites

Node.js (v18+)

MongoDB (local/Atlas)

Git

Clone the Repo
git clone <your-repo-url>
cd blogify

Backend Setup
cd server
npm install

Frontend Setup
cd ../client
npm install

Environment Variables

Server (.env):

PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
FRONTEND_URL=http://localhost:5173


Client (.env):

VITE_API_BASE_URL=http://localhost:8000/api
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx

Run the Project

Backend:

cd server
npm run dev


Frontend:

cd client
npm run dev


Access frontend: http://localhost:5173

API server: http://localhost:8000

🤝 Contribution

Contributions are welcome!

Fork the repo

Create a branch (git checkout -b feature/xyz)

Commit your changes (git commit -m 'Added xyz feature')

Push to branch (git push origin feature/xyz)

Create a Pull Request

📄 License

This project is licensed under the ISC License.

👨‍💻 Author

[Om Verma]

🌐 GitHub: https://github.com/OmVerma420

💼 LinkedIn: https://www.linkedin.com/in/me/

🔥 Built with passion using the MERN stack

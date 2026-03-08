# 🛒 MarketNest

MarketNest is a **full-stack MERN marketplace application** where users can browse products, create listings, and manage their marketplace activity. The platform provides secure authentication, product management, and image uploads with a modern UI.

---

# 🚀 Live Demo

Frontend (Vercel)  
https://market-nest.vercel.app

Backend API (Render)  
https://marketnest-c5n5.onrender.com

---

# 🧑‍💻 Tech Stack

## Frontend
- React (Vite)
- Context API
- Axios
- React Router
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Tokens)

## Cloud Services
- Cloudinary (image storage)
- MongoDB Atlas (database)
- Render (backend hosting)
- Vercel (frontend hosting)

---

# ✨ Features

### 🔐 Authentication
- User signup and login
- JWT based authentication
- Protected routes
- Role-based middleware

### 🛍 Marketplace
- Browse available products
- View product details
- Search and filter products

### 📦 Product Management
- Create product listings
- Edit products
- Delete products

### 🖼 Image Upload
- Product images uploaded to Cloudinary

### 📊 Dashboard
- User dashboard to manage products

---

# 📂 Project Structure

```
MarketNest
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── app.js
│   │
│   └── server.js
│
└── frontend
    ├── src
    │   ├── components
    │   ├── context
    │   ├── pages
    │   ├── services
    │   └── App.jsx
```

---

# 🔗 API Routes

## Auth Routes

```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/profile
```

## Product Routes

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder.

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

Frontend `.env`

```
VITE_API_URL=https://marketnest-c5n5.onrender.com/api
```

---

# 🛠 Installation

## Clone the repository

```
git clone https://github.com/Anuj1101/MarketNest.git
cd MarketNest
```

---

## Install backend dependencies

```
cd backend
npm install
```

Run backend

```
npm run dev
```

---

## Install frontend dependencies

```
cd frontend
npm install
```

Run frontend

```
npm run dev
```

---

# 📦 Deployment

Frontend → Vercel  
Backend → Render  
Database → MongoDB Atlas  
Images → Cloudinary

---

# 🔮 Future Improvements

- Payment integration (Stripe)
- Product reviews and ratings
- Wishlist feature
- Admin dashboard
- Real-time notifications

---

# 🤝 Contributing

Contributions are welcome.  
Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Anuj Kumar

GitHub:  
https://github.com/Anuj1101

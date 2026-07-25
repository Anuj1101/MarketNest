const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middlewares/errorMiddleware")

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "https://market-nest-coral.vercel.app",
  "https://market-nest-bqa2xb7ag-anujs-projects-d09b3b9a.vercel.app"
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error("Not allowed by CORS"))
    },
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
  })
);
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

// Error handler (always last)
app.use(errorMiddleware)

module.exports = app
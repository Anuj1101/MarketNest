const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middlewares/errorMiddleware")

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

// Error handler (always last)
app.use(errorMiddleware)

module.exports = app
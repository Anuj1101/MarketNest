require("dotenv").config()
const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("./src/models/User")
const Product = require("./src/models/Product")

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")

    await User.deleteMany({})
    await Product.deleteMany({})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("password123", salt)

    const users = await User.insertMany([
        { name: "TechBrand", email: "tech@brand.com", password: hashedPassword, role: "brand" },
        { name: "FashionHub", email: "fashion@brand.com", password: hashedPassword, role: "brand" },
        { name: "John Doe", email: "john@customer.com", password: hashedPassword, role: "customer" },
    ])

    const [techBrand, fashionHub] = users

    await Product.insertMany([
        {
            name: "Wireless Headphones",
            description: "Premium noise-cancelling wireless headphones with 30hr battery life.",
            price: 2999,
            category: "Electronics",
            images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
            brand: techBrand._id,
            status: "published"
        },
        {
            name: "Mechanical Keyboard",
            description: "RGB mechanical keyboard with tactile switches, perfect for gaming and typing.",
            price: 4499,
            category: "Electronics",
            images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"],
            brand: techBrand._id,
            status: "published"
        },
        {
            name: "Smartwatch Pro",
            description: "Feature-packed smartwatch with health tracking, GPS, and 7-day battery.",
            price: 8999,
            category: "Electronics",
            images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"],
            brand: techBrand._id,
            status: "published"
        },
        {
            name: "Running Sneakers",
            description: "Lightweight and breathable running shoes with cushioned sole.",
            price: 3499,
            category: "Footwear",
            images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
            brand: fashionHub._id,
            status: "published"
        },
        {
            name: "Denim Jacket",
            description: "Classic slim-fit denim jacket, available in multiple sizes.",
            price: 1999,
            category: "Clothing",
            images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400"],
            brand: fashionHub._id,
            status: "published"
        },
        {
            name: "Leather Wallet",
            description: "Genuine leather bifold wallet with RFID blocking.",
            price: 799,
            category: "Accessories",
            images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400"],
            brand: fashionHub._id,
            status: "published"
        },
    ])

    console.log("Sample data seeded successfully!")
    console.log("Brand logins: tech@brand.com / fashion@brand.com  |  password: password123")
    process.exit(0)
}

seed().catch(e => { console.error(e.message); process.exit(1) })

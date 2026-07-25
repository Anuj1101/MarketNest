require("dotenv").config()
const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])

const app = require("./src/app")
const connectDb = require("./src/config/db")

const PORT = process.env.PORT || 5000

connectDb()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require("express")

const router = express.Router()

const {
    signup,
    login,
    logout,
    refreshAccessToken
} = require("../controllers/authController")

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refresh", refreshAccessToken)

module.exports = router
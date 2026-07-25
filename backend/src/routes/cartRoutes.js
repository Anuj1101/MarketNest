const express = require("express")
const router = express.Router()
const { getCart, addToCart, updateCartQty, removeFromCart, clearCart } = require("../controllers/cartController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

router.use(authMiddleware, roleMiddleware("customer"))

router.get("/", getCart)
router.post("/", addToCart)
router.put("/:productId", updateCartQty)
router.delete("/clear", clearCart)
router.delete("/:productId", removeFromCart)

module.exports = router

const express = require("express")
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router()

const {
createProduct,
updateProduct,
deleteProduct,
getDashboardStats,
getProducts,
getProductById,
getMyProducts,
getMyProductById
} = require("../controllers/productController")

const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

// Create Product
router.post(
"/",
authMiddleware,
roleMiddleware("brand"),
upload.array("images",5),
createProduct
)

// Update Product
router.put(
"/:id",
authMiddleware,
roleMiddleware("brand"),
upload.array("images",5),
updateProduct
)

// Soft Delete Product
router.delete(
"/:id",
authMiddleware,
roleMiddleware("brand"),
deleteProduct
)

// Brand Dashboard
router.get(
"/dashboard",
authMiddleware,
roleMiddleware("brand"),
getDashboardStats
)

// Brand Products
router.get(
"/my-products",
authMiddleware,
roleMiddleware("brand"),
getMyProducts
)

// Brand Single Product (for edit)
router.get(
"/my-products/:id",
authMiddleware,
roleMiddleware("brand"),
getMyProductById
)

// Marketplace
router.get("/", getProducts)

// Product Details
router.get("/:id", getProductById)

module.exports = router
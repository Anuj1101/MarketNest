const User = require("../models/User")

const getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product")
        res.json(user.cart)
    } catch (error) { next(error) }
}

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body
        const user = await User.findById(req.user.id)
        const existing = user.cart.find(i => i.product.toString() === productId)
        if (existing) {
            existing.quantity += quantity
        } else {
            user.cart.push({ product: productId, quantity })
        }
        await user.save()
        res.json({ message: "Added to cart" })
    } catch (error) { next(error) }
}

const removeFromCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        user.cart = user.cart.filter(i => i.product.toString() !== req.params.productId)
        await user.save()
        res.json({ message: "Removed from cart" })
    } catch (error) { next(error) }
}

const clearCart = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { cart: [] })
        res.json({ message: "Cart cleared" })
    } catch (error) { next(error) }
}

const updateCartQty = async (req, res, next) => {
    try {
        const { quantity } = req.body
        const user = await User.findById(req.user.id)
        const item = user.cart.find(i => i.product.toString() === req.params.productId)
        if (!item) return res.status(404).json({ message: "Item not in cart" })
        item.quantity = quantity
        await user.save()
        res.json({ message: "Quantity updated" })
    } catch (error) { next(error) }
}

module.exports = { getCart, addToCart, updateCartQty, removeFromCart, clearCart }

const Product = require("../models/Product")

const createProduct = async (req,res,next)=>{

    try{

        const {name,description,price,category,status} = req.body

        const images = req.files.map(file => file.path)

        const product = await Product.create({
            name,
            description,
            price,
            category,
            status,
            images,
            brand:req.user.id
        })

        res.status(201).json(product)

    }catch(error){
        next(error)
    }

}


// UPDATE PRODUCT
const updateProduct = async (req,res,next)=>{

    try{

        const product = await Product.findById(req.params.id)

        if(!product){
            res.status(404)
            throw new Error("Product not found")
        }

        // ownership check
        if(product.brand.toString() !== req.user.id){
            res.status(403)
            throw new Error("You can edit only your own products")
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.json(updatedProduct)

    }catch(error){
        next(error)
    }

}
// SOFT DELETE PRODUCT
const deleteProduct = async (req,res,next)=>{

    try{

        const product = await Product.findById(req.params.id)

        if(!product){
            res.status(404)
            throw new Error("Product not found")
        }

        // ownership check
        if(product.brand.toString() !== req.user.id){
            res.status(403)
            throw new Error("You can delete only your own products")
        }

        product.isDeleted = true

        await product.save()

        res.json({
            message:"Product archived successfully"
        })

    }catch(error){
        next(error)
    }

}
// BRAND DASHBOARD
const getDashboardStats = async (req,res,next)=>{

    try{

        const brandId = req.user.id

        const totalProducts = await Product.countDocuments({
            brand:brandId,
            isDeleted:false
        })

        const publishedProducts = await Product.countDocuments({
            brand:brandId,
            status:"published",
            isDeleted:false
        })

        const archivedProducts = await Product.countDocuments({
            brand:brandId,
            status:"archived",
            isDeleted:false
        })

        res.json({
            totalProducts,
            publishedProducts,
            archivedProducts
        })

    }catch(error){
        next(error)
    }

}
// GET ALL PRODUCTS (Marketplace)
const getProducts = async (req,res,next)=>{

    try{

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ""
        const category = req.query.category

        const skip = (page - 1) * limit

        const query = {
            isDeleted:false,
            status:"published"
        }

        if(search){
            query.name = {
                $regex:search,
                $options:"i"
            }
        }

        if(category){
            query.category = category
        }

        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .populate("brand","name")

        const total = await Product.countDocuments(query)

        res.json({
            page,
            totalPages:Math.ceil(total/limit),
            totalProducts:total,
            products
        })

    }catch(error){
        next(error)
    }

}
// GET SINGLE PRODUCT
const getProductById = async (req,res,next)=>{

    try{

        const product = await Product.findOne({
            _id:req.params.id,
            isDeleted:false,
            status:"published"
        }).populate("brand","name")

        if(!product){
            res.status(404)
            throw new Error("Product not found")
        }

        res.json(product)

    }catch(error){
        next(error)
    }

}
// GET PRODUCTS OF LOGGED-IN BRAND
const getMyProducts = async (req, res, next) => {

    try {

        const products = await Product.find({
            brand: req.user.id,
            isDeleted: false
        }).sort({ createdAt: -1 })

        res.json(products)

    } catch (error) {
        next(error)
    }

}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDashboardStats,
    getProducts,
    getProductById,
    getMyProducts
}
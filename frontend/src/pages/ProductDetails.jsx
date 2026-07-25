import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeftIcon, ShoppingBagIcon, TagIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import API from "../services/api"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!product) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="bg-gray-50 p-6 flex flex-col gap-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[activeImg] || "https://via.placeholder.com/500"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-indigo-500" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
                  <TagIcon className="h-3.5 w-3.5" />
                  {product.category}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
                <p className="text-3xl font-black text-gray-900">₹{product.price.toLocaleString("en-IN")}</p>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {product.brand && (
                  <div className="flex items-center gap-2 pt-2 text-sm text-gray-500">
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Sold by <span className="font-semibold text-gray-700">{product.brand.name}</span></span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100">
                  <ShoppingBagIcon className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

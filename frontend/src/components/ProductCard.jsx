import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product._id}`} className="block aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1 block">
          {product.category}
        </span>
        <h3 className="text-gray-900 font-bold truncate group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-lg font-black text-gray-900 mt-1">₹{product.price.toLocaleString()}</p>
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
          <ShoppingBagIcon className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
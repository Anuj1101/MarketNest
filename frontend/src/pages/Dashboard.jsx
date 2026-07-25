import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
  const { role } = useAuth();
  return role === "brand" ? <BrandDashboard /> : <CustomerDashboard />;
}

// ─── Brand Dashboard ───────────────────────────────────────────────────────────
function BrandDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, publishedProducts: 0, archivedProducts: 0 });
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const [statsRes, prodRes] = await Promise.all([
        API.get("/products/dashboard"),
        API.get("/products/my-products")
      ]);
      setStats(statsRes.data);
      setProducts(prodRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchData();
    } catch { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Storefront Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your listings, check status, and grow your sales.</p>
          </div>
          <Link to="/create-product" className="mt-4 md:mt-0 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <span className="mr-2">+</span> Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          <StatCard label="Total Inventory" value={stats.totalProducts} textColor="text-indigo-600" icon="📦" />
          <StatCard label="Live Listings" value={stats.publishedProducts} textColor="text-emerald-600" icon="🚀" />
          <StatCard label="Archived" value={stats.archivedProducts} textColor="text-slate-400" icon="📁" />
        </div>

        <div className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">My Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {products.length > 0 ? products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{p.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                      <Link to={`/edit-product/${p._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      <button onClick={() => deleteProduct(p._id)} className="text-rose-600 hover:text-rose-900">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400">You haven't added any products yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Customer Dashboard ────────────────────────────────────────────────────────
function CustomerDashboard() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [cartRes, prodRes] = await Promise.all([
        API.get("/cart"),
        API.get("/products")
      ]);
      setCart(cartRes.data);
      setProducts(prodRes.data.products || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", { productId });
      fetchData();
    } catch { alert("Failed to add to cart"); }
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      fetchData();
    } catch { alert("Failed to remove from cart"); }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const cartProductIds = new Set(cart.map(i => i.product?._id));

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">My Dashboard</h1>
        <p className="text-sm text-slate-500 mb-10">Browse products and manage your cart.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Products */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Available Products</h2>
            {products.length === 0 ? (
              <p className="text-slate-400">No products available yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover" />}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900">{p.name}</h3>
                      <p className="text-sm text-slate-500 mb-3">{p.category} · ₹{p.price.toLocaleString("en-IN")}</p>
                      <div className="flex gap-2">
                        <Link to={`/product/${p._id}`} className="flex-1 text-center text-xs font-semibold border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition-colors">
                          View
                        </Link>
                        {cartProductIds.has(p._id) ? (
                          <button onClick={() => removeFromCart(p._id)} className="flex-1 text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 rounded-lg py-2 hover:bg-rose-100 transition-colors">
                            Remove
                          </button>
                        ) : (
                          <button onClick={() => addToCart(p._id)} className="flex-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors">
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">My Cart ({cart.length})</h2>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {cart.length === 0 ? (
                <p className="p-6 text-slate-400 text-sm text-center">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <li key={item.product?._id} className="flex items-center gap-3 px-4 py-3">
                        {item.product?.images?.[0] && <img src={item.product.images[0]} className="w-12 h-12 rounded-lg object-cover" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{item.product?.name}</p>
                          <p className="text-xs text-slate-500">₹{item.product?.price?.toLocaleString("en-IN")} × {item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product?._id)} className="text-rose-400 hover:text-rose-600 text-xs font-bold">✕</button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">Total</span>
                    <span className="text-sm font-bold text-indigo-600">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, textColor, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
    <div className="text-3xl bg-slate-50 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  </div>
);

export default Dashboard;

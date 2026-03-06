import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, publishedProducts: 0, archivedProducts: 0 });
  const [products, setProducts] = useState([]);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const fetchData = async () => {
    try {
      const [statsRes, prodRes] = await Promise.all([
        API.get("/products/dashboard", getAuthHeader()),
        API.get("/products/my-products", getAuthHeader())
      ]);
      setStats(statsRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error("Sync Error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await API.delete(`/products/${id}`, getAuthHeader());
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Main Content Container --- */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Storefront Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your listings, check status, and grow your sales.</p>
          </div>
          <Link to="/create-product" className="mt-4 md:mt-0 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="mr-2">+</span> Add New Product
          </Link>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          <StatCard label="Total Inventory" value={stats.totalProducts} color="bg-white" textColor="text-indigo-600" icon="📦" />
          <StatCard label="Live Listings" value={stats.publishedProducts} color="bg-white" textColor="text-emerald-600" icon="🚀" />
          <StatCard label="Archived" value={stats.archivedProducts} color="bg-white" textColor="text-slate-400" icon="📁" />
        </div>

        {/* --- Product Table Section --- */}
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
                {products.length > 0 ? products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <Link to={`/edit-product/${product._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      <button onClick={() => deleteProduct(product._id)} className="text-rose-600 hover:text-rose-900">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                      You haven't added any products yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Reusable Stat Card Component ---
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
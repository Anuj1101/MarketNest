import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar stays visible on all pages */}
        <div className="pt-4"> {/* Spacing for sticky navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Marketplace />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-product" 
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-product/:id" 
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              } 
            />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
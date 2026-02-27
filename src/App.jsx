import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CategoryMenuPage from './pages/CategoryMenuPAge';
import TakeAway from './pages/TakeAway';
import Events from './pages/Events';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDishes from './pages/admin/AdminDishes';
import AdminCategories from './pages/admin/AdminCategories';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { AdminAuthProvider } from './contexts/AdminAuthProvider';
import Cart from './pages/Cart';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/:categoryName" element={<CategoryMenuPage />} />
              <Route path="/takeaway" element={<TakeAway />} />
              <Route path="/events" element={<Events />} />
              <Route path="/cart" element={<Cart />} /> 

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute  >} />
              <Route path="/admin/categories" element={<ProtectedAdminRoute><AdminDishes /></ProtectedAdminRoute>} />
              <Route path="/admin/dishes" element={<ProtectedAdminRoute><AdminCategories /></ProtectedAdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
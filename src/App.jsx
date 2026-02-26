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
import { AdminAuthProvider } from './contexts/AdminAuthProvider';

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

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/categories" element={<AdminDishes />} />
              <Route path="/admin/dishes" element={<AdminCategories />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
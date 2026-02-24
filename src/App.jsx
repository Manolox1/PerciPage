import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CategoryMenuPage from './pages/CategoryMenuPAge';
import TakeAway from './pages/TakeAway';
import Events from './pages/Events';


function App() {
  return (
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
            </Routes>
          </main>
          <Footer />
        </div>
    </Router>
  );
}

export default App;

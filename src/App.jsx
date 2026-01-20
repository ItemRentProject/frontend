import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/globals.css';

// Страницы
import HomePage from './pages/index';
import ItemsPage from './pages/items';
import { default as ItemDetailPage, default as RentPage } from './pages/items/[id]';
import AddItemPage from './pages/items/add';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';


import { AuthProvider } from './components/contexts/AuthContext';


export default function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/rent/:id" element={<RentPage />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}
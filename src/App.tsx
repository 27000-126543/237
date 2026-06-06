import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import DesignersPage from './pages/DesignersPage';
import DesignerDetailPage from './pages/DesignerDetailPage';
import MallPage from './pages/MallPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ConstructionPage from './pages/ConstructionPage';
import ConstructionProgressPage from './pages/ConstructionProgressPage';
import InstallmentPage from './pages/InstallmentPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/designers" element={<DesignersPage />} />
        <Route path="/designer/:id" element={<DesignerDetailPage />} />
        <Route path="/mall" element={<MallPage />} />
        <Route path="/mall/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/construction" element={<ConstructionPage />} />
        <Route path="/construction/:id/progress" element={<ConstructionProgressPage />} />
        <Route path="/installment" element={<InstallmentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Menu,
  X,
  Home,
  Palette,
  ShoppingBag,
  Hammer,
  CreditCard,
  UserCircle,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const navItems = [
  { label: '首页', path: '/', icon: Home },
  { label: '找设计师', path: '/designers', icon: Palette },
  { label: '材料商城', path: '/mall', icon: ShoppingBag },
  { label: '施工管理', path: '/construction', icon: Hammer },
  { label: '装修分期', path: '/installment', icon: CreditCard },
  { label: '个人中心', path: '/profile', icon: UserCircle },
];

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans">
      <header className="bg-walnut-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-walnut-900" />
                </div>
                <span className="text-xl md:text-2xl font-serif font-bold text-gold-500">
                  筑家
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-gold-500 hover:bg-walnut-800 rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索设计师、材料..."
                  className="w-full pl-10 pr-4 py-2 bg-walnut-800 border border-walnut-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-walnut-800 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20avatar&image_size=square'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gold-500"
                    />
                    <span className="hidden md:inline text-sm font-medium">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.phone}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <UserCircle className="w-4 h-4" />
                        个人中心
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        设置
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-gold-500 text-walnut-900 rounded-lg hover:bg-gold-400 transition-colors"
                  >
                    注册
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-walnut-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索设计师、材料..."
                className="w-full pl-10 pr-4 py-2 bg-walnut-800 border border-walnut-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-walnut-800 border-t border-walnut-700">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-gold-500 hover:bg-walnut-700 rounded-lg transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-walnut-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-walnut-900" />
                </div>
                <span className="text-xl font-serif font-bold text-gold-500">
                  筑家
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                专业的装修服务平台，连接业主、设计师、施工队和材料商，为您打造梦想家园。
              </p>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-gold-500 mb-4">
                快速链接
              </h3>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-gold-500 mb-4">
                服务支持
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    帮助中心
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-gold-500 mb-4">
                联系方式
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>客服热线：400-888-8888</li>
                <li>工作时间：9:00 - 18:00</li>
                <li>邮箱：service@zhujia.com</li>
                <li>地址：北京市朝阳区xxx大厦</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-walnut-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 筑家平台. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

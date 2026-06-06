import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.phone, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败，请检查手机号和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-walnut-900" />
            </div>
            <span className="text-2xl font-serif font-bold text-walnut-900">筑家</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-walnut-900 mb-2">欢迎回来</h1>
          <p className="text-walnut-500">登录您的账号，开始装修之旅</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-walnut-700 mb-2">手机号</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-walnut-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="请输入手机号"
                  className="w-full pl-10 pr-4 py-3 border border-walnut-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-walnut-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-walnut-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="请输入密码"
                  className="w-full pl-10 pr-12 py-3 border border-walnut-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-walnut-400 hover:text-walnut-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-gold-500 rounded border-walnut-300 focus:ring-gold-500" />
                <span className="text-sm text-walnut-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-gold-600 hover:text-gold-700">忘记密码？</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-walnut-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-walnut-500">
              还没有账号？{' '}
              <Link to="/register" className="text-gold-600 hover:text-gold-700 font-medium">立即注册</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

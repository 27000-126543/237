import { Link } from 'react-router-dom';
import {
  Home,
  User,
  Settings,
  Heart,
  Package,
  CreditCard,
  MessageCircle,
  ChevronRight,
  MapPin,
  Bell,
  HelpCircle,
} from 'lucide-react';

const ProfilePage = () => {
  const user = {
    name: '张三',
    phone: '138****8888',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20avatar&image_size=square',
    level: 'VIP会员',
    points: 2580,
    coupons: 5,
  };

  const menuItems = [
    { icon: Heart, label: '我的收藏', path: '/profile/favorites', count: 12 },
    { icon: Package, label: '我的订单', path: '/orders', count: 3 },
    { icon: CreditCard, label: '我的钱包', path: '/profile/wallet' },
    { icon: MapPin, label: '收货地址', path: '/profile/addresses' },
    { icon: MessageCircle, label: '消息中心', path: '/profile/messages', count: 5 },
    { icon: Bell, label: '系统通知', path: '/profile/notifications' },
    { icon: Settings, label: '账号设置', path: '/profile/settings' },
    { icon: HelpCircle, label: '帮助中心', path: '/help' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">个人中心</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-walnut-800 to-walnut-900 p-6 text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gold-500 object-cover"
                />
                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-walnut-300 text-sm mb-3">{user.phone}</p>
                <span className="inline-block px-3 py-1 bg-gold-500/20 text-gold-400 text-xs font-medium rounded-full">
                  {user.level}
                </span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-walnut-100 py-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-walnut-900">{user.points}</p>
                  <p className="text-xs text-walnut-500">积分</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-walnut-900">{user.coupons}</p>
                  <p className="text-xs text-walnut-500">优惠券</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-walnut-900">0</p>
                  <p className="text-xs text-walnut-500">关注</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-walnut-100">
                <h3 className="text-lg font-semibold text-walnut-900">我的服务</h3>
              </div>
              <div className="divide-y divide-walnut-100">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-center justify-between px-6 py-4 hover:bg-walnut-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-walnut-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-walnut-600" />
                        </div>
                        <span className="text-walnut-700 font-medium">{item.label}</span>
                        {'count' in item && item.count && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.count}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-walnut-400" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/designers"
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-walnut-900">找设计师</p>
                  <p className="text-sm text-walnut-500">千名专业设计师</p>
                </div>
              </Link>
              <Link
                to="/mall"
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-walnut-900">材料商城</p>
                  <p className="text-sm text-walnut-500">建材一站购齐</p>
                </div>
              </Link>
              <Link
                to="/construction"
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-walnut-900">施工管理</p>
                  <p className="text-sm text-walnut-500">实时查看进度</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

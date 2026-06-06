import {
  Users,
  ShoppingCart,
  Palette,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const stats = [
    {
      title: '总用户数',
      value: '12,845',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: '设计师',
      value: '328',
      change: '+8.2%',
      trend: 'up',
      icon: Palette,
      color: 'bg-purple-500',
    },
    {
      title: '订单总数',
      value: '3,521',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      title: '总交易额',
      value: '¥2,856万',
      change: '+22.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gold-500',
    },
  ];

  const recentOrders = [
    { id: 'ORD20240201001', customer: '张先生', type: '设计服务', amount: 15000, status: '已付款', date: '2024-02-01' },
    { id: 'ORD20240201002', customer: '李女士', type: '材料订单', amount: 28500, status: '待发货', date: '2024-02-01' },
    { id: 'ORD20240131003', customer: '王先生', type: '装修套餐', amount: 128000, status: '施工中', date: '2024-01-31' },
    { id: 'ORD20240131004', customer: '赵女士', type: '设计服务', amount: 12000, status: '已完成', date: '2024-01-31' },
    { id: 'ORD20240130005', customer: '孙先生', type: '材料订单', amount: 35600, status: '已付款', date: '2024-01-30' },
  ];

  const recentDesigners = [
    { name: '张明', avatar: 'https://picsum.photos/seed/d1/100/100', projects: 156, rating: 4.9, status: '在线' },
    { name: '李华', avatar: 'https://picsum.photos/seed/d2/100/100', projects: 128, rating: 4.8, status: '在线' },
    { name: '王芳', avatar: 'https://picsum.photos/seed/d3/100/100', projects: 98, rating: 4.7, status: '忙碌' },
    { name: '陈伟', avatar: 'https://picsum.photos/seed/d4/100/100', projects: 87, rating: 4.9, status: '离线' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">管理看板</h1>
        <p className="text-gray-500 mt-1">欢迎回来，这是您的平台运营概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
            <Link to="/admin/orders" className="text-sm text-gold-600 hover:text-gold-700 font-medium">
              查看全部
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">¥{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === '已付款' ? 'bg-green-100 text-green-700' :
                        order.status === '待发货' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === '施工中' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">活跃设计师</h2>
            <Link to="/admin/designers" className="text-sm text-gold-600 hover:text-gold-700 font-medium">
              查看全部
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {recentDesigners.map((designer, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="relative">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    designer.status === '在线' ? 'bg-green-500' :
                    designer.status === '忙碌' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{designer.name}</p>
                  <p className="text-sm text-gray-500">{designer.projects}个作品 · {designer.rating}分</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  designer.status === '在线' ? 'bg-green-100 text-green-700' :
                  designer.status === '忙碌' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {designer.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin/analytics"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">数据分析</h3>
              <p className="text-sm text-gray-500">查看详细数据报表</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">报表导出</h3>
              <p className="text-sm text-gray-500">导出各类报表</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">订单管理</h3>
              <p className="text-sm text-gray-500">处理所有订单</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/designers"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">设计师管理</h3>
              <p className="text-sm text-gray-500">管理设计师账号</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;

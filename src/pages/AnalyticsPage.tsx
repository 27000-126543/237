import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Calendar, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('month');

  const monthlyRevenue = [
    { month: '1月', revenue: 180, orders: 120 },
    { month: '2月', revenue: 220, orders: 150 },
    { month: '3月', revenue: 280, orders: 190 },
    { month: '4月', revenue: 320, orders: 210 },
    { month: '5月', revenue: 380, orders: 250 },
    { month: '6月', revenue: 420, orders: 280 },
  ];

  const userGrowth = [
    { date: '第1周', users: 500 },
    { date: '第2周', users: 800 },
    { date: '第3周', users: 1200 },
    { date: '第4周', users: 1500 },
  ];

  const orderDistribution = [
    { name: '设计服务', value: 35, color: '#FFB300' },
    { name: '材料订单', value: 45, color: '#78716c' },
    { name: '装修套餐', value: 20, color: '#d6d3d1' },
  ];

  const topDesigners = [
    { rank: 1, name: '张明', orders: 56, revenue: 840000, rating: 4.9 },
    { rank: 2, name: '李华', orders: 48, revenue: 720000, rating: 4.8 },
    { rank: 3, name: '王芳', orders: 42, revenue: 630000, rating: 4.7 },
    { rank: 4, name: '陈伟', orders: 38, revenue: 570000, rating: 4.9 },
    { rank: 5, name: '刘洋', orders: 35, revenue: 525000, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
          <p className="text-gray-500 mt-1">深入了解平台运营数据</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
            <option value="year">本年</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">总营收</p>
              <p className="text-2xl font-bold text-gray-900">¥428.5万</p>
              <p className="text-xs text-green-600">↑ 15.2% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">订单数</p>
              <p className="text-2xl font-bold text-gray-900">1,200</p>
              <p className="text-xs text-green-600">↑ 12.8% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">新增用户</p>
              <p className="text-2xl font-bold text-gray-900">3,200</p>
              <p className="text-xs text-green-600">↑ 18.5% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">转化率</p>
              <p className="text-2xl font-bold text-gray-900">24.5%</p>
              <p className="text-xs text-green-600">↑ 3.2% 较上月</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">月度营收趋势</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="营收(万元)" fill="#FFB300" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" name="订单数" fill="#78716c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">用户增长趋势</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="新增用户"
                  stroke="#FFB300"
                  strokeWidth={3}
                  dot={{ fill: '#FFB300', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">订单类型分布</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {orderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">设计师排行榜</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">设计师</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">接单量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">营收</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">评分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topDesigners.map((designer) => (
                  <tr key={designer.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        designer.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        designer.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        designer.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {designer.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{designer.name}</td>
                    <td className="px-6 py-4 text-gray-600">{designer.orders}单</td>
                    <td className="px-6 py-4 font-medium text-gray-900">¥{(designer.revenue / 10000).toFixed(0)}万</td>
                    <td className="px-6 py-4">
                      <span className="text-gold-600 font-medium">{designer.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

import {
  Users,
  ShoppingCart,
  DollarSign,
  Building2,
  Star,
  Palette,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { trendData, designers, products, projects } from '../../data/mockData';

const orderTrendData = trendData.map((item) => ({
  month: item.month.slice(5),
  orders: item.orders,
  revenue: item.revenue / 10000,
}));

const designerActivityData = designers.slice(0, 6).map((d) => ({
  name: d.name,
  projects: d.projects,
  rating: d.rating * 10,
}));

const materialSalesData = products
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5)
  .map((p, i) => ({
    name: p.name,
    sales: p.sales,
    value: p.sales,
    color: ['#D4AF37', '#C9A227', '#BE961F', '#B38B18', '#A87F12'][i],
  }));

const warningProjects = projects
  .filter((p) => p.status === 'construction' && p.progress < 50)
  .map((p) => ({
    id: p.id,
    name: p.name,
    progress: p.progress,
    manager: p.manager,
    days: Math.ceil(
      (new Date(p.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ),
  }));

const statCards = [
  {
    title: '总用户数',
    value: '12,456',
    change: '+8.5%',
    trend: 'up',
    icon: Users,
    color: 'from-amber-500 to-yellow-600',
  },
  {
    title: '今日订单',
    value: '156',
    change: '+12.3%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-green-600',
  },
  {
    title: '总营收',
    value: '¥125.69万',
    change: '+15.8%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: '在施工地',
    value: '23',
    change: '+5.2%',
    trend: 'up',
    icon: Building2,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: '用户满意度',
    value: '98.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Star,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: '设计师活跃度',
    value: '87.5%',
    change: '-1.3%',
    trend: 'down',
    icon: Palette,
    color: 'from-cyan-500 to-teal-600',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据看板</h2>
          <p className="text-gray-500 mt-1">欢迎回来，这是您的运营数据概览</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">最后更新: 2026-06-06 14:30</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {card.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {card.change}
              </span>
              <span className="text-xs text-gray-400">较上月</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">订单趋势</h3>
              <p className="text-gray-400 text-sm">近6个月订单与营收走势</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-sm text-gray-300">订单数</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-gray-300">营收(万)</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#FBBF24"
                  strokeWidth={3}
                  dot={{ fill: '#FBBF24', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#34D399"
                  strokeWidth={3}
                  dot={{ fill: '#34D399', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">设计师活跃度</h3>
              <p className="text-gray-400 text-sm">项目数与评分对比</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={designerActivityData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="projects" fill="#D4AF37" radius={[4, 4, 0, 0]} name="项目数" />
                <Bar dataKey="rating" fill="#60A5FA" radius={[4, 4, 0, 0]} name="评分(x10)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">材料销量排行</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialSalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {materialSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {materialSalesData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-300 truncate max-w-[140px]">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-amber-400">{item.sales}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">施工进度预警</h3>
              <p className="text-gray-400 text-sm">进度滞后50%以下的项目</p>
            </div>
            <button className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors">
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {warningProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{project.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">负责人: {project.manager}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-400 font-medium">
                      剩余{project.days}天
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">进度</span>
                    <span className="text-xs font-semibold text-amber-400">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

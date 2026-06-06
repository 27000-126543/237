import { useState, useEffect } from 'react';
import { adminAPI, reportAPI } from '@/api';
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
  Loader2,
  MapPin,
  Calendar,
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

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('all');
  const [dateRange, setDateRange] = useState('6months');
  const [stats, setStats] = useState<any>(null);
  const [orderTrendData, setOrderTrendData] = useState<any[]>([]);
  const [designerActivityData, setDesignerActivityData] = useState<any[]>([]);
  const [materialSalesData, setMaterialSalesData] = useState<any[]>([]);
  const [warningProjects, setWarningProjects] = useState<any[]>([]);

  const statCardsTemplate = [
    {
      title: '总用户数',
      icon: Users,
      color: 'from-amber-500 to-yellow-600',
      key: 'totalUsers',
    },
    {
      title: '今日订单',
      icon: ShoppingCart,
      color: 'from-emerald-500 to-green-600',
      key: 'todayOrders',
    },
    {
      title: '总营收',
      icon: DollarSign,
      color: 'from-blue-500 to-indigo-600',
      key: 'totalRevenue',
    },
    {
      title: '在施工地',
      icon: Building2,
      color: 'from-orange-500 to-red-500',
      key: 'activeProjects',
    },
    {
      title: '用户满意度',
      icon: Star,
      color: 'from-purple-500 to-pink-600',
      key: 'satisfaction',
    },
    {
      title: '设计师活跃度',
      icon: Palette,
      color: 'from-cyan-500 to-teal-600',
      key: 'designerActivity',
    },
  ];

  const cities = [
    { value: 'all', label: '全部城市' },
    { value: 'beijing', label: '北京' },
    { value: 'shanghai', label: '上海' },
    { value: 'guangzhou', label: '广州' },
    { value: 'shenzhen', label: '深圳' },
    { value: 'hangzhou', label: '杭州' },
  ];

  const dateRanges = [
    { value: '1month', label: '近1个月' },
    { value: '3months', label: '近3个月' },
    { value: '6months', label: '近6个月' },
    { value: '1year', label: '近1年' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        city: selectedCity !== 'all' ? selectedCity : undefined,
        dateRange,
      };

      const [statsRes, trendRes, rankingsRes, monitorRes] = await Promise.all([
        adminAPI.getDashboardStats(params),
        adminAPI.getTrendData(params),
        adminAPI.getRankings(params),
        adminAPI.getConstructionMonitor(params),
      ]);

      setStats(statsRes.data || statsRes);

      if (trendRes.data || trendRes) {
        const trend = trendRes.data || trendRes;
        const formattedTrend = (trend || []).map((item: any) => ({
          month: item.month ? item.month.slice(5) : '',
          orders: item.orders || 0,
          revenue: (item.revenue || 0) / 10000,
        }));
        setOrderTrendData(formattedTrend);
      }

      if (rankingsRes.data || rankingsRes) {
        const rankings = rankingsRes.data || rankingsRes;
        
        const designers = rankings.designers || rankings.designerRankings || [];
        const formattedDesigners = designers.slice(0, 6).map((d: any) => ({
          name: d.name || d.designerName || '',
          projects: d.projects || d.projectCount || 0,
          rating: (d.rating || d.score || 0) * 10,
        }));
        setDesignerActivityData(formattedDesigners);

        const products = rankings.products || rankings.materialRankings || [];
        const formattedProducts = products
          .sort((a: any, b: any) => (b.sales || b.salesCount || 0) - (a.sales || a.salesCount || 0))
          .slice(0, 5)
          .map((p: any, i: number) => ({
            name: p.name || p.productName || '',
            sales: p.sales || p.salesCount || 0,
            value: p.sales || p.salesCount || 0,
            color: ['#D4AF37', '#C9A227', '#BE961F', '#B38B18', '#A87F12'][i],
          }));
        setMaterialSalesData(formattedProducts);
      }

      if (monitorRes.data || monitorRes) {
        const monitor = monitorRes.data || monitorRes;
        const projects = monitor.projects || monitor.warningProjects || monitor || [];
        const formattedProjects = (Array.isArray(projects) ? projects : [])
          .filter((p: any) => (p.status === 'construction' || p.status === '施工中') && (p.progress || 0) < 50)
          .map((p: any) => ({
            id: p.id || p.projectId || '',
            name: p.name || p.projectName || '',
            progress: p.progress || 0,
            manager: p.manager || p.managerName || '',
            days: p.remainingDays || Math.ceil(
              (new Date(p.endDate || p.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            ),
          }));
        setWarningProjects(formattedProjects);
      }
    } catch (error) {
      console.error('获取看板数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity, dateRange]);

  const formatStatValue = (key: string, value: any) => {
    if (value === undefined || value === null) return '-';
    switch (key) {
      case 'totalRevenue':
        return `¥${Number(value).toLocaleString()}万`;
      case 'satisfaction':
      case 'designerActivity':
        return `${value}%`;
      case 'totalUsers':
      case 'todayOrders':
      case 'activeProjects':
        return Number(value).toLocaleString();
      default:
        return String(value);
    }
  };

  const getStatChange = (key: string) => {
    if (!stats) return { value: '+0%', trend: 'up' as const };
    const changes = stats.changes || stats.trends || {};
    const change = changes[key] || stats[`${key}Change`] || '+0%';
    const trend = String(change).startsWith('-') ? 'down' : 'up';
    return { value: change, trend };
  };

  const statCards = statCardsTemplate.map((card) => {
    const value = stats ? stats[card.key] : null;
    const change = getStatChange(card.key);
    return {
      ...card,
      value: formatStatValue(card.key, value),
      change: change.value,
      trend: change.trend,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据看板</h2>
          <p className="text-gray-500 mt-1">欢迎回来，这是您的运营数据概览</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleString('zh-CN')}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
            <p className="text-gray-500">正在加载数据...</p>
          </div>
        </div>
      ) : (
        <>
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
                {warningProjects.length > 0 ? (
                  warningProjects.map((project) => (
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
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>暂无预警项目</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

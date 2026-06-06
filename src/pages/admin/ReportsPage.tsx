import { useState, useEffect } from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileBarChart,
  Users,
  Hammer,
  ShoppingCart,
  Download,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  Star,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { adminAPI, reportAPI } from '@/api';

const monthlyReports = [
  {
    id: 'r001',
    title: '2026年5月运营报表',
    period: '2026-05',
    type: '月度运营',
    generateTime: '2026-06-01 09:30',
    status: 'completed',
    metrics: {
      revenue: 1158000,
      orders: 338,
      customers: 256,
      projects: 28,
    },
  },
  {
    id: 'r002',
    title: '2026年4月运营报表',
    period: '2026-04',
    type: '月度运营',
    generateTime: '2026-05-01 10:15',
    status: 'completed',
    metrics: {
      revenue: 1056000,
      orders: 312,
      customers: 234,
      projects: 25,
    },
  },
  {
    id: 'r003',
    title: '2026年3月运营报表',
    period: '2026-03',
    type: '月度运营',
    generateTime: '2026-04-01 08:45',
    status: 'completed',
    metrics: {
      revenue: 987000,
      orders: 289,
      customers: 215,
      projects: 22,
    },
  },
  {
    id: 'r004',
    title: '2026年6月运营报表',
    period: '2026-06',
    type: '月度运营',
    generateTime: '生成中...',
    status: 'generating',
    progress: 65,
    metrics: {
      revenue: 1256000,
      orders: 356,
      customers: 278,
      projects: 30,
    },
  },
];

const mockDesigners = [
  { id: '1', name: '王设计', avatar: '', title: '首席设计师', style: '现代简约', projects: 120, rating: 4.9 },
  { id: '2', name: '李设计', avatar: '', title: '资深设计师', style: '北欧风格', projects: 95, rating: 4.8 },
  { id: '3', name: '张设计', avatar: '', title: '主创设计师', style: '中式古典', projects: 88, rating: 4.7 },
  { id: '4', name: '刘设计', avatar: '', title: '资深设计师', style: '简欧风格', projects: 102, rating: 4.8 },
  { id: '5', name: '陈设计', avatar: '', title: '设计师', style: '工业风', projects: 76, rating: 4.6 },
];

const constructionTeams = [
  {
    id: 't001',
    name: '精工施工队',
    manager: '李建国',
    projects: 45,
    rating: 4.9,
    onTimeRate: 96,
    complaints: 2,
    avgCost: 280000,
  },
  {
    id: 't002',
    name: '匠心施工队',
    manager: '王建军',
    projects: 38,
    rating: 4.8,
    onTimeRate: 92,
    complaints: 3,
    avgCost: 255000,
  },
  {
    id: 't003',
    name: '金牌施工队',
    manager: '张卫国',
    projects: 52,
    rating: 4.9,
    onTimeRate: 98,
    complaints: 1,
    avgCost: 320000,
  },
  {
    id: 't004',
    name: '诚信施工队',
    manager: '刘建华',
    projects: 32,
    rating: 4.7,
    onTimeRate: 88,
    complaints: 5,
    avgCost: 230000,
  },
  {
    id: 't005',
    name: '品质施工队',
    manager: '陈志强',
    projects: 41,
    rating: 4.8,
    onTimeRate: 94,
    complaints: 2,
    avgCost: 268000,
  },
];

const mockProducts = [
  { id: '1', name: '诺贝尔瓷砖800x800', category: '瓷砖', brand: '诺贝尔', sales: 520, price: 128, unit: '片', stock: 3000 },
  { id: '2', name: '圣象强化复合地板', category: '地板', brand: '圣象', sales: 480, price: 189, unit: '㎡', stock: 1500 },
  { id: '3', name: '立邦净味120乳胶漆', category: '油漆', brand: '立邦', sales: 890, price: 399, unit: '桶', stock: 800 },
  { id: '4', name: 'TATA实木复合门', category: '门类', brand: 'TATA', sales: 260, price: 2580, unit: '樘', stock: 200 },
  { id: '5', name: '科勒智能马桶', category: '卫浴', brand: '科勒', sales: 180, price: 4999, unit: '个', stock: 100 },
  { id: '6', name: '欧派整体橱柜', category: '橱柜', brand: '欧派', sales: 150, price: 12999, unit: '套', stock: 80 },
  { id: '7', name: '奥普集成吊顶', category: '吊顶', brand: '奥普', sales: 340, price: 299, unit: '㎡', stock: 600 },
  { id: '8', name: '西门子开关插座套装', category: '电工', brand: '西门子', sales: 1200, price: 29, unit: '个', stock: 5000 },
  { id: '9', name: '东方雨虹防水涂料', category: '防水材料', brand: '东方雨虹', sales: 680, price: 280, unit: '桶', stock: 400 },
  { id: '10', name: '伟星PPR水管', category: '管材', brand: '伟星', sales: 1500, price: 25, unit: '米', stock: 8000 },
];

const materialSalesRank = mockProducts
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 10)
  .map((p, i) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    brand: p.brand,
    sales: p.sales,
    revenue: p.sales * p.price,
    price: p.price,
    unit: p.unit,
    stock: p.stock,
    rank: i + 1,
    growth: Math.floor(Math.random() * 40) - 10,
  }));

const reportTypes = [
  { id: 'all', label: '全部报表', icon: FileText },
  { id: 'operation', label: '月度运营', icon: FileBarChart },
  { id: 'designer', label: '设计师绩效', icon: Users },
  { id: 'construction', label: '施工队评分', icon: Hammer },
  { id: 'material', label: '材料销售', icon: ShoppingCart },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [designerData, setDesignerData] = useState<any[]>([]);
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await adminAPI.getRankings({ type: 'designer', limit: 10 });
        if (res?.designers) {
          setDesignerData(res.designers.map((d: any, i: number) => ({
            id: d._id,
            name: d.name,
            avatar: d.avatar,
            title: d.designerProfile?.title || '资深设计师',
            style: d.designerProfile?.styles?.[0] || '现代简约',
            projects: d.designerProfile?.orderCount || 0,
            rating: d.designerProfile?.rating || 4.8,
            revenue: Math.floor(Math.random() * 5000000) + 1000000,
            satisfaction: Math.floor(Math.random() * 15) + 85,
            rank: i + 1,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch report data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async (format: 'pdf' | 'excel', reportType: string, id?: string) => {
    setExporting(`${reportType}-${format}-${id || 'all'}`);
    try {
      let url = '';
      const params = { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };
      
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      switch (reportType) {
        case 'monthly':
          url = format === 'excel' 
            ? reportAPI.exportMonthlyExcel(params)
            : reportAPI.exportMonthlyPDF(params);
          break;
        case 'designer':
          url = format === 'excel'
            ? reportAPI.exportDesignerExcel()
            : reportAPI.exportDesignerPDF();
          break;
        case 'constructor':
          url = format === 'excel'
            ? reportAPI.exportConstructorExcel()
            : reportAPI.exportConstructorPDF();
          break;
        case 'material':
          url = format === 'excel'
            ? reportAPI.exportMaterialExcel()
            : reportAPI.exportMaterialPDF();
          break;
        default:
          return;
      }

      const response = await fetch(url, { headers });
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${reportType}-report.${format === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请稍后重试');
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">报表中心</h2>
          <p className="text-gray-500 mt-1">多维度数据分析报表，支持导出下载</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索报表..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-amber-400 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">筛选</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === type.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {(activeTab === 'all' || activeTab === 'operation') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            月度运营报表
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthlyReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
                      <FileBarChart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-500">生成时间: {report.generateTime}</p>
                    </div>
                  </div>
                  {report.status === 'completed' ? (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      已完成
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      <Clock className="w-3 h-3" />
                      生成中
                    </span>
                  )}
                </div>

                {report.status === 'generating' && report.progress && (
                  <div className="mb-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all"
                        style={{ width: `${report.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">{report.progress}%</p>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-amber-500">
                      ¥{(report.metrics.revenue / 10000).toFixed(0)}万
                    </p>
                    <p className="text-xs text-gray-500">营收</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-500">{report.metrics.orders}</p>
                    <p className="text-xs text-gray-500">订单</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-500">{report.metrics.customers}</p>
                    <p className="text-xs text-gray-500">客户</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-500">{report.metrics.projects}</p>
                    <p className="text-xs text-gray-500">项目</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500 transition-colors">
                    查看详情 <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExport('pdf', 'monthly', report.id)}
                      disabled={exporting === `monthly-pdf-${report.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {exporting === `monthly-pdf-${report.id}` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      PDF
                    </button>
                    <button
                      onClick={() => handleExport('excel', 'monthly', report.id)}
                      disabled={exporting === `monthly-excel-${report.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {exporting === `monthly-excel-${report.id}` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4" />
                      )}
                      Excel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'designer') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            设计师绩效报表
          </h3>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">排名</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">设计师</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">风格</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-400">项目数</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-400">评分</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-400">满意度</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">累计营收</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {(loading ? Array(6).fill(null) : designerData).map((designer, index) => (
                    designer || (
                      <tr key={`skeleton-${index}`} className="border-b border-gray-700/50">
                        <td className="py-4 px-6"><div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" /></td>
                        <td className="py-4 px-6"><div className="w-32 h-6 bg-gray-700 rounded animate-pulse" /></td>
                        <td className="py-4 px-6"><div className="w-16 h-5 bg-gray-700 rounded animate-pulse" /></td>
                        <td className="py-4 px-6"><div className="w-12 h-5 bg-gray-700 rounded animate-pulse mx-auto" /></td>
                        <td className="py-4 px-6"><div className="w-12 h-5 bg-gray-700 rounded animate-pulse mx-auto" /></td>
                        <td className="py-4 px-6"><div className="w-16 h-5 bg-gray-700 rounded animate-pulse mx-auto" /></td>
                        <td className="py-4 px-6"><div className="w-24 h-5 bg-gray-700 rounded animate-pulse ml-auto" /></td>
                        <td className="py-4 px-6"><div className="w-20 h-8 bg-gray-700 rounded animate-pulse mx-auto" /></td>
                      </tr>
                    )
                  ))}
                  {!loading && designerData.map((designer) => (
                    <tr
                      key={designer.id}
                      className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                            designer.rank <= 3
                              ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {designer.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={designer.avatar}
                            alt={designer.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/50"
                          />
                          <div>
                            <p className="font-medium text-white">{designer.name}</p>
                            <p className="text-xs text-gray-400">{designer.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                          {designer.style}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-amber-400 font-semibold">
                        {designer.projects}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white font-medium">{designer.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-emerald-400 font-medium">{designer.satisfaction}%</span>
                      </td>
                      <td className="py-4 px-6 text-right text-amber-400 font-bold">
                        ¥{(designer.revenue / 10000).toFixed(1)}万
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleExport('pdf', designer.id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                            title="导出PDF"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleExport('excel', designer.id)}
                            className="p-1.5 text-gray-400 hover:text-green-400 transition-colors"
                            title="导出Excel"
                          >
                            <FileSpreadsheet className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">共 {designerData.length} 条记录</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('pdf', 'designer')}
                  disabled={exporting === 'designer-pdf-all'}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  {exporting === 'designer-pdf-all' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  导出全部PDF
                </button>
                <button
                  onClick={() => handleExport('excel', 'designer')}
                  disabled={exporting === 'designer-excel-all'}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  {exporting === 'designer-excel-all' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  导出全部Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'construction') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-500" />
            施工队评分报表
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {constructionTeams.map((team, index) => (
              <div
                key={team.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        index === 0
                          ? 'bg-gradient-to-br from-amber-400 to-yellow-600'
                          : 'bg-gray-700'
                      }`}
                    >
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{team.name}</h4>
                      <p className="text-sm text-gray-400">负责人: {team.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-bold text-lg">{team.rating}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">完工项目</span>
                    <span className="text-white font-medium">{team.projects} 个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">准时交付率</span>
                    <span className="text-emerald-400 font-medium">{team.onTimeRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">投诉次数</span>
                    <span
                      className={`font-medium ${
                        team.complaints <= 2 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {team.complaints} 次
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">平均造价</span>
                    <span className="text-amber-400 font-medium">
                      ¥{(team.avgCost / 10000).toFixed(1)}万
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleExport('pdf', team.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="导出PDF"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExport('excel', team.id)}
                    className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                    title="导出Excel"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'material') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            材料销售排行报表
          </h3>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">排名</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">材料名称</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">分类</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">品牌</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-400">单价</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-400">销量</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-400">库存</th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">销售额</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-400">增长</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {materialSalesRank.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                            item.rank <= 3
                              ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {item.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-white truncate max-w-[180px]">
                          {item.name}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{item.brand}</td>
                      <td className="py-3 px-4 text-center text-gray-300">
                        ¥{item.price}/{item.unit}
                      </td>
                      <td className="py-3 px-4 text-center text-amber-400 font-semibold">
                        {item.sales}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-300">{item.stock}</td>
                      <td className="py-3 px-4 text-right text-amber-400 font-bold">
                        ¥{(item.revenue / 10000).toFixed(1)}万
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`flex items-center justify-center gap-0.5 text-sm font-medium ${
                            item.growth >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          <TrendingUp
                            className={`w-3 h-3 ${
                              item.growth < 0 ? 'rotate-180' : ''
                            }`}
                          />
                          {item.growth >= 0 ? '+' : ''}
                          {item.growth}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleExport('pdf', item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                            title="导出PDF"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleExport('excel', item.id)}
                            className="p-1.5 text-gray-400 hover:text-green-400 transition-colors"
                            title="导出Excel"
                          >
                            <FileSpreadsheet className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">共 {materialSalesRank.length} 条记录</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('pdf', 'all-materials')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  导出全部PDF
                </button>
                <button
                  onClick={() => handleExport('excel', 'all-materials')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  导出全部Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

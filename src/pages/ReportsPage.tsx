import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  FileIcon,
  FileBarChart,
  ChevronRight,
  Search,
} from 'lucide-react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('generate');

  const reportTemplates = [
    { id: 1, name: '销售报表', description: '包含订单、营收、客单价等销售数据', icon: FileBarChart, type: '销售' },
    { id: 2, name: '用户分析报表', description: '用户增长、留存、活跃度等用户数据', icon: FileSpreadsheet, type: '用户' },
    { id: 3, name: '设计师绩效报表', description: '设计师接单量、营收、评分等数据', icon: FileText, type: '设计师' },
    { id: 4, name: '材料销售报表', description: '商城商品销售、库存、品类分析', icon: FileSpreadsheet, type: '商城' },
    { id: 5, name: '施工进度报表', description: '在建项目进度、延期、质量分析', icon: FileBarChart, type: '施工' },
    { id: 6, name: '财务报表', description: '收入、支出、利润等财务数据', icon: FileText, type: '财务' },
  ];

  const generatedReports = [
    { id: 1, name: '2024年1月销售报表.xlsx', type: '销售报表', size: '2.5MB', date: '2024-02-01 10:30', status: 'completed' },
    { id: 2, name: '2024年1月用户分析报表.xlsx', type: '用户分析报表', size: '3.8MB', date: '2024-02-01 10:25', status: 'completed' },
    { id: 3, name: '2024年1月设计师绩效报表.xlsx', type: '设计师绩效报表', size: '1.2MB', date: '2024-02-01 10:20', status: 'completed' },
    { id: 4, name: '2024年Q4财务报表.pdf', type: '财务报表', size: '5.6MB', date: '2024-01-15 14:00', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">报表导出</h1>
        <p className="text-gray-500 mt-1">生成和下载各类运营报表</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'generate'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              生成报表
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-gold-500 text-gold-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              历史记录
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'generate' && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索报表模板..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option>全部类型</option>
                    <option>销售</option>
                    <option>用户</option>
                    <option>设计师</option>
                    <option>商城</option>
                    <option>施工</option>
                    <option>财务</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="border border-gray-100 rounded-xl p-6 hover:border-gold-200 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                          <Icon className="w-6 h-6 text-gold-600" />
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {template.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                      <div className="flex items-center gap-2 text-gold-600 font-medium text-sm group-hover:gap-3 transition-all">
                        生成报表
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">自定义报表配置</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">开始日期</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">结束日期</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">报表类型</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
                      <option>Excel (.xlsx)</option>
                      <option>PDF (.pdf)</option>
                      <option>CSV (.csv)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">数据维度</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
                      <option>按日</option>
                      <option>按周</option>
                      <option>按月</option>
                      <option>按季度</option>
                    </select>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  生成自定义报表
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">报表名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">大小</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">生成时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {generatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <FileSpreadsheet className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-900">{report.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{report.type}</td>
                        <td className="px-6 py-4 text-gray-600">{report.size}</td>
                        <td className="px-6 py-4 text-gray-600">{report.date}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            已完成
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="flex items-center gap-1 text-gold-600 hover:text-gold-700 font-medium text-sm">
                            <Download className="w-4 h-4" />
                            下载
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

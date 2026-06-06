import { useState } from 'react';
import {
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  BarChart3,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { stylePredictions, products } from '../../data/mockData';

const cities = ['全部城市', '北京', '上海', '深圳', '广州', '杭州', '成都', '武汉', '南京'];
const timeRanges = ['全部时间', '近7天', '近30天', '近90天', '本年度'];

const materialDemandData = [
  { month: '7月', 地板: 4500, 瓷砖: 6200, 涂料: 3800, 灯具: 2800 },
  { month: '8月', 地板: 5200, 瓷砖: 6800, 涂料: 4200, 灯具: 3200 },
  { month: '9月', 地板: 5800, 瓷砖: 7500, 涂料: 4800, 灯具: 3600 },
  { month: '10月', 地板: 6500, 瓷砖: 8200, 涂料: 5200, 灯具: 4100 },
  { month: '11月', 地板: 7200, 瓷砖: 9000, 涂料: 5800, 灯具: 4600 },
  { month: '12月', 地板: 8000, 瓷砖: 9800, 涂料: 6500, 灯具: 5200 },
];

const styleRadarData = stylePredictions.slice(0, 6).map((s) => ({
  style: s.style,
  热度: s.popularity,
  增长率: s.growthRate * 2,
  市场份额: 60 + Math.random() * 30,
}));

const strategySuggestions = [
  {
    id: 1,
    title: '加大轻奢风格设计师招募',
    type: '推荐',
    priority: '高',
    description: '轻奢风格热度增长25.6%，市场需求旺盛，建议优先扩充该风格设计师团队。',
    impact: '预计提升订单转化率15%',
  },
  {
    id: 2,
    title: '新中式套餐产品优化',
    type: '推荐',
    priority: '高',
    description: '新中式风格增长率达18.3%，建议针对高端客户推出定制化套餐。',
    impact: '预计提升客单价20%',
  },
  {
    id: 3,
    title: '美式风格产品策略调整',
    type: '警告',
    priority: '中',
    description: '美式风格热度下降3.5%，建议减少相关产品库存，优化展示位置。',
    impact: '预计降低库存成本10%',
  },
  {
    id: 4,
    title: '木地板备货量提升',
    type: '推荐',
    priority: '高',
    description: 'Q4木地板需求预计增长40%，建议提前与供应商锁定产能。',
    impact: '预计减少缺货损失25%',
  },
];

const materialForecast = products
  .filter((p) => p.category === '地板' || p.category === '瓷砖' || p.category === '涂料')
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 6)
  .map((p) => ({
    name: p.name,
    category: p.category,
    currentStock: p.stock,
    forecastDemand: Math.round(p.sales * 1.3),
    suggested: Math.round(p.sales * 1.5),
    growth: Math.floor(Math.random() * 30) + 10,
  }));

export default function AnalyticsPage() {
  const [selectedCity, setSelectedCity] = useState('全部城市');
  const [selectedTime, setSelectedTime] = useState('本年度');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const topStyles = stylePredictions
    .sort((a, b) => b.growthRate - a.growthRate)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据分析</h2>
          <p className="text-gray-500 mt-1">深度洞察市场趋势，智能驱动业务决策</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              onClick={() => {
                setCityDropdownOpen(!cityDropdownOpen);
                setTimeDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-amber-400 transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{selectedCity}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {cityDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${
                      selectedCity === city ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setTimeDropdownOpen(!timeDropdownOpen);
                setCityDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-amber-400 transition-colors"
            >
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{selectedTime}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {timeDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {timeRanges.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setTimeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${
                      selectedTime === time ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          下季度热门风格预测
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStyles.map((style, index) => (
            <div
              key={style.style}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-36">
                <img
                  src={style.image}
                  alt={style.style}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      style.trend === 'up'
                        ? 'bg-green-500/20 text-green-400'
                        : style.trend === 'down'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {style.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : style.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {style.growthRate > 0 ? '+' : ''}
                    {style.growthRate}%
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-bold text-lg">{style.style}</h4>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm line-clamp-2">{style.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">热度指数</span>
                    <div className="text-amber-400 font-bold text-xl">{style.popularity}</div>
                  </div>
                  <div className="w-16 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[styleRadarData[index]]}>
                        <Radar
                          dataKey="热度"
                          stroke="#D4AF37"
                          fill="#D4AF37"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            材料需求预测分析
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={materialDemandData}>
                <defs>
                  <linearGradient id="colorFloor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F472B6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#F472B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="地板"
                  stroke="#D4AF37"
                  fillOpacity={1}
                  fill="url(#colorFloor)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="瓷砖"
                  stroke="#60A5FA"
                  fillOpacity={1}
                  fill="url(#colorTile)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="涂料"
                  stroke="#34D399"
                  fillOpacity={1}
                  fill="url(#colorPaint)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="灯具"
                  stroke="#F472B6"
                  fillOpacity={1}
                  fill="url(#colorLight)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-sm text-gray-300">地板</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-sm text-gray-300">瓷砖</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-sm text-gray-300">涂料</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400" />
              <span className="text-sm text-gray-300">灯具</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            风格多维度分析
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={styleRadarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="style" stroke="#9CA3AF" fontSize={11} />
                <PolarRadiusAxis stroke="#4B5563" fontSize={10} />
                <Radar
                  name="热度"
                  dataKey="热度"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.4}
                />
                <Radar
                  name="增长率"
                  dataKey="增长率"
                  stroke="#60A5FA"
                  fill="#60A5FA"
                  fillOpacity={0.3}
                />
                <Radar
                  name="市场份额"
                  dataKey="市场份额"
                  stroke="#34D399"
                  fill="#34D399"
                  fillOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-sm text-gray-300">热度</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-sm text-gray-300">增长率</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-sm text-gray-300">市场份额</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">材料备货建议</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materialForecast} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="currentStock" fill="#4B5563" name="当前库存" radius={[0, 4, 4, 0]} />
                <Bar dataKey="suggested" fill="#D4AF37" name="建议备货" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            推荐策略调整建议
          </h3>
          <div className="space-y-3">
            {strategySuggestions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          item.type === '推荐'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          item.priority === '高'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        优先级: {item.priority}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    <p className="text-amber-600 text-sm mt-2 font-medium">
                      💡 {item.impact}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-amber-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

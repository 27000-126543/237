import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, ArrowRight } from 'lucide-react';
import { designers } from '../data/mockData';

const DesignersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('全部');

  const styles = ['全部', '现代简约', '北欧风格', '新中式', '美式风格', '欧式风格'];

  const filteredDesigners = designers.filter((designer) => {
    const matchesSearch = designer.name.includes(searchQuery) || designer.tags.some(tag => tag.includes(searchQuery));
    const matchesStyle = selectedStyle === '全部' || designer.tags.includes(selectedStyle);
    return matchesSearch && matchesStyle;
  });

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-walnut-900 mb-4">发现优秀设计师</h1>
          <p className="text-walnut-500 max-w-2xl mx-auto">
            汇聚千名专业设计师，为您打造理想的家居空间
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-walnut-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索设计师姓名、风格..."
                className="w-full pl-12 pr-4 py-3 border border-walnut-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-walnut-500" />
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStyle === style
                      ? 'bg-gold-500 text-walnut-900'
                      : 'bg-walnut-50 text-walnut-600 hover:bg-walnut-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <Link
              key={designer.id}
              to={`/designer/${designer.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={designer.images[0]}
                  alt={designer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gold-500/90 rounded-full text-xs font-medium text-walnut-900">
                      <Star className="w-3 h-3 fill-current" />
                      {designer.rating}
                    </div>
                    <span className="text-white/80 text-sm">{designer.projects}个作品</span>
                    <span className="text-white/80 text-sm">·</span>
                    <span className="text-white/80 text-sm">{designer.experience}年经验</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold-400"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-walnut-900">{designer.name}</h3>
                    <p className="text-walnut-500 text-sm">{designer.title}</p>
                  </div>
                </div>
                <p className="text-walnut-600 text-sm mb-4 line-clamp-2">
                  {designer.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {designer.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-walnut-50 text-walnut-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-walnut-100">
                  <div>
                    <span className="text-sm text-walnut-500">设计费</span>
                    <p className="text-lg font-bold text-gold-600">¥{designer.experience * 15 + 100}/㎡起</p>
                  </div>
                  <div className="flex items-center gap-1 text-gold-600 font-medium group-hover:gap-2 transition-all">
                    查看详情
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;

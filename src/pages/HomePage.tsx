import { useState, useEffect } from 'react';
import { Upload, Users, ShoppingBag, Image, Star, ArrowRight, MapPin } from 'lucide-react';
import { designers, projects } from '../data/mockData';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickEntries = [
    { icon: Upload, title: '上传户型', desc: '免费获取设计方案', color: 'from-walnut-600 to-walnut-800' },
    { icon: Users, title: '找设计师', desc: '千名专业设计师任你选', color: 'from-gold-500 to-gold-700' },
    { icon: ShoppingBag, title: '逛商城', desc: '建材家具一站式采购', color: 'from-walnut-500 to-walnut-700' },
    { icon: Image, title: '看案例', desc: '海量实景装修参考', color: 'from-gold-400 to-gold-600' },
  ];

  const hotDesigners = designers.slice(0, 4);
  const featuredCases = projects.slice(0, 6);

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://picsum.photos/seed/interior-hero/1920/1080)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-walnut-950/90 via-walnut-900/70 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                <span className="text-gold-300 text-sm font-medium">专业装修设计平台</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                打造你的
                <span className="text-gold-400 block">理想家居</span>
              </h1>

              <p className="text-lg text-walnut-200 mb-8 max-w-xl leading-relaxed">
                汇聚千名优秀设计师，精选全球建材品牌，为你提供一站式装修解决方案，让家的梦想触手可及。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/match"
                  className="group px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-walnut-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                >
                  开始智能匹配
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  浏览案例
                </button>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-gold-400">1000+</div>
                  <div className="text-walnut-300 text-sm">专业设计师</div>
                </div>
                <div className="w-px h-12 bg-walnut-600" />
                <div>
                  <div className="text-3xl font-bold text-gold-400">50000+</div>
                  <div className="text-walnut-300 text-sm">成功案例</div>
                </div>
                <div className="w-px h-12 bg-walnut-600" />
                <div>
                  <div className="text-3xl font-bold text-gold-400">98%</div>
                  <div className="text-walnut-300 text-sm">客户满意度</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-walnut-900 mb-4">
              快捷服务入口
            </h2>
            <p className="text-walnut-500 max-w-2xl mx-auto">
              无论你处于装修的哪个阶段，我们都能为你提供专业的服务支持
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickEntries.map((entry, index) => (
              <div
                key={index}
                className="group relative p-8 bg-cream rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${entry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-walnut-100 to-walnut-200 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-500">
                    <entry.icon className="w-8 h-8 text-walnut-700 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-walnut-900 mb-2 group-hover:text-white transition-colors duration-500">
                    {entry.title}
                  </h3>
                  <p className="text-walnut-500 text-sm group-hover:text-white/80 transition-colors duration-500">
                    {entry.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-walnut-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold-600 font-medium">精选推荐</span>
              <h2 className="text-4xl font-serif font-bold text-walnut-900 mt-2">
                热门设计师
              </h2>
            </div>
            <Link
              to="/designers"
              className="flex items-center gap-2 text-walnut-600 hover:text-gold-600 transition-colors font-medium"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotDesigners.map((designer, index) => (
              <div
                key={designer.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
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
                  <div className="flex flex-wrap gap-2">
                    {designer.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-walnut-50 text-walnut-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-medium">灵感图库</span>
            <h2 className="text-4xl font-serif font-bold text-walnut-900 mt-2 mb-4">
              精选装修案例
            </h2>
            <p className="text-walnut-500 max-w-2xl mx-auto">
              真实业主的装修成果，每一个案例都是品质与匠心的见证
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredCases.map((project, index) => (
              <div
                key={project.id}
                className="break-inside-avoid group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-walnut-50">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${index % 3 === 0 ? 'h-80' : index % 3 === 1 ? 'h-96' : 'h-72'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/90 via-walnut-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate max-w-[150px]">{project.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-gold-500/90 rounded-full text-xs font-medium text-walnut-900">
                          {project.area}㎡
                        </div>
                        <div className="text-white/80 text-sm">
                          预算 ¥{(project.budget / 10000).toFixed(1)}万
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500/90 text-white' 
                        : project.status === 'construction' 
                        ? 'bg-gold-500/90 text-walnut-900'
                        : 'bg-walnut-500/90 text-white'
                    }`}>
                      {project.status === 'completed' ? '已竣工' : project.status === 'construction' ? '施工中' : '规划中'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-walnut-200 text-walnut-700 font-semibold rounded-xl hover:border-gold-500 hover:text-gold-600 transition-all duration-300 flex items-center gap-2 mx-auto">
              加载更多案例
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-walnut-900 via-walnut-800 to-walnut-900">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            准备好开始你的装修之旅了吗？
          </h2>
          <p className="text-walnut-300 text-lg mb-10 max-w-2xl mx-auto">
            立即智能匹配最适合你的设计师，获取免费设计方案
          </p>
          <Link
            to="/match"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-600 text-walnut-900 font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-gold-500/40 transition-all duration-300 transform hover:scale-105"
          >
            立即开始匹配
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

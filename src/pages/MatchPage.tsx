import { useState, useCallback, useRef } from 'react';
import { Upload, X, Check, Star, ArrowRight, Home, Sparkles, Percent, DollarSign, Maximize2, FileText } from 'lucide-react';
import { designers } from '../data/mockData';

const MatchPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [budget, setBudget] = useState(20);
  const [area, setArea] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<Array<typeof designers[0] & { matchScore: number }> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styles = [
    { id: 'modern', name: '现代简约', image: 'https://picsum.photos/seed/style-modern/400/300', desc: '简约大气，注重功能性' },
    { id: 'nordic', name: '北欧风格', image: 'https://picsum.photos/seed/style-nordic/400/300', desc: '自然温馨，原木色调' },
    { id: 'chinese', name: '新中式', image: 'https://picsum.photos/seed/style-chinese/400/300', desc: '东方韵味，传统美学' },
    { id: 'luxury', name: '轻奢风格', image: 'https://picsum.photos/seed/style-luxury/400/300', desc: '精致优雅，品质生活' },
    { id: 'japanese', name: '日式风格', image: 'https://picsum.photos/seed/style-japanese/400/300', desc: '禅意简约，收纳实用' },
    { id: 'industrial', name: '工业风格', image: 'https://picsum.photos/seed/style-industrial/400/300', desc: '原始粗犷，个性十足' },
    { id: 'french', name: '法式风格', image: 'https://picsum.photos/seed/style-french/400/300', desc: '浪漫优雅，精致线条' },
    { id: 'american', name: '美式风格', image: 'https://picsum.photos/seed/style-american/400/300', desc: '舒适大气，经典复古' },
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(s => s !== styleId)
        : [...prev, styleId]
    );
  };

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      const results = designers.map(designer => {
        let score = 60 + Math.random() * 35;
        if (selectedStyles.length > 0) {
          const styleMatch = selectedStyles.some(s =>
            designer.style.includes(s) || designer.tags.some(t => t.includes(s))
          );
          if (styleMatch) score += 15;
        }
        return { ...designer, matchScore: Math.min(98, Math.round(score)) };
      }).sort((a, b) => b.matchScore - a.matchScore);
      
      setMatchResults(results);
      setIsMatching(false);
    }, 2000);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-gold-600 bg-gold-50';
    if (score >= 70) return 'text-walnut-600 bg-walnut-50';
    return 'text-walnut-500 bg-walnut-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-walnut-50 to-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-gold-600" />
            <span className="text-gold-700 font-medium">AI 智能匹配系统</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-walnut-900 mb-4">
            找到最适合你的设计师
          </h1>
          <p className="text-walnut-500 text-lg max-w-2xl mx-auto">
            填写你的装修需求，我们将通过智能算法为你匹配最合适的设计师
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-walnut-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-walnut-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-walnut-900">上传户型图</h2>
                  <p className="text-walnut-500 text-sm">支持拖拽上传，让设计师更了解你的空间</p>
                </div>
              </div>

              {!uploadedFile ? (
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-walnut-200 hover:border-gold-400 hover:bg-walnut-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-walnut-100 to-walnut-200 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-walnut-600" />
                  </div>
                  <p className="text-walnut-700 font-medium mb-2">
                    {dragActive ? '释放文件以上传' : '拖拽文件到此处，或点击上传'}
                  </p>
                  <p className="text-walnut-400 text-sm">支持 JPG、PNG 格式，文件大小不超过 10MB</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-walnut-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-walnut-200 flex items-center justify-center">
                      <Home className="w-8 h-8 text-walnut-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-walnut-900">{uploadedFile.name}</p>
                      <p className="text-walnut-500 text-sm">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="w-10 h-10 rounded-full bg-walnut-100 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-walnut-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-walnut-900">选择风格偏好</h2>
                  <p className="text-walnut-500 text-sm">可多选，选择你喜欢的装修风格</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => toggleStyle(style.id)}
                    className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform ${selectedStyles.includes(style.id) ? 'ring-2 ring-gold-500 scale-105' : 'hover:scale-102 hover:shadow-lg'}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/80 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-semibold text-sm">{style.name}</p>
                      <p className="text-white/70 text-xs">{style.desc}</p>
                    </div>
                    {selectedStyles.includes(style.id) && (
                      <div className="absolute top-3 right-3 w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center animate-pulse-glow">
                        <Check className="w-4 h-4 text-walnut-900" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-walnut-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-walnut-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-walnut-900">预算区间</h2>
                  <p className="text-walnut-500 text-sm">设置你的装修预算范围</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-walnut-500">¥5万</span>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gold-600">¥{budget}</span>
                    <span className="text-walnut-500 ml-1">万</span>
                  </div>
                  <span className="text-walnut-500">¥100万</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-walnut-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-gold-400 [&::-webkit-slider-thumb]:to-gold-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full pointer-events-none"
                    style={{ width: `${((budget - 5) / 95) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-walnut-400">
                  <span>经济型</span>
                  <span>舒适型</span>
                  <span>品质型</span>
                  <span>豪华型</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-walnut-900">房屋面积</h2>
                  <p className="text-walnut-500 text-sm">填写你的房屋建筑面积</p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="请输入面积"
                  className="w-full px-5 py-4 bg-walnut-50 border border-walnut-200 rounded-xl text-walnut-900 text-lg font-medium focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-walnut-500">㎡</span>
              </div>

              <div className="flex gap-3 mt-4">
                {[60, 90, 120, 150].map((size) => (
                  <button
                    key={size}
                    onClick={() => setArea(String(size))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${area === String(size)
                      ? 'bg-gold-500 text-walnut-900'
                      : 'bg-walnut-50 text-walnut-600 hover:bg-walnut-100'
                    }`}
                  >
                    {size}㎡
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-walnut-900 mb-6">匹配摘要</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-walnut-100">
                    <span className="text-walnut-500">户型图</span>
                    <span className={`font-medium ${uploadedFile ? 'text-green-600' : 'text-walnut-400'}`}>
                      {uploadedFile ? '已上传' : '未上传'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-walnut-100">
                    <span className="text-walnut-500">风格偏好</span>
                    <span className="font-medium text-walnut-700">
                      {selectedStyles.length > 0 ? `${selectedStyles.length} 种` : '未选择'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-walnut-100">
                    <span className="text-walnut-500">预算</span>
                    <span className="font-medium text-walnut-700">¥{budget}万</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-walnut-500">面积</span>
                    <span className="font-medium text-walnut-700">{area || '未填写'}</span>
                  </div>
                </div>

                <button
                  onClick={handleMatch}
                  disabled={isMatching}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-walnut-900 font-bold rounded-xl hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 transform hover:scale-105"
                >
                  {isMatching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-walnut-900 border-t-transparent rounded-full animate-spin" />
                      智能匹配中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      开始智能匹配
                    </>
                  )}
                </button>

                <p className="text-center text-walnut-400 text-sm mt-4">
                  基于 AI 智能算法，为你精准匹配
                </p>
              </div>
            </div>
          </div>
        </div>

        {matchResults && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">匹配完成</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-walnut-900 mb-4">
                为你推荐 {matchResults.length} 位设计师
              </h2>
              <p className="text-walnut-500">根据你的需求，智能匹配最适合的设计师</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchResults.map((designer, index) => (
              <div
                key={designer.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={designer.images[0]}
                      alt={designer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 ${getMatchColor(designer.matchScore)}`}>
                    <Percent className="w-4 h-4" />
                    {designer.matchScore}% 匹配
                  </div>
                  <div className="absolute -bottom-10 left-6">
                    <img
                      src={designer.avatar}
                      alt={designer.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-walnut-900">{designer.name}</h3>
                      <p className="text-walnut-500 text-sm">{designer.title}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gold-50 rounded-lg">
                      <Star className="w-4 h-4 text-gold-500 fill-current" />
                      <span className="text-sm font-medium text-gold-700">{designer.rating}</span>
                    </div>
                  </div>

                  <p className="text-walnut-600 text-sm mb-4 line-clamp-2">
                    {designer.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {designer.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-walnut-50 text-walnut-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-walnut-400 text-sm">从业 {designer.experience} 年经验</span>
                      <span className="text-walnut-300 mx-2">·</span>
                      <span className="text-walnut-400 text-sm">{designer.projects} 个作品</span>
                    </div>
                    <button className="flex items-center gap-1 text-gold-600 font-medium text-sm hover:text-gold-700 transition-colors">
                      查看详情
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MatchPage;

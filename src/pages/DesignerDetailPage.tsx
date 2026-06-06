import { useState } from 'react';
import { Star, MapPin, Calendar, Award, ShoppingCart, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { designers } from '@/data/mockData';

const mockReviews = [
  {
    id: 'r001',
    userName: '张先生',
    userAvatar: 'https://picsum.photos/seed/user1/100/100',
    rating: 5,
    content: '设计师非常专业，方案很符合我们的需求，沟通也很顺畅，最终效果超出预期！',
    images: [
      'https://picsum.photos/seed/review1-1/300/300',
      'https://picsum.photos/seed/review1-2/300/300'
    ],
    createdAt: '2026-05-20'
  },
  {
    id: 'r002',
    userName: '李女士',
    userAvatar: 'https://picsum.photos/seed/user2/100/100',
    rating: 4.8,
    content: '空间利用得很好，收纳设计特别实用，风格也很喜欢，推荐给大家！',
    images: [
      'https://picsum.photos/seed/review2-1/300/300'
    ],
    createdAt: '2026-05-15'
  },
  {
    id: 'r003',
    userName: '王先生',
    userAvatar: 'https://picsum.photos/seed/user3/100/100',
    rating: 5,
    content: '从设计到施工全程跟进，很负责任，细节处理得很好，下次装修还会找他。',
    images: [],
    createdAt: '2026-05-10'
  }
];

const DesignerDetailPage = () => {
  const [selectedDesigner] = useState(designers[0]);
  const [currentPanoramaIndex, setCurrentPanoramaIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const portfolioImages = [
    'https://picsum.photos/seed/portfolio1/600/400',
    'https://picsum.photos/seed/portfolio2/600/400',
    'https://picsum.photos/seed/portfolio3/600/400',
    'https://picsum.photos/seed/portfolio4/600/400',
    'https://picsum.photos/seed/portfolio5/600/400',
    'https://picsum.photos/seed/portfolio6/600/400'
  ];

  const panoramaImages = [
    'https://picsum.photos/seed/pano1/1200/600',
    'https://picsum.photos/seed/pano2/1200/600',
    'https://picsum.photos/seed/pano3/1200/600'
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetRotation = () => {
    setRotation(0);
  };

  const nextPanorama = () => {
    setCurrentPanoramaIndex((prev) => (prev + 1) % panoramaImages.length);
    setRotation(0);
  };

  const prevPanorama = () => {
    setCurrentPanoramaIndex((prev) => (prev - 1 + panoramaImages.length) % panoramaImages.length);
    setRotation(0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start gap-8">
            <img
              src={selectedDesigner.avatar}
              alt={selectedDesigner.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{selectedDesigner.name}</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  {selectedDesigner.title}
                </span>
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(selectedDesigner.rating)}
                  <span className="ml-2 text-gray-700 font-medium">{selectedDesigner.rating}</span>
                  <span className="text-gray-500 text-sm">({selectedDesigner.projects}个项目)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Award size={18} />
                  <span>{selectedDesigner.experience}年经验</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={18} />
                  <span>擅长：{selectedDesigner.style}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{selectedDesigner.description}</p>
              <div className="flex gap-2">
                {selectedDesigner.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <ShoppingCart size={20} />
              一键下单
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">作品集</h2>
          <div className="grid grid-cols-3 gap-4">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
              >
                <img
                  src={image}
                  alt={`作品${index + 1}`}
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium">3D效果图 {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">720°全景预览</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevPanorama}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-gray-600">
                {currentPanoramaIndex + 1} / {panoramaImages.length}
              </span>
              <button
                onClick={nextPanorama}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div
            className="relative overflow-hidden rounded-xl shadow-lg cursor-grab active:cursor-grabbing"
            style={{ perspective: '1000px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative w-full h-96"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${panoramaImages[currentPanoramaIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'translateZ(-500px) scale(2.5)'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={resetRotation}
                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white transition-colors"
              >
                <RotateCcw size={16} />
                重置视角
              </button>
              <span className="text-white/90 text-sm">拖动图片查看全景</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">用户评价</h2>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-gray-900">{review.userName}</span>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        {review.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{review.content}</p>
                    {review.images.length > 0 && (
                      <div className="flex gap-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`评价图片${index + 1}`}
                            className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignerDetailPage;

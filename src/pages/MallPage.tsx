import { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, Filter, ChevronDown, ChevronRight, Star, Check } from 'lucide-react';
import { productAPI } from '@/api';
import { useStore } from '@/store/useStore';

const categories = [
  { name: '地板', icon: 'floor', count: 0 },
  { name: '瓷砖', icon: 'tile', count: 0 },
  { name: '涂料', icon: 'paint', count: 0 },
  { name: '灯具', icon: 'light', count: 0 },
  { name: '卫浴', icon: 'bath', count: 0 },
  { name: '家具', icon: 'furniture', count: 0 },
  { name: '建材', icon: 'material', count: 0 },
];

const MallPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: any = {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        };
        if (selectedCategory) params.category = selectedCategory;
        if (selectedBrands.length > 0) params.brand = selectedBrands.join(',');
        if (searchKeyword) params.keyword = searchKeyword;

        const response = await productAPI.getProducts(params);
        const data = response.data || response;
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('获取商品列表失败:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrands, priceRange, searchKeyword]);

  const addItem = useStore((state) => state.addItem);

  const brands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(brandSet);
  }, [products]);

  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];
    const subSet = new Set(
      products.filter((p) => p.category === selectedCategory).map((p) => p.subCategory)
    );
    return Array.from(subSet);
  }, [selectedCategory]);

  const filteredProducts = products;

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleAddToCart = (product: any) => {
    const productForCart = {
      ...product,
      id: product._id,
      image: product.images?.[0] || '',
      images: product.images || [],
      originalPrice: product.price * 1.2,
      specs: product.specs || {}
    };
    addItem(productForCart as any);
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen sticky top-0">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-900">商品分类</h2>
          </div>
          <div className="p-2">
            {categories.map((category) => (
              <div key={category.name}>
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-amber-50 text-amber-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    );
                    toggleCategory(category.name);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {category.icon === 'floor' && '🪵'}
                      {category.icon === 'tile' && '🔲'}
                      {category.icon === 'paint' && '🎨'}
                      {category.icon === 'light' && '💡'}
                      {category.icon === 'bath' && '🚿'}
                      {category.icon === 'furniture' && '🛋️'}
                      {category.icon === 'material' && '🧱'}
                    </span>
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-gray-400">({category.count})</span>
                  </div>
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {expandedCategories.includes(category.name) &&
                  selectedCategory === category.name && (
                    <div className="ml-8 mt-1 space-y-1">
                      {subCategories.map((sub) => (
                        <div
                          key={sub}
                          className="px-4 py-2 text-sm text-gray-600 hover:text-amber-600 cursor-pointer rounded transition-colors"
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white shadow-sm sticky top-0 z-10">
            <div className="p-4 border-b">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索商品..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-gray-600">筛选：</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowBrandFilter(!showBrandFilter);
                      setShowPriceFilter(false);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    品牌
                    <ChevronDown size={16} />
                    {selectedBrands.length > 0 && (
                      <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {selectedBrands.length}
                      </span>
                    )}
                  </button>
                  {showBrandFilter && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-20 max-h-64 overflow-y-auto">
                      {brands.map((brand) => (
                        <div
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              selectedBrands.includes(brand)
                                ? 'bg-amber-500 border-amber-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedBrands.includes(brand) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">{brand}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowPriceFilter(!showPriceFilter);
                      setShowBrandFilter(false);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    价格区间
                    <ChevronDown size={16} />
                  </button>
                  {showPriceFilter && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-20 p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([Number(e.target.value), priceRange[1]])
                          }
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="最低价"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], Number(e.target.value)])
                          }
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="最高价"
                        />
                      </div>
                      <div className="flex gap-2">
                        {[[0, 500], [500, 2000], [2000, 5000], [5000, 10000]].map(
                          ([min, max]) => (
                            <button
                              key={`${min}-${max}`}
                              onClick={() => setPriceRange([min, max])}
                              className={`flex-1 py-1.5 text-xs rounded border transition-colors ${
                                priceRange[0] === min && priceRange[1] === max
                                  ? 'bg-amber-500 text-white border-amber-500'
                                  : 'border-gray-200 hover:border-amber-300 text-gray-600'
                              }`}
                            >
                              ¥{min}-{max}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {selectedCategory && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrands([]);
                      setPriceRange([0, 10000]);
                      setSearchKeyword('');
                    }}
                    className="px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    清除筛选
                  </button>
                )}
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 text-sm">
                共找到 <span className="text-amber-600 font-medium">{filteredProducts.length}</span> 件商品
              </span>
              <div className="flex items-center gap-4">
                <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>综合排序</option>
                  <option>销量优先</option>
                  <option>价格从低到高</option>
                  <option>价格从高到低</option>
                  <option>评分优先</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-52 bg-gray-200" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                      <div className="flex justify-between items-end">
                        <div className="h-6 bg-gray-200 rounded w-1/3" />
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images?.[0] || ''}
                          alt={product.name}
                          className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full">
                            {product.brand}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-xs mb-3">{product.specs}</p>
                        <div className="flex items-center gap-1 mb-3">
                          {renderStars(product.rating)}
                          <span className="text-xs text-gray-400 ml-1">({product.sales}人付款)</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-amber-500 font-bold text-xl">¥{product.price}</span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`p-2.5 rounded-full transition-all duration-300 ${
                              addedToCart === product._id
                                ? 'bg-green-500 text-white'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                          >
                            {addedToCart === product._id ? (
                              <Check size={18} />
                            ) : (
                              <ShoppingCart size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-500 text-lg">没有找到符合条件的商品</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedBrands([]);
                        setPriceRange([0, 10000]);
                        setSearchKeyword('');
                      }}
                      className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      清除筛选条件
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallPage;

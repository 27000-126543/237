import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ChevronRight,
  Home,
  ArrowRight,
} from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '诺贝尔瓷砖 大理石纹理地砖',
      image: 'https://picsum.photos/seed/tile1/200/200',
      price: 128,
      unit: '㎡',
      quantity: 50,
      spec: '800x800mm 浅灰色',
    },
    {
      id: 2,
      name: '圣象实木复合地板',
      image: 'https://picsum.photos/seed/floor1/200/200',
      price: 258,
      unit: '㎡',
      quantity: 30,
      spec: '橡木纹 15mm厚',
    },
    {
      id: 3,
      name: '立邦乳胶漆 净味120',
      image: 'https://picsum.photos/seed/paint1/200/200',
      price: 398,
      unit: '桶',
      quantity: 5,
      spec: '5L 白色',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map(item => item.id));

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const selectedTotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedCount = selectedItems.length;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <Link to="/mall" className="text-walnut-500 hover:text-gold-600 transition-colors">
            材料商城
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">购物车</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <ShoppingCart className="w-20 h-20 text-walnut-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-walnut-900 mb-2">购物车是空的</h2>
            <p className="text-walnut-500 mb-6">快去挑选心仪的商品吧</p>
            <Link
              to="/mall"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 text-walnut-900 font-medium rounded-xl hover:bg-gold-400 transition-colors"
            >
              去逛逛
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-walnut-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                      onChange={toggleSelectAll}
                      className="w-5 h-5 text-gold-500 rounded border-walnut-300 focus:ring-gold-500"
                    />
                    <span className="text-walnut-700 font-medium">全选</span>
                  </label>
                  <button className="text-walnut-500 hover:text-red-500 text-sm transition-colors">
                    删除选中
                  </button>
                </div>

                <div className="divide-y divide-walnut-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-5 h-5 text-gold-500 rounded border-walnut-300 focus:ring-gold-500"
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-walnut-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-walnut-500 mb-2">{item.spec}</p>
                        <p className="text-lg font-bold text-gold-600">
                          ¥{item.price.toFixed(2)}<span className="text-sm font-normal text-walnut-500">/{item.unit}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-walnut-200 text-walnut-600 hover:bg-walnut-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-walnut-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-walnut-200 text-walnut-600 hover:bg-walnut-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-lg font-bold text-walnut-900">
                          ¥{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-walnut-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-walnut-900 mb-6">订单摘要</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-walnut-600">
                    <span>已选商品</span>
                    <span>{selectedCount} 件</span>
                  </div>
                  <div className="flex justify-between text-walnut-600">
                    <span>商品总价</span>
                    <span>¥{selectedTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-walnut-600">
                    <span>运费</span>
                    <span className="text-green-600">免运费</span>
                  </div>
                  <div className="flex justify-between text-walnut-600">
                    <span>优惠</span>
                    <span className="text-red-500">-¥0.00</span>
                  </div>
                </div>

                <div className="border-t border-walnut-100 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-walnut-700 font-medium">合计</span>
                    <span className="text-2xl font-bold text-gold-600">¥{selectedTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  disabled={selectedCount === 0}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCount > 0
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-walnut-900 hover:shadow-lg hover:shadow-gold-500/30'
                      : 'bg-walnut-200 text-walnut-400 cursor-not-allowed'
                  }`}
                >
                  去结算 ({selectedCount})
                </button>

                <Link
                  to="/mall"
                  className="flex items-center justify-center gap-2 mt-4 text-walnut-600 hover:text-gold-600 transition-colors"
                >
                  继续购物
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

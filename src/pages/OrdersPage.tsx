import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, ChevronRight, Home } from 'lucide-react';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: '全部订单' },
    { key: 'pending', label: '待付款' },
    { key: 'processing', label: '进行中' },
    { key: 'completed', label: '已完成' },
  ];

  const orders = [
    {
      id: 'ORD20240101001',
      status: 'processing',
      statusText: '施工中',
      date: '2024-01-15',
      type: '装修服务',
      designer: '张明设计师',
      amount: 128000,
      progress: 60,
    },
    {
      id: 'ORD20240102002',
      status: 'pending',
      statusText: '待付款',
      date: '2024-01-18',
      type: '材料订单',
      items: '瓷砖、地板等建材',
      amount: 25600,
    },
    {
      id: 'ORD20231215003',
      status: 'completed',
      statusText: '已完成',
      date: '2023-12-20',
      type: '设计服务',
      designer: '李华设计师',
      amount: 15000,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gold-500" />;
      case 'processing':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-walnut-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">我的订单</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-walnut-100">
            <div className="flex gap-1 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-gold-500 text-gold-600'
                      : 'border-transparent text-walnut-500 hover:text-walnut-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-walnut-300 mx-auto mb-4" />
                <p className="text-walnut-500 mb-4">暂无订单</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-walnut-900 font-medium rounded-xl hover:bg-gold-400 transition-colors"
                >
                  去逛逛
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-walnut-100 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-walnut-500">订单号：{order.id}</span>
                        <span className="text-sm text-walnut-400">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-sm font-medium ${
                          order.status === 'pending' ? 'text-gold-600' :
                          order.status === 'processing' ? 'text-blue-600' :
                          'text-green-600'
                        }`}>
                          {order.statusText}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-walnut-900 mb-1">{order.type}</p>
                        <p className="text-sm text-walnut-500">
                          {'designer' in order ? order.designer : order.items}
                        </p>
                        {'progress' in order && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-walnut-500">施工进度</span>
                              <span className="text-walnut-700 font-medium">{order.progress}%</span>
                            </div>
                            <div className="w-48 h-2 bg-walnut-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold-500 rounded-full transition-all"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-walnut-900">¥{order.amount.toLocaleString()}</p>
                        <div className="flex gap-2 mt-3">
                          <button className="px-4 py-2 text-sm text-walnut-600 border border-walnut-200 rounded-lg hover:bg-walnut-50 transition-colors">
                            查看详情
                          </button>
                          {order.status === 'pending' && (
                            <button className="px-4 py-2 text-sm bg-gold-500 text-walnut-900 rounded-lg hover:bg-gold-400 transition-colors">
                              去付款
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

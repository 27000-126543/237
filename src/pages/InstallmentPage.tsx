import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  CreditCard,
  CheckCircle,
  FileText,
  Calculator,
  ArrowRight,
} from 'lucide-react';

const InstallmentPage = () => {
  const [activeTab, setActiveTab] = useState('plans');

  const plans = [
    {
      id: 1,
      bank: '中国建设银行',
      name: '装修分期贷',
      periods: [12, 24, 36, 48, 60],
      rate: '0.25%/月',
      maxAmount: 500000,
      features: ['免抵押', '免担保', '极速审批'],
    },
    {
      id: 2,
      bank: '中国工商银行',
      name: '家居消费贷',
      periods: [6, 12, 24, 36],
      rate: '0.28%/月',
      maxAmount: 300000,
      features: ['低利率', '灵活还款', '手续简单'],
    },
    {
      id: 3,
      bank: '中国银行',
      name: '爱家分期',
      periods: [12, 24, 36, 48],
      rate: '0.26%/月',
      maxAmount: 400000,
      features: ['专享额度', '优惠费率', '贴心服务'],
    },
  ];

  const [calculator, setCalculator] = useState({
    amount: 200000,
    period: 24,
    rate: 0.25,
  });

  const monthlyPayment = (calculator.amount * (1 + (calculator.rate / 100) * calculator.period)) / calculator.period;
  const totalPayment = monthlyPayment * calculator.period;
  const totalInterest = totalPayment - calculator.amount;

  const steps = [
    { icon: FileText, title: '在线申请', desc: '填写个人信息及装修需求' },
    { icon: CheckCircle, title: '快速审批', desc: '最快1天内完成审批' },
    { icon: CreditCard, title: '签署合同', desc: '确认贷款额度及还款方案' },
    { icon: CheckCircle, title: '放款使用', desc: '专款专用，直接支付' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">装修分期</h1>
        </div>

        <div className="bg-gradient-to-r from-walnut-800 to-walnut-900 rounded-3xl p-8 md:p-12 mb-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              装修资金不用愁，<span className="text-gold-400">轻松分期</span>焕新家
            </h2>
            <p className="text-walnut-200 text-lg mb-8">
              联合多家银行推出装修分期服务，低费率、高额度、快审批，让您的装修梦想轻松实现。
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-3xl font-bold text-gold-400">最高50万</p>
                <p className="text-walnut-400">贷款额度</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold-400">0.25%起</p>
                <p className="text-walnut-400">月费率</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold-400">最快1天</p>
                <p className="text-walnut-400">审批放款</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-walnut-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('plans')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'plans'
                    ? 'border-gold-500 text-gold-600'
                    : 'border-transparent text-walnut-500 hover:text-walnut-700'
                }`}
              >
                分期方案
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'calculator'
                    ? 'border-gold-500 text-gold-600'
                    : 'border-transparent text-walnut-500 hover:text-walnut-700'
                }`}
              >
                还款计算
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'plans' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border border-walnut-100 rounded-2xl p-6 hover:shadow-lg hover:border-gold-200 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-walnut-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-walnut-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-walnut-900">{plan.name}</h3>
                        <p className="text-sm text-walnut-500">{plan.bank}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-walnut-500">月费率</span>
                        <span className="font-semibold text-gold-600">{plan.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-walnut-500">最高额度</span>
                        <span className="font-semibold text-walnut-900">¥{plan.maxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-walnut-500">分期期数</span>
                        <span className="font-medium text-walnut-700">{plan.periods.join('/')}期</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gold-50 text-gold-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-walnut-900 font-medium rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all">
                      立即申请
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-walnut-700 mb-2">
                      贷款金额：¥{calculator.amount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="500000"
                      step="10000"
                      value={calculator.amount}
                      onChange={(e) => setCalculator({ ...calculator, amount: Number(e.target.value) })}
                      className="w-full h-2 bg-walnut-100 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-sm text-walnut-500 mt-1">
                      <span>¥5万</span>
                      <span>¥50万</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-walnut-700 mb-2">
                      分期期数：{calculator.period}期
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[6, 12, 24, 36, 48, 60].map((period) => (
                        <button
                          key={period}
                          onClick={() => setCalculator({ ...calculator, period })}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            calculator.period === period
                              ? 'bg-gold-500 text-walnut-900'
                              : 'bg-walnut-50 text-walnut-600 hover:bg-walnut-100'
                          }`}
                        >
                          {period}期
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-walnut-700 mb-2">
                      月费率：{calculator.rate}%
                    </label>
                    <input
                      type="range"
                      min="0.2"
                      max="0.5"
                      step="0.01"
                      value={calculator.rate}
                      onChange={(e) => setCalculator({ ...calculator, rate: Number(e.target.value) })}
                      className="w-full h-2 bg-walnut-100 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-walnut-50 to-cream rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-walnut-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gold-600" />
                    计算结果
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-walnut-500 mb-1">每月还款</p>
                      <p className="text-2xl font-bold text-gold-600">¥{monthlyPayment.toFixed(0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-walnut-500 mb-1">总还款额</p>
                      <p className="text-2xl font-bold text-walnut-900">¥{totalPayment.toFixed(0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-walnut-500 mb-1">总手续费</p>
                      <p className="text-2xl font-bold text-walnut-700">¥{totalInterest.toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-walnut-900 text-center mb-8">申请流程</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-semibold text-walnut-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-walnut-500">{step.desc}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-3 w-6 h-6 text-walnut-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPage;

// 用户相关
export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: 'owner' | 'designer' | 'constructor' | 'supplier' | 'admin';
  createdAt: string;
}

// 设计师
export interface Designer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  styles: string[];
  rating: number;
  orderCount: number;
  priceRange: { min: number; max: number };
  description: string;
  portfolio: PortfolioItem[];
  reviews: Review[];
  matchScore?: number;
}

// 作品集
export interface PortfolioItem {
  id: string;
  title: string;
  style: string;
  area: number;
  budget: number;
  coverImage: string;
  images: string[];
  panoramaUrl?: string;
}

// 评价
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
}

// 商品
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  stock: number;
  sales: number;
}

// 订单
export interface Order {
  id: string;
  orderNo: string;
  type: 'design' | 'material' | 'construction';
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  paymentNodes?: PaymentNode[];
}

export interface OrderItem {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
}

export interface PaymentNode {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid';
  deadline: string;
}

// 施工项目
export interface ConstructionProject {
  id: string;
  orderId: string;
  name: string;
  address: string;
  area: number;
  constructor: ConstructorTeam;
  status: 'bidding' | 'contract' | 'constructing' | 'acceptance' | 'completed';
  progress: ConstructionProgress[];
  photos: ConstructionPhoto[];
  reports: ConstructionReport[];
  timeline: ProjectTimeline[];
}

export interface ConstructorTeam {
  id: string;
  name: string;
  leaderName: string;
  phone: string;
  rating: number;
  completedProjects: number;
  bidPrice: number;
  bidDays: number;
}

export interface ConstructionProgress {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate?: string;
  endDate?: string;
}

export interface ConstructionPhoto {
  id: string;
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ConstructionReport {
  id: string;
  title: string;
  content: string;
  submittedBy: string;
  submittedAt: string;
}

export interface ProjectTimeline {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}

// 分期
export interface Installment {
  id: string;
  userId: string;
  amount: number;
  term: number;
  monthlyPayment: number;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  repaymentPlan: RepaymentItem[];
}

export interface RepaymentItem {
  period: number;
  amount: number;
  principal: number;
  interest: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

// 管理看板数据
export interface DashboardStats {
  totalUsers: number;
  todayOrders: number;
  totalRevenue: number;
  activeProjects: number;
  userSatisfaction: number;
  designerActiveCount: number;
  materialSales: number;
}

export interface TrendData {
  date: string;
  orders: number;
  revenue: number;
}

export interface RankingItem {
  id: string;
  name: string;
  value: number;
  avatar?: string;
}

export interface PredictionData {
  style: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

// 购物车
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specs?: Record<string, string>;
  selected?: boolean;
}

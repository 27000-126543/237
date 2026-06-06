# 筑家 - 室内设计与装修一站式服务平台

## 项目简介

筑家是一个大型室内设计与装修一站式服务平台，连接业主、设计师、施工队和材料供应商，提供从户型设计到完工验收的全流程数字化服务。

## 技术栈

### 前端
- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- React Router DOM 6
- Zustand（状态管理）
- Recharts（图表库）
- Lucide React（图标库）

### 后端
- Node.js + Express
- MongoDB + Mongoose
- JWT 身份认证
- bcryptjs 密码加密
- ExcelJS + PDFKit（报表导出）
- Multer（文件上传）

## 项目结构

```
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── models/      # MongoDB 数据模型
│   │   ├── controllers/ # 控制器
│   │   ├── routes/      # 路由
│   │   ├── middleware/   # 中间件
│   │   ├── services/     # 服务层
│   │   ├── utils/        # 工具函数
│   │   ├── data/         # 种子数据
│   │   └── server.js     # 入口文件
│   ├── package.json
│   └── .env
│
├── src/                   # 前端应用
│   ├── api/              # API 接口层
│   ├── pages/            # 页面组件
│   ├── components/       # 公共组件
│   ├── layouts/          # 布局组件
│   ├── store/            # 全局状态
│   ├── hooks/            # 自定义 Hooks
│   ├── types/            # TypeScript 类型
│   ├── data/             # Mock 数据（已迁移到后端）
│   └── main.tsx          # 入口文件
│
└── package.json
└── vite.config.ts
```

## 快速开始

### 前置条件

1. 安装 Node.js (v16+)
2. 安装 MongoDB (v4.4+)
3. 启动 MongoDB 服务

### 启动步骤

#### 1. 安装后端依赖并启动后端服务

```bash
cd backend
npm install
npm run dev
```

后端服务将在 http://localhost:5000 启动

#### 2. 初始化数据库（可选，导入种子数据）

```bash
cd backend
npm run seed
```

这将创建：
- 1个管理员账号（手机号：13800000000，密码：123456）
- 10位设计师（手机号：13800000001-13800000010，密码：123456）
- 5支施工队（手机号：13900000001-13900000005，密码：123456）
- 10位业主用户（手机号：13700000001-13700000010，密码：123456）
- 60+建材商品
- 示例订单、施工项目、评价数据

#### 3. 安装前端依赖并启动前端服务

```bash
# 在项目根目录
npm install
npm run dev
```

前端应用将在 http://localhost:3000 启动

## API 接口文档

### 认证接口

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `PUT /api/auth/profile` - 更新用户资料

### 设计师接口

- `GET /api/designers` - 获取设计师列表
- `GET /api/designers/:id` - 获取设计师详情
- `POST /api/designers/match` - 智能匹配设计师
- `GET /api/designers/:id/reviews` - 获取设计师评价

### 商品接口

- `GET /api/products` - 获取商品列表
- `GET /api/products/:id` - 获取商品详情
- `GET /api/products/:id/related` - 相关商品推荐

### 订单接口

- `POST /api/orders` - 创建订单
- `GET /api/orders` - 获取订单列表
- `GET /api/orders/:id` - 获取订单详情
- `POST /api/orders/:id/pay` - 支付订单
- `POST /api/orders/:id/cancel` - 取消订单
- `POST /api/orders/material-list` - 生成材料清单

### 施工管理接口

- `POST /api/construction` - 创建施工项目
- `GET /api/construction` - 获取施工项目列表
- `GET /api/construction/:id` - 获取施工详情
- `POST /api/construction/:id/bid` - 施工竞标
- `POST /api/construction/:id/select-constructor` - 选择施工队
- `POST /api/construction/:id/sign-contract` - 签署合同
- `POST /api/construction/:id/progress` - 更新施工进度
- `POST /api/construction/:id/photos` - 上传现场照片
- `POST /api/construction/:id/reports` - 提交监理报告
- `POST /api/construction/:id/submit-acceptance` - 提交验收申请
- `POST /api/construction/:id/confirm-acceptance` - 确认验收

### 管理后台接口

- `GET /api/admin/dashboard/stats` - 获取看板统计数据
- `GET /api/admin/dashboard/trend` - 获取趋势数据
- `GET /api/admin/dashboard/rankings` - 获取排行榜数据
- `GET /api/admin/analytics` - 数据分析
- `GET /api/admin/predictions` - 预测分析
- `GET /api/admin/construction/monitor` - 施工进度监控

### 报表导出接口

- `GET /api/reports/monthly/excel` - 导出月度运营报表 Excel
- `GET /api/reports/monthly/pdf` - 导出月度运营报表 PDF
- `GET /api/reports/designer/excel` - 导出设计师绩效报表 Excel
- `GET /api/reports/designer/pdf` - 导出设计师绩效报表 PDF
- `GET /api/reports/constructor/excel` - 导出施工队评分报表 Excel
- `GET /api/reports/constructor/pdf` - 导出施工队评分报表 PDF
- `GET /api/reports/material/excel` - 导出材料销售排行 Excel
- `GET /api/reports/material/pdf` - 导出材料销售排行 PDF

### 文件上传接口

- `POST /api/upload/image` - 上传单张图片
- `POST /api/upload/images` - 上传多张图片

## 核心功能

### 1. 用户注册登录
- 支持手机号注册登录
- JWT Token 身份认证
- 支持业主、设计师、施工队、管理员多种角色

### 2. 智能设计师匹配
- 上传户型图
- 选择风格偏好
- 设置预算区间
- AI 智能匹配算法（风格40% + 预算30% + 评分20% + 订单量10%）

### 3. 3D效果展示
- 设计师作品集展示
- 720度全景预览
- 方案对比功能

### 4. 材料商城
- 分类浏览建材商品
- 多条件筛选（品牌、价格、规格）
- 购物车功能
- 在线下单

### 5. 施工管理
- 施工队竞标
- 电子合同签署
- 施工进度跟踪
- 现场照片上传
- 监理报告提交
- 在线验收

### 6. 装修分期
- 额度评估
- 还款计划
- 在线申请

### 7. 管理看板
- 实时数据统计
- 订单趋势分析
- 设计师活跃度监控
- 材料销量分析
- 用户满意度统计
- 施工进度预警

### 8. 报表导出
- 月度运营报表
- 设计师绩效报表
- 施工队评分报表
- 材料销售排行
- 支持 Excel 和 PDF 格式

## 数据库设计

### 核心数据模型
- User（用户）- 包含业主、设计师、施工队、供应商、管理员
- Product（商品）- 建材商品信息
- Order（订单）- 订单信息
- Construction（施工项目）- 施工全流程信息
- Review（评价）- 用户评价
- Installment（分期）- 装修分期申请
- Notification（通知）- 系统消息推送

## 特色亮点

1. **全流程数字化**：从设计→选材→施工→验收→分期，一站式服务
2. **智能匹配算法**：基于风格、预算、评分多维匹配设计师
3. **实时进度透明**：施工全过程照片、报告实时推送
4. **数据驱动运营**：管理后台实时数据监控，智能预测分析
5. **专业报表导出**：支持多维度报表，Excel/PDF双格式

## 开发说明

### 前端开发
- 所有页面组件位于 `src/pages/`
- API 接口统一在 `src/api/`
- 全局状态使用 Zustand 管理
- UI 组件使用 TailwindCSS 样式
- 图表使用 Recharts

### 后端开发
- RESTful API 设计
- 中间件统一错误处理
- JWT 中间件保护接口权限
- MongoDB 聚合查询实现统计分析
- ExcelJS/PDFKit 实现报表导出

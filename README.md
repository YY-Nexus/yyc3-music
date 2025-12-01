# 一言一语AI视听中心 (YY-Music)

一个基于人工智能的音视频创作平台，融合了先进的AI技术与创意表达，为用户提供专业级的音乐视频创作体验。

## 🚀 项目概述

一言一语AI视听中心是一个全栈Next.js应用，集成了多种AI服务和创新功能，包括：
- AI智能MV生成系统
- 多媒体DIY工作坊
- 创新交互体验（AR/VR、手势识别、声音互动）
- 社区功能和排行系统
- 区块链艺术资产管理
- 企业级安全和风控系统

## 📋 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [安装和运行](#安装和运行)
- [环境变量](#环境变量)
- [API接口](#api接口)
- [路由系统](#路由系统)
- [核心功能](#核心功能)
- [组件架构](#组件架构)
- [部署指南](#部署指南)
- [开发指南](#开发指南)
- [测试](#测试)
- [贡献指南](#贡献指南)

## 🛠 技术栈

### 前端框架
- **Next.js 13.4.12** - React全栈框架，使用App Router
- **React 18.2.0** - 用户界面库
- **TypeScript 5.1.6** - 类型安全的JavaScript

### 样式和UI
- **Tailwind CSS 3.3.3** - 实用优先的CSS框架
- **Framer Motion 10.15.0** - 动画库
- **Lucide React 0.263.1** - 图标库
- **Radix UI** - 无障碍UI组件库
  - @radix-ui/react-slot ^1.0.2
  - @radix-ui/react-avatar ^1.0.4
  - @radix-ui/react-select ^2.0.0
  - @radix-ui/react-slider ^1.1.2
  - @radix-ui/react-tabs ^1.0.4

### 3D和交互
- **Three.js 0.155.0** - 3D图形库
- **@react-three/fiber 8.13.6** - React Three.js渲染器
- **@react-three/drei 9.80.1** - Three.js实用工具
- **@use-gesture/react 10.3.0** - 手势识别

### AI集成
- **AI SDK 3.4.32** - Vercel AI SDK核心
- **@ai-sdk/openai 0.0.66** - OpenAI集成

### 状态管理和工具
- **React Error Boundary 4.0.10** - 错误边界处理
- **React Colorful 5.6.1** - 颜色选择器
- **Class Variance Authority 0.7.0** - 条件类名工具
- **clsx 2.0.0** - 类名合并工具
- **Tailwind Merge 1.14.0** - Tailwind类名合并

### 开发工具
- **ESLint 8.46.0** - 代码检查
- **Autoprefixer 10.4.14** - CSS前缀自动添加
- **PostCSS 8.4.27** - CSS处理器

### 测试框架
- **Vitest 1.0.4** - 单元测试框架
- **@testing-library/react 14.1.2** - React测试工具
- **@testing-library/jest-dom 6.1.4** - Jest DOM匹配器
- **@testing-library/user-event 14.5.1** - 用户事件模拟
- **jsdom 23.0.1** - DOM环境模拟

### 国际化
- **next-international 1.2.4** - Next.js国际化支持

## 📁 项目结构

\`\`\`
speech-ai-music/
├── app/                          # Next.js App Router目录
│   ├── api/                      # API路由
│   │   ├── auth/                 # 认证相关API
│   │   │   ├── login/route.ts    # 登录接口
│   │   │   └── reset-password/route.ts # 密码重置
│   │   ├── csrf/route.ts         # CSRF令牌管理
│   │   ├── generate-music/route.ts # 音乐生成API
│   │   ├── trending/route.ts     # 趋势数据API
│   │   └── user/                 # 用户相关API
│   │       └── sensitive-data/route.ts # 敏感数据处理
│   ├── components/               # React组件
│   │   ├── broadcast/            # 广播系统组件
│   │   │   └── GeoBroadcastSystem.tsx
│   │   ├── collaboration/        # 协作功能组件
│   │   │   └── real-time-editor.tsx
│   │   ├── community/            # 社区功能组件
│   │   │   └── VideoCommunity.tsx
│   │   ├── creation/             # 创作工具组件
│   │   │   ├── AIMVGenerator.tsx
│   │   │   ├── CreationWorkflow.tsx
│   │   │   └── MultimediaDIYWorkshop.tsx
│   │   ├── home/                 # 首页组件
│   │   │   ├── RankingBoard.tsx
│   │   │   └── __tests__/        # 组件测试
│   │   ├── info/                 # 信息展示组件
│   │   │   └── StarPowerInfo.tsx
│   │   ├── layout/               # 布局组件
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── ranking/              # 排行系统组件
│   │   │   └── EnhancedRankingSystem.tsx
│   │   ├── security/             # 安全相关组件
│   │   │   ├── AntiCheatSystem.tsx
│   │   │   ├── csrf-protected-form.tsx
│   │   │   ├── encrypted-data-example.tsx
│   │   │   ├── permission-guard.tsx
│   │   │   └── role-based-ui-example.tsx
│   │   ├── social/               # 社交功能组件
│   │   │   ├── collaborative-playlist.tsx
│   │   │   └── music-community-feed.tsx
│   │   └── ui/                   # 基础UI组件
│   ├── i18n/                     # 国际化配置
│   │   ├── client.ts
│   │   ├── index.ts
│   │   └── locales/              # 语言文件
│   │       ├── en.json
│   │       ├── ja.json
│   │       └── zh.json
│   ├── lib/                      # 工具库
│   │   ├── auth/                 # 认证相关
│   │   │   └── permissions.ts
│   │   ├── geo/                  # 地理位置相关
│   │   │   └── content-strategy.ts
│   │   └── security/             # 安全工具
│   │       └── encryption.ts
│   ├── login/                    # 登录页面
│   │   ├── components/           # 登录组件
│   │   │   ├── cyberpunk-avatar.tsx
│   │   │   ├── face-scanner.tsx
│   │   │   ├── galaxy-vortex.tsx
│   │   │   ├── music-password.tsx
│   │   │   └── voice-tunnel.tsx
│   │   └── page.tsx
│   ├── [locale]/                 # 国际化路由
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── auth/page.tsx             # 认证页面
│   ├── icp-verify/page.tsx       # ICP备案验证
│   ├── privacy-policy/page.tsx   # 隐私政策
│   ├── register/page.tsx         # 注册页面
│   ├── terms-of-service/page.tsx # 服务条款
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # 共享组件
│   └── ui/                       # shadcn/ui组件
├── e2e/                          # 端到端测试
│   ├── home.spec.ts
│   ├── login.spec.ts
│   └── navigation.spec.ts
├── lib/                          # 共享工具库
│   ├── geo/
│   │   └── content-strategy.ts
│   ├── security/
│   │   └── encryption.ts
│   └── utils.ts
├── performance/                  # 性能测试
│   ├── component-benchmark.js
│   ├── lighthouse-ci-config.js
│   ├── load-test.js
│   └── memory-profiling.js
├── scripts/                      # 构建脚本
├── .env.example                  # 环境变量示例
├── .env.local                    # 本地环境变量
├── next.config.js                # Next.js配置
├── package.json                  # 项目依赖
├── playwright.config.ts          # Playwright配置
├── postcss.config.js             # PostCSS配置
├── tailwind.config.js            # Tailwind配置
├── tsconfig.json                 # TypeScript配置
└── vercel.json                   # Vercel部署配置
\`\`\`

## 🚀 安装和运行

### 前置要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
\`\`\`bash
# 克隆项目
git clone https://github.com/your-username/speech-ai-music.git
cd speech-ai-music

# 安装依赖
npm install
# 或
yarn install
\`\`\`

### 环境配置
1. 复制环境变量示例文件：
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. 编辑 \`.env.local\` 文件，填入必要的环境变量（详见[环境变量](#环境变量)部分）

### 运行开发服务器
\`\`\`bash
npm run dev
# 或
yarn dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
\`\`\`bash
npm run build
npm run start
# 或
yarn build
yarn start
\`\`\`

## 🔐 环境变量

项目需要以下环境变量，请在 \`.env.local\` 文件中配置：

### AI服务配置
\`\`\`env
# OpenAI API密钥
OPENAI_API_KEY=sk-your-openai-api-key

# xAI (Grok) API密钥
XAI_API_KEY=your-xai-api-key

# Groq API密钥
GROQ_API_KEY=your-groq-api-key

# Fal AI API密钥
FAL_KEY=your-fal-api-key

# DeepInfra API密钥
DEEPINFRA_API_KEY=your-deepinfra-api-key
\`\`\`

### 数据库配置
\`\`\`env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Neon数据库URL
DATABASE_URL=postgresql://username:password@host:port/database

# Upstash Redis配置
KV_REST_API_URL=your-upstash-redis-url
KV_REST_API_TOKEN=your-upstash-redis-token
\`\`\`

### 安全配置
\`\`\`env
# 数据加密密钥（64位十六进制字符串）
ENCRYPTION_KEY=your-64-character-hex-encryption-key

# JWT密钥
JWT_SECRET=your-jwt-secret-key

# CSRF保护密钥
CSRF_SECRET=your-csrf-secret-key
\`\`\`

### 第三方服务
\`\`\`env
# 高德地图API密钥（仅客户端使用）
NEXT_PUBLIC_GAODE_API_KEY=your-gaode-api-key

# 文件存储配置
NEXT_PUBLIC_VERCEL_BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# 支付服务配置
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
\`\`\`

### 应用配置
\`\`\`env
# 应用环境
NODE_ENV=development

# 应用URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 日志级别
LOG_LEVEL=info
\`\`\`

## 🔌 API接口

### 认证相关 API

#### POST /api/auth/login
用户登录接口
\`\`\`typescript
// 请求体
{
  email: string;
  password: string;
}

// 响应
{
  success: boolean;
  token?: string;
  user?: UserInfo;
  error?: string;
}
\`\`\`

#### POST /api/auth/reset-password
密码重置接口，使用AI分析用户密码模式
\`\`\`typescript
// 请求体
{
  email: string;
}

// 响应
{
  suggestion: string;
  status: "success" | "error";
  error?: string;
}
\`\`\`

### AI生成相关 API

#### POST /api/generate-music
音乐生成接口
\`\`\`typescript
// 请求体
{
  prompt: string;
  style: string;
  tempo: number;
  duration: number;
  mood: string;
}

// 响应
{
  description: string;
  audioUrl: string;
  metadata: {
    style: string;
    tempo: number;
    duration: number;
    mood: string;
    generatedAt: string;
  };
}
\`\`\`

### 数据相关 API

#### GET /api/trending
获取趋势数据
\`\`\`typescript
// 查询参数
?category=all|music|video|user

// 响应
{
  data: TrendingItem[];
  category: string;
  timestamp: string;
}
\`\`\`

#### POST /api/trending
手动重新验证缓存
\`\`\`typescript
// 请求体
{
  category?: string;
}

// 响应
{
  revalidated: boolean;
  category?: string;
}
\`\`\`

### 安全相关 API

#### GET /api/csrf
获取CSRF令牌
\`\`\`typescript
// 响应
{
  csrfToken: string;
}
\`\`\`

#### POST /api/user/sensitive-data
存储敏感数据（加密）
\`\`\`typescript
// 请求体
{
  userId: string;
  sensitiveData: any;
}

// 响应
{
  userId: string;
  encryptedData: string;
  iv: string;
  authTag: string;
  message: string;
}
\`\`\`

#### GET /api/user/sensitive-data
获取敏感数据（解密）
\`\`\`typescript
// 查询参数
?userId=user-id

// 响应
{
  userId: string;
  sensitiveData: any;
  message: string;
}
\`\`\`

## 🛣 路由系统

### 页面路由

| 路由 | 文件路径 | 描述 |
|------|----------|------|
| `/` | `app/page.tsx` | 首页 |
| `/login` | `app/login/page.tsx` | 登录页面 |
| `/register` | `app/register/page.tsx` | 注册页面 |
| `/auth` | `app/auth/page.tsx` | 认证页面 |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | 隐私政策 |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | 服务条款 |
| `/icp-verify` | `app/icp-verify/page.tsx` | ICP备案验证 |

### 国际化路由

| 路由 | 文件路径 | 描述 |
|------|----------|------|
| `/en` | `app/[locale]/page.tsx` | 英文版首页 |
| `/zh` | `app/[locale]/page.tsx` | 中文版首页 |
| `/ja` | `app/[locale]/page.tsx` | 日文版首页 |

### API路由

| 方法 | 路由 | 描述 |
|------|------|------|
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/auth/reset-password` | 密码重置 |
| GET | `/api/csrf` | 获取CSRF令牌 |
| POST | `/api/generate-music` | AI音乐生成 |
| GET/POST | `/api/trending` | 趋势数据管理 |
| GET/POST | `/api/user/sensitive-data` | 敏感数据处理 |

## 🎯 核心功能

### 1. AI智能创作系统
- **AI MV生成器**: 基于文本提示生成音乐视频
- **多媒体DIY工作坊**: 提供丰富的创作工具和素材
- **跨模态交互**: 支持文本、音频、视频的智能转换
- **创作工作流**: 完整的创作流程管理

### 2. 创新交互体验
- **AR预览功能**: 使用摄像头进行增强现实体验
- **手势识别**: 支持手势控制和交互
- **声音互动**: 语音识别和音频处理
- **3D可视化**: Three.js驱动的3D场景和动画

### 3. 社区和社交功能
- **视频社区**: 用户作品展示和互动
- **排行榜系统**: 多维度排名和竞赛
- **协作播放列表**: 多用户协作创作
- **实时编辑器**: 支持多人同时编辑

### 4. 安全和风控系统
- **反作弊系统**: 声纹检测和行为分析
- **版权保护**: 数字水印和版权检测
- **数据加密**: AES-256-GCM加密算法
- **权限管理**: 基于角色的访问控制

### 5. 商业化功能
- **分层订阅**: 基础版、会员版、企业版
- **星力系统**: 虚拟货币和积分机制
- **增值服务**: 高级功能和特权
- **企业解决方案**: 定制化服务

### 6. 技术特性
- **性能优化**: 智能缓存和懒加载
- **响应式设计**: 适配各种设备和屏幕
- **国际化支持**: 多语言和地区化
- **错误处理**: 完善的错误边界和恢复机制

## 🧩 组件架构

### 组件分层结构

\`\`\`
Components/
├── Layout Components (布局组件)
│   ├── Navbar - 导航栏
│   ├── Footer - 页脚
│   └── DynamicSkinSystem - 动态皮肤系统
├── Feature Components (功能组件)
│   ├── Creation/ - 创作相关组件
│   ├── Community/ - 社区功能组件
│   ├── Security/ - 安全相关组件
│   ├── Broadcast/ - 广播系统组件
│   └── Ranking/ - 排行系统组件
├── UI Components (基础UI组件)
│   ├── Button - 按钮组件
│   ├── Card - 卡片组件
│   ├── Modal - 模态框组件
│   └── Form - 表单组件
└── Utility Components (工具组件)
    ├── ErrorBoundary - 错误边界
    ├── LoadingSpinner - 加载指示器
    └── PermissionGuard - 权限守卫
\`\`\`

### 组件设计原则

1. **单一职责**: 每个组件只负责一个特定功能
2. **可复用性**: 组件设计考虑复用场景
3. **类型安全**: 使用TypeScript确保类型安全
4. **无障碍性**: 遵循WCAG无障碍标准
5. **性能优化**: 使用React.memo和useMemo优化性能

### 状态管理策略

- **本地状态**: 使用useState和useReducer
- **全局状态**: 通过Context API管理
- **服务器状态**: 使用SWR或React Query
- **表单状态**: 使用React Hook Form

## 🚀 部署指南

### Vercel部署（推荐）

1. **连接GitHub仓库**
\`\`\`bash
# 推送代码到GitHub
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **在Vercel中导入项目**
- 访问 [vercel.com](https://vercel.com)
- 点击"New Project"
- 选择GitHub仓库
- 配置环境变量

3. **配置环境变量**
在Vercel Dashboard中添加所有必要的环境变量。

4. **自动部署**
每次推送到main分支都会自动触发部署。

### Docker部署

1. **创建Dockerfile**
\`\`\`dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

2. **构建和运行**
\`\`\`bash
docker build -t speech-ai-music .
docker run -p 3000:3000 speech-ai-music
\`\`\`

### 自定义服务器部署

1. **构建项目**
\`\`\`bash
npm run build
\`\`\`

2. **使用PM2管理进程**
\`\`\`bash
npm install -g pm2
pm2 start npm --name "speech-ai-music" -- start
\`\`\`

3. **配置Nginx反向代理**
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

## 👨‍💻 开发指南

### 代码规范

1. **TypeScript**: 所有新代码必须使用TypeScript
2. **ESLint**: 遵循项目ESLint配置
3. **Prettier**: 使用Prettier格式化代码
4. **命名规范**: 
   - 组件使用PascalCase
   - 函数和变量使用camelCase
   - 常量使用UPPER_SNAKE_CASE

### 组件开发流程

1. **创建组件文件**
\`\`\`typescript
// components/example/ExampleComponent.tsx
import React from 'react'

interface ExampleComponentProps {
  title: string
  onAction: () => void
}

export default function ExampleComponent({ title, onAction }: ExampleComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onAction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Action
      </button>
    </div>
  )
}
\`\`\`

2. **添加测试文件**
\`\`\`typescript
// components/example/__tests__/ExampleComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ExampleComponent from '../ExampleComponent'

describe('ExampleComponent', () => {
  it('renders title correctly', () => {
    const mockAction = jest.fn()
    render(<ExampleComponent title="Test Title" onAction={mockAction} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onAction when button is clicked', () => {
    const mockAction = jest.fn()
    render(<ExampleComponent title="Test" onAction={mockAction} />)
    
    fireEvent.click(screen.getByText('Action'))
    expect(mockAction).toHaveBeenCalledTimes(1)
  })
})
\`\`\`

3. **导出组件**
\`\`\`typescript
// components/example/index.ts
export { default } from './ExampleComponent'
\`\`\`

### API开发流程

1. **创建API路由**
\`\`\`typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 处理GET请求
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // 处理POST请求
    const result = await processData(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    )
  }
}
\`\`\`

2. **添加类型定义**
\`\`\`typescript
// types/api.ts
export interface ExampleRequest {
  name: string
  email: string
}

export interface ExampleResponse {
  id: string
  message: string
  timestamp: string
}
\`\`\`

### 样式开发指南

1. **使用Tailwind CSS类**
\`\`\`typescript
<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold text-white">Title</h1>
  <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors">
    Button
  </button>
</div>
\`\`\`

2. **自定义CSS变量**
\`\`\`css
/* globals.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #10b981;
}

.custom-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}
\`\`\`

3. **响应式设计**
\`\`\`typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white rounded-lg">Card 1</div>
  <div className="p-4 bg-white rounded-lg">Card 2</div>
  <div className="p-4 bg-white rounded-lg">Card 3</div>
</div>
\`\`\`

## 🧪 测试

### 运行测试

\`\`\`bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行测试UI
npm run test:ui

# 运行端到端测试
npx playwright test
\`\`\`

### 测试类型

1. **单元测试**: 测试单个组件和函数
2. **集成测试**: 测试组件间的交互
3. **端到端测试**: 测试完整的用户流程
4. **性能测试**: 测试应用性能和负载

### 测试最佳实践

1. **测试驱动开发**: 先写测试，再写实现
2. **覆盖率目标**: 保持80%以上的代码覆盖率
3. **模拟外部依赖**: 使用mock模拟API调用
4. **可读性**: 测试代码应该清晰易懂

## 🤝 贡献指南

### 贡献流程

1. **Fork项目**
2. **创建功能分支**
\`\`\`bash
git checkout -b feature/new-feature
\`\`\`

3. **提交更改**
\`\`\`bash
git commit -m "feat: add new feature"
\`\`\`

4. **推送分支**
\`\`\`bash
git push origin feature/new-feature
\`\`\`

5. **创建Pull Request**

### 提交信息规范

使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

- \`feat:\` 新功能
- \`fix:\` 修复bug
- \`docs:\` 文档更新
- \`style:\` 代码格式调整
- \`refactor:\` 代码重构
- \`test:\` 测试相关
- \`chore:\` 构建过程或辅助工具的变动

### 代码审查清单

- [ ] 代码符合项目规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 通过了所有测试
- [ ] 没有引入安全漏洞

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 📞 联系方式

- **项目维护者**: 一言一语团队
- **邮箱**: admin@0379.email
- **官网**: https://music.mymgmt.cn
- **GitHub**: https://github.com/YY-Nexus/yyc3-music.git

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。特别感谢：

- [Next.js](https://nextjs.org/) 团队提供的优秀框架
- [Vercel](https://vercel.com/) 提供的部署平台
- [OpenAI](https://openai.com/) 提供的AI服务
- 所有开源项目的贡献者

---

**一言一语AI视听中心** - 让AI创造无限可能 🎵✨
\`\`\`

# 食养智脑 (Dietary Sage) 全栈开发计划

> 基于中医体质理论的智能食养推荐系统

## 一、项目概述

### 1.1 项目简介

"食养智脑"是一款融合中医体质辨识与现代营养学的智能饮食推荐系统。用户通过体质诊断、口味偏好设置，获得个性化的食养方案和菜谱推荐。

### 1.2 核心功能

| 模块 | 功能描述 |
|------|----------|
| 体质诊断 | AI问诊 + 手动选择，识别九种中医体质 |
| 口味调优 | 五味偏好、饮食禁忌、特殊状态、用餐场景 |
| 智膳推荐 | 基于体质+偏好的个性化菜谱推荐 |
| 食材百科 | 食材性味归经、功效查询 |
| 用户中心 | 注册登录、收藏、历史记录 |

### 1.3 技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  Vue 3 + Vite + Pinia + Vue Router + Axios + TailwindCSS    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ RESTful API (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│  Node.js + Koa2 + Koa-Router + Koa-Body + JWT + Joi        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database                               │
│  MongoDB (Mongoose) / MySQL (Sequelize/Knex)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Third-Party Services                      │
│  AI大模型API / 天气API / 节气API / 对象存储OSS              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、项目目录结构

```
FoodSynergy/
├── UI/                              # 原型设计（已完成）
│
├── client/                          # 前端项目
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                     # API 请求封装
│   │   │   ├── index.js             # Axios 实例配置
│   │   │   ├── auth.js              # 认证相关 API
│   │   │   ├── user.js              # 用户相关 API
│   │   │   ├── constitution.js      # 体质相关 API
│   │   │   ├── recipe.js            # 菜谱相关 API
│   │   │   └── ingredient.js        # 食材相关 API
│   │   │
│   │   ├── assets/                  # 静态资源
│   │   │   ├── images/
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │       ├── variables.css    # CSS 变量
│   │   │       ├── base.css         # 基础样式
│   │   │       └── transitions.css  # 过渡动画
│   │   │
│   │   ├── components/              # 公共组件
│   │   │   ├── common/              # 通用组件
│   │   │   │   ├── AppHeader.vue
│   │   │   │   ├── AppFooter.vue
│   │   │   │   ├── AppButton.vue
│   │   │   │   ├── AppCard.vue
│   │   │   │   ├── AppModal.vue
│   │   │   │   ├── AppToast.vue
│   │   │   │   ├── AppLoading.vue
│   │   │   │   └── AppEmpty.vue
│   │   │   │
│   │   │   ├── body-scanner/        # 体质诊断组件
│   │   │   │   ├── BodyModel.vue    # SVG 人体模型
│   │   │   │   ├── ConstitutionCard.vue
│   │   │   │   ├── AiChat.vue       # AI 问诊对话
│   │   │   │   └── YinYangIndicator.vue
│   │   │   │
│   │   │   ├── preference/          # 偏好设置组件
│   │   │   │   ├── FlavorSlider.vue
│   │   │   │   ├── ExclusionTags.vue
│   │   │   │   ├── ContextToggle.vue
│   │   │   │   └── SceneSelector.vue
│   │   │   │
│   │   │   └── recipe/              # 菜谱相关组件
│   │   │       ├── RecipeCard.vue
│   │   │       ├── RecipeDetail.vue
│   │   │       ├── RecipeFilter.vue
│   │   │       ├── IngredientTag.vue
│   │   │       └── NutritionChart.vue
│   │   │
│   │   ├── composables/             # 组合式函数
│   │   │   ├── useAuth.js           # 认证逻辑
│   │   │   ├── useConstitution.js   # 体质逻辑
│   │   │   ├── usePreference.js     # 偏好逻辑
│   │   │   ├── useRecipe.js         # 菜谱逻辑
│   │   │   └── useToast.js          # 消息提示
│   │   │
│   │   ├── router/                  # 路由配置
│   │   │   └── index.js
│   │   │
│   │   ├── stores/                  # Pinia 状态管理
│   │   │   ├── index.js
│   │   │   ├── user.js              # 用户状态
│   │   │   ├── constitution.js      # 体质状态
│   │   │   ├── preference.js        # 偏好状态
│   │   │   └── recipe.js            # 菜谱状态
│   │   │
│   │   ├── utils/                   # 工具函数
│   │   │   ├── request.js           # 请求封装
│   │   │   ├── storage.js           # 本地存储
│   │   │   ├── validators.js        # 表单验证
│   │   │   ├── formatters.js        # 格式化函数
│   │   │   └── constants.js         # 常量定义
│   │   │
│   │   ├── views/                   # 页面视图
│   │   │   ├── Home.vue             # 首页/体质诊断
│   │   │   ├── PreferenceTuner.vue  # 口味调优
│   │   │   ├── WisdomDashboard.vue  # 智膳推荐
│   │   │   ├── RecipeDetail.vue     # 菜谱详情
│   │   │   ├── IngredientLibrary.vue # 食材百科
│   │   │   ├── Profile.vue          # 个人中心
│   │   │   ├── Favorites.vue        # 我的收藏
│   │   │   ├── Login.vue            # 登录
│   │   │   └── Register.vue         # 注册
│   │   │
│   │   ├── App.vue                  # 根组件
│   │   └── main.js                  # 入口文件
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                          # 后端项目
│   ├── src/
│   │   ├── app.js                   # Koa 应用入口
│   │   ├── config/                  # 配置文件
│   │   │   ├── index.js             # 配置聚合
│   │   │   ├── database.js          # 数据库配置
│   │   │   ├── jwt.js               # JWT 配置
│   │   │   └── third-party.js       # 第三方服务配置
│   │   │
│   │   ├── controllers/             # 控制器
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── constitutionController.js
│   │   │   ├── preferenceController.js
│   │   │   ├── recipeController.js
│   │   │   ├── ingredientController.js
│   │   │   └── aiController.js
│   │   │
│   │   ├── middlewares/             # 中间件
│   │   │   ├── auth.js              # JWT 认证
│   │   │   ├── errorHandler.js      # 错误处理
│   │   │   ├── validator.js         # 参数验证
│   │   │   ├── logger.js            # 日志记录
│   │   │   └── rateLimit.js         # 限流
│   │   │
│   │   ├── models/                  # 数据模型
│   │   │   ├── User.js
│   │   │   ├── Constitution.js
│   │   │   ├── Preference.js
│   │   │   ├── Recipe.js
│   │   │   ├── Ingredient.js
│   │   │   ├── Favorite.js
│   │   │   └── ChatHistory.js
│   │   │
│   │   ├── routes/                  # 路由
│   │   │   ├── index.js             # 路由聚合
│   │   │   ├── auth.js
│   │   │   ├── user.js
│   │   │   ├── constitution.js
│   │   │   ├── preference.js
│   │   │   ├── recipe.js
│   │   │   ├── ingredient.js
│   │   │   └── ai.js
│   │   │
│   │   ├── services/                # 业务逻辑层
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── constitutionService.js
│   │   │   ├── recipeService.js
│   │   │   ├── recommendService.js  # 推荐算法
│   │   │   └── aiService.js         # AI 对接
│   │   │
│   │   ├── utils/                   # 工具函数
│   │   │   ├── response.js          # 响应封装
│   │   │   ├── jwt.js               # JWT 工具
│   │   │   ├── crypto.js            # 加密工具
│   │   │   ├── solarTerm.js         # 节气计算
│   │   │   └── validators.js        # 验证器
│   │   │
│   │   └── data/                    # 静态数据/种子数据
│   │       ├── constitutions.json   # 九种体质数据
│   │       ├── ingredients.json     # 食材数据
│   │       ├── recipes.json         # 菜谱数据
│   │       └── solarTerms.json      # 节气数据
│   │
│   ├── tests/                       # 测试文件
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── scripts/                     # 脚本
│   │   ├── seed.js                  # 数据库初始化
│   │   └── migrate.js               # 数据迁移
│   │
│   ├── .env.example                 # 环境变量示例
│   ├── .env                         # 环境变量（gitignore）
│   └── package.json
│
├── docs/                            # 文档
│   ├── api.md                       # API 文档
│   ├── database.md                  # 数据库设计
│   └── deployment.md                # 部署文档
│
├── docker-compose.yml               # Docker 编排
├── .gitignore
├── README.md
└── plan.md                          # 本文件
```

---

## 三、数据库设计

### 3.1 数据库选型建议

| 数据库 | 优势 | 适用场景 |
|--------|------|----------|
| **MongoDB** | 灵活的文档结构、易扩展、适合存储JSON | 菜谱数据结构多变、快速迭代 |
| **MySQL** | 强一致性、事务支持、关系查询 | 用户数据、收藏关系 |

**推荐方案**：采用 **MongoDB** 作为主数据库，原因：
1. 菜谱、食材数据字段灵活（不同菜谱步骤数量不同）
2. 用户偏好是嵌套JSON结构，MongoDB原生支持
3. 开发效率高，无需频繁改表结构

### 3.2 数据模型设计 (MongoDB)

#### User（用户）

```javascript
{
  _id: ObjectId,
  username: String,           // 用户名
  email: String,              // 邮箱（唯一）
  password: String,           // 密码（bcrypt加密）
  avatar: String,             // 头像URL
  phone: String,              // 手机号

  constitution: {             // 体质信息
    type: String,             // 体质类型 enum
    diagnosedAt: Date,        // 诊断时间
    diagnosisMethod: String,  // 诊断方式：'ai' | 'manual'
    yinYangBalance: [Number, Number],  // 阴阳比例
    qiBloodLevel: Number      // 气血值
  },

  preferences: {              // 口味偏好
    flavors: {                // 五味偏好 (0-4)
      sour: Number,
      sweet: Number,
      bitter: Number,
      spicy: Number,
      salty: Number
    },
    exclusions: [String],     // 禁忌食材
    dietaryStyle: String,     // 饮食方式：normal/vegetarian/vegan/halal
    defaultScene: {           // 默认场景
      mealType: String,
      cookingTime: String
    }
  },

  contextStatus: [String],    // 当前状态：menstrual/stayup/cold/exercise

  favorites: [ObjectId],      // 收藏菜谱ID

  createdAt: Date,
  updatedAt: Date
}
```

#### Constitution（体质类型）

```javascript
{
  _id: ObjectId,
  code: String,               // 体质代码：balanced/qi-deficiency/yang-deficiency...
  name: String,               // 中文名：平和质/气虚质/阳虚质...
  icon: String,               // 图标 emoji
  description: String,        // 描述
  characteristics: [String],  // 特征列表

  dietaryAdvice: {
    recommended: [String],    // 宜吃食材
    avoided: [String],        // 忌吃食材
    suitableFlavors: [String], // 适宜口味
    cookingMethods: [String]  // 推荐烹饪方式
  },

  seasonalTips: {             // 节气养生建议
    spring: String,
    summer: String,
    autumn: String,
    winter: String
  },

  visualEffects: {            // 人体模型光效配置
    coldAreas: [String],      // 寒气区域
    hotAreas: [String]        // 热气区域
  }
}
```

#### Ingredient（食材）

```javascript
{
  _id: ObjectId,
  name: String,               // 食材名称
  alias: [String],            // 别名
  category: String,           // 分类：vegetable/meat/seafood/grain/fruit/herb
  icon: String,               // 图标
  image: String,              // 图片URL

  tcmProperties: {            // 中医属性
    nature: String,           // 性：hot/warm/neutral/cool/cold
    flavor: [String],         // 味：sour/sweet/bitter/spicy/salty
    meridians: [String],      // 归经：heart/liver/spleen/lung/kidney
    effects: [String]         // 功效
  },

  nutrition: {                // 营养成分 (per 100g)
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    fiber: Number,
    vitamins: Object,
    minerals: Object
  },

  suitableConstitutions: [String],  // 适宜体质
  avoidConstitutions: [String],     // 不宜体质

  seasonality: [String],      // 当季月份：['10', '11', '12']
  tags: [String],             // 标签：organic/local/imported

  createdAt: Date,
  updatedAt: Date
}
```

#### Recipe（菜谱）

```javascript
{
  _id: ObjectId,
  name: String,               // 菜名
  description: String,        // 简介
  image: String,              // 封面图
  video: String,              // 视频URL

  tcmProperties: {            // 中医属性
    nature: String,           // 整体性味
    flavors: [String],
    meridians: [String],
    effects: [String],        // 功效：补气/养血/祛湿...
    analysis: String          // 食养分析文字
  },

  ingredients: [{             // 食材列表
    ingredientId: ObjectId,
    name: String,
    amount: String,           // 用量
    isMain: Boolean           // 是否主料
  }],

  steps: [{                   // 烹饪步骤
    order: Number,
    content: String,
    image: String,
    duration: Number          // 预计时长（分钟）
  }],

  metadata: {
    cookingTime: Number,      // 总时长（分钟）
    difficulty: String,       // easy/medium/hard
    servings: Number,         // 份量
    calories: Number          // 总热量
  },

  suitability: {              // 适宜性
    constitutions: [{
      type: String,
      matchScore: Number      // 匹配度 0-100
    }],
    seasons: [String],        // 适宜季节
    contexts: [String]        // 适宜状态
  },

  author: ObjectId,           // 作者（管理员或用户投稿）
  status: String,             // draft/published/archived
  viewCount: Number,
  favoriteCount: Number,

  createdAt: Date,
  updatedAt: Date
}
```

#### ChatHistory（AI问诊记录）

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  sessionId: String,          // 会话ID

  messages: [{
    role: String,             // 'user' | 'assistant'
    content: String,
    timestamp: Date
  }],

  result: {                   // 诊断结果
    constitution: String,
    confidence: Number,
    suggestions: [String]
  },

  createdAt: Date
}
```

---

## 四、RESTful API 设计

### 4.1 API 规范

- **Base URL**: `/api/v1`
- **认证方式**: Bearer Token (JWT)
- **响应格式**:

```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "timestamp": 1700000000000
}
```

### 4.2 API 接口列表

#### 认证模块 `/api/v1/auth`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| POST | `/register` | 用户注册 | 否 |
| POST | `/login` | 用户登录 | 否 |
| POST | `/logout` | 用户登出 | 是 |
| POST | `/refresh-token` | 刷新Token | 是 |
| POST | `/forgot-password` | 忘记密码 | 否 |
| POST | `/reset-password` | 重置密码 | 否 |

#### 用户模块 `/api/v1/user`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/profile` | 获取用户信息 | 是 |
| PUT | `/profile` | 更新用户信息 | 是 |
| PUT | `/password` | 修改密码 | 是 |
| PUT | `/avatar` | 更新头像 | 是 |
| GET | `/favorites` | 获取收藏列表 | 是 |
| POST | `/favorites/:recipeId` | 添加收藏 | 是 |
| DELETE | `/favorites/:recipeId` | 取消收藏 | 是 |

#### 体质模块 `/api/v1/constitution`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/types` | 获取所有体质类型 | 否 |
| GET | `/types/:code` | 获取体质详情 | 否 |
| POST | `/diagnose` | AI体质诊断 | 是 |
| PUT | `/user-constitution` | 更新用户体质 | 是 |
| GET | `/user-constitution` | 获取用户体质 | 是 |

#### 偏好模块 `/api/v1/preference`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/` | 获取用户偏好 | 是 |
| PUT | `/` | 更新用户偏好 | 是 |
| PUT | `/flavors` | 更新五味偏好 | 是 |
| PUT | `/exclusions` | 更新禁忌 | 是 |
| PUT | `/context` | 更新当前状态 | 是 |

#### 菜谱模块 `/api/v1/recipe`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/` | 获取菜谱列表（分页+筛选） | 否 |
| GET | `/:id` | 获取菜谱详情 | 否 |
| GET | `/recommended` | 获取个性化推荐 | 是 |
| GET | `/seasonal` | 获取时令菜谱 | 否 |
| GET | `/search` | 搜索菜谱 | 否 |
| POST | `/` | 创建菜谱（管理员） | 是 |
| PUT | `/:id` | 更新菜谱（管理员） | 是 |
| DELETE | `/:id` | 删除菜谱（管理员） | 是 |

#### 食材模块 `/api/v1/ingredient`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/` | 获取食材列表 | 否 |
| GET | `/:id` | 获取食材详情 | 否 |
| GET | `/seasonal` | 获取当季食材 | 否 |
| GET | `/by-constitution/:code` | 获取体质适宜食材 | 否 |
| GET | `/search` | 搜索食材 | 否 |

#### AI模块 `/api/v1/ai`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| POST | `/chat` | AI对话（体质问诊） | 是 |
| POST | `/analyze-recipe` | AI分析菜谱适配度 | 是 |
| GET | `/insight` | 获取AI食养洞察 | 是 |
| GET | `/tip` | 获取养生贴士 | 否 |

#### 系统模块 `/api/v1/system`

| Method | Endpoint | 描述 | 认证 |
|--------|----------|------|------|
| GET | `/solar-term` | 获取当前节气 | 否 |
| GET | `/health` | 健康检查 | 否 |

### 4.3 请求/响应示例

#### 用户登录

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "id": "64f...",
      "username": "张三",
      "email": "user@example.com",
      "avatar": "https://..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 7200
  }
}
```

#### 获取个性化推荐

```http
GET /api/v1/recipe/recommended?page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "64f...",
        "name": "山药排骨汤",
        "image": "https://...",
        "nature": "温",
        "flavors": ["甘"],
        "matchScore": 95,
        "cookingTime": 60,
        "difficulty": "简单",
        "description": "补脾养胃，益肺止咳"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 56,
      "totalPages": 6
    },
    "insight": {
      "constitution": "阳虚质",
      "solarTerm": "霜降",
      "recommendation": "宜温补脾肾，推荐温热性食材"
    }
  }
}
```

#### AI问诊对话

```http
POST /api/v1/ai/chat
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "sessionId": "sess_123456",
  "message": "我最近比较怕冷，手脚冰凉"
}
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "reply": "了解了，手脚冰凉是阳虚的典型表现。请问您平时喜欢喝热水还是凉水呢？",
    "options": [
      "喜欢喝热水",
      "喜欢喝凉水",
      "都可以"
    ],
    "progress": 40,
    "isComplete": false
  }
}
```

---

## 五、前端组件设计

### 5.1 页面路由

```javascript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '体质诊断' }
  },
  {
    path: '/preference',
    name: 'PreferenceTuner',
    component: () => import('@/views/PreferenceTuner.vue'),
    meta: { title: '口味调优', requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'WisdomDashboard',
    component: () => import('@/views/WisdomDashboard.vue'),
    meta: { title: '智膳推荐', requiresAuth: true }
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: () => import('@/views/RecipeDetail.vue'),
    meta: { title: '菜谱详情' }
  },
  {
    path: '/ingredients',
    name: 'IngredientLibrary',
    component: () => import('@/views/IngredientLibrary.vue'),
    meta: { title: '食材百科' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/Favorites.vue'),
    meta: { title: '我的收藏', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册', guest: true }
  }
]
```

### 5.2 核心组件规格

#### BodyModel.vue（人体模型）

```vue
<script setup>
defineProps({
  constitution: String,       // 当前体质
  effects: Object,            // 光效配置
  interactive: Boolean        // 是否可交互
})

defineEmits(['acupoint-click'])
</script>
```

#### ConstitutionCard.vue（体质卡片）

```vue
<script setup>
defineProps({
  type: String,               // 体质代码
  name: String,               // 体质名称
  icon: String,
  description: String,
  traits: Array,
  selected: Boolean
})

defineEmits(['select'])
</script>
```

#### RecipeCard.vue（菜谱卡片）

```vue
<script setup>
defineProps({
  id: String,
  name: String,
  image: String,
  nature: String,             // 温/平/凉
  flavors: Array,
  matchScore: Number,
  cookingTime: Number,
  difficulty: String,
  description: String,
  isFavorite: Boolean
})

defineEmits(['click', 'favorite'])
</script>
```

### 5.3 状态管理 (Pinia)

```javascript
// stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    constitution: (state) => state.user?.constitution,
    preferences: (state) => state.user?.preferences
  },

  actions: {
    async login(credentials) { ... },
    async logout() { ... },
    async fetchProfile() { ... },
    async updateConstitution(data) { ... },
    async updatePreferences(data) { ... }
  },

  persist: true  // 持久化到 localStorage
})
```

---

## 六、第三方服务对接

### 6.1 AI 大模型 API

**推荐选项**：

| 服务商 | 模型 | 特点 |
|--------|------|------|
| OpenAI | GPT-4 / GPT-3.5 | 效果好，成本较高 |
| 百度 | 文心一言 | 国内访问稳定 |
| 阿里 | 通义千问 | 国内访问稳定 |
| 讯飞 | 星火大模型 | 中文理解好 |

**体质问诊 Prompt 模板**：

```javascript
const systemPrompt = `你是一位资深中医体质诊断专家，基于《中医体质分类与判定》标准，通过问诊方式帮助用户判断体质类型。

九种体质类型：
1. 平和质 - 阴阳气血调和
2. 气虚质 - 元气不足
3. 阳虚质 - 阳气不足，畏寒怕冷
4. 阴虚质 - 阴液亏少，虚热内生
5. 痰湿质 - 痰湿凝聚
6. 湿热质 - 湿热内蕴
7. 血瘀质 - 血行不畅
8. 气郁质 - 气机郁滞
9. 特禀质 - 先天特殊

问诊规则：
1. 每次只问一个问题
2. 使用通俗易懂的语言
3. 提供3-4个选项供用户选择
4. 根据用户回答逐步缩小体质范围
5. 收集足够信息后给出诊断结果

当前对话历史：{history}
用户最新输入：{message}`;
```

### 6.2 节气 API

可自行计算或调用第三方：

```javascript
// utils/solarTerm.js
const SOLAR_TERMS = [
  { name: '小寒', tip: '宜温补肾阳' },
  { name: '大寒', tip: '宜滋阴润燥' },
  // ... 24节气
];

function getCurrentSolarTerm(date = new Date()) {
  // 基于儒略日计算节气
  // 返回 { name, tip, date }
}
```

### 6.3 对象存储

用于存储用户头像、菜谱图片：

| 服务 | 特点 |
|------|------|
| 阿里云 OSS | 国内访问快 |
| 腾讯云 COS | 国内访问快 |
| AWS S3 | 国际通用 |
| MinIO | 可自建私有 |

---

## 七、开发阶段规划

### 第一阶段：项目初始化（1周）

- [ ] 创建前端项目（Vite + Vue3）
- [ ] 创建后端项目（Koa2）
- [ ] 配置开发环境（ESLint、Prettier）
- [ ] 初始化数据库（MongoDB）
- [ ] 实现基础中间件（错误处理、日志）
- [ ] 设计并导入种子数据

### 第二阶段：用户认证（1周）

- [ ] 实现用户注册/登录 API
- [ ] 实现 JWT 认证中间件
- [ ] 前端登录/注册页面
- [ ] 前端路由守卫
- [ ] 用户信息持久化

### 第三阶段：体质诊断（2周）

- [ ] 体质数据 API
- [ ] AI 问诊 API（对接大模型）
- [ ] 前端体质诊断页面
- [ ] SVG 人体模型组件
- [ ] 九宫格体质选择组件
- [ ] AI 对话组件

### 第四阶段：口味偏好（1周）

- [ ] 偏好数据 API
- [ ] 前端口味调优页面
- [ ] 五味滑块组件
- [ ] 禁忌标签组件
- [ ] 状态切换组件
- [ ] 场景选择组件

### 第五阶段：智膳推荐（2周）

- [ ] 菜谱 CRUD API
- [ ] 推荐算法实现
- [ ] 前端推荐大盘页面
- [ ] 菜谱卡片组件
- [ ] 菜谱详情弹窗
- [ ] AI 洞察组件
- [ ] 收藏功能

### 第六阶段：食材百科（1周）

- [ ] 食材 API
- [ ] 前端食材列表页
- [ ] 食材详情页
- [ ] 搜索功能

### 第七阶段：优化与测试（1周）

- [ ] 性能优化
- [ ] 响应式适配
- [ ] 单元测试
- [ ] 集成测试
- [ ] Bug 修复

### 第八阶段：部署上线（1周）

- [ ] 服务器配置
- [ ] Docker 容器化
- [ ] CI/CD 配置
- [ ] 域名与 SSL
- [ ] 监控与日志

---

## 八、环境配置

### 8.1 前端环境变量

```bash
# client/.env.development
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=食养智脑

# client/.env.production
VITE_API_BASE_URL=https://api.example.com/api/v1
VITE_APP_TITLE=食养智脑
```

### 8.2 后端环境变量

```bash
# server/.env
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/food_synergy

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7200
JWT_REFRESH_EXPIRES_IN=604800

# AI Service
AI_API_KEY=your-ai-api-key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo

# OSS (可选)
OSS_ACCESS_KEY=xxx
OSS_SECRET_KEY=xxx
OSS_BUCKET=food-synergy
OSS_REGION=oss-cn-hangzhou
```

---

## 九、部署架构

```
                    ┌─────────────┐
                    │   Nginx     │
                    │ (反向代理)   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Frontend   │ │  Backend    │ │  Static     │
    │  (Vue SPA)  │ │  (Koa API)  │ │  (Images)   │
    │  Port:80    │ │  Port:3000  │ │  OSS/CDN    │
    └─────────────┘ └──────┬──────┘ └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  MongoDB    │
                    │  Port:27017 │
                    └─────────────┘
```

### Docker Compose 配置

```yaml
version: '3.8'

services:
  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/food_synergy
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 十、注意事项与最佳实践

### 10.1 安全性

1. **密码加密**：使用 bcrypt，cost factor >= 10
2. **JWT 安全**：
   - 使用 RS256 算法（生产环境）
   - Access Token 短期有效（2小时）
   - Refresh Token 长期有效（7天）
3. **输入验证**：使用 Joi 进行参数校验
4. **防注入**：使用 Mongoose 参数化查询
5. **限流**：使用 koa-ratelimit 防止暴力攻击
6. **CORS**：配置白名单域名
7. **HTTPS**：生产环境强制使用

### 10.2 性能优化

1. **数据库索引**：为常用查询字段建立索引
2. **Redis 缓存**：缓存热门菜谱、节气数据
3. **分页查询**：大列表使用游标分页
4. **图片优化**：使用 WebP 格式，CDN 加速
5. **代码分割**：Vue 路由懒加载
6. **Gzip 压缩**：Nginx 开启 gzip

### 10.3 代码规范

1. **ESLint + Prettier**：统一代码风格
2. **Git Commit 规范**：使用 Conventional Commits
3. **API 版本控制**：URL 路径包含版本号 `/api/v1`
4. **错误码规范**：统一错误码定义
5. **注释规范**：关键逻辑添加 JSDoc 注释

---

## 附录 A：九种体质数据

```json
[
  {
    "code": "balanced",
    "name": "平和质",
    "icon": "☯",
    "description": "阴阳气血调和，体态适中，面色红润，精力充沛",
    "characteristics": ["精力充沛", "睡眠良好", "肤色润泽", "性格开朗"],
    "dietaryAdvice": {
      "recommended": ["山药", "红枣", "小米", "莲子"],
      "avoided": [],
      "suitableFlavors": ["甘", "平"],
      "cookingMethods": ["蒸", "煮", "炖"]
    }
  },
  {
    "code": "qi-deficiency",
    "name": "气虚质",
    "icon": "☁",
    "description": "元气不足，疲乏气短，容易出汗，声音低弱",
    "characteristics": ["容易疲劳", "气短懒言", "易出汗", "抵抗力差"],
    "dietaryAdvice": {
      "recommended": ["黄芪", "党参", "山药", "红枣", "鸡肉"],
      "avoided": ["萝卜", "槟榔", "生冷食物"],
      "suitableFlavors": ["甘", "温"],
      "cookingMethods": ["炖", "煲", "蒸"]
    }
  },
  {
    "code": "yang-deficiency",
    "name": "阳虚质",
    "icon": "❄",
    "description": "阳气不足，畏寒怕冷，手脚冰凉，喜热饮食",
    "characteristics": ["手脚冰凉", "畏寒怕冷", "喜热饮", "大便溏薄"],
    "dietaryAdvice": {
      "recommended": ["羊肉", "生姜", "桂圆", "核桃", "韭菜"],
      "avoided": ["西瓜", "苦瓜", "绿豆", "冷饮"],
      "suitableFlavors": ["辛", "甘", "温"],
      "cookingMethods": ["炖", "煮", "炒"]
    }
  },
  {
    "code": "yin-deficiency",
    "name": "阴虚质",
    "icon": "🔥",
    "description": "阴液亏少，口燥咽干，手足心热，潮热盗汗",
    "characteristics": ["口燥咽干", "手足心热", "潮热盗汗", "便秘"],
    "dietaryAdvice": {
      "recommended": ["银耳", "百合", "雪梨", "枸杞", "鸭肉"],
      "avoided": ["辣椒", "羊肉", "油炸食品"],
      "suitableFlavors": ["甘", "酸", "凉"],
      "cookingMethods": ["炖", "蒸", "凉拌"]
    }
  },
  {
    "code": "phlegm-dampness",
    "name": "痰湿质",
    "icon": "💧",
    "description": "痰湿凝聚，形体肥胖，腹部肥满，口黏苔腻",
    "characteristics": ["体形偏胖", "口黏腻", "胸闷", "身重困倦"],
    "dietaryAdvice": {
      "recommended": ["薏米", "冬瓜", "山楂", "陈皮", "荷叶"],
      "avoided": ["肥肉", "甜食", "油腻食物"],
      "suitableFlavors": ["苦", "辛", "淡"],
      "cookingMethods": ["蒸", "煮", "少油"]
    }
  },
  {
    "code": "damp-heat",
    "name": "湿热质",
    "icon": "🌡",
    "description": "湿热内蕴，面垢油光，易生痤疮，口苦口干",
    "characteristics": ["面部油腻", "口苦口臭", "易生痘", "大便黏滞"],
    "dietaryAdvice": {
      "recommended": ["绿豆", "苦瓜", "冬瓜", "薏米", "菊花"],
      "avoided": ["辣椒", "羊肉", "烧烤", "酒"],
      "suitableFlavors": ["苦", "甘", "凉"],
      "cookingMethods": ["清蒸", "凉拌", "煮"]
    }
  },
  {
    "code": "blood-stasis",
    "name": "血瘀质",
    "icon": "🩸",
    "description": "血行不畅，肤色晦暗，易生色斑，唇色暗淡",
    "characteristics": ["肤色偏暗", "易生斑点", "唇色紫暗", "健忘"],
    "dietaryAdvice": {
      "recommended": ["山楂", "玫瑰花", "当归", "红糖", "黑木耳"],
      "avoided": ["肥肉", "奶油", "冷饮"],
      "suitableFlavors": ["辛", "甘"],
      "cookingMethods": ["炖", "煮", "泡茶"]
    }
  },
  {
    "code": "qi-stagnation",
    "name": "气郁质",
    "icon": "🌀",
    "description": "气机郁滞，情绪敏感，忧郁脆弱，胸胁胀满",
    "characteristics": ["情绪波动", "多愁善感", "胸闷叹息", "咽部异物感"],
    "dietaryAdvice": {
      "recommended": ["玫瑰花", "佛手", "陈皮", "金桔", "萝卜"],
      "avoided": ["浓茶", "咖啡", "辛辣刺激"],
      "suitableFlavors": ["辛", "苦", "酸"],
      "cookingMethods": ["泡茶", "清炒", "煮"]
    }
  },
  {
    "code": "special",
    "name": "特禀质",
    "icon": "🌸",
    "description": "先天特殊，易过敏，适应能力差",
    "characteristics": ["易过敏", "遗传性", "适应力差"],
    "dietaryAdvice": {
      "recommended": ["蜂蜜", "红枣", "黄芪", "灵芝"],
      "avoided": ["个人过敏原", "海鲜", "蛋奶（视情况）"],
      "suitableFlavors": ["甘", "平"],
      "cookingMethods": ["蒸", "煮", "炖"]
    }
  }
]
```

---

**文档版本**：v1.0
**最后更新**：2024年11月
**作者**：AI Assistant

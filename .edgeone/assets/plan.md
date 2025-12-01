# 智能体质膳食推荐系统 (Intelligent Constitution-Based Dietary Recommendation System) 全栈开发计划

> 基于中医体质理论的智能食养推荐系统

## 一、项目概述

### 1.1 项目简介

"智能体质膳食推荐系统"是一款融合中医体质辨识与现代营养学的智能饮食推荐系统。用户通过体质诊断、口味偏好设置，获得个性化的食养方案和菜谱推荐。

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
    component:

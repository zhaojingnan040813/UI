# 智能体质膳食推荐系统 - 迭代开发计划

> 基于 Vue3 + Koa2 + MongoDB 的全栈项目迭代开发方案

---

## 📋 项目概述

**项目名称**: 智能体质膳食推荐系统 (Intelligent Constitution-Based Dietary Recommendation System)

**技术栈**:
- 前端: Vue 3 + Vite + Pinia + Vue Router
- 后端: Node.js + Koa2
- 数据库: MongoDB
- 开发模式: 迭代开发

**核心功能模块**:
1. 体质诊断（AI问诊 + 手动选择）
2. 口味调优（五味偏好、饮食禁忌）
3. 智膳推荐（个性化菜谱推荐）
4. 食材百科
5. 用户中心

---

## 🎯 迭代开发总体规划

### 迭代周期安排

| 迭代 | 名称 | 持续时间 | 主要目标 |
|------|------|----------|----------|
| Sprint 0 | 项目初始化 | 3天 | 搭建开发环境和基础架构 |
| Sprint 1 | 用户认证系统 | 5天 | 实现用户注册登录功能 |
| Sprint 2 | 体质诊断-手动选择 | 5天 | 实现九宫格体质选择功能 |
| Sprint 3 | 体质诊断-AI问诊 | 7天 | 接入AI实现问诊对话 |
| Sprint 4 | 口味调优 | 5天 | 实现偏好设置功能 |
| Sprint 5 | 菜谱数据与推荐 | 7天 | 实现推荐算法和展示 |
| Sprint 6 | 食材百科 | 5天 | 实现食材查询功能 |
| Sprint 7 | 优化与测试 | 5天 | 性能优化和bug修复 |
| Sprint 8 | 部署上线 | 3天 | 服务器部署和监控 |

**总计**: 约45天（9周）

---

## 🚀 Sprint 0: 项目初始化（3天）

### 目标
搭建前后端基础项目结构，配置开发环境

### 前端任务

#### Day 1: 创建Vue3项目
- [ ] 使用Vite创建Vue3项目
```bash
npm create vite@latest client -- --template vue
cd client
npm install
```
- [ ] 安装核心依赖
```bash
npm install vue-router@4 pinia axios
npm install -D tailwindcss postcss autoprefixer
```
- [ ] 配置Tailwind CSS
- [ ] 创建基础目录结构
```
src/
├── api/
├── assets/
├── components/
├── composables/
├── router/
├── stores/
├── utils/
└── views/
```
- [ ] 配置路由基础结构
- [ ] 创建全局样式变量

#### Day 2: 前端基础组件
- [ ] 创建 AppHeader.vue 组件
- [ ] 创建 AppFooter.vue 组件
- [ ] 创建 AppButton.vue 组件
- [ ] 创建 AppLoading.vue 组件
- [ ] 配置 Pinia 状态管理
- [ ] 封装 axios 请求工具

#### Day 3: 前端页面框架
- [ ] 创建首页布局
- [ ] 创建登录/注册页面框架
- [ ] 配置前端路由守卫
- [ ] 测试前端项目运行

### 后端任务

#### Day 1: 创建Koa2项目
- [ ] 初始化Node.js项目
```bash
mkdir server
cd server
npm init -y
```
- [ ] 安装核心依赖
```bash
npm install koa koa-router koa-body koa-cors
npm install mongoose jsonwebtoken bcryptjs
npm install dotenv joi
npm install -D nodemon
```
- [ ] 创建基础目录结构
```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
```
- [ ] 配置 app.js 入口文件
- [ ] 配置环境变量 .env

#### Day 2: 数据库连接
- [ ] 安装并启动 MongoDB
- [ ] 配置 Mongoose 连接
- [ ] 创建数据库配置文件
- [ ] 测试数据库连接
- [ ] 创建基础中间件（错误处理、日志）

#### Day 3: API基础架构
- [ ] 设计统一响应格式
- [ ] 创建响应工具函数
- [ ] 配置CORS
- [ ] 创建健康检查接口
- [ ] 测试后端服务运行

### 验收标准
- ✅ 前端项目可正常运行（localhost:5173）
- ✅ 后端项目可正常运行（localhost:3000）
- ✅ MongoDB数据库连接成功
- ✅ 前后端可以正常通信

---

## 🔐 Sprint 1: 用户认证系统（5天）

### 目标
实现用户注册、登录、JWT认证功能

### 后端任务

#### Day 1: 用户模型设计
- [ ] 创建 User 模型（models/User.js）
```javascript
{
  username: String,
  email: String (unique),
  password: String (bcrypt加密),
  avatar: String,
  constitution: Object,
  preferences: Object,
  createdAt: Date
}
```
- [ ] 实现密码加密工具
- [ ] 创建用户验证规则（Joi）

#### Day 2: 注册功能
- [ ] 创建 authController.js
- [ ] 实现注册接口 POST /api/v1/auth/register
  - 参数验证
  - 邮箱唯一性检查
  - 密码加密
  - 创建用户
- [ ] 创建 authService.js 业务逻辑
- [ ] 测试注册接口

#### Day 3: 登录与JWT
- [ ] 配置JWT密钥和过期时间
- [ ] 实现登录接口 POST /api/v1/auth/login
  - 验证邮箱密码
  - 生成JWT token
  - 返回用户信息
- [ ] 创建JWT认证中间件
- [ ] 测试登录接口

#### Day 4: 前端登录页面
- [ ] 创建 Login.vue 页面
  - 邮箱输入框
  - 密码输入框
  - 登录按钮
  - 表单验证
- [ ] 创建 Register.vue 页面
- [ ] 封装登录API请求
- [ ] 实现登录状态管理（Pinia）

#### Day 5: 集成测试
- [ ] 测试注册流程
- [ ] 测试登录流程
- [ ] 实现token存储（localStorage）
- [ ] 实现自动登录
- [ ] 实现退出登录
- [ ] 配置路由权限控制

### API接口

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/user/profile (需认证)
```

### 验收标准
- ✅ 用户可以成功注册
- ✅ 用户可以成功登录
- ✅ JWT token正常生成和验证
- ✅ 前端存储token并在请求中携带
- ✅ 未登录用户无法访问需认证的页面

---

## 🧘 Sprint 2: 体质诊断-手动选择（5天）

### 目标
实现九种体质的手动选择功能和人体模型可视化

### 后端任务

#### Day 1: 体质数据准备
- [ ] 创建 Constitution 模型
- [ ] 准备九种体质数据（JSON）
```json
{
  "code": "yang-deficiency",
  "name": "阳虚质",
  "icon": "❄",
  "description": "阳气不足，畏寒怕冷",
  "characteristics": [...],
  "dietaryAdvice": {...}
}
```
- [ ] 导入体质数据到MongoDB
- [ ] 创建体质查询接口

#### Day 2: 体质API
- [ ] 实现 GET /api/v1/constitution/types 获取所有体质
- [ ] 实现 GET /api/v1/constitution/types/:code 获取体质详情
- [ ] 实现 PUT /api/v1/user/constitution 更新用户体质
- [ ] 测试体质API

#### Day 3-4: 前端体质选择页面
- [ ] 复用UI原型中的 index.html 结构
- [ ] 创建 Home.vue（体质诊断页面）
- [ ] 创建 BodyModel.vue 组件（人体SVG模型）
- [ ] 创建 ConstitutionCard.vue 组件（九宫格卡片）
- [ ] 实现体质选择交互
  - 点击卡片高亮
  - 左侧人体模型光效变化
  - 阴阳气血指示器更新

#### Day 5: 集成测试
- [ ] 测试体质选择功能
- [ ] 测试人体模型动画效果
- [ ] 保存用户选择的体质到后端
- [ ] 状态持久化

### API接口

```
GET  /api/v1/constitution/types
GET  /api/v1/constitution/types/:code
PUT  /api/v1/user/constitution
```

### 验收标准
- ✅ 显示九种体质卡片
- ✅ 点击卡片时人体模型显示对应光效
- ✅ 用户选择的体质可以保存到数据库
- ✅ 页面刷新后体质选择状态保持

---

## 💬 Sprint 3: 体质诊断-AI问诊（7天）

### 目标
接入AI大模型实现智能问诊功能

### 后端任务

#### Day 1-2: AI服务配置
- [ ] 选择AI服务商（OpenAI/文心一言/通义千问）
- [ ] 注册API key
- [ ] 创建 aiService.js
- [ ] 封装AI调用方法
- [ ] 设计问诊Prompt模板
```javascript
const systemPrompt = `你是中医体质诊断专家...
九种体质：平和质、气虚质、阳虚质...
问诊规则：逐步提问、通俗易懂...`
```

#### Day 3: 对话接口
- [ ] 创建 ChatHistory 模型
- [ ] 实现 POST /api/v1/ai/chat 对话接口
  - 接收用户消息
  - 调用AI获取回复
  - 保存对话历史
  - 返回AI回复和选项
- [ ] 实现问诊结果分析

#### Day 4-5: 前端AI问诊界面
- [ ] 创建 AiChat.vue 组件
- [ ] 实现对话消息展示
  - 用户消息
  - AI消息
  - 快速回复按钮
- [ ] 实现发送消息功能
- [ ] 实现打字动画效果
- [ ] 显示问诊进度

#### Day 6: 结果展示
- [ ] AI诊断结果展示
- [ ] 自动切换到对应体质
- [ ] 高亮推荐的体质卡片
- [ ] 提供修改建议

#### Day 7: 集成测试
- [ ] 测试完整问诊流程
- [ ] 测试AI回复质量
- [ ] 优化Prompt提示词
- [ ] 处理异常情况

### API接口

```
POST /api/v1/ai/chat
GET  /api/v1/ai/chat/history/:sessionId
```

### 验收标准
- ✅ AI可以正常回复用户问题
- ✅ 问诊流程顺畅（4-5个问题）
- ✅ 能给出准确的体质诊断结果
- ✅ 对话历史正确保存

---

## 🎨 Sprint 4: 口味调优（5天）

### 目标
实现用户口味偏好设置功能

### 后端任务

#### Day 1: 偏好数据模型
- [ ] 扩展User模型的preferences字段
```javascript
preferences: {
  flavors: {
    sour: 2,    // 0-4
    sweet: 2,
    bitter: 2,
    spicy: 2,
    salty: 2
  },
  exclusions: ['海鲜', '香菜'],
  dietaryStyle: 'normal',
  contextStatus: ['运动后']
}
```
- [ ] 创建偏好验证规则

#### Day 2: 偏好API
- [ ] 实现 GET /api/v1/preference 获取用户偏好
- [ ] 实现 PUT /api/v1/preference 更新偏好
- [ ] 实现 PUT /api/v1/preference/flavors 更新五味
- [ ] 实现 PUT /api/v1/preference/exclusions 更新禁忌
- [ ] 测试API

#### Day 3-4: 前端偏好页面
- [ ] 参考 UI/pages/preference-tuner/index.html
- [ ] 创建 PreferenceTuner.vue 页面
- [ ] 创建 FlavorSlider.vue 组件（五味滑块）
- [ ] 创建 ExclusionTags.vue 组件（禁忌标签云）
- [ ] 创建 ContextToggle.vue 组件（状态切换）
- [ ] 创建 SceneSelector.vue 组件（场景选择）

#### Day 5: 集成测试
- [ ] 测试五味偏好设置
- [ ] 测试禁忌食材选择
- [ ] 测试特殊状态切换
- [ ] 保存偏好到后端
- [ ] 状态同步

### API接口

```
GET  /api/v1/preference
PUT  /api/v1/preference
PUT  /api/v1/preference/flavors
PUT  /api/v1/preference/exclusions
PUT  /api/v1/preference/context
```

### 验收标准
- ✅ 五味滑块可正常拖动并保存
- ✅ 可添加和删除禁忌食材
- ✅ 可切换特殊状态（生理期、熬夜等）
- ✅ 偏好设置可正确保存

---

## 🍽 Sprint 5: 菜谱数据与推荐（7天）

### 目标
实现菜谱数据管理和个性化推荐算法

### 后端任务

#### Day 1-2: 菜谱数据准备
- [ ] 创建 Recipe 模型
- [ ] 创建 Ingredient 模型
- [ ] 准备菜谱测试数据（至少20条）
```json
{
  "name": "山药排骨汤",
  "tcmProperties": {
    "nature": "温",
    "flavors": ["甘"],
    "effects": ["补脾养胃"]
  },
  "ingredients": [...],
  "steps": [...],
  "suitability": {
    "constitutions": [
      {"type": "yang-deficiency", "matchScore": 95}
    ]
  }
}
```
- [ ] 导入数据到MongoDB

#### Day 3: 推荐算法
- [ ] 创建 recommendService.js
- [ ] 实现推荐算法
  - 基于体质匹配度
  - 基于五味偏好
  - 过滤禁忌食材
  - 考虑特殊状态
- [ ] 计算综合评分
- [ ] 实现排序和分页

#### Day 4: 菜谱API
- [ ] 实现 GET /api/v1/recipe 获取菜谱列表
- [ ] 实现 GET /api/v1/recipe/:id 获取菜谱详情
- [ ] 实现 GET /api/v1/recipe/recommended 个性化推荐
- [ ] 实现 GET /api/v1/recipe/search 搜索菜谱
- [ ] 测试API

#### Day 5-6: 前端推荐页面
- [ ] 参考 UI/pages/wisdom-dashboard/index.html
- [ ] 创建 WisdomDashboard.vue 页面
- [ ] 创建 RecipeCard.vue 组件（菜谱卡片）
- [ ] 创建 RecipeDetail.vue 组件（详情弹窗）
- [ ] 创建 RecipeFilter.vue 组件（筛选器）
- [ ] 实现菜谱列表展示
- [ ] 实现无限滚动加载

#### Day 7: AI洞察
- [ ] 实现 GET /api/v1/ai/insight 食养洞察
- [ ] 创建洞察展示组件
- [ ] 显示当前节气
- [ ] 显示体质建议
- [ ] 集成测试

### API接口

```
GET  /api/v1/recipe?page=1&limit=10
GET  /api/v1/recipe/:id
GET  /api/v1/recipe/recommended
GET  /api/v1/recipe/search?keyword=xxx
POST /api/v1/user/favorites/:recipeId
GET  /api/v1/ai/insight
```

### 验收标准
- ✅ 可以获取推荐菜谱列表
- ✅ 推荐结果符合用户体质和偏好
- ✅ 可以查看菜谱详情
- ✅ 匹配度显示准确
- ✅ AI洞察信息正确展示

---

## 📚 Sprint 6: 食材百科（5天）

### 目标
实现食材查询和详情展示功能

### 后端任务

#### Day 1-2: 食材数据
- [ ] 准备食材数据（至少50种）
```json
{
  "name": "山药",
  "tcmProperties": {
    "nature": "平",
    "flavor": ["甘"],
    "meridians": ["脾", "肺", "肾"],
    "effects": ["补脾养胃", "生津益肺"]
  },
  "nutrition": {...},
  "suitableConstitutions": ["qi-deficiency", "yang-deficiency"]
}
```
- [ ] 导入食材数据
- [ ] 建立食材索引

#### Day 3: 食材API
- [ ] 实现 GET /api/v1/ingredient 获取食材列表
- [ ] 实现 GET /api/v1/ingredient/:id 获取食材详情
- [ ] 实现 GET /api/v1/ingredient/seasonal 当季食材
- [ ] 实现 GET /api/v1/ingredient/search 搜索
- [ ] 测试API

#### Day 4-5: 前端食材页面
- [ ] 创建 IngredientLibrary.vue 页面
- [ ] 创建食材卡片组件
- [ ] 创建食材详情组件
- [ ] 实现分类筛选
- [ ] 实现搜索功能
- [ ] 集成测试

### API接口

```
GET  /api/v1/ingredient?category=vegetable
GET  /api/v1/ingredient/:id
GET  /api/v1/ingredient/seasonal
GET  /api/v1/ingredient/search?keyword=xxx
```

### 验收标准
- ✅ 可以浏览食材列表
- ✅ 可以按分类筛选
- ✅ 可以搜索食材
- ✅ 可以查看食材详情
- ✅ 显示食材的中医属性

---

## 👤 Sprint 7: 用户中心（5天）

### 目标
完善用户个人中心和收藏功能

### 任务清单

#### Day 1-2: 收藏功能
- [ ] 实现 POST /api/v1/user/favorites/:recipeId 添加收藏
- [ ] 实现 DELETE /api/v1/user/favorites/:recipeId 取消收藏
- [ ] 实现 GET /api/v1/user/favorites 获取收藏列表
- [ ] 前端收藏按钮交互
- [ ] 创建 Favorites.vue 页面

#### Day 3-4: 个人中心
- [ ] 创建 Profile.vue 页面
- [ ] 显示用户信息
- [ ] 显示体质信息
- [ ] 显示偏好设置摘要
- [ ] 实现头像上传
- [ ] 实现资料编辑

#### Day 5: 历史记录
- [ ] 浏览历史记录
- [ ] 问诊历史查看
- [ ] 偏好变更历史
- [ ] 集成测试

### API接口

```
POST   /api/v1/user/favorites/:recipeId
DELETE /api/v1/user/favorites/:recipeId
GET    /api/v1/user/favorites
PUT    /api/v1/user/profile
PUT    /api/v1/user/avatar
```

### 验收标准
- ✅ 可以收藏/取消收藏菜谱
- ✅ 可以查看收藏列表
- ✅ 可以编辑个人资料
- ✅ 可以查看历史记录

---

## ⚡ Sprint 8: 优化与测试（5天）

### 目标
性能优化、bug修复、用户体验提升

### 任务清单

#### Day 1: 性能优化
- [ ] 数据库查询优化
  - 添加索引
  - 优化查询语句
- [ ] 前端性能优化
  - 路由懒加载
  - 组件懒加载
  - 图片懒加载
- [ ] API响应优化
  - 添加缓存
  - 数据分页优化

#### Day 2: 响应式适配
- [ ] 移动端适配
- [ ] 平板适配
- [ ] 各种屏幕尺寸测试
- [ ] 触摸事件优化

#### Day 3: 测试
- [ ] 单元测试
- [ ] API接口测试
- [ ] 功能测试
- [ ] 兼容性测试

#### Day 4: Bug修复
- [ ] 修复已知bug
- [ ] 处理边界情况
- [ ] 错误提示优化
- [ ] 用户体验改进

#### Day 5: 文档完善
- [ ] API文档
- [ ] 部署文档
- [ ] 用户手册
- [ ] 代码注释

### 验收标准
- ✅ 页面加载速度 < 2秒
- ✅ 移动端体验良好
- ✅ 无重大bug
- ✅ 文档完整

---

## 🚢 Sprint 9: 部署上线（3天）

### 目标
将项目部署到生产环境

### 任务清单

#### Day 1: 服务器配置
- [ ] 购买云服务器
- [ ] 安装Node.js环境
- [ ] 安装MongoDB
- [ ] 安装Nginx
- [ ] 配置域名和SSL证书

#### Day 2: 项目部署
- [ ] 打包前端项目
```bash
npm run build
```
- [ ] 配置Nginx静态文件服务
- [ ] 部署后端服务
- [ ] 配置PM2进程管理
- [ ] 配置环境变量
- [ ] 数据库迁移

#### Day 3: 监控与上线
- [ ] 配置日志系统
- [ ] 配置监控告警
- [ ] 性能测试
- [ ] 安全检查
- [ ] 正式上线
- [ ] 备份策略

### 验收标准
- ✅ 项目可正常访问
- ✅ HTTPS证书正常
- ✅ 数据库正常运行
- ✅ 监控系统正常工作

---

## 📊 项目进度跟踪

### 每日站会
- 每天10分钟同步进度
- 汇报完成的任务
- 提出遇到的问题
- 规划当天任务

### 周度回顾
- 每周五进行回顾
- 总结本周成果
- 调整下周计划
- 风险识别

### 里程碑

| 里程碑 | 预计完成时间 | 交付物 |
|--------|------------|--------|
| M1: 基础架构完成 | 第1周 | 前后端项目可运行 |
| M2: 用户系统完成 | 第2周 | 用户可注册登录 |
| M3: 核心功能完成 | 第5周 | 体质诊断+推荐可用 |
| M4: 功能完整 | 第7周 | 所有功能可用 |
| M5: 正式上线 | 第9周 | 生产环境运行 |

---

## 🛠 开发工具与规范

### 版本控制
- 使用Git进行版本控制
- main分支为生产分支
- dev分支为开发分支
- 每个Sprint创建feature分支

### 代码规范
- 使用ESLint检查代码
- 使用Prettier格式化代码
- 提交信息遵循Conventional Commits

### 文档规范
- API文档使用Swagger
- 代码关键部分添加注释
- 保持README更新

---

## 📝 风险管理

### 技术风险
- **AI接口稳定性**: 准备备用AI服务商
- **数据库性能**: 提前做压力测试
- **前端兼容性**: 多浏览器测试

### 进度风险
- **功能超期**: 采用MVP策略，优先核心功能
- **需求变更**: 每个Sprint开始前确认需求
- **人员风险**: 关键模块备份开发者

---

## ✅ 验收标准总览

### 功能验收
- [ ] 用户可以注册登录
- [ ] 用户可以完成体质诊断
- [ ] 用户可以设置口味偏好
- [ ] 用户可以获得个性化菜谱推荐
- [ ] 用户可以查看菜谱详情
- [ ] 用户可以收藏菜谱
- [ ] 用户可以查看食材百科

### 性能验收
- [ ] 页面首次加载 < 3秒
- [ ] API响应时间 < 500ms
- [ ] 支持100+并发用户

### 安全验收
- [ ] 密码加密存储
- [ ] JWT认证正常
- [ ] 防止SQL注入
- [ ] XSS防护

---

**文档版本**: v1.0  
**创建日期**: 2024-11-29  
**预计完成**: 2025-01-15

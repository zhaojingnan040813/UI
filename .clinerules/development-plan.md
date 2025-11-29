## Brief overview

项目特定的开发规划和技术栈指南，用于"智能体质膳食推荐系统"的迭代开发。

## Technology stack

- **Frontend**: Vue 3 + Vite + Pinia + Vue Router
- **Backend**: Node.js + Koa2 框架
- **Database**: MongoDB
- **Development approach**: 迭代开发（Iterative development）

## Development priorities

- 功能实现优先于视觉完美复刻
- 页面不需要与原型图完全一致，但核心功能必须实现
- 基于原型图的功能需求进行开发，允许UI细节调整

## Code generation preferences

- 直接生成代码，无需添加注释和说明文档
- 代码应该简洁、直接、可运行
- 避免过度的代码注释

## Terminal commands

- 优先使用 PowerShell 语法编写终端命令
- 命令应该适配 Windows 环境

## Error handling

- 只需要关注和处理 error 级别的错误信息
- warn 级别的警告可以忽略

## Project context

- 项目名称：智能体质膳食推荐系统 (Intelligent Constitution-Based Dietary Recommendation System)
- 原名称"食养智脑"已全面替换
- 核心功能模块：
  - 体质诊断（AI问诊 + 手动选择）
  - 口味调优（五味偏好、饮食禁忌等）
  - 智膳推荐（基于体质和偏好的菜谱推荐）
  - 食材百科
  - 用户中心

## Development workflow

- 采用迭代开发模式
- 每个功能模块独立开发和测试
- 前后端分离开发
- API 优先设计（RESTful API）

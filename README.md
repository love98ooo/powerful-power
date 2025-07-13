# Powerful Power (PP)

## 简介

这是一个 PC 电源信息的汇总网站，主要用于收集和整理 PC 电源的信息，包括电源的型号、方案、代工厂、测试数据等。

## WHY

现在互联网上并不缺乏电源的评测，但是信息非常零散（诸如油管、B站、值得买等等），而且很多评测都是对于某个电源的评测，如果我想要找到一颗适合我的电源，我需要花费大量的时间去筛选和比较，当然也有 FCPOWERUP 这样的非常专业的博主制作的排行和评测，但是他的评测基本都是非常高端的产品线，对于消费者来说，我们更需要的可能是性价比更高的产品，所以我想做一个聚合网站，能够帮助大家更方便的找到适合自己的电源。

## 技术栈

- **框架**: Next.js (App Router) - 使用 SSG 静态网站生成
- **UI组件**: shadcn 组件库
- **样式**: Tailwind CSS
- **图表**: ECharts 用于能效曲线展示
- **数据管理**: JSON 文件存储数据
- **包管理**: pnpm

## 项目结构

```
powerful-power/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # 布局组件
│   ├── page.tsx              # 主页
│   ├── power-supplies/       # 电源列表页
│   │   ├── page.tsx          # 电源列表页面
│   │   ├── [id]/             # 电源详情页
│   │   │   └── page.tsx      # 电源详情页面
│   ├── compare/              # 电源比较页
│   └── about/                # 关于页面
├── components/               # 组件
│   ├── ui/                   # shadcn/ui组件
│   ├── power-supply/         # 电源相关组件
│   │   ├── card.tsx
│   │   ├── details.tsx
│   │   └── efficiency-chart.tsx
│   └── layout/               # 布局组件
├── lib/                      # 工具函数
│   └── utils.ts
├── public/                   # 静态资源
│   ├── data/                 # 数据文件
│   │   ├── power-supplies/   # 电源数据(JSON)
│   │   └── manufacturers/    # 制造商数据(JSON)
└── types/                    # TypeScript类型定义
```

## 功能特点

- 电源数据展示与搜索
- 电源详细参数查看
- 电源能效曲线图表展示
- 电源对比功能
- 响应式设计，支持移动端和桌面端

## 开发与部署

```bash
# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 构建静态网站
pnpm build

# 预览构建结果
pnpm start
```

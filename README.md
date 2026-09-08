# 奇门决策实验室

一个中文优先的 Next.js 决策辅助应用。前端负责采集与展示，起局计算由独立的 Linux 后端执行；盘面计算与后续解读始终分离。

## A. 本地前端

```bash
npm install
npm run dev
```

复制 `.env.example` 为 `.env.local`。默认 `NEXT_PUBLIC_CASTING_MODE=mock`，无需后端即可体验。

## B. 本地后端

后端位于 [backend](backend/README.md)，可独立运行：

```bash
cd backend
npm install
npm run dev
```

它需要 Linux 版 `zhouyi-divination` 二进制，详见 backend README。不要在 Railway 或 Vercel 使用 Windows `.exe`。

## C. 环境变量

| 变量 | 位置 | 说明 |
| --- | --- | --- |
| `NEXT_PUBLIC_CASTING_MODE` | Vercel / 前端 | `mock` 或 `remote` |
| `NEXT_PUBLIC_CASTING_API_URL` | Vercel / 前端 | Railway 后端 URL |
| `CASTING_API_KEY` | Vercel、Railway | 仅服务端使用的共享密钥，绝不可使用 `NEXT_PUBLIC_` 前缀 |
| `ZHOUYI_BIN_PATH` | Railway | Linux 二进制路径 |
| `CAST_TIMEOUT_MS` | Railway | 单次排盘进程超时，默认 15000 |

## D. Mock 模式

设置 `NEXT_PUBLIC_CASTING_MODE=mock`。这是清楚标记的演示盘，不会调用远程计算引擎。

## E. Remote 模式

设置 `NEXT_PUBLIC_CASTING_MODE=remote` 和 `NEXT_PUBLIC_CASTING_API_URL`。浏览器仅访问 Next.js 的 `/api/cast/[method]`；该服务端路由负责附加 `CASTING_API_KEY` 并转发至 Railway。远端不可用时会显示中文错误，绝不静默生成模拟盘。

## F. Railway 部署

1. 将 `zhouyi-linux-amd64` 放在 `backend/bin/zhouyi-linux-amd64`（从 release 下载，或用 Go 交叉编译）。
2. 在 Railway 新建服务，Root Directory 设为 `backend`，使用 Dockerfile。
3. 设置 `CASTING_API_KEY`、`ZHOUYI_BIN_PATH=/app/bin/zhouyi-linux-amd64`，可选 `ZHOUYI_ENGINE_VERSION`。
4. 部署后访问 `/health`；将 Railway 的 HTTPS URL 复制给 Vercel 的 `NEXT_PUBLIC_CASTING_API_URL`。

## G. Vercel 部署

1. 导入本仓库，Root Directory 保持项目根目录。
2. 设置 `NEXT_PUBLIC_CASTING_MODE=remote`、`NEXT_PUBLIC_CASTING_API_URL` 与同一个（非公开）`CASTING_API_KEY`。
3. 部署。Vercel 不执行术数二进制，只作为安全代理和 UI 层。

## H. Supabase

在 Supabase SQL Editor 中执行 [supabase/schema.sql](supabase/schema.sql)。当前 MVP 以浏览器本地存储维持演示历史；接入生产 Supabase 写入时，应由受信任的服务端保存阅读元数据、原始引擎 JSON、摘要、方法、起局时间与 `chart_hash`。

## I. 生产检查清单

- Railway `/health` 返回 `engineAvailable: true`
- `CASTING_API_KEY` 已在 Railway 与 Vercel 配置，未暴露给浏览器
- Vercel 设为 `remote` 模式后，完成一次真实起局
- Supabase 已运行迁移并在接入认证后启用 RLS
- 监控 Railway 进程超时、5xx、速率限制与二进制版本

## J. 已知限制

`qimen-dunjia` Python 引擎目前尚未接入线上后端，双引擎对盘不会虚构比较数据。远程奇门的九宫格需在 `zhouyi-divination` 输出提供结构化宫位字段后才能完整渲染；原始输出已保存以便后续适配。

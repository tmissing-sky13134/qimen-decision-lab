# Casting API

Independent Fastify service for the Linux `zhouyi-divination` binary. It is designed for Railway; it never executes a Windows `.exe`.

## Run locally

1. Download the release asset named `zhouyi-linux-amd64` from the [zhouyi-divination releases](https://github.com/y001j/zhouyi-divination-skill/releases), or build it from the Go source with `GOOS=linux GOARCH=amd64 go build -o backend/bin/zhouyi-linux-amd64 .`.
2. Make it executable on Linux/macOS: `chmod +x backend/bin/zhouyi-linux-amd64`.
3. Copy `.env.example` to `.env` and set `ZHOUYI_BIN_PATH` to the binary path.
4. Run `npm install`, then `npm run dev`.

The API accepts `POST /cast/qimen`, `/cast/zhouyi`, `/cast/liuren`, and `/cast/huican`. It passes only confirmed CLI options: `cast -m/-q/-t`, optional `--time`, `--lon` when true solar time is enabled, or `--no-truesolar` when it is disabled.

## Railway

1. Create a Railway service from this repository, setting the root directory to `backend`.
2. Download/copy `zhouyi-linux-amd64` to `backend/bin/zhouyi-linux-amd64` before deployment. This file is intentionally ignored from source control.
3. Use the included Dockerfile, set `CASTING_API_KEY` to a long random secret, and optionally set `ZHOUYI_ENGINE_VERSION`.
4. Railway sets `PORT`; use the generated public URL as `NEXT_PUBLIC_CASTING_API_URL` in Vercel.

`GET /health` reports availability without exposing the binary path in production. `CASTING_API_KEY` is optional for local development but required in production.

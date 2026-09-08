FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY --from=build /app/dist ./dist
# Supply this Linux binary before `docker build`; see backend/README.md.
COPY bin/zhouyi-linux-amd64 /app/bin/zhouyi-linux-amd64
RUN chmod 755 /app/bin/zhouyi-linux-amd64
ENV ZHOUYI_BIN_PATH=/app/bin/zhouyi-linux-amd64
EXPOSE 3001
CMD ["node", "dist/server.js"]

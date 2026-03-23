FROM node:20-alpine AS builder

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/shell/project.json ./apps/shell/

COPY libs ./libs

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN pnpm exec nx build shell --prod

FROM nginx:alpine

RUN apk add --no-cache gettext

COPY --from=builder /app/dist/apps/shell /usr/share/nginx/html

COPY docker/shell/nginx.conf /etc/nginx/conf.d/default.conf

COPY docker/shell/entrypoint.sh /docker-entrypoint.d/40-generate-registry.sh

RUN chmod +x /docker-entrypoint.d/40-generate-registry.sh

EXPOSE 80
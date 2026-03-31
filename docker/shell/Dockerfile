FROM node:20-alpine AS builder

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/shell/project.json ./apps/shell/

COPY libs ./libs

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

ARG REMOTE1_URL
ARG REMOTE2_URL

ENV REMOTE1_URL=$REMOTE1_URL
ENV REMOTE2_URL=$REMOTE2_URL

RUN node docker/shell/generate-mf-registry

RUN pnpm exec nx build shell --prod

FROM nginx:alpine

COPY --from=builder /app/dist/apps/shell /usr/share/nginx/html

COPY docker/shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
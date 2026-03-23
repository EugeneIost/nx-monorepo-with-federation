ARG APP_NAME

FROM node:20-alpine AS builder

ARG APP_NAME

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/${APP_NAME}/project.json ./apps/${APP_NAME}/

COPY libs ./libs

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN pnpm exec nx build ${APP_NAME} --prod

FROM nginx:alpine

ARG APP_NAME

COPY --from=builder /app/dist/apps/${APP_NAME} /usr/share/nginx/html

COPY docker/remote/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
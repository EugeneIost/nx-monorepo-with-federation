ARG APP_NAME

FROM node:20-alpine AS builder

ARG APP_NAME

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/${APP_NAME}/project.json ./apps/${APP_NAME}/
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/
COPY libs ./libs

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN VERSION=$(node -p "require('./apps/${APP_NAME}/package.json').version") && \
    echo "🚀 Building ${APP_NAME}@${VERSION}" && \
    pnpm exec nx build ${APP_NAME} --prod && \
    mkdir -p /output/${APP_NAME}/${VERSION} && \
    cp -r dist/apps/${APP_NAME}/* /output/${APP_NAME}/${VERSION}

FROM nginx:alpine

COPY --from=builder /output /usr/share/nginx/html

COPY docker/remote/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
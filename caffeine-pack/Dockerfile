# Base Image
FROM node:18-alpine3.18 AS base
WORKDIR /app
EXPOSE 30000
EXPOSE 30001
RUN npm install -g pm2 pnpm typescript

# Dependencies
FROM base AS dependencies
COPY package.json ./
RUN NODE_ENV=development pnpm install 

# Build
FROM dependencies AS build
COPY . .
RUN pnpm build

# Deploy
FROM base AS deploy
ENV NODE_ENV=production
COPY --from=build /app/build/ ./build
COPY --from=dependencies /app/node_modules ./node_modules
COPY .env* ./
CMD ["pm2-runtime", "start", "build/index.js", "-i", "2", "--name", "Caffeine Server"]
# Caffeine-TS

Minimal [TypeScript](https://www.typescriptlang.org/) setup for [tinyHttp](https://tinyhttp.v1rtl.site/) using [ts-node](https://github.com/TypeStrong/ts-node).

## Setup

Node requirement v16.x.x or latest one.\*

```sh
npm i -g pnpm # install pnpm cli
pnpm i -g @tinyhttp/cli nodemon pm2 tsc # global dependencies
pnpm install # local dependencies
```

To install new dependencies use `pnpm --filter <workspace> add` or `pnpm --filter <workspace> add -D` for dev dependencies.

If you want to install at root folder use `pnpm add -w` or `pnpm add -Dw` for dev dependencies.

> I recommend you to use [nvm.sh](http://nvmv.sh) or [NodeJS Docker Image](https://hub.docker.com/_/node/) to manage your NodeJS versions.

## Docker container

Install and run MongoDB@5.0 and Redis@6.2.4 as Docker container

```sh
  docker-compose -f "docker-compose.yml" up -d --build
```

## Run

```sh
pnpm start # start dev mode
pnpm build # compile production version
pnpm build:docker # compile production version for docker
pnpm prod # run as production
pnpm prod:cluster # run as production in cluster
pnpm prod:docker # run as production in docker
pnpm lint # lint code
pnpm lint:fix # lint code and fix
pnpm stop # stop all services
```

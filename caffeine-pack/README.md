# Caffeine-TS

Minimal [TypeScript](https://www.typescriptlang.org/) setup for [tinyHttp](https://tinyhttp.v1rtl.site/) using [ts-node](https://github.com/TypeStrong/ts-node).

## Setup

Node requirement v14.x.x or latest one.\*

```sh
npm i -g pnpm # install pnpm cli
pnpm i -g @tinyhttp/cli nodemon pm2 tsc # global dependencies
pnpm install # local dependencies
```

> I recommend you to use [nvm.sh](http://nvmv.sh) or [NodeJS Docker Image](https://hub.docker.com/_/node/).

## Docker container

Install and run MongoDB@5.0 and Redis@6.2.4 as Docker container

```sh
  docker-compose -f "docker-compose.yml" up -d --build
```

## Run

```sh
pnpm start # start dev mode
pnpm build # compile production version
pnpm prod # run as production
pnpm prod:cluster # run as production in cluster
pnpm stop # stop all services
```

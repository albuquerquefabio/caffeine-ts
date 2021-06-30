# caffeine-ts

# TypeScript example

Minimal [TypeScript](https://www.typescriptlang.org/) setup for tinyhttp using [ts-node](https://github.com/TypeStrong/ts-node).

## Setup

```sh
npm i -g pnpm # install pnpm cli
pnpm i -g @tinyhttp/cli nodemon pm2 tsc # global dependencies
pnpm install # local dependencies

```

## Run

```sh
pnpm start # start dev mode
pnpm build # compile production version
pnpm prod # run as production
pnpm prod:cluster # run as production in cluster
pnpm stop # stop all services
```

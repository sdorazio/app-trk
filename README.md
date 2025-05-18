```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```


[For creating the KV_NAMESPACE run](https://developers.cloudflare.com/workers/wrangler/commands/#kv-namespace)

```txt
wrangler kv namespace create <NAMESPACE> [OPTIONS]
```
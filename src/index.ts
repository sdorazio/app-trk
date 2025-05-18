import { Context, Hono } from 'hono'
import { getRequestData, saveRequestData } from './datastore';
import { shiftURL } from './utils';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/t/*", (c: Context) => {
  const url = new URL(c.req.url);
  const data = saveRequestData(c);
  const fetchMode = c.req.header('cf-fetch-mode') || c.req.header('sec-fetch-mode');
  if (fetchMode === 'navigate' && url.pathname !== '/t/') {
    const redirectUrl = shiftURL(url);
    return c.redirect(redirectUrl, 302);
  }
  return c.json({'status': 'ok'});
});

app.get("/r/*", async (c: Context) => {
  const data = await getRequestData(c);
  if (!data) {
    return c.json({ status: 'NOT_FOUND', message: 'Not found' }, 404);
  }
  return c.json(data);
});

export default app;

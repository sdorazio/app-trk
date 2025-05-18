import { Context } from 'hono';

const REGEX_KNOWN_BOT_UA = /(googlebot|bingbot|yandexbot|slurp|spider|robot|bot.html|bot.htm|facebookbot|facebookexternalhit|twitterbot|storebot|microsoftpreview|ahrefsbot|semrushbot|siteauditbot|splitsignalbot)/i;

export function shiftURL(url: URL): URL {
    if (url.pathname === '/') {
        return new URL(`${url.protocol}//${url.host}${url.pathname}${url.search}`);
    }
    return new URL(`${url.protocol}//${url.pathname.substring(url.pathname.indexOf('/', 1))}${url.search}`);
}

export function isKnownBot(c: Context) {
    if (REGEX_KNOWN_BOT_UA.test(c.req.header('user-agent') || '')) {
        return true;
    }

    return false;
}

export function getRequestIP(c: Context): string {
    return c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || '';
}
import { Context } from 'hono';
import { isKnownBot, shiftURL, getRequestIP } from './utils';


export async function saveRequestData(c: Context) {
	const ip = getRequestIP(c);
    const key = `CL_${ip}`;
    const data = {
        ts: Date.now(),        
        ip: ip,
        ua: c.req.header('user-agent') || '',
        ref: c.req.header('referer'),
        url: c.req.url,
    };

	// Save to KV Store
    if (!isKnownBot(c) ) {
        try {
            c.executionCtx.waitUntil(c.env.APPTRK_KV.put(key, JSON.stringify(data), { expirationTtl: c.env.DATA_TTL }));
        } catch (e) {
            console.log(e);
        }
    }

    return data;
};


export async function getRequestData(c: Context) {
    if (isKnownBot(c)) {
        return;
    }
    const ip = getRequestIP(c);
    const key = `CL_${ip}`;
    try {
        const data = await c.env.APPTRK_KV.get(key);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.log(e);
    }
};

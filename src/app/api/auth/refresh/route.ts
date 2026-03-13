import { cookies } from 'next/headers';
import cookie from 'cookie';

export async function POST() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
            Cookie: `refreshToken=${cookies().get('refreshToken')?.value}`,
        },
    });

    if (!response.ok) {
        console.log('Refresh failed.');
        return Response.json({ success: false });
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes('accessToken'));
    const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

    if (!accessToken || !refreshToken) {
        console.log('Tokens could not found.');
        return Response.json({ success: false });
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    cookies().set({
        name: 'accessToken',
        value: parsedAccessToken.accessToken,
        expires: new Date(parsedAccessToken.expires),
        // todo: check auth service for httpOnly parameter
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path,
        domain: parsedAccessToken.Domain,
        sameSite: parsedAccessToken.SameSite as 'strict',
    });

    cookies().set({
        name: 'refreshToken',
        value: parsedRefreshToken.refreshToken,
        expires: new Date(parsedRefreshToken.expires),
        // todo: check auth service for httpOnly parameter
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path,
        domain: parsedRefreshToken.Domain,
        sameSite: parsedRefreshToken.SameSite as 'strict',
    });

    return Response.json({ success: true });
}
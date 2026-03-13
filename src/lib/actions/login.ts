'use server';
import cookie from 'cookie';
import { cookies } from 'next/headers';

export default async function login(prevState: any, formdata: FormData) {
    const email = formdata.get('email');
    const password = formdata.get('password');
    // todo: do request data validation

    // call auth service

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.log('error', error);
            return {
                type: 'error',
                message: error.errors[0].message,
            };
        }

        const c = response.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

        if (!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'No cookies were found!',
            };
        }

        const parsedAccessToken = cookie.parse(accessToken);
        const parsedRefreshToken = cookie.parse(refreshToken);

        console.log(parsedAccessToken, parsedRefreshToken);

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

        return {
            type: 'success',
            message: 'Login successful!',
        };
    } catch (err: any) {
        return {
            type: 'error',
            message: err.message,
        };
    }
}
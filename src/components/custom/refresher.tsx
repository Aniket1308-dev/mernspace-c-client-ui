'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import * as jose from 'jose';

const Refresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>();

    const getAccessToken = async () => {
        const res = await fetch('/api/auth/accessToken');

        if (!res.ok) {
            return;
        }

        const accessToken = await res.json();
        return accessToken.token;
    };

    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        try {
            const accessToken = await getAccessToken();

            if (!accessToken) {
                return;
            }

            const token = await jose.decodeJwt(accessToken);
            const exp = token.exp! * 1000; // Convert to Milliseconds

            const currentTime = Date.now();
            const refreshTime = exp - currentTime - 5000;

            console.log(`Current time: ${new Date(currentTime).toISOString()}`);
            console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
            console.log(
                `Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`
            );

            timeoutId.current = setTimeout(() => {
                refreshAccessToken();
                console.log('Access token is refreshing...');
            }, refreshTime);
        } catch (err: any) {}
    }, []);

    const refreshAccessToken = async () => {
        try {
            const res = await fetch('/api/auth/refresh', { method: 'POST' });

            if (!res.ok) {
                console.log('Failed to refresh access token');
                return;
            }
        } catch (err: any) {
            console.error(`Error while refreshing the token`, err);
        }

        startRefresh();
    };
    useEffect(() => {
        startRefresh();

        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [timeoutId, startRefresh]);
    return <div>{children}</div>;
};

export default Refresher;
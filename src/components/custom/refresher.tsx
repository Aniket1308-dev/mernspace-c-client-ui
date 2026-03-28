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

            // todo: [bug/limitation]
            // The value of refreshTime should be equal or less than MAXIMUM_SAFE_INTEGER which is 2,147,483,647 (32 bit signed int)
            // If it exceeds then the settimeout won't work as expected, instead it will be triggered asap.
            // So in our case if the duration of jwt is more than 24 days then the number exceeds the max safe int value.
            // IMPORTANT: FIND ANOTHER SOLUTION OR DON'T MAKE JWT GREATER THAN 24 days.


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
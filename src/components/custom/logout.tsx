'use client';

import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/logout';

const Logout = () => {
    return (
        <Button
            size={'sm'}
            onClick={async () => {
                await logout();
            }}>
            Logout
        </Button>
    );
};

export default Logout;
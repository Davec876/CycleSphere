'use client';

import { SessionProvider } from 'next-auth/react';

interface AuthProviderTypes {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderTypes) {
	return <SessionProvider>{children}</SessionProvider>;
}

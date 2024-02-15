import { getSession } from 'next-auth/react';
import { generateProdAccessToken } from './prodAccessToken';
import { FetchAPIError } from './errors/FetchAPIError';

export async function fetchWithAuth(url: string) {
	const session = await getSession();
	if (!session?.user?.id) {
		throw new FetchAPIError('User is not logged in!');
	}
	const token = await generateProdAccessToken(session?.user?.id);
	const headers = new Headers();

	if (token) {
		headers.append('Authorization', `Bearer ${token}`);
	}

	const response = await fetch(url, { headers });
	return response;
}

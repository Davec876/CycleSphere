import { auth } from '@/components/auth/auth';

function getDate(): number {
	const currentDate = Date.now();
	return currentDate;
}

export const GET = auth((req) => {
	if (!req.auth) {
		return Response.json({ error: 'Not authorized' });
	}

	return Response.json({ date: getDate() });
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export const dynamic = 'force-dynamic';

'use server';

import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { APIError } from './errors/APIError';

// generate access token for cross origin authorization
export async function generateProdAccessToken(id: string) {
	return jwt.sign({ id }, process.env.PROD_JWT_SECRET!, {
		expiresIn: '10m',
	});
}

export async function validateProdAccessTokenFromReq(req: NextRequest) {
	const token = req.headers.get('Authorization')?.split(' ')[1];
	if (!token) {
		throw new APIError('User is not logged in!', 401);
	}
	try {
		return await validateProdAccessToken(token);
	} catch (jwtErr) {
		throw new APIError('User is not logged in!', 401);
	}
}

export async function validateProdAccessToken(token: string) {
	return jwt.verify(token, process.env.PROD_JWT_SECRET!);
}

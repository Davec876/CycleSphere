import { auth } from '@/components/auth/auth';
import { APIError } from '@/util/errors/APIError';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { addCORSHeaders } from '@/util/addCorsHeader';
import { randomUUID } from 'crypto';
import { validateProdAccessTokenFromReq } from '@/util/prodAccessToken';
import type { NextRequest } from 'next/server';

async function getPresignedUploadUrl() {
	const S3 = new S3Client({
		region: 'auto',
		endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: process.env.R2_ACCESS_KEY_ID!,
			secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
		},
	});

	const imageId = randomUUID();
	const uploadUrl = await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: 'public',
			Key: `4177-group-project/routes/images/${imageId}`,
		}),
		{
			expiresIn: 3600,
		}
	);

	return addCORSHeaders(Response.json({ imageId, uploadUrl }));
}

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (session && session.user) {
			return await getPresignedUploadUrl();
		}
		if (!session || session.user == null) {
			// Validate cross origin requests
			await validateProdAccessTokenFromReq(req);
			return await getPresignedUploadUrl();
		}
	} catch (e) {
		if (e instanceof APIError) {
			return addCORSHeaders(
				Response.json({ error: e.message }, { status: e.status })
			);
		}
		throw e;
	}
}

// Respond with CORS to OPTIONS
export async function OPTIONS() {
	return addCORSHeaders(new Response(null, { status: 204 }));
}

export const dynamic = 'force-dynamic';

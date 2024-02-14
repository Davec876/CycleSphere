import { auth } from '@/components/auth/auth';
import { APIError } from '@/util/errors/APIError';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

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

	return Response.json({ imageId, uploadUrl });
}

export async function GET() {
	try {
		const session = await auth();
		if (!session || session.user == null) {
			throw new APIError('User is not logged in!', 401);
		}
		return await getPresignedUploadUrl();
	} catch (e) {
		if (e instanceof APIError) {
			return Response.json({ error: e.message }, { status: e.status });
		}
		throw e;
	}
}

export const dynamic = 'force-dynamic';

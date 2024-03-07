'use client';

import { FetchAPIError } from './errors/FetchAPIError';
import { fetchWithAuth } from './fetchWithAuth';

export function getImageUrl(id: string) {
	if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
		return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/4177-group-project/images/${id}`;
	}
	return `https://images.maximoguk.com/4177-group-project/images/${id}`;
}

interface PresignedRouteImageUploadUrlRes {
	imageId: string;
	uploadUrl: string;
}

export async function getPresignedRouteImageUploadUrl(): Promise<PresignedRouteImageUploadUrlRes> {
	try {
		if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
			const res = await fetch(
				`http://localhost:${process.env.PORT}/api/routes/image`
			);
			return await res.json();
		}
		const res = await fetchWithAuth(
			`https://4177-group-project.vercel.app/api/routes/image`
		);
		return await res.json();
	} catch (e) {
		throw new FetchAPIError('Error uploading route image');
	}
}

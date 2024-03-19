'use client';

import { FetchAPIError } from './errors/FetchAPIError';
import { fetchWithAuth } from './fetchWithAuth';

export function getImageUrl(id: string) {
	if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
		return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/4177-group-project/images/${id}`;
	}
	return `https://images.maximoguk.com/4177-group-project/images/${id}`;
}

interface PresignedImageUploadUrlRes {
	imageId: string;
	uploadUrl: string;
}

export async function getPresignedImageUploadUrl(): Promise<PresignedImageUploadUrlRes> {
	try {
		if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
			const res = await fetch(`http://localhost:3000/api/image`);
			return await res.json();
		}
		const res = await fetchWithAuth(
			`https://4177-group-project.vercel.app/api/image`
		);
		return await res.json();
	} catch (e) {
		console.log(e);
		throw new FetchAPIError('Error uploading image');
	}
}

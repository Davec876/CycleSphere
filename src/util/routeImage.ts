'use client';

export function getRouteImageUrl(id: string) {
	if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
		return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/4177-group-project/routes/images/${id}`;
	}
	return `https://images.maximoguk.com/4177-group-project/routes/images/${id}`;
}

interface PresignedRouteImageUploadUrlRes {
	imageId: string;
	uploadUrl: string;
}

export async function getPresignedRouteImageUploadUrl(): Promise<PresignedRouteImageUploadUrlRes> {
	if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
		const res = await fetch(`http://localhost:3000/api/routes/image`);
		return await res.json();
	}
	const res = await fetch(
		`https://4177-group-project.vercel.app/api/routes/image`
	);
	return await res.json();
}

'use server';
import { auth } from '@/components/auth/auth';
import Route, { type IRouteCreation } from '@/models/Route';
import { randomUUID } from 'crypto';
import { APIError } from '@/util/errors/APIError';
import type { ICommentCreation } from '@/models/schemas/Comment';

export async function getRoute(id: string) {
	return await Route.findOne({ id }, { _id: 0, __v: 0 }).lean().exec();
}

export async function getRoutes() {
	return await Route.find({}, { _id: 0, __v: 0 }).lean().exec();
}

export async function addRoute({
	title,
	body,
	imageId,
	difficulty,
	location,
	selectedPoints,
	distance,
}: {
	title: string;
	body: string;
	imageId: string;
	difficulty: number;
	location: { lat: number; lng: number };
	selectedPoints: { lat: number; lng: number }[];
	distance?: number;
}) {
	const session = await auth();
	if (!session || !session.user || !session.user?.id || !session.user?.name) {
		throw new APIError('User is not logged in!', 401);
	}
	if (!location || !location.lat || !location.lng) {
		throw new APIError('No location found!', 404);
	}
	await Route.create({
		id: randomUUID(),
		author: {
			id: session.user.id,
			name: session.user.name,
		},
		title,
		body,
		imageId,
		difficulty,
		likedByUserIds: [], // init as empty
		location,
		selectedPoints,
		comments: [], // init as empty
		distance,
	} satisfies IRouteCreation);
}

export async function likeRoute(id: string) {
	const session = await auth();
	if (!session || !session.user) {
		throw new APIError('User is not logged in!', 401);
	}
	await Route.updateOne(
		{ id },
		{ $addToSet: { likedByUserIds: session.user.id } }
	);
}

export async function unlikeRoute(id: string) {
	const session = await auth();
	if (!session || !session.user) {
		throw new APIError('User is not logged in!', 401);
	}
	await Route.updateOne({ id }, { $pull: { likedByUserIds: session.user.id } });
}

// Comments
export async function getCommentsForRoute(id: string) {
	// find route by id and return comments field
	const route = await Route.findOne({ id }, { comments: 1, _id: 0 })
		.lean()
		.exec();
	if (!route) {
		throw new APIError('Route not found!', 404);
	}

	return route.comments;
}

export async function addCommentToRoute({
	id,
	body,
	imageId,
	selectedPinLocation,
}: {
	id: string;
	body: string;
	imageId: string;
	selectedPinLocation?: {
		lat: number;
		lng: number;
	};
}) {
	const session = await auth();
	if (!session || !session.user || !session.user?.id || !session.user?.name) {
		throw new APIError('User is not logged in!', 401);
	}

	const newComment = {
		id: randomUUID(),
		author: {
			id: session.user.id,
			name: session.user.name,
		},
		body,
		likedByUserIds: [], // init as empty
		replies: [], // init as empty
		imageId,
		...(selectedPinLocation && { pin: { location: selectedPinLocation } }),
	} satisfies ICommentCreation;

	await Route.updateOne({ id }, { $push: { comments: newComment } });
}

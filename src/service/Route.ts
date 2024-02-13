'use server';
import { auth } from '@/components/auth/auth';
import Route from '@/models/Route';
import { randomUUID } from 'crypto';

export async function getRoute(id: string) {
	return await Route.findOne({ id }, { _id: 0, __v: 0 }).lean().exec();
}

export async function getRoutes() {
	return await Route.find({}, { _id: 0, __v: 0 }).lean().exec();
}

export async function addRoute({
	title,
	body,
	difficulty,
}: {
	title: string;
	body: string;
	difficulty: number;
}) {
	const session = await auth();
	if (!session || session.user == null) {
		throw new Error('User is not logged in!');
	}
	await Route.create({
		id: randomUUID(),
		authorId: session.user.id,
		title,
		body,
		imagePath: '/',
		difficulty,
		likedByUserIds: [],
	});
}

export async function likeRoute(id: string) {
	const session = await auth();
	if (!session || session.user == null) {
		throw new Error('User is not logged in!');
	}
	await Route.updateOne(
		{ id },
		{ $addToSet: { likedByUserIds: session.user.id } }
	);
}

export async function unlikeRoute(id: string) {
	const session = await auth();
	if (!session || session.user == null) {
		throw new Error('User is not logged in!');
	}
	await Route.updateOne({ id }, { $pull: { likedByUserIds: session.user.id } });
}

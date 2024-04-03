'use server';

import { auth } from '@/components/auth/auth';
import User from '@/models/User';
import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { APIError } from '@/util/errors/APIError';
import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';

// This method currently only projects the name, if additonal field are required add them to the projection list.
// it is best however, if we don't expose the hashed password here, as that is a property of the user model
export async function getUser(id: string) {
	return await User.findOne({ id }, { name: 1, _id: 0 }).lean().exec();
}

export async function getRouteHistory() {
	const session = await auth();
	if (!session?.user?.id) {
		throw new APIError('User is not logged in!', 401);
	}

	const user = await User.findOne(
		{ id: session.user.id },
		{ routeHistory: 1, _id: 0 }
	)
		.lean()
		.exec();

	if (!user) {
		throw new APIError('Could not find user', 500);
	} else if (!user.routeHistory) {
		// Currently, not every user has a routeHistory field.
		// Remove this condition once all databases have been migrated.
		user.routeHistory = [];
		User.replaceOne({ id: session.user.id }, user);
	}
	return user.routeHistory;
}

export async function visitRoute(routeId: string, datetimeISO?: string | null) {
	const session = await auth();
	if (!session?.user?.id) {
		throw new APIError('User is not logged in!', 401);
	}

	const newRHE: IRouteHistoryEntry = {
		id: randomUUID(),
		routeId,
		datetimeISO: datetimeISO ?? DateTime.now().toISO(),
	};

	const updateRes = await User.updateOne(
		{ id: session.user.id },
		{ $push: { routeHistory: newRHE } }
	);
	if (updateRes.matchedCount < 1) {
		throw new APIError('Route does not exist', 404);
	}
}

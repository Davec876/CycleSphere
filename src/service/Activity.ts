// Author: Kevin Orenday

'use server';

import { auth } from '@/components/auth/auth';
import Activity from '@/models/Activity';
import { APIError } from '@/util/errors/APIError';
import { randomUUID } from 'crypto';
import type { IActivityCreation } from '@/models/Activity';
import { formatDuration } from '@/util/formatDuration';

export async function getActivity(id: string) {
	if (!id)
		throw new APIError('Cannot retrieve activity with undefined id.', 400);
	return await Activity.findOne({ id }, { _id: 0, __v: 0 }).lean().exec();
}

export async function getActivityByRouteId(route_id: string) {
	if (!route_id)
		throw new APIError(
			'Cannot retrieve activity with undefined route id.',
			400
		);
	return await Activity.findOne({ routeId: route_id }, { _id: 0, __v: 0 })
		.lean()
		.exec();
}

export async function getActivitiesByUserId(id: string) {
	if (!id)
		throw new APIError('Cannot retrieve activity with undefined id.', 400);
	return await Activity.find({ userId: id }, { _id: 0, __v: 0 }).lean().exec();
}

export async function addActivity({
	name,
	routeId,
	mode,
	duration,
	completedOn,
	status,
}: {
	name: string;
	routeId: string;
	mode?: string;
	duration?: {
		hours: number;
		minutes: number;
		seconds: number;
	};
	completedOn?: Date;
	status?: string;
}) {
	const session = await auth();

	if (!session || !session.user || !session.user?.id || !session.user?.name) {
		throw new APIError('User is not logged in!', 401);
	}
	if (!name) throw new APIError('Activity name does not exist!', 400);
	if (!routeId) throw new APIError('Route ID does not exist!', 400);

	await Activity.create({
		id: randomUUID(),
		userId: session.user.id,
		routeId: routeId,
		name: name,
		mode: mode || 'cycling',
		duration: duration || { hours: 0, minutes: 0, seconds: 0 },
		historyLogs: [{ log: 'Activity added to profile' }],
		completedOn: completedOn || undefined,
		status: status || 'unfinished',
	} satisfies IActivityCreation);
}

export async function updateActivityDuration({
	id,
	duration,
}: {
	id: string;
	duration: {
		hours: number;
		minutes: number;
		seconds: number;
	};
}) {
	if (!id) throw new APIError('Cannot update activity with undefined id.', 400);
	if (!duration) throw new APIError('Duration does not exist!', 400);
	await Activity.findOneAndUpdate({ id: id }, { duration: duration })
		.lean()
		.exec()
		.then(
			async () =>
				await addHistoryLog(
					id,
					`Activity duration updated to ${formatDuration(duration)}`
				)
		);
}

export async function finishActivity(id: string) {
	if (!id) throw new APIError('Cannot finish activity with undefined id', 400);
	await Activity.findOneAndUpdate(
		{ id: id },
		{ status: 'finished', completedOn: new Date() }
	)
		.lean()
		.exec()
		.then(async () => await addHistoryLog(id, 'Activity has been finished'));
}

export async function updateActivityStatus({
	id,
	status,
}: {
	id: string;
	status: string;
}) {
	if (!id) throw new APIError('Cannot update activity with undefined id.', 400);
	if (!status) throw new APIError('Status does not exist!', 400);
	await Activity.findOneAndUpdate({ id: id }, { status: status })
		.lean()
		.exec()
		.then(
			async () =>
				await addHistoryLog(
					id,
					`Activity status updated to ${status.toLocaleLowerCase()}`
				)
		);
}

export async function deleteActivity(id: string) {
	if (!id) throw new APIError('Cannot delete activity with undefined id.', 400);
	await Activity.deleteOne({ id: id }).lean().exec();
}

async function addHistoryLog(id: string, log: string) {
	if (!id)
		throw new APIError(
			'Cannot add history log of activity with undefined id.',
			400
		);
	if (!log)
		throw new APIError(
			'Cannot add history log of activity with undefined log.',
			400
		);

	await Activity.updateOne({ id: id }, { $push: { historyLogs: { log: log } } })
		.lean()
		.exec();
}

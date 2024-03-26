'use client';

import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { useState } from 'react';

export default function RouteHistoryArea({
	initialRouteHistory,
}: {
	initialRouteHistory: IRouteHistoryEntry[];
}) {
	const [routeHistory, setRouteHistory] =
		useState<IRouteHistoryEntry[]>(initialRouteHistory);

	return <>{JSON.stringify(routeHistory)}</>;
}

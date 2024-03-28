import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { DateTime } from 'luxon';

export default function ListRouteHistory({
	routeHistory,
}: {
	routeHistory: IRouteHistoryEntry[];
}) {
	// grouping inspired by https://stackoverflow.com/a/48084188 27-Mar-2024
	const groupedRHEs = routeHistory.reduce((groupedRHEs, RHE) => {
		const datetime = DateTime.fromISO(RHE.datetimeISO);
		const yearWeekIndex = datetime.year * 100 + datetime.weekNumber;

		if (!groupedRHEs.get(yearWeekIndex)) {
			groupedRHEs.set(yearWeekIndex, []);
		}

		groupedRHEs.get(yearWeekIndex)?.push(RHE);

		return groupedRHEs;
	}, new Map<number, IRouteHistoryEntry[]>());

	const rhGroups: RHGroup[] = [];
	groupedRHEs.forEach((rhGroup, yearWeekIndex) => {
		rhGroups.push({ yearWeekIndex, routes: rhGroup });
	});

	return <ListRHGroups rhGroups={rhGroups} />;
}

interface RHGroup {
	yearWeekIndex: number;
	routes: IRouteHistoryEntry[];
}

function ListRHGroups({ rhGroups }: { rhGroups: RHGroup[] }) {
	rhGroups.sort((a, b) => a.yearWeekIndex - b.yearWeekIndex);
	return rhGroups.map((rhGroup) => (
		<RHGroupCard key={rhGroup.yearWeekIndex} rhGroup={rhGroup} />
	));
}

function RHGroupCard({ rhGroup }: { rhGroup: RHGroup }) {
	const week = rhGroup.yearWeekIndex % 100;
	const year = rhGroup.yearWeekIndex / 100;
	const weekStart = DateTime.fromFormat(`${year}-${week}`, 'y-W');
	console.log(weekStart);

	return (
		<Card sx={{ my: 2 }}>
			<CardHeader title="Week of ??" />
			<CardContent>content</CardContent>
		</Card>
	);
}

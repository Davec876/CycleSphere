import { Card, CardContent, CardHeader } from '@mui/material';
import { DateTime } from 'luxon';
import RHECard from './RHECard';
import type { CompleteRHE } from './RouteHistoryArea';

export default function ListRouteHistory({
	routeHistory,
}: {
	routeHistory: CompleteRHE[];
}) {
	// grouping inspired by https://stackoverflow.com/a/48084188 27-Mar-2024
	const groupedRHEs = routeHistory.reduce((groupedRHEs, RHE) => {
		const isoWeekDate = DateTime.fromISO(RHE.datetimeISO).toISOWeekDate();
		if (!isoWeekDate) {
			throw new Error(`Invalid Route History Entry date: ${RHE.datetimeISO}`);
		}

		const yearWeek = isoWeekDate.slice(0, isoWeekDate.length - 2);

		if (!groupedRHEs.get(yearWeek)) {
			groupedRHEs.set(yearWeek, []);
		}

		groupedRHEs.get(yearWeek)?.push(RHE);

		return groupedRHEs;
	}, new Map<string, CompleteRHE[]>());

	const rhGroups: RHGroup[] = [];
	groupedRHEs.forEach((rhGroup, yearWeek) => {
		rhGroups.push({
			yearWeekDatetime: DateTime.fromISO(yearWeek + '-1'),
			routes: rhGroup,
		});
	});

	return <ListRHGroups rhGroups={rhGroups} />;
}

interface RHGroup {
	yearWeekDatetime: DateTime;
	routes: CompleteRHE[];
}

function ListRHGroups({ rhGroups }: { rhGroups: RHGroup[] }) {
	rhGroups.sort(
		(a, b) => b.yearWeekDatetime.toMillis() - a.yearWeekDatetime.toMillis()
	);
	return rhGroups.map((rhGroup) => (
		<RHGroupCard key={rhGroup.yearWeekDatetime.toMillis()} rhGroup={rhGroup} />
	));
}

function RHGroupCard({ rhGroup }: { rhGroup: RHGroup }) {
	return (
		<Card sx={{ my: 2 }}>
			<CardHeader
				title={`Week of ${rhGroup.yearWeekDatetime.toLocaleString(DateTime.DATE_MED)}`}
				component="h3"
				sx={{ my: 'unset' }}
			/>
			<CardContent sx={{ pt: 0 }}>
				{rhGroup.routes.map((RHE) => (
					<RHECard key={RHE.id} RHE={RHE} />
				))}
			</CardContent>
		</Card>
	);
}

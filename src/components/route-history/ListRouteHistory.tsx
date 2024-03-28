import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { getRoute } from '@/service/Route';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Link,
	Skeleton,
	Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import NextLink from 'next/link';
import { cache, useEffect, useState } from 'react';

export default function ListRouteHistory({
	routeHistory,
}: {
	routeHistory: IRouteHistoryEntry[];
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
	}, new Map<string, IRouteHistoryEntry[]>());

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
	routes: IRouteHistoryEntry[];
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

function RHECard({ RHE }: { RHE: IRouteHistoryEntry }) {
	const [routeName, setRouteName] = useState<string | null>(null);
	const [invalidRoute, setInvalidRoute] = useState(false);
	const datetime = DateTime.fromISO(RHE.datetimeISO);

	useEffect(() => {
		const getRouteCached = cache(getRoute);
		getRouteCached(RHE.routeId).then((route) => {
			if (!route) {
				setInvalidRoute(true);
				setRouteName('Unknown Route');
			} else {
				setRouteName(route.title);
			}
		});
	}, [RHE]);

	return (
		<Link
			href={`/routes/${RHE.routeId}`}
			component={NextLink}
			underline="none"
			color="unset"
		>
			<Box
				sx={{
					':hover': { bgcolor: (theme) => theme.palette.action.hover },
				}}
				border={(theme) => `1px solid ${theme.palette.text.primary}`}
				p={1}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography
					variant="h5"
					component="h4"
					color={invalidRoute ? 'red' : undefined}
				>
					{routeName ?? <Skeleton width={200} animation="wave" />}
				</Typography>
				<Typography textAlign="end" suppressHydrationWarning>
					{datetime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
					<br />
					{datetime.toLocaleString(DateTime.TIME_SIMPLE)}
				</Typography>
			</Box>
		</Link>
	);
}

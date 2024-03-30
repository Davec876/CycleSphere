import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { getRoute } from '@/service/Route';
import { Box, Typography, Skeleton, Link } from '@mui/material';
import { DateTime } from 'luxon';
import NextLink from 'next/link';
import { useState, useEffect, cache } from 'react';

export default function RHECard({ RHE }: { RHE: IRouteHistoryEntry }) {
	const [routeName, setRouteName] = useState<string | null>(null);
	const [invalidRoute, setInvalidRoute] = useState(true);
	const datetime = DateTime.fromISO(RHE.datetimeISO);

	useEffect(() => {
		const getRouteCached = cache(getRoute);
		getRouteCached(RHE.routeId).then((route) => {
			if (!route) {
				setRouteName('Unknown Route');
			} else {
				setInvalidRoute(false);
				setRouteName(route.title);
			}
		});
	}, [RHE]);

	const RHECardContent = (
		<Box
			sx={
				invalidRoute
					? {}
					: {
							':hover': { bgcolor: (theme) => theme.palette.action.hover },
						}
			}
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
	);

	if (invalidRoute) {
		return <>{RHECardContent}</>;
	}

	return (
		<Link
			href={`/routes/${RHE.routeId}`}
			component={NextLink}
			underline="none"
			color="unset"
		>
			{RHECardContent}
		</Link>
	);
}

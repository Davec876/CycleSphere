import { Box, Link, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import NextLink from 'next/link';
import type { CompleteRHE } from './RouteHistoryArea';

export default function RHECard({ RHE }: { RHE: CompleteRHE }) {
	const routeName = RHE.route?.title ?? 'Unknown Route';
	const datetime = DateTime.fromISO(RHE.datetimeISO);
	const invalidRoute = !RHE.route;

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
				{routeName}
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

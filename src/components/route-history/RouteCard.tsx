import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';
import { CardActionArea, Typography } from '@mui/material';
import { DateTime } from 'luxon';

export default function RouteCard({ route }: { route: IRouteHistoryEntry }) {
	const datetime = DateTime.fromISO(route.datetimeISO);
	return (
		<CardActionArea
			href={`routes/${route.routeId}`}
			sx={{
				px: 1,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Typography>{route.routeId} TODO fetch route name</Typography>
			<Typography variant="body2" textAlign="end" suppressHydrationWarning>
				{datetime.toLocaleString(DateTime.DATE_MED)}
				<br />
				{datetime.toLocaleString(DateTime.TIME_SIMPLE)}
			</Typography>
		</CardActionArea>
	);
}

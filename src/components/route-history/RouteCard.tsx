import { CardActionArea, Typography } from '@mui/material';
import { DateTime } from 'luxon';

export interface Route {
	id: string;
	name: string;
	datetime: DateTime;
}

export default function RouteCard({ route }: { route: Route }) {
	return (
		<CardActionArea
			href={`route/${route.id}`}
			sx={{
				px: 1,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Typography>{route.name}</Typography>
			<Typography variant="body2" textAlign="end" suppressHydrationWarning>
				{route.datetime.toLocaleString(DateTime.DATETIME_MED)}
				<br />
				{route.datetime.toLocaleString(DateTime.TIME_SIMPLE)}
			</Typography>
		</CardActionArea>
	);
}

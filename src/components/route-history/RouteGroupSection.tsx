import { Box, Card, Typography } from '@mui/material';
import RouteCard from './RouteCard';
import type { IRouteHistoryEntry } from '@/models/schemas/RouteHistoryEntry';

export interface RouteGroup {
	week: string;
	routes: (IRouteHistoryEntry & { name: string })[];
}

export default function RouteGroupSection({
	routeGroup,
}: {
	routeGroup: RouteGroup;
}) {
	return (
		<Box border="1px solid white" borderRadius={2} p={2} my={3}>
			<Typography variant="h5" component="h2" marginBottom={1}>
				{routeGroup.week}
			</Typography>
			<Card elevation={0} sx={{ border: '1px solid white', borderRadius: 0 }}>
				{routeGroup.routes.map((route) => (
					<RouteCard key={route.datetimeISO.valueOf()} route={route} />
				))}
			</Card>
		</Box>
	);
}
